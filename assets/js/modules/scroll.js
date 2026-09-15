/**
 * NORTH COFFEE
 * Scroll / Section Navigation Module
 *
 * Responsibilities:
 * - Fixed header state
 * - Internal section navigation
 * - Coffee brewing transition
 * - Section landing position
 * - News -> Shop reveal control
 */

const SELECTORS = Object.freeze({
  header: "[data-header]",
  transition: "[data-page-transition]",
  anchors: 'a[href^="#"]',
  news: "#news",
  shop: "#shop",
});


const SETTINGS = Object.freeze({
  headerScrollThreshold: 24,

  /*
   * Coffee transition timing
   */
  fadeInDuration: 220,
  brewingDuration: 1050,
  fadeOutDuration: 300,

  /*
   * Space between fixed header and
   * section heading after navigation
   */
  desktopLandingGap: 105,
  mobileLandingGap: 54,

  /*
   * How far user must scroll after
   * navigating to News before Shop appears
   */
  shopRevealDistance: 90,
});


let navigationInProgress = false;

let newsLandingScrollY = null;

let shopRevealMode = false;


const wait = (milliseconds) => {
  return new Promise((resolve) => {
    window.setTimeout(
      resolve,
      milliseconds
    );
  });
};


const getHeader = () => {
  return document.querySelector(
    SELECTORS.header
  );
};


const getTransition = () => {
  return document.querySelector(
    SELECTORS.transition
  );
};


const getHeaderHeight = () => {
  return (
    getHeader()?.offsetHeight ?? 0
  );
};


const getLandingGap = () => {
  return window.innerWidth <= 768
    ? SETTINGS.mobileLandingGap
    : SETTINGS.desktopLandingGap;
};


/*
 * We intentionally align navigation to the
 * section heading rather than the section top.
 *
 * This removes the previous section from
 * the visible area.
 */
const getNavigationAnchor = (target) => {
  if (target.id === "home") {
    return target;
  }

  return (
    target.querySelector(
      ".section-heading"
    ) ??
    target.querySelector(
      ".contact-panel"
    ) ??
    target
  );
};


const getTargetPosition = (target) => {
  const anchor =
    getNavigationAnchor(target);

  const rect =
    anchor.getBoundingClientRect();

  const absoluteTop =
    window.scrollY + rect.top;

  const offset =
    getHeaderHeight() +
    getLandingGap();

  return Math.max(
    0,
    absoluteTop - offset
  );
};


/* =========================================================
   Coffee Transition
========================================================= */

const restartCoffeeAnimation = () => {
  const transition =
    getTransition();

  if (!transition) {
    return;
  }

  const animatedElements =
    transition.querySelectorAll(
      [
        ".pour-pot",
        ".pour-stream",
        ".pour-coffee",
        ".pour-label",
      ].join(",")
    );

  animatedElements.forEach(
    (element) => {
      element.style.animation = "none";
    }
  );

  /*
   * Force reflow so animation can restart
   */
  void transition.offsetWidth;

  animatedElements.forEach(
    (element) => {
      element.style.animation = "";
    }
  );
};


const showTransition = async () => {
  const transition =
    getTransition();

  if (!transition) {
    return;
  }

  restartCoffeeAnimation();

  transition.classList.add(
    "is-active"
  );

  /*
   * Wait until dark overlay is clearly visible
   * BEFORE moving the document
   */
  await wait(
    SETTINGS.fadeInDuration
  );
};


const hideTransition = async () => {
  const transition =
    getTransition();

  if (!transition) {
    return;
  }

  transition.classList.remove(
    "is-active"
  );

  await wait(
    SETTINGS.fadeOutDuration
  );
};


/* =========================================================
   Shop Reveal
========================================================= */

const resetShopReveal = () => {
  const shop =
    document.querySelector(
      SELECTORS.shop
    );

  shopRevealMode = false;
  newsLandingScrollY = null;

  shop?.classList.remove(
    "is-navigation-hidden"
  );
};


const prepareNewsLanding = () => {
  const shop =
    document.querySelector(
      SELECTORS.shop
    );

  if (!shop) {
    return;
  }

  shopRevealMode = true;

  shop.classList.add(
    "is-navigation-hidden"
  );
};


const activateNewsLanding = () => {
  newsLandingScrollY =
    window.scrollY;
};


const updateShopReveal = () => {
  if (
    !shopRevealMode ||
    newsLandingScrollY === null
  ) {
    return;
  }

  /*
   * Only reveal when the user genuinely
   * scrolls DOWN after landing on News.
   */
  const distance =
    window.scrollY -
    newsLandingScrollY;

  if (
    distance <
    SETTINGS.shopRevealDistance
  ) {
    return;
  }

  const shop =
    document.querySelector(
      SELECTORS.shop
    );

  shop?.classList.remove(
    "is-navigation-hidden"
  );

  shop?.classList.add(
    "is-navigation-revealing"
  );

  window.setTimeout(
    () => {
      shop?.classList.remove(
        "is-navigation-revealing"
      );
    },
    700
  );

  shopRevealMode = false;
  newsLandingScrollY = null;
};


/* =========================================================
   Navigate
========================================================= */

const navigateToSection =
  async (target) => {

    if (navigationInProgress) {
      return;
    }

    navigationInProgress = true;


    /*
     * News receives special treatment:
     * hide Shop until user continues scrolling.
     */
    if (target.id === "news") {
      prepareNewsLanding();
    } else {
      resetShopReveal();
    }


    /*
     * STEP 1
     * Cover current page first.
     */
    await showTransition();


    /*
     * STEP 2
     * Coffee is now visibly pouring.
     *
     * Keep the current page covered long enough
     * for the user to actually see the animation.
     */
    await wait(
      Math.round(
        SETTINGS.brewingDuration * 0.48
      )
    );


    /*
     * STEP 3
     * Move while screen is covered.
     */
    window.scrollTo({
      top: getTargetPosition(target),
      behavior: "auto",
    });


    /*
     * STEP 4
     * Let the second half of the brewing
     * animation finish.
     */
    await wait(
      Math.round(
        SETTINGS.brewingDuration * 0.52
      )
    );


    if (target.id === "news") {
      activateNewsLanding();
    }


    /*
     * STEP 5
     * Reveal destination.
     */
    await hideTransition();


    navigationInProgress = false;
  };


/* =========================================================
   Internal Anchors
========================================================= */

const initAnchorNavigation = () => {
  const anchors =
    document.querySelectorAll(
      SELECTORS.anchors
    );

  anchors.forEach((anchor) => {
    anchor.addEventListener(
      "click",
      async (event) => {

        const href =
          anchor.getAttribute("href");

        if (
          !href ||
          href === "#" ||
          !href.startsWith("#")
        ) {
          return;
        }

        let target = null;

        try {
          target =
            document.querySelector(href);
        } catch {
          return;
        }

        if (!target) {
          return;
        }

        event.preventDefault();

        await navigateToSection(
          target
        );

        history.replaceState(
          null,
          "",
          href
        );
      }
    );
  });
};


/* =========================================================
   Header Scroll State
========================================================= */

const initHeaderScrollState = () => {
  const header =
    getHeader();

  if (!header) {
    return;
  }

  let ticking = false;

  const update = () => {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY >
        SETTINGS.headerScrollThreshold
    );

    updateShopReveal();

    ticking = false;
  };

  const handleScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;

    window.requestAnimationFrame(
      update
    );
  };

  update();

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true,
    }
  );
};


/* =========================================================
   Init
========================================================= */

export const initScroll = () => {
  initHeaderScrollState();
  initAnchorNavigation();
};
