/**
 * NORTH COFFEE
 * Modal Module
 *
 * Responsibilities:
 * - Contact modal
 * - Menu detail modal
 * - Product visual
 * - Keyboard control
 * - Focus restoration
 */

import {
  getMenuItemById,
  MENU_EVENTS,
} from "./menu.js";


const SELECTORS = Object.freeze({
  contactModal:
    "[data-contact-modal]",

  contactOpen:
    "[data-contact-modal-open]",

  contactClose:
    "[data-contact-modal-close]",

  contactForm:
    "[data-contact-form]",

  formMessage:
    "[data-form-message]",

  menuModal:
    "[data-menu-modal]",

  menuClose:
    "[data-menu-modal-close]",

  menuContent:
    "[data-menu-modal-content]",
});


const DETAIL_LABELS =
  Object.freeze({
    roast: "Roast",
    origin: "Origin",
    taste: "Taste",
  });


const priceFormatter =
  new Intl.NumberFormat(
    "ja-JP",
    {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }
  );


let activeModal = null;

let previouslyFocusedElement =
  null;


/* =========================================================
   Shared Modal
========================================================= */

const getFocusableElements = (
  modal
) => {
  return [
    ...modal.querySelectorAll(
      [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "textarea:not([disabled])",
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(",")
    ),
  ];
};


const openModal = (modal) => {
  if (!modal) {
    return;
  }


  previouslyFocusedElement =
    document.activeElement;


  modal.classList.add(
    "is-open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "is-locked"
  );


  activeModal = modal;


  const firstFocusable =
    getFocusableElements(
      modal
    )[0];


  firstFocusable?.focus();
};


const closeModal = (modal) => {
  if (!modal) {
    return;
  }


  modal.classList.remove(
    "is-open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "is-locked"
  );


  activeModal = null;


  if (
    previouslyFocusedElement
      instanceof HTMLElement
  ) {
    previouslyFocusedElement.focus();
  }
};


/* =========================================================
   Menu Visual
========================================================= */

const createMenuVisual = (
  item
) => {
  const visual =
    document.createElement("div");


  visual.className =
    "menu-modal-visual is-placeholder";


  const symbol =
    document.createElement("span");


  symbol.className =
    "menu-modal-symbol";


  symbol.textContent =
    item.symbol ?? "N";


  visual.append(symbol);


  return visual;
};


/* =========================================================
   Menu Detail
========================================================= */

const createDetailRow = (
  label,
  value
) => {
  const row =
    document.createElement("div");


  row.className =
    "menu-modal-detail";


  const term =
    document.createElement("dt");

  term.textContent = label;


  const description =
    document.createElement("dd");

  description.textContent =
    value;


  row.append(
    term,
    description
  );


  return row;
};


const renderMenuModal = (
  container,
  item
) => {
  container.replaceChildren();


  const layout =
    document.createElement("div");


  layout.className =
    "menu-modal-layout";


  /*
   * INFORMATION
   */
  const information =
    document.createElement("div");


  information.className =
    "menu-modal-information";


  const category =
    document.createElement("p");


  category.className =
    "menu-modal-category";


  category.textContent =
    item.category.toUpperCase();


  const title =
    document.createElement("h2");


  title.id =
    "menu-modal-title";


  title.className =
    "menu-modal-title";


  title.textContent =
    item.name;


  const price =
    document.createElement("p");


  price.className =
    "menu-modal-price";


  price.textContent =
    priceFormatter.format(
      item.price
    );


  const description =
    document.createElement("p");


  description.className =
    "menu-modal-description";


  description.textContent =
    item.description;


  const details =
    document.createElement("dl");


  details.className =
    "menu-modal-details";


  Object.entries(
    item.details ?? {}
  ).forEach(
    ([key, value]) => {

      details.append(
        createDetailRow(
          DETAIL_LABELS[key] ??
            key,

          value
        )
      );
    }
  );


  information.append(
    category,
    title,
    price,
    description,
    details
  );


  /*
   * VISUAL
   *
   * Information first
   * Visual second
   * = symbol appears on right side
   */
  const visual =
    createMenuVisual(item);


  layout.append(
    information,
    visual
  );


  container.append(
    layout
  );
};


/* =========================================================
   Contact
========================================================= */

const initContactModal = () => {
  const modal =
    document.querySelector(
      SELECTORS.contactModal
    );


  const openButton =
    document.querySelector(
      SELECTORS.contactOpen
    );


  if (
    !modal ||
    !openButton
  ) {
    return;
  }


  openButton.addEventListener(
    "click",
    () => {
      openModal(modal);
    }
  );


  modal
    .querySelectorAll(
      SELECTORS.contactClose
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {
          closeModal(modal);
        }
      );
    });


  const form =
    modal.querySelector(
      SELECTORS.contactForm
    );


  const message =
    modal.querySelector(
      SELECTORS.formMessage
    );


  form?.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      if (
        !form.checkValidity()
      ) {
        form.reportValidity();

        return;
      }


      if (message) {
        message.textContent =
          "入力内容を確認しました　本フォームはデモのため送信されません";
      }
    }
  );
};


/* =========================================================
   Menu
========================================================= */

const initMenuModal = () => {
  const modal =
    document.querySelector(
      SELECTORS.menuModal
    );


  if (!modal) {
    return;
  }


  const content =
    modal.querySelector(
      SELECTORS.menuContent
    );


  if (!content) {
    return;
  }


  document.addEventListener(
    MENU_EVENTS.SELECTED,
    (event) => {

      const item =
        getMenuItemById(
          event.detail?.itemId
        );


      if (!item) {
        return;
      }


      renderMenuModal(
        content,
        item
      );


      openModal(modal);
    }
  );


  modal
    .querySelectorAll(
      SELECTORS.menuClose
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {
          closeModal(modal);
        }
      );
    });
};


/* =========================================================
   Keyboard
========================================================= */

const initKeyboard = () => {
  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        activeModal
      ) {
        closeModal(
          activeModal
        );

        return;
      }


      if (
        event.key !== "Tab" ||
        !activeModal
      ) {
        return;
      }


      const focusable =
        getFocusableElements(
          activeModal
        );


      if (
        focusable.length === 0
      ) {
        return;
      }


      const first =
        focusable[0];


      const last =
        focusable[
          focusable.length - 1
        ];


      if (
        event.shiftKey &&
        document.activeElement ===
          first
      ) {
        event.preventDefault();

        last.focus();
      }


      if (
        !event.shiftKey &&
        document.activeElement ===
          last
      ) {
        event.preventDefault();

        first.focus();
      }
    }
  );
};


/* =========================================================
   Init
========================================================= */

export const initModals = () => {
  initContactModal();
  initMenuModal();
  initKeyboard();
};
