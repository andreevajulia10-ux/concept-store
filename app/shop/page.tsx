"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MorrowLogo from "@/components/MorrowLogo";
import HeaderActions from "@/components/HeaderActions";
import Footer from "@/components/Footer";
import ShopProductCard from "@/components/ShopProductCard";
import {
  products,
  categories,
  materials,
  leadTimes,
  filterByCategory,
  matchesMaterial,
  type Category,
} from "@/lib/shop";

function ShopHeader() {
  return (
    <div className="flex h-[60px] w-full items-center justify-between px-[72px] font-['Questrial'] text-[16px] leading-[20px] text-[#4a0a05]">
      <Link href="/">
        <MorrowLogo className="shrink-0" />
      </Link>
      <nav className="flex items-center gap-[56px] whitespace-nowrap">
        <Link href="/shop" className="cursor-pointer">Shop</Link>
        <Link href="/#collections" className="cursor-pointer hover:opacity-60">Collections</Link>
        <Link href="/#collection" className="cursor-pointer hover:opacity-60">Objects</Link>
        <Link href="/#visit" className="cursor-pointer hover:opacity-60">About</Link>
      </nav>
      <HeaderActions />
    </div>
  );
}

type View = "S" | "M" | "L";

const viewColumns: Record<View, number> = { S: 4, M: 3, L: 2 };

