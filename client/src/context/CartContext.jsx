import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const DELIVERY_FEE = 2.0;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = sessionStorage.getItem("ciao_cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("ciao_cart", JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    const cartItem = {
      ...item,
      id: String(item.id),
      price: Number(item.price),
      qty: 1,
    };

    setItems((prev) => {
      const existing = prev.find((i) => String(i.id) === cartItem.id);

      if (existing) {
        return prev.map((i) =>
          String(i.id) === cartItem.id
            ? { ...i, qty: Number(i.qty) + 1 }
            : i
        );
      }

      return [...prev, cartItem];
    });
  }

  function updateQty(id, qty) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => String(i.id) !== String(id))
        : prev.map((i) =>
            String(i.id) === String(id)
              ? { ...i, qty: Number(qty) }
              : i
          )
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => String(i.id) !== String(id)));
  }

  function clearCart() {
    setItems([]);
    sessionStorage.removeItem("ciao_cart");
  }

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.qty),
    0
  );

  const total = items.length ? subtotal + DELIVERY_FEE : 0;

  const count = items.reduce((sum, i) => sum + Number(i.qty), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        subtotal,
        total,
        count,
        DELIVERY_FEE,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}