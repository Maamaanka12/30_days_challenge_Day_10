# Vault — Premium E-Commerce

A modern, dark-themed e-commerce frontend built for the **30-Day Coding Challenge** (Day 10). Vault presents a curated catalog of hand-picked products across electronics, fashion, home, beauty, and sports — all with a frictionless shopping experience powered by client-side JavaScript.

## Live Demo

Open `index.html` in your browser to explore the site. No server required.

## Features

- **Responsive grid layouts** — CSS Grid + Flexbox, mobile-first with breakpoints at 860px
- **Dark premium theme** — Radial gradient background, soft panel surfaces, accent color accents
- **3-page experience**:
  - **Home** — Hero banner, category cards, featured products
  - **Shop** — Full catalog with live search, category filter, and multi-sort (price / rating)
  - **Categories** — Products organized into grouped category sections
- **Client-side cart** — Add, remove, adjust quantity; persists in `localStorage`
- **Product quick-view modal** — Detailed view with image, description, rating, and add-to-cart
- **Toast notifications** — Non-blocking feedback for add-to-cart and actions
- **Search & filter** — Real-time product filtering by name, category, and sort order
- **Keyboard / mouse-friendly** — Hover lift, focus styles, accessible buttons

## Project Structure

```
day-10/
├── index.html          # Homepage — hero, categories, featured products
├── shop.html           # Shop page — search, filter, full product grid
├── categories.html     # Categories page — products grouped by category
├── app.js              # Shared JavaScript — cart, modal, filtering, rendering
├── styles.css          # Shared stylesheet — dark theme, components, layout
└── img/                # Product, hero, and category images
```

## Tech Stack

| Layer        | Technology |
|-------------|------------|
| Structure   | HTML5, semantic elements |
| Styling     | CSS3 (Grid, Flexbox, CSS variables, `clamp()`, `backdrop-filter`) |
| Interactivity | Vanilla JavaScript (ES6+), no frameworks |
| Persistence | `localStorage` for cart |
| Fonts       | Inter (system-ui fallback) |

## Key Components

### Cart System (`app.js`)
```js
// Products stored as a static array — lightweight and fast for a demo
const PRODUCTS = [...12 items with id, name, category, price, rating, image, desc];

// Cart persists across sessions via localStorage
const CART_KEY = "ecom_cart_v1";
```
Operations: `addToCart`, `removeFromCart`, `changeQty`, `updateCartUI`, `renderCartItems`

### Product Rendering
Reusable card generation via `productCard(p)` — used across home, shop, categories, and modal views.

### Filtering & Search
- Real-time search on `input` event
- Category + sort dropdowns on `change` event
- URL query support (`?category=...`, `?q=...`) for shareable filtered views

## Design System

| Variable       | Value        |
|---------------|-------------|
| `--bg`         | `#0b0b0f` (page background) |
| `--bg-2`       | `#14141c` (secondary surface) |
| `--panel`      | `#1b1b26` (card background) |
| `--accent`     | `#ff6b35` (primary accent / CTA) |
| `--text`       | `#f5f5f7` (primary text) |
| `--muted`      | `#a1a1aa` (secondary text) |
| `--radius`     | `18px` (border radius) |

## Getting Started

No build step, no dependencies — just open the HTML files directly:

```bash
# Option 1: Direct file open
open index.html

# Option 2: Quick local server (optional, for image loading)
npx serve .
# or
python -m http.server 8000
```

## Built With

- Zero external libraries — pure HTML, CSS, and JavaScript
- No build tools or package managers required
- Images used as placeholder asset paths (`img/product-*.jpg`, `img/category-*.jpg`)

---

Part of a [30-day coding challenge](https://github.com/abdirahman-dev/30-days-coding) — Day 10.
