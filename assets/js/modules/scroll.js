/**
 * Scroll module
 *
 * Responsibilities:
 * - Header scroll state
 */

const SELECTORS = Object.freeze({
  header: "[data-header]",
});


const SCROLL_THRESHOLD = 24;


export const initScroll = () => {
  const header =
    document.querySelector(
      SELECTORS.header
    );


  if (!header) {
    return;
  }


  let ticking = false;


  const updateHeader = () => {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > SCROLL_THRESHOLD
    );

    ticking = false;
  };


  const handleScroll = () => {
    if (ticking) {
      return;
    }


    window.requestAnimationFrame(
      updateHeader
    );

    ticking = true;
  };


  updateHeader();


  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true,
    }
  );
};
