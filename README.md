# NORTH COFFEE - Responsive Cafe Website

架空のコーヒーショップ「NORTH COFFEE」を題材に制作した、レスポンシブWebサイトです。

単純な静的ページとして制作するのではなく、実際のWebサイト運用で発生する「既存ページの修正」「コンテンツ追加」「UI変更」などを想定し、保守・拡張しやすい構成を意識して実装しています。

> This README is available in both Japanese and English.  
> English version is available below.

---

## Live Demo

https://k-nkjob.github.io/responsive-cafe-site/

---

## Repository

https://github.com/k-nkjob/responsive-cafe-site

---

# 日本語

## 概要

NORTH COFFEEは、HTML / CSS / JavaScriptで制作した架空のカフェサイトです。

レスポンシブ対応だけでなく、既存サイトの改修や機能追加を想定し、HTML・CSS・JavaScriptの責務を分離しています。

JavaScriptについても、1ファイルにすべての処理を書くのではなく、メニュー表示、ナビゲーション、モーダル、スクロール処理などを機能単位で分割しています。

---

## 主な機能

- PC / タブレット / スマートフォン対応
- レスポンシブレイアウト
- 固定ヘッダー
- モバイルナビゲーション
- セクションナビゲーション
- ナビゲーション移動時のコーヒー抽出演出
- 商品カテゴリーによるフィルタリング
- JavaScriptによる商品一覧の動的生成
- 商品詳細モーダル
- お問い合わせモーダル
- フォームバリデーション
- キーボード操作への対応
- Escapeキーによるモーダル終了
- モーダル内のフォーカス制御
- スクロール状態に応じたUI制御
- OSの「視差効果を減らす」設定への対応

---

## 使用技術

### Frontend

- HTML5
- CSS3
- JavaScript
- ES Modules

### Development / Deployment

- Git
- GitHub
- GitHub Pages

フレームワークやCSSライブラリには依存せず、HTML / CSS / JavaScriptを使用して実装しています。

---

## ディレクトリ構成

```text
responsive-cafe-site/
├── index.html
├── README.md
│
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── responsive.css
    │
    └── js/
        ├── main.js
        │
        ├── data/
        │   └── menu.js
        │
        └── modules/
            ├── navigation.js
            ├── menu.js
            ├── modal.js
            └── scroll.js
````

---

## 設計方針

### 1. CSSの責務分離

CSSは用途ごとに4ファイルへ分割しています。

| File             | Responsibility             |
| ---------------- | -------------------------- |
| `base.css`       | リセット、デザイントークン、基本スタイル       |
| `layout.css`     | ページ構造、Grid、Flexbox、セクション配置 |
| `components.css` | ボタン、カード、モーダルなどのUI          |
| `responsive.css` | タブレット・スマートフォン対応            |

色や余白などはCSS Custom Propertiesを利用し、サイト全体のデザインを変更しやすい構成にしています。

---

### 2. JavaScriptの機能分割

JavaScriptも処理内容ごとにモジュール化しています。

| File                    | Responsibility   |
| ----------------------- | ---------------- |
| `main.js`               | アプリケーション初期化      |
| `data/menu.js`          | 商品データ            |
| `modules/menu.js`       | 商品一覧・フィルタリング     |
| `modules/navigation.js` | モバイルナビゲーション      |
| `modules/modal.js`      | 商品詳細・お問い合わせモーダル  |
| `modules/scroll.js`     | スクロール・セクション移動・演出 |

例えば商品の追加や価格変更は、基本的に商品データを変更するだけで一覧表示や詳細表示へ反映できる構成にしています。

---

### 3. DOMとデータの分離

商品情報をHTMLへ直接記述せず、JavaScriptのデータとして管理しています。

商品データからカードを生成し、同じデータを商品詳細モーダルでも利用します。

これにより、同じ情報を複数箇所で個別に管理する必要を減らしています。

---

### 4. 既存サイト改修を想定した実装

この作品では、完成時の見た目だけでなく、その後の仕様変更を想定しています。

例えば以下のような変更を、影響範囲を限定して対応できる構成を意識しました。

* 商品追加
* 商品カテゴリー追加
* 商品説明や価格の変更
* レスポンシブレイアウト調整
* ナビゲーション動作変更
* モーダルUI変更
* 色や余白などのデザイン変更

---

## 実装上のポイント

### 商品フィルター

商品カテゴリーを選択すると、JavaScriptで表示対象の商品を切り替えます。

商品データと表示処理を分離しているため、商品追加時にHTMLカードを個別に追加する必要はありません。

### 商品詳細モーダル

商品カードを選択すると、選択された商品のデータを取得して詳細モーダルを動的に生成します。

画像ファイルには依存せず、各商品のシンボルをビジュアルとして表示する構成にしています。

### ナビゲーション演出

ページ内ナビゲーションでは、単純なアンカージャンプではなく、コーヒーを注ぐアニメーションを表示しながら目的のセクションへ移動します。

固定ヘッダーの高さや画面サイズを考慮して、移動後の見出し位置もJavaScript側で調整しています。

### アクセシビリティ

以下の点も考慮しています。

* semantic HTML
* `aria-label`
* `aria-expanded`
* `aria-hidden`
* キーボード操作
* Escapeキーによるモーダル終了
* モーダル内のフォーカス制御
* `prefers-reduced-motion` 対応

---

## 制作目的

既存のWebサイトやWebシステムに対する、

* HTML / CSSの修正
* JavaScriptの不具合修正
* UI調整
* レスポンシブ対応
* 既存コードの解析
* 小規模な機能追加

といった業務を想定したポートフォリオとして制作しました。

---

## 注意事項

このWebサイトはポートフォリオ用の自主制作物です。

NORTH COFFEEは架空の店舗であり、実在する店舗・企業とは関係ありません。

お問い合わせフォームもUIデモであり、実際の送信処理は行われません。

---

# English

## Overview

NORTH COFFEE is a responsive fictional cafe website built with HTML, CSS, and JavaScript.

The project was designed not only as a static website, but also with maintainability and future modifications in mind.

HTML, CSS, application data, and JavaScript behavior are separated by responsibility so that individual parts of the website can be modified without unnecessarily affecting unrelated features.

---

## Features

* Responsive desktop, tablet, and mobile layouts
* Fixed header
* Mobile navigation
* Section navigation
* Coffee brewing transition animation
* Menu category filtering
* Dynamic menu rendering with JavaScript
* Menu detail modal
* Contact modal
* Form validation
* Keyboard interaction
* Escape-key modal closing
* Modal focus management
* Scroll-based UI behavior
* Reduced-motion support

---

## Technologies

### Frontend

* HTML5
* CSS3
* JavaScript
* ES Modules

### Development / Deployment

* Git
* GitHub
* GitHub Pages

The website is implemented without frontend frameworks or CSS libraries.

---

## Project Structure

```text
responsive-cafe-site/
├── index.html
├── README.md
│
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── responsive.css
    │
    └── js/
        ├── main.js
        │
        ├── data/
        │   └── menu.js
        │
        └── modules/
            ├── navigation.js
            ├── menu.js
            ├── modal.js
            └── scroll.js
