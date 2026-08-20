"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/shop";
import { useCart } from "@/components/cart-context";

type Panel = "search" | "cart" | null;

export default function HeaderActions() {
  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const { items, count, updateQty, removeItem } = useCart();

  // Закрытие по Esc
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  // Закрытие по клику снаружи
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setPanel(null);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [panel]);

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  const toggle = (p: Panel) => setPanel((cur) => (cur === p ? null : p));

  return (
    <div ref={rootRef} className="relative flex items-center gap-[20px]">
      {/* Кнопка Поиск */}
      <button
        type="button"
        onClick={() => toggle("search")}
        className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[16px] leading-[20px] hover:opacity-60"
      >
        Search
      </button>

      <Link
        href="/#journal"
        className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[16px] leading-[20px] hover:opacity-60"
      >
        Journal
      </Link>

      {/* Кнопка Корзина */}
      <button
        type="button"
        onClick={() => toggle("cart")}
        className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[16px] leading-[20px] hover:opacity-60"
      >
        Cart ({count})
      </button>

      {/* ===== Панель поиска ===== */}
      {panel === "search" && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col bg-[#fafaf9]">
          <div className="flex h-[60px] w-full items-center justify-between border-b-[0.8px] border-[#4a0a05] px-[72px]">
            <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              Search
            </span>
            <button
              type="button"
              aria-label="Закрыть поиск"
              onClick={() => setPanel(null)}
              className="flex cursor-pointer items-center gap-[8px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
            >
              Close
              <svg viewBox="0 0 11 11" width="11" height="11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L10 10M10 1L1 10" stroke="#4A0A05" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex w-full flex-col px-[72px] pt-[120px]">
            <div className="flex w-full max-w-[1392px] items-center border-b-[0.8px] border-[#4a0a05] pb-[12px]">
              <span className="mr-[20px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] opacity-50">
                Search
              </span>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search the collection"
                className="w-full bg-transparent font-['Questrial'] text-[26px] leading-[31.2px] text-[#4a0a05] outline-none placeholder:text-[#4a0a05] placeholder:opacity-40"
              />
            </div>
          </div>

          <div className="w-full flex-1 overflow-y-auto px-[72px] pt-[40px]">
            {results.length > 0 ? (
              <div className="grid w-full max-w-[1392px] grid-cols-3 gap-[12px]">
                {results.map((p) => (
                  <Link
                    key={p.name}
                    href={p.slug ? `/product/${p.slug}` : "/shop"}
                    onClick={() => setPanel(null)}
                    className="group flex flex-col"
                  >
                    <div className="relative h-[420px] w-full overflow-clip bg-[#e9e4dc]">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
                    </div>
                    <div className="mt-[14px] flex flex-col">
                      <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                        {p.name}
                      </span>
                      <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] opacity-60">
                        {p.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex w-full max-w-[1392px] items-center justify-between border-t-[0.8px] border-[#4a0a05] pt-[16px]">
                <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                  {query.trim() ? "No results found." : "Popular searches"}
                </span>
                {!query.trim() && (
                  <div className="flex gap-[24px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                    <Link href="/shop" onClick={() => setPanel(null)} className="cursor-pointer hover:opacity-60">Chandeliers</Link>
                    <Link href="/shop" onClick={() => setPanel(null)} className="cursor-pointer hover:opacity-60">Pendants</Link>
                    <Link href="/shop" onClick={() => setPanel(null)} className="cursor-pointer hover:opacity-60">Table Lamps</Link>
                    <Link href="/shop" onClick={() => setPanel(null)} className="cursor-pointer hover:opacity-60">Floor Lamps</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== Панель корзины ===== */}
      {panel === "cart" && (
        <>
          <div
            className="fixed inset-0 z-40 bg-[#4a0a05] opacity-20"
            onClick={() => setPanel(null)}
          />
          <div className="fixed right-0 top-0 z-50 flex h-full w-[430px] flex-col border-l-[0.8px] border-[#4a0a05] bg-[#fafaf9]">
            <div className="flex items-center justify-between border-b-[0.8px] border-[#4a0a05] py-[18px] pl-[20px] pr-[12px]">
              <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                Cart ({count})
              </span>
              <button
                type="button"
                aria-label="Закрыть корзину"
                onClick={() => setPanel(null)}
                className="flex cursor-pointer items-center p-2 text-[#4a0a05] hover:opacity-60"
              >
                <svg viewBox="0 0 11 11" width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L10 10M10 1L1 10" stroke="#4A0A05" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-[20px] px-[40px] text-center">
                <span className="font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">
                  Your cart is currently empty
                </span>
                <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] opacity-60">
                  Add something beautiful to your space.
                </span>
                <Link
                  href="/shop"
                  onClick={() => setPanel(null)}
                  className="mt-[10px] flex h-[32px] cursor-pointer items-center justify-center border-[0.8px] border-[#4a0a05] px-[24px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
                >
                  Shop All
                </Link>
              </div>
            ) : (
              <div className="flex flex-1 flex-col overflow-y-auto px-[20px] py-[16px]">
                {items.map((it) => (
                  <div
                    key={it.key}
                    className="flex gap-[12px] border-b-[0.8px] border-[#4a0a05] py-[16px]"
                  >
                    <div className="relative h-[110px] w-[88px] shrink-0 overflow-clip bg-[#e9e4dc]">
                      <Image src={it.image} alt={it.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-[8px]">
                        <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                          {it.name}
                        </span>
                        <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                          {it.price}
                        </span>
                      </div>
                      {[it.finish, it.shade, it.size]
                        .filter(Boolean)
                        .length > 0 && (
                        <span className="font-['Questrial'] text-[12px] leading-[14.4px] text-[#4a0a05] opacity-60">
                          {[it.finish, it.shade, it.size].filter(Boolean).join(" · ")}
                        </span>
                      )}
                      <div className="mt-[10px] flex items-center justify-between">
                        <div className="flex items-center border-[0.8px] border-[#4a0a05]">
                          <button
                            type="button"
                            aria-label="Уменьшить количество"
                            onClick={() => updateQty(it.key, it.qty - 1)}
                            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center font-['Questrial'] text-[14px] text-[#4a0a05] hover:opacity-60"
                          >
                            −
                          </button>
                          <span className="flex h-[24px] w-[28px] items-center justify-center font-['Questrial'] text-[14px] text-[#4a0a05]">
                            {it.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Увеличить количество"
                            onClick={() => updateQty(it.key, it.qty + 1)}
                            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center font-['Questrial'] text-[14px] text-[#4a0a05] hover:opacity-60"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(it.key)}
                          className="cursor-pointer font-['Questrial'] text-[12px] leading-[14.4px] text-[#4a0a05] underline hover:opacity-60"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="flex flex-col border-t-[0.8px] border-[#4a0a05] px-[20px] py-[16px]">
                <div className="flex items-center justify-between">
                  <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                    Subtotal
                  </span>
                  <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-[14px] flex h-[40px] w-full cursor-pointer items-center justify-center border-[0.8px] border-[#4a0a05] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

