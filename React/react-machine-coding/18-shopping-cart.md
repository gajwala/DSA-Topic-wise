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

## Solution

```jsx
import { useState } from 'react';

const initialCart = [
  { id: 1, name: 'Apple', price: 1.5, quantity: 2 },
  { id: 2, name: 'Bread', price: 2.0, quantity: 1 },
];

function Cart() {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };
  const remove = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cart.length === 0) return <p>Cart is empty.</p>;

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((item) => (
          <li key={item.id} style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <span>
              <button onClick={() => updateQty(item.id, -1)}>−</button>
              {item.quantity}
              <button onClick={() => updateQty(item.id, 1)}>+</button>
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax (10%): ${tax.toFixed(2)}</p>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}

export default Cart;
```

## React concepts tested

- useState (array of items), immutable updates.
- reduce for totals.
- List with keys, callbacks for update/remove.
