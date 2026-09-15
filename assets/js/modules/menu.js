/**
 * Menu UI module
 *
 * Responsibilities:
 * - Render category filters
 * - Render menu cards
 * - Filter menu items
 * - Dispatch menu selection event
 */

import {
  menuItems,
  MENU_CATEGORIES,
  CATEGORY_LABELS,
} from "../data/menu.js";


const SELECTORS = Object.freeze({
  filterContainer: "[data-menu-filters]",
  menuList: "[data-menu-list]",
});


const EVENTS = Object.freeze({
  menuSelected: "menu:selected",
});


const formatPrice = (price) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(price);
};


const createFilterButton = (
  category,
  activeCategory
) => {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "filter-button";

  button.dataset.category = category;

  button.textContent =
    CATEGORY_LABELS[category] ?? category.toUpperCase();

  const isActive = category === activeCategory;

  button.classList.toggle("is-active", isActive);

  button.setAttribute(
    "aria-pressed",
    String(isActive)
  );

  return button;
};


const createMenuCard = (item) => {
  const article = document.createElement("article");

  article.className = "menu-card";
  article.dataset.menuId = item.id;

  const button = document.createElement("button");

  button.type = "button";
  button.className = "menu-card-button";

  button.setAttribute(
    "aria-label",
    `${item.name}の詳細を見る`
  );


  const visual = document.createElement("div");

  visual.className = "menu-card-visual";

  const symbol = document.createElement("span");

  symbol.className = "menu-card-symbol";
  symbol.textContent = item.symbol;

  visual.append(symbol);


  const content = document.createElement("div");

  content.className = "menu-card-content";


  const meta = document.createElement("div");

  meta.className = "menu-card-meta";


  const category = document.createElement("span");

  category.className = "menu-card-category";

  category.textContent =
    CATEGORY_LABELS[item.category] ??
    item.category.toUpperCase();


  const price = document.createElement("span");

  price.className = "menu-card-price";
  price.textContent = formatPrice(item.price);


  meta.append(category, price);


  const title = document.createElement("h3");

  title.textContent = item.name;


  const description = document.createElement("p");

  description.className =
    "menu-card-description";

  description.textContent =
    item.description;


  content.append(
    meta,
    title,
    description
  );


  button.append(
    visual,
    content
  );


  button.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent(EVENTS.menuSelected, {
        detail: {
          itemId: item.id,
        },
      })
    );
  });


  article.append(button);

  return article;
};


const getCategories = () => {
  return [
    MENU_CATEGORIES.ALL,
    ...new Set(
      menuItems.map((item) => item.category)
    ),
  ];
};


const filterItems = (category) => {
  if (category === MENU_CATEGORIES.ALL) {
    return menuItems;
  }

  return menuItems.filter(
    (item) => item.category === category
  );
};


export const getMenuItemById = (id) => {
  return menuItems.find(
    (item) => item.id === id
  ) ?? null;
};


export const initMenu = () => {
  const filterContainer =
    document.querySelector(
      SELECTORS.filterContainer
    );

  const menuList =
    document.querySelector(
      SELECTORS.menuList
    );


  if (!filterContainer || !menuList) {
    return;
  }


  let activeCategory =
    MENU_CATEGORIES.ALL;


  const renderMenu = () => {
    const items =
      filterItems(activeCategory);

    menuList.replaceChildren();


    if (items.length === 0) {
      const emptyMessage =
        document.createElement("p");

      emptyMessage.className =
        "menu-empty";

      emptyMessage.textContent =
        "該当するメニューはありません。";

      menuList.append(emptyMessage);

      return;
    }


    const fragment =
      document.createDocumentFragment();


    items.forEach((item) => {
      fragment.append(
        createMenuCard(item)
      );
    });


    menuList.append(fragment);
  };


  const renderFilters = () => {
    filterContainer.replaceChildren();


    getCategories().forEach(
      (category) => {
        const button =
          createFilterButton(
            category,
            activeCategory
          );


        button.addEventListener(
          "click",
          () => {
            if (
              activeCategory === category
            ) {
              return;
            }


            activeCategory = category;

            renderFilters();
            renderMenu();
          }
        );


        filterContainer.append(button);
      }
    );
  };


  renderFilters();
  renderMenu();
};
