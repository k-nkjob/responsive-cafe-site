/**
 * NORTH COFFEE
 * Modal Module
 *
 * Responsibilities:
 * - Shared modal behavior
 * - Contact modal
 * - Menu detail modal
 * - Menu image rendering
 * - Image fallback
 * - Escape key handling
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


let activeModal =
  null;

let previouslyFocusedElement =
  null;


const formatPrice = (
  price
) => {
  return priceFormatter.format(
    price
  );
};


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


const openModal = (
  modal
) => {
  if (!modal) {
    return;
  }


  if (
    activeModal &&
    activeModal !== modal
  ) {
    closeModal(
      activeModal,
      false
    );
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


  activeModal =
    modal;


  const [
    firstFocusable,
  ] =
    getFocusableElements(
      modal
    );


  firstFocusable?.focus();
};


const closeModal = (
  modal,
  restoreFocus = true
) => {
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


  if (
    activeModal === modal
  ) {
    activeModal =
      null;

    document.body.classList.remove(
      "is-locked"
    );
  }


  if (
    restoreFocus &&
    previouslyFocusedElement
      instanceof HTMLElement
  ) {
    previouslyFocusedElement.focus();
  }
};


const createDetailRow = (
  label,
  value
) => {
  const wrapper =
    document.createElement("div");

  wrapper.className =
    "menu-modal-detail";


  const term =
    document.createElement("dt");

  term.textContent =
    label;


  const description =
    document.createElement("dd");

  description.textContent =
    value;


  wrapper.append(
    term,
    description
  );


  return wrapper;
};


const createMenuVisual = (
  item
) => {
  const visual =
    document.createElement("div");

  visual.className =
    "menu-modal-visual";


  const showFallback = () => {
    visual.replaceChildren();

    visual.classList.add(
      "is-placeholder"
    );

    visual.textContent =
      item.symbol ?? "N";
  };


  if (!item.image) {
    showFallback();

    return visual;
  }


  const image =
    document.createElement("img");


  image.src =
    item.image;

  image.alt =
    `${item.name}のイメージ`;

  image.loading =
    "lazy";

  image.decoding =
    "async";


  image.addEventListener(
    "error",
    showFallback,
    {
      once: true,
    }
  );


  visual.append(image);


  return visual;
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


  const visual =
    createMenuVisual(item);


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
    formatPrice(
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


  layout.append(
    visual,
    information
  );


  container.append(
    layout
  );
};


const initContactModal =
  () => {

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


    const closeButtons =
      modal.querySelectorAll(
        SELECTORS.contactClose
      );

    const form =
      modal.querySelector(
        SELECTORS.contactForm
      );

    const formMessage =
      modal.querySelector(
        SELECTORS.formMessage
      );


    openButton.addEventListener(
      "click",
      () => {
        openModal(modal);
      }
    );


    closeButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {
            closeModal(modal);
          }
        );
      }
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


        if (formMessage) {
          formMessage.textContent =
            "入力内容を確認しました　本フォームはデモのため送信されません";
        }
      }
    );
  };


const initMenuModal =
  () => {

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

    const closeButtons =
      modal.querySelectorAll(
        SELECTORS.menuClose
      );


    if (!content) {
      return;
    }


    document.addEventListener(
      MENU_EVENTS.SELECTED,
      (event) => {

        const itemId =
          event.detail?.itemId;


        if (!itemId) {
          return;
        }


        const item =
          getMenuItemById(
            itemId
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


    closeButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {
            closeModal(modal);
          }
        );
      }
    );
  };


const initKeyboardHandling =
  () => {

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

          return;
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


export const initModals =
  () => {

    initContactModal();
    initMenuModal();
    initKeyboardHandling();
  };
