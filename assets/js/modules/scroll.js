/**
 * NORTH COFFEE
 * Scroll Module
 *
 * Responsibilities:
 * - Header scroll state
 * - Internal anchor navigation
 * - Coffee transition
 * - Dynamic header offset
 *
 * Navigation movement is intentionally hidden
 * behind the coffee transition.
 */

const SELECTORS = Object.freeze({
  header:
    "[data-header]",

  transition:
    "[data-page-transition]",

  anchor:
    'a[href^="#"]',
});


const SETTINGS = Object.freeze({
  headerScrollThreshold: 24,

  transitionIn: 180,

  hiddenDuration: 470,

  transitionOut: 180,

  anchorGap: 10,
});


let navigationInProgress =
  false;


const wait = (
  milliseconds
) => {
  return new Promise(
    (resolve) => {
      window.setTimeout(
        resolve,
        milliseconds
      );
    }
  );
};


const getHeaderHeight = () => {
  const header =
    document.querySelector(
      SELECTORS.header
    );

  return (
    header?.offsetHeight ?? 0
  );
};


const getTargetPosition = (
  target
) => {
  const rect =
    target.getBoundingClientRect();

  const documentTop =
    window.scrollY +
    rect.top;

  const offset =
    getHeaderHeight() +
    SETTINGS.anchorGap;


  return Math.max(
    0,
    documentTop - offset
  );
};


const getTransition = () => {
  return document.querySelector(
    SELECTORS.transition
  );
};


const showTransition = () => {
  getTransition()?.classList.add(
    "is-active"
  );
};


const hideTransition = () => {
  getTransition()?.classList.remove(
    "is-active"
  );
};


const restartTransitionAnimation =
  () => {

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
        element.style.animation =
          "none";
      }
    );


    /*
     * Force layout calculation so CSS animation
     * can restart on repeated navigation.
     */
    void transition.offsetWidth;


    animatedElements.forEach(
      (element) => {
        element.style.animation =
          "";
      }
    );
  };


const navigateToSection =
  async (target) => {

    if (navigationInProgress) {
      return;
    }


    navigationInProgress =
      true;


    restartTransitionAnimation();
    showTransition();


    /*
     * Allow overlay to become visible
     * before changing scroll position.
     */
    await wait(
      SETTINGS.transitionIn
    );


    window.scrollTo({
      top:
        getTargetPosition(target),

      behavior:
        "auto",
    });


    /*
     * Wait while coffee animation is visible.
     */
    await wait(
      SETTINGS.hiddenDuration
    );


    hideTransition();


    await wait(
      SETTINGS.transitionOut
    );


    navigationInProgress =
      false;
  };


const initAnchorNavigation =
  () => {

    const anchors =
      document.querySelectorAll(
        SELECTORS.anchor
      );


    anchors.forEach(
      (anchor) => {

        anchor.addEventListener(
          "click",
          async (event) => {

            const href =
              anchor.getAttribute(
                "href"
              );


            if (
              !href ||
              href === "#" ||
              !href.startsWith("#")
            ) {
              return;
            }


            const target =
              document.querySelector(
                href
              );


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
      }
    );
  };


const initHeaderScrollState =
  () => {

    const header =
      document.querySelector(
        SELECTORS.header
      );


    if (!header) {
      return;
    }


    let ticking =
      false;


    const update = () => {
      header.classList.toggle(
        "is-scrolled",
        window.scrollY >
          SETTINGS.headerScrollThreshold
      );

      ticking =
        false;
    };


    const handleScroll = () => {
      if (ticking) {
        return;
      }


      window.requestAnimationFrame(
        update
      );

      ticking =
        true;
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


export const initScroll = () => {
  initHeaderScrollState();
  initAnchorNavigation();
};
