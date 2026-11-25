# Company landing page + mini online shop
Tech: HTML, CSS, Bootstrap 3, plain JavaScript, React (no build step).
Open `home.html` in a browser. (`about.html` is the second page.) No install needed.

## What was original and what I added
Original (diploma project): 2 pages built with HTML, CSS and Bootstrap 3: navbar, hero, company section, offers, product cards, map, contact form.
Everything below was added later with JavaScript and React. The name "Ahmed" (a test name) was replaced by "Alaa Emad".

## Features I added (simple explanation of each)
### Plain JavaScript (`js/main.js`, `js/about.js`)
| Feature | How it works |
|---|---|
| Login box opens on click | Click toggles a CSS class `open` (before it only worked on hover). |
| Back-to-top button | Listens to `scroll`; shows after 300px; `scrollTo` with smooth behaviour. |
| Contact form check | Checks name, email pattern (regex) and message; shows a green/red message. No server. |
| Cart counter in navbar | Reads the saved cart from `localStorage`; updates when React fires the `cart-changed` event. |
| About page tabs | Click a tab button: show its panel, hide the others. |
| FAQ accordion | Click a question to open its answer, close the others. |
| Number counters | `IntersectionObserver` starts counting up when the numbers appear on screen. |

### React shop (`js/shop/`, one file per component)
| File | What it is |
|---|---|
| `data.js` | The list of 8 products (name, category, price, old price, rating, image). Add a product = add one object. |
| `storage.js` | Saves/loads the cart in `localStorage` (with try/catch), and calculates totals. |
| `App.js` | Main component. Holds the state (filters, cart, which popup is open) and does the filtering, sorting and cart actions. |
| `Toolbar.js` | Search box, category filter, max-price slider, sort menu, cart button. |
| `ProductCard.js` | One product card: image, stars, price, discount % (calculated), Details and Add to cart. |
| `ProductModal.js` | Details popup. Closes with X, click outside, or Esc (uses `useEffect`). |
| `CartPanel.js` | Cart drawer: change quantity (+ / -), remove, clear, total, go to checkout. |
| `Checkout.js` | Order summary + form with validation (Egyptian mobile pattern, email, address). Shows an order number. Demo only: nothing is sent. |
| `index.js` | Starts React inside `<div id="products-root">`. |

What the shop can do: search, filter by category, filter by max price, sort (price, rating, name), product details, cart with quantity change and remove, cart saved after refresh, checkout validation, order confirmation.

### Responsive polish
Extra CSS rules for phones (smaller navbar, full-width filters, full-width cart drawer) and smooth scrolling to sections.

## How to explain React honestly (short)
- A **component** is a function that returns a piece of the page (`ProductCard`).
- **State** (`useState`) is data that changes (the cart, the filters). When state changes, React redraws the page.
- **Props** are values a parent gives to a child (`App` gives `ProductCard` the product and the `onAdd` function).
- **useEffect** runs code after something changed (save the cart, listen to Esc).
- There is **no build step**: files use `React.createElement` instead of JSX, and React itself is a local file in `js/vendor/`. A bigger project would use Vite + JSX.

## Limits (be honest in an interview)
- It is a front-end demo: no server, no database, no real payment. The cart is saved only in the browser (`localStorage`).
- Product images, the logo (`img/logo.svg`) and the About banner (`img/banner.svg`) are simple SVG illustrations I generated myself. The hero banner is also an own SVG (`img/hero.svg`). The old institute and football pictures and the map embed were removed.
- Contact email (alaaalpp2015@gmail.com) is a `mailto:` link in the hero, About team tab and footers.
- Bootstrap 3 and the original layout are from the diploma project.