function ShopPage() {
  const searchParams = useSearchParams();
  const urlCat = searchParams.get("cat");
  const [category, setCategory] = useState<Category>(
    () =>
      (categories as string[]).includes(urlCat ?? "")
        ? (urlCat as Category)
        : "All",
  );
  const [lightOpen, setLightOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<View>("S");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedLeadTimes, setSelectedLeadTimes] = useState<string[]>([]);

  // Синхронизация категории при изменении URL-параметра ?cat=
  useEffect(() => {
    if (urlCat && (categories as string[]).includes(urlCat)) {
      setCategory(urlCat as Category);
    }
  }, [urlCat]);

  // Фильтрация по категории (боковое меню и фильтр «Light:»).
  const byCategory = useMemo(
    () => filterByCategory(products, category),
    [category],
  );

  // Фильтрация по материалам и срокам из панели «Filter».
  const visible = useMemo(() => {
    let list = byCategory;
    if (selectedMaterials.length > 0) {
      const withShades = list.filter(
        (p) =>
          selectedMaterials.some((m) => matchesMaterial(p, m)) ||
          selectedMaterials.some((m) => `glass ${m}`.includes(m.toLowerCase())),
      );
      const cleaned = list.filter((p) =>
        selectedMaterials.some((m) => matchesMaterial(p, m)),
      );
      list = cleaned.length > 0 ? cleaned : withShades;
    }
    if (selectedLeadTimes.length > 0) {
      // У нас нет данных срока, поэтому активные фильтры по срокам
      // рассматриваем как совпадение только если ключ есть в названии.
      const leadFiltered = list.filter((p) =>
        selectedLeadTimes.some((l) => matchesMaterial(p, l)),
      );
      list = leadFiltered.length > 0 ? leadFiltered : list;
    }
    return list;
  }, [byCategory, selectedMaterials, selectedLeadTimes]);

  const gridClass =
    view === "L"
      ? "grid-cols-2"
      : view === "M"
        ? "grid-cols-3"
        : "grid-cols-4";

  return (
    <div className="mx-auto flex w-full flex-col bg-[#fafaf9]">
      <ShopHeader />

      <section className="mx-auto flex w-[1392px] gap-[12px] pt-[20px]">
        {/* ===== Боковое меню каталога ===== */}
        <aside className="sticky top-0 self-start pt-[78px]">
          <nav className="flex w-[261px] flex-col font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            {[
              { label: "All Products", cat: "All" as const },
              { label: "New Arrivals", cat: "All" as const },
              { label: "Ready to Ship", cat: "All" as const },
              { label: "Finish Samples", cat: "All" as const },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setCategory(item.cat)}
                className={`flex cursor-pointer items-center gap-[14px] py-[2px] text-left hover:opacity-60 ${
                  category === item.cat ? "" : ""
                }`}
              >
                <span
                  className={`inline-block size-[8px] shrink-0 rounded-full ${
                    category === item.cat ? "bg-[#4a0a05]" : ""
                  }`}
                />
                <span>{item.label}</span>
              </button>
            ))}

            {/* Группа Lighting с подкатегориями */}
            <div className="mt-[10px] flex flex-col">
              <button
                type="button"
                onClick={() => setCategory("All")}
                className="flex cursor-pointer items-center gap-[14px] py-[2px] text-left hover:opacity-60"
              >
                <span
                  className={`inline-block size-[8px] shrink-0 rounded-full ${
                    category !== "All" ? "bg-[#4a0a05]" : ""
                  }`}
                />
                <span>Lighting</span>
              </button>
              <div className="mt-[2px] flex flex-col pl-[22px]">
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`cursor-pointer py-[2px] text-left hover:opacity-60 ${
                        category === c ? "" : ""
                      }`}
                    >
                      {c}
                    </button>
                  ))}
              </div>
            </div>

            <div className="mt-[10px] flex flex-col">
              <span className="flex items-center gap-[14px] py-[2px]">
                <span className="inline-block size-[8px] shrink-0 rounded-full" />
                <span>Collections</span>
              </span>
            </div>
          </nav>
        </aside>

        {/* ===== Панель инструментов + сетка ===== */}
        <div className="flex w-[1119px] flex-col">
          {/* Панель инструментов */}
          <div className="flex h-[62px] items-center justify-between">
            <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              All Objects {products.length}
            </span>

            {/* Выпадающий фильтр «Light:» */}
            <div className="relative flex items-center gap-[6px]">
              <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                Light:
              </span>
              <button
                type="button"
                onClick={() => setLightOpen((o) => !o)}
                className="flex h-[20px] cursor-pointer items-center gap-[4px] border-[0.8px] border-[#4a0a05] px-[6px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
              >
                <span>{category}</span>
                <svg viewBox="0 0 9 5" width="9" height="5" fill="none" xmlns="http://www.w3.org/2000/svg" className={lightOpen ? "rotate-180" : ""}>
                  <path d="M0.5 0.5L4.5 4.5L8.5 0.5" stroke="#4A0A05" />
                </svg>
              </button>
              {lightOpen && (
                <div className="absolute left-[42px] top-[22px] z-40 w-[180px] border-[0.8px] border-[#4a0a05] bg-[#fafaf9] shadow-md">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCategory(c);
                        setLightOpen(false);
                      }}
                      className="flex w-full cursor-pointer items-center justify-between px-[8px] py-[5px] text-left hover:bg-[#efeae2]"
                    >
                      <span>{c}</span>
                      {c === category && (
                        <span className="inline-block size-[8px] rounded-full bg-[#4a0a05]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Выпадающая панель «Filter» (по правому краю) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setFilterOpen((o) => !o)}
                className="flex h-[20px] cursor-pointer items-center gap-[4px] border-[0.8px] border-[#4a0a05] px-[6px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
              >
                <span>Filter</span>
                <svg viewBox="0 0 9 5" width="9" height="5" fill="none" xmlns="http://www.w3.org/2000/svg" className={filterOpen ? "rotate-180" : ""}>
                  <path d="M0.5 0.5L4.5 4.5L8.5 0.5" stroke="#4A0A05" />
                </svg>
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-[22px] z-40 flex w-[696px] gap-[12px] border-[0.8px] border-[#4a0a05] bg-[#fafaf9] p-[16px] shadow-md">
                  {/* Materials */}
                  <div className="flex w-[330px] flex-col gap-[6px]">
                    <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                      Materials
                    </span>
                    {materials.map((m) => {
                      const active = selectedMaterials.includes(m);
                      return (
                        <label
                          key={m}
                          className="flex cursor-pointer items-center gap-[8px]"
                        >
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() =>
                              setSelectedMaterials((prev) =>
                                active
                                  ? prev.filter((x) => x !== m)
                                  : [...prev, m],
                              )
                            }
                            className="accent-[#4a0a05]"
                          />
                          <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                            {m}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Lead Time */}
                  <div className="flex w-[330px] flex-col gap-[6px]">
                    <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                      Lead Time
                    </span>
                    {leadTimes.map((lt) => {
                      const active = selectedLeadTimes.includes(lt);
                      return (
                        <label
                          key={lt}
                          className="flex cursor-pointer items-center gap-[8px]"
                        >
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() =>
                              setSelectedLeadTimes((prev) =>
                                active
                                  ? prev.filter((x) => x !== lt)
                                  : [...prev, lt],
                              )
                            }
                            className="accent-[#4a0a05]"
                          />
                          <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                            {lt}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Переключатель View S/M/L */}
            <div className="relative flex items-center">
              <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                View:
              </span>
              <div className="ml-[6px] flex items-center gap-[14px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                {(["S", "M", "L"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`cursor-pointer hover:opacity-60 ${
                      view === v ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Сетка товаров */}
          <div className={`mt-[40px] grid gap-[12px] ${gridClass}`}>
            {visible.map((p) => (
              <ShopProductCard key={p.name} product={p} />
            ))}
          </div>

          {/* Пустое состояние */}
          {visible.length === 0 && (
            <p className="mt-[80px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              No objects match your filters.
            </p>
          )}
        </div>
      </section>

      <div className="mt-[120px]">
        <Footer />
      </div>
    </div>
  );
}

export default function ShopPageWrapper() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  );
}
