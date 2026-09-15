/**
 * Modal module
 *
 * Responsibilities:
 * - Generic modal open / close behavior
 * - Contact modal
 * - Menu detail modal
 * - Escape key handling
 * - Basic focus restoration
 */

import {
  getMenuItemById,
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


let activeModal = null;
let previouslyFocusedElement = null;


const formatPrice = (price) => {
  return new Intl.NumberFormat(
    "ja-JP",
    {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }
  ).format(price);
};


const openModal = (modal) => {
  if (!modal) {
    return;
  }


  if (
    activeModal &&
    activeModal !== modal
  ) {
    closeModal(activeModal, false);
  }


  previouslyFocusedElement =
    document.activeElement;


  modal.classList.add("is-open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "is-locked"
  );


  activeModal = modal;


  const firstFocusable =
    modal.querySelector(
      "button, input, textarea, select, a[href]"
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


  modal.classList.remove("is-open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "is-locked"
  );


  if (activeModal === modal) {
    activeModal = null;
  }


  if (
    restoreFocus &&
    previouslyFocusedElement instanceof HTMLElement
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

  term.textContent = label;


  const description =
    document.createElement("dd");

  description.textContent = value;


  wrapper.append(
    term,
    description
  );


  return wrapper;
};


const renderMenuModal = (
  container,
  item
) => {
  container.replaceChildren();


  const category =
    document.createElement("p");

  category.className =
    "menu-modal-category";

  category.textContent =
    item.category.toUpperCase();


  const title =
    document.createElement("h2");

  title.id = "menu-modal-title";
  title.className =
    "menu-modal-title";

  title.textContent = item.name;


  const price =
    document.createElement("p");

  price.className =
    "menu-modal-price";

  price.textContent =
    formatPrice(item.price);


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
      const labels = {
        roast: "Roast",
        origin: "Origin",
        taste: "Taste",
      };


      details.append(
        createDetailRow(
          labels[key] ?? key,
          value
        )
      );
    }
  );


  container.append(
    category,
    title,
    price,
    description,
    details
  );
};


const initContactModal = () => {
  const modal =
    document.querySelector(
      SELECTORS.contactModal
    );

  const openButton =
    document.querySelector(
      SELECTORS.contactOpen
    );


  if (!modal || !openButton) {
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


      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }


      if (formMessage) {
        formMessage.textContent =
          "入力確認OK：このフォームはポートフォリオ用デモのため送信されません。";
      }
    }
  );
};


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

  const closeButtons =
    modal.querySelectorAll(
      SELECTORS.menuClose
    );


  if (!content) {
    return;
  }


  document.addEventListener(
    "menu:selected",
    (event) => {
      const itemId =
        event.detail?.itemId;


      if (!itemId) {
        return;
      }


      const item =
        getMenuItemById(itemId);


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


export const initModals = () => {
  initContactModal();
  initMenuModal();


  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        activeModal
      ) {
        closeModal(activeModal);
      }
    }
  );
};