```

---

## Architecture

### CSS Separation

CSS is separated by responsibility.

| File             | Responsibility                                     |
| ---------------- | -------------------------------------------------- |
| `base.css`       | Reset, design tokens, and global styles            |
| `layout.css`     | Page structure, Grid, Flexbox, and section layouts |
| `components.css` | Buttons, cards, modals, and UI components          |
| `responsive.css` | Tablet and mobile adjustments                      |

CSS Custom Properties are used for colors, spacing, sizing, and other reusable design values.

This makes global design changes easier to manage.

---

### JavaScript Modules

JavaScript is divided into feature-specific modules.

| File                    | Responsibility                                 |
| ----------------------- | ---------------------------------------------- |
| `main.js`               | Application initialization                     |
| `data/menu.js`          | Menu master data                               |
| `modules/menu.js`       | Menu rendering and filtering                   |
| `modules/navigation.js` | Mobile navigation                              |
| `modules/modal.js`      | Menu and contact modals                        |
| `modules/scroll.js`     | Scrolling, section navigation, and transitions |

This structure keeps feature logic separated and reduces unnecessary dependencies between components.

---

### Data-Driven Menu

Menu information is stored separately from the HTML.

Menu cards and menu detail content are generated from the same JavaScript data.

As a result, adding a new menu item or changing a price does not require manually updating multiple sections of HTML.

---

### Maintainability

The project was structured with future website modifications in mind.

Examples include:

* Adding menu items
* Adding menu categories
* Changing prices or descriptions
* Adjusting responsive layouts
* Modifying navigation behavior
* Updating modal UI
* Changing global colors or spacing

The goal is to keep the scope of each modification as small and predictable as possible.

---

## Implementation Highlights

### Menu Filtering

Selecting a category dynamically changes the displayed menu items.

The menu data is separated from the rendering logic, so additional menu items can be introduced without manually creating new HTML cards.

### Menu Detail Modal

Selecting a menu item retrieves its corresponding data and dynamically renders the detail modal.

The visual design uses a product symbol rather than relying on external image assets.

### Navigation Transition

Internal navigation uses a custom coffee brewing animation instead of a simple anchor jump.

The destination position is calculated dynamically while accounting for the fixed header and viewport size.

### Accessibility

The project also considers:

* Semantic HTML
* `aria-label`
* `aria-expanded`
* `aria-hidden`
* Keyboard interaction
* Escape-key modal closing
* Modal focus management
* `prefers-reduced-motion`

---

## Purpose

This project was created as a portfolio piece demonstrating skills relevant to maintaining and modifying existing websites, including:

* HTML / CSS modifications
* JavaScript bug fixes
* UI adjustments
* Responsive design
* Existing code analysis
* Small feature additions

---

## Disclaimer

This is a self-initiated portfolio project.

NORTH COFFEE is a fictional coffee shop and is not associated with any real company or business.

The contact form is a UI demonstration and does not submit data.

---

## Author

GitHub: `k-nkjob`

```

### これでREADMEとして十分強いです

特に重要なのは、単に「カフェサイトを作りました」ではなく、

**「既存コードを修正しやすいように責務分離している」**

という説明を入れていることです。これは今回CrowdWorksで取りたい「既存サイト修正・バグ修正・機能追加」とかなり相性がいいです。

GitHub上で保存するときのCommit messageは、

`Complete bilingual project documentation`

でOKです。

READMEを保存したら、次は**メインポートフォリオ `k-nkjob.github.io` の Work 01 を `Completed` にして、Live DemoとGitHub Repositoryの2ボタンを付ける**ところまでやれば、Work #1は完全終了です。 
