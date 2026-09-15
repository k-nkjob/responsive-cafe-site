/**
 * NORTH COFFEE
 * menu.js
 *
 * Menu master data.
 *
 * UI rendering logic must not be placed in this file.
 */

export const MENU_CATEGORIES = Object.freeze({
  ALL: "all",
  COFFEE: "coffee",
  LATTE: "latte",
  SEASONAL: "seasonal",
});


export const CATEGORY_LABELS = Object.freeze({
  [MENU_CATEGORIES.ALL]: "ALL",
  [MENU_CATEGORIES.COFFEE]: "COFFEE",
  [MENU_CATEGORIES.LATTE]: "LATTE",
  [MENU_CATEGORIES.SEASONAL]: "SEASONAL",
});


export const menuItems = Object.freeze([
  {
    id: "house-blend",
    name: "House Blend",
    category: MENU_CATEGORIES.COFFEE,
    price: 520,
    symbol: "H",
    description:
      "チョコレートのような甘さと、やわらかな余韻を楽しめる定番ブレンド。",
    details: {
      roast: "Medium",
      origin: "Brazil / Colombia",
      taste: "Chocolate / Nuts / Caramel",
    },
  },

  {
    id: "single-origin",
    name: "Single Origin",
    category: MENU_CATEGORIES.COFFEE,
    price: 620,
    symbol: "S",
    description:
      "季節ごとに豆を選定。産地ならではの香りと個性を楽しめます。",
    details: {
      roast: "Light - Medium",
      origin: "Seasonal Selection",
      taste: "Fruit / Floral / Clean",
    },
  },

  {
    id: "cold-brew",
    name: "Cold Brew",
    category: MENU_CATEGORIES.COFFEE,
    price: 580,
    symbol: "C",
    description:
      "時間をかけて低温抽出した、すっきりとした口当たりのコーヒー。",
    details: {
      roast: "Medium - Dark",
      origin: "Blend",
      taste: "Cocoa / Smooth / Clean",
    },
  },

  {
    id: "cafe-latte",
    name: "Cafe Latte",
    category: MENU_CATEGORIES.LATTE,
    price: 600,
    symbol: "L",
    description:
      "エスプレッソとミルクの甘さをバランスよく仕上げた定番ラテ。",
    details: {
      roast: "Dark",
      origin: "Espresso Blend",
      taste: "Milk / Caramel / Cocoa",
    },
  },

  {
    id: "maple-latte",
    name: "Maple Latte",
    category: MENU_CATEGORIES.LATTE,
    price: 650,
    symbol: "M",
    description:
      "メープルの穏やかな甘さを加えた、香り豊かなカフェラテ。",
    details: {
      roast: "Dark",
      origin: "Espresso Blend",
      taste: "Maple / Milk / Caramel",
    },
  },

  {
    id: "autumn-blend",
    name: "Autumn Blend",
    category: MENU_CATEGORIES.SEASONAL,
    price: 680,
    symbol: "A",
    description:
      "秋をイメージした、深い甘さとスパイス感のある季節限定ブレンド。",
    details: {
      roast: "Medium - Dark",
      origin: "Seasonal Blend",
      taste: "Brown Sugar / Spice / Cocoa",
    },
  },
]);
