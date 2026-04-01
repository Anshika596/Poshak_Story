# 🪡 Poshak Story — Premium Indian Ethnic Fashion Store

> A fully handcrafted, multi-page e-commerce website for Indian ethnic wear, built with HTML, CSS, vanilla JavaScript, and a React-powered homepage.

---

## 📁 Project Structure

```
poshak-story/
│
├── index.html              ← Homepage (React SPA — main entry point)
├── style.css               ← Global stylesheet for all product/cart pages
├── script.js               ← Shared JS: cart logic, cursor, toast, scroll
├── data.js                 ← Product data object (CATS) used across pages
│
├── women-lehenga.html      ← Women's Lehenga collection page
├── women-lehenga-2.html    ← Alternate Lehenga page (variant)
├── women-saree.html        ← Women's Saree collection page
├── women-saree-2.html      ← Alternate Saree page (variant)
├── men-kurta.html          ← Men's Kurta collection page
├── men-suit.html           ← Men's Suit collection page
├── kids-female.html        ← Girls ethnic wear page
├── kids-male.html          ← Boys ethnic wear page
│
├── cart.html               ← Cart + multi-step checkout (Address → Payment → Confirm)
├── checkout.html           ← Standalone checkout page (alternate)
│
└── images/                 ← All product images & logo
    ├── redlehnga.png
    ├── redsaree.png
    ├── blacksuit.png
    ├── whitekurta.png
    ├── gown.png
    ├── sherwani.png
    └── Red White Minimal Calligraphy Typography Fashion Store Logo.png
```

---

## 🌟 Features

### 🏠 Homepage (`index.html`) — React SPA
- **Auto-sliding hero banner** with 3 slides, dot indicators & arrow navigation
- **Live product search** with instant dropdown results across all categories
- **User authentication** — Register / Login / Logout with localStorage persistence
- **Wishlist system** — Add/remove products, scoped per user account
- **Cart with useReducer** — Add, remove, update quantity, clear cart
- **Product detail pages** — Full product view with image, description, size selection
- **Category pages** — Lehenga, Saree, Kurta, Suit, Girls, Boys rendered as React components
- **Sale page** — Filtered view of discounted products
- **Order tracking page**
- **Size guide, Shipping & Returns pages**
- **Custom animated cursor** (red dot + ring follower)
- **Toast notification system** for cart/wishlist feedback
- **Scroll-to-top button** with visibility based on scroll position
- **Mobile hamburger menu**
- **Offer ticker / announcement bar** (animated marquee)
- **Trust badges, festive offer strip, trending categories section**

### 🛍️ Product Pages (HTML + CSS + JS)
- Consistent header with dropdown navigation across all pages
- Filter chips (category filters — UI only)
- Product cards with badge labels (Bestseller, New, Premium, etc.)
- Wishlist (♡) and Quick View (👁) action buttons
- Add to Cart button with visual feedback ("✓ Added" state)
- Shared `script.js` cart connected via `localStorage`

### 🛒 Cart & Checkout (`cart.html`)
- **3-step checkout wizard**: Cart → Address → Payment → Confirm
- Step progress bar with active/done states
- Address form with validation
- Payment options: UPI, Credit/Debit Card, Net Banking (HDFC/SBI/ICICI/Axis), Cash on Delivery
- Coupon code system (`FESTIVE30`, `SAVE20`, `POSHAK10`)
- Order summary sidebar with live price calculation
- Order confirmation screen with unique Order ID
- Free shipping logic (above ₹2,999)

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--cr` | `#b5121b` | Primary red (brand color) |
| `--gold` | `#c9922a` | Accent gold |
| `--ink` | `#1a120a` | Primary text |
| `--sand` | `#f5ede0` | Background tint |
| `--cream` | `#faf7f3` | Page background |

**Fonts used:**
- `Playfair Display` — Headings & hero text (index.html)
- `DM Sans` — Body text (index.html)
- `Cormorant Garamond` — Serif headings (product pages)
- `Jost` — Body text (product pages)

---

## 🚀 How to Run

This is a **static website** — no build tools or servers required.

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"

# Option 3: Python simple server
python -m http.server 3000
# then visit: http://localhost:3000
```

> ⚠️ Images must be in an `images/` folder in the same directory as the HTML files.

---

## 📦 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantics |
| CSS3 | Styling, animations, responsive layout |
| Vanilla JavaScript (ES5/ES6) | Cart, localStorage, DOM manipulation |
| React 18 (CDN) | Homepage SPA — components, hooks, context |
| Babel Standalone (CDN) | JSX transpilation in browser |
| Google Fonts | Typography (Playfair Display, DM Sans, Cormorant Garamond, Jost) |
| localStorage | Cart, wishlist, and user session persistence |

---

## 🔐 Auth System (Homepage)

- Users register with name + email + password
- Credentials saved to `localStorage` under key `ps_users`
- Logged-in session saved under `ps_logged_user`
- Cart and wishlist are **scoped per user email** (`ps_cart_<email>`, `ps_wl_<email>`)
- No backend — fully client-side simulation

---

## 🧩 Coupon Codes (Cart)

| Code | Discount |
|---|---|
| `FESTIVE30` | 30% off |
| `SAVE20` | 20% off |
| `POSHAK10` | 10% off |

---

## 📱 Responsive Design

- Mobile hamburger menu on homepage (React)
- Fluid grid layouts with CSS Grid and Flexbox
- `clamp()` used for fluid typography on hero headings
- Breakpoints handled via media queries in `style.css`
