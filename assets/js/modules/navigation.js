/**
 * NORTH COFFEE
 * Navigation Module
 *
 * Responsibilities:
 * - Mobile menu open / close
 * - aria state synchronization
 * - Escape key support
 * - Close after navigation
 */

const SELECTORS = Object.freeze({
  navigation:
    "[data-navigation]",

  toggle:
    "[data-nav-toggle]",
});


const MOBILE_BREAKPOINT =
  768;


export const initNavigation =
  () => {

    const navigation =
      document.querySelector(
        SELECTORS.navigation
      );

    const toggle =
      document.querySelector(
        SELECTORS.toggle
      );


    if (
      !navigation ||
      !toggle
    ) {
      return;
    }


    const setState = (
      isOpen
    ) => {
      navigation.classList.toggle(
        "is-open",
        isOpen
      );

      toggle.classList.toggle(
        "is-active",
        isOpen
      );

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      toggle.setAttribute(
        "aria-label",
        isOpen
          ? "メニューを閉じる"
          : "メニューを開く"
      );

      document.body.classList.toggle(
        "is-locked",
        isOpen
      );
    };


    const close = () => {
      setState(false);
    };


    toggle.addEventListener(
      "click",
      () => {
        const isOpen =
          toggle.getAttribute(
            "aria-expanded"
          ) === "true";

        setState(!isOpen);
      }
    );


    navigation.addEventListener(
      "click",
      (event) => {
        const link =
          event.target.closest("a");

        if (!link) {
          return;
        }

        close();
      }
    );


    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape"
        ) {
          close();
        }
      }
    );


    window.addEventListener(
      "resize",
      () => {
        if (
          window.innerWidth >
          MOBILE_BREAKPOINT
        ) {
          close();
        }
      }
    );
  };
