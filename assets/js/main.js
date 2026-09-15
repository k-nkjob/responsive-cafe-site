/**
 * NORTH COFFEE
 * Application Entry Point
 *
 * Feature implementations live in modules/.
 * This file only coordinates initialization.
 */

import {
  initNavigation,
} from "./modules/navigation.js";

import {
  initMenu,
} from "./modules/menu.js";

import {
  initModals,
} from "./modules/modal.js";

import {
  initScroll,
} from "./modules/scroll.js";


const setCurrentYear = () => {
  const element =
    document.querySelector(
      "[data-current-year]"
    );


  if (!element) {
    return;
  }


  element.textContent =
    String(
      new Date().getFullYear()
    );
};


const initApplication = () => {
  initNavigation();

  /*
   * Menu must be initialized before
   * modal interaction starts.
   */
  initMenu();

  initModals();
  initScroll();

  setCurrentYear();
};


document.addEventListener(
  "DOMContentLoaded",
  initApplication
);
