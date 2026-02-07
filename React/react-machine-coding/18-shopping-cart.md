# 18 – Shopping Cart

## Problem

Build a **shopping cart**: list of items (name, price, quantity); update quantity (inc/dec or input); remove item; show subtotal and optional tax/total; persist or load from mock.

## Requirements

- **Items:** Each row: name, price, quantity (with +/− or input), line total (price × qty), remove button.
- **Quantity:** Min 1 (or 0 and remove when 0); max optional (e.g. stock).
- **Subtotal:** Sum of (price × quantity) for all items. Optional: tax %, total = subtotal + tax.
- **Empty state:** When no items, show “Cart is empty” and optional “Continue shopping”.
- **Optional:** Add to cart from a product list; persist cart in localStorage.

## Approach / Hints

- **State:** `cart: Array<{ id, name, price, quantity }>`. Update quantity: find by id, replace with { ...item, quantity: item.quantity + 1 } or -1 (if 0, filter out). Remove: filter by id.
- **Subtotal:** `cart.reduce((sum, i) => sum + i.price * i.quantity, 0)`. Total = subtotal * (1 + taxRate).
- **Add to cart:** From product list, add item (id, name, price, quantity: 1) or if exists increment quantity.
- **localStorage:** useEffect to load on mount; useEffect to save when cart changes.

## Component structure (suggestion)

- `Cart` – state cart; render CartItem list; subtotal/total; empty state.
- `CartItem` – item; quantity controls; remove; emit onQuantityChange, onRemove.
- Optional `ProductList` + add to cart.

## React concepts tested

- useState (array of items), immutable updates.
- reduce for totals.
- List with keys, callbacks for update/remove.
