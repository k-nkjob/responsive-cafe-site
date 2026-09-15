/**
 * Navigation module
 *
 * Responsibilities:
 * - Mobile navigation toggle
 * - aria-expanded synchronization
 * - Body scroll lock
 * - Close navigation after link selection
 */

const SELECTORS = Object.freeze({
  navigation: "[data-navigation]",
  toggle: "[data-nav-toggle]",
});


export const initNavigation = () => {
  const navigation =
    document.querySelector(
      SELECTORS.navigation
    );

  const toggle =
    document.querySelector(
      SELECTORS.toggle
    );


  if (!navigation || !toggle) {
    return;
  }


  const setNavigationState = (
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


  const closeNavigation = () => {
    setNavigationState(false);
  };


  toggle.addEventListener(
    "click",
    () => {
      const isOpen =
        toggle.getAttribute(
          "aria-expanded"
        ) === "true";

      setNavigationState(!isOpen);
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

      closeNavigation();
    }
  );


  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 768) {
        closeNavigation();
      }
    }
  );


  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeNavigation();
      }
    }
  );
};
