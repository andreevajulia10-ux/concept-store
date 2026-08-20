"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  key: string;
  slug?: string;
  name: string;
  image: string;
  price: string;
  finish?: string;
  shade?: string;
  size?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "morrow-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Загрузка корзины из localStorage только на клиенте.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Сохранение при изменении.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem = (item: Omit<CartItem, "key">) => {
    const key = [
      item.slug ?? item.name,
      item.finish ?? "",
      item.shade ?? "",
      item.size ?? "",
    ].join("|");
    setItems((prev) => {
      const existing = prev.find((it) => it.key === key);
      if (existing) {
        return prev.map((it) =>
          it.key === key ? { ...it, qty: it.qty + item.qty } : it,
        );
      }
      return [...prev, { ...item, key }];
    });
  };

  const updateQty = (key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => it.key !== key)
        : prev.map((it) => (it.key === key ? { ...it, qty } : it)),
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((it) => it.key !== key));
  };

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, addItem, updateQty, removeItem, clear }),
    [items, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

