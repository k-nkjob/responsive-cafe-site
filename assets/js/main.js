/**
 * NORTH COFFEE
 * Application entry point
 *
 * Individual features are initialized here.
 * Feature implementation belongs in modules/.
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
  const yearElement =
    document.querySelector(
      "[data-current-year]"
    );


  if (!yearElement) {
    return;
  }


  yearElement.textContent =
    String(
      new Date().getFullYear()
    );
};


const initApplication = () => {
  initNavigation();
  initMenu();
  initModals();
  initScroll();

  setCurrentYear();
};


document.addEventListener(
  "DOMContentLoaded",
  initApplication
);
