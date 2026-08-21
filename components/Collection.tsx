"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type CollectionItem = {
  title: string;
  count: number;
  image: string;
  cat: string;
};

const categories: CollectionItem[] = [
  { title: "Sconces", count: 40, image: "/assets/collection-sconces.webp", cat: "Wall Lights" },
  { title: "Pendants", count: 24, image: "/assets/collection-pendants.webp", cat: "Pendants" },
  { title: "Floor Lamps", count: 5, image: "/assets/collection-floor-lamps.webp", cat: "Floor Lamps" },
  { title: "Surface Mounts", count: 49, image: "/assets/collection-surface-mounts.webp", cat: "Ceiling Lights" },
  { title: "Chandeliers", count: 3, image: "/assets/collection-chandeliers.webp", cat: "Chandeliers" },
  { title: "Table Lamps", count: 16, image: "/assets/collection-table-lamps.webp", cat: "Table Lamps" },
];

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 19 11"
      width="19"
      height="11"
      className={flip ? "-scale-x-100" : ""}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 10.5L18.5 5.5L13.5 0.5M18.5 5.5H0.5"
        stroke="#4A0A05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Collection() {

  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    startX: 0,
    lastX: 0,
    scrollLeft: 0,
    velocity: 0,
    down: false,
  });
  const raf = useRef(0);

  // Колесо мыши крутит ленту по горизонтали (в обе стороны),
  // не давая странице «уезжать», пока ленту ещё можно прокручивать.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const dx = e.deltaY || e.deltaX;
      if (dx === 0) return;
      const atStart = el.scrollLeft <= 0 && dx < 0;
      const atEnd =
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && dx > 0;
      // Если дошли до края — отдаём прокрутку странице
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += dx;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  // Порог движения, считающий жест «кликом», а не перетаскиванием.

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Не начинаем перетаскивание, если нажатие пришлось на ссылку/кнопку.
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    const el = trackRef.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    drag.current = {
      startX: e.pageX,
      lastX: e.pageX,
      scrollLeft: el.scrollLeft,
      velocity: 0,
      down: true,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.pageX - drag.current.lastX;
    drag.current.lastX = e.pageX;
    drag.current.velocity = dx;
    el.scrollLeft = drag.current.scrollLeft - (e.pageX - drag.current.startX);
  };

  const endDrag = () => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.down = false;
    // Инерция после отпускания мыши
    let velocity = drag.current.velocity;
    const step = () => {
      if (Math.abs(velocity) < 0.5) return;
      el.scrollLeft -= velocity;
      velocity *= 0.92;
      raf.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
  };

  return (
    <section
      id="collection"
      className="relative mx-auto flex w-full max-w-[1536px] flex-col px-[72px] max-sm:px-4"
    >
      <div className="flex gap-[12px] max-sm:flex-col">
        {/* Левая колонка: заголовок */}
        <div className="flex w-[261px] shrink-0 flex-col items-start border-t-[0.8px] border-[#4a0a05] pt-[12px] max-sm:w-full">
          <p className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16px] text-[#4a0a05]">
            The Collection
          </p>
        </div>

        {/* Правая колонка */}
        <div className="relative flex w-[1119px] flex-col border-t-[0.8px] border-[#4a0a05] pt-[12px] max-sm:w-full">
          <p className="max-w-[345px] font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">
            Since our founding in 2018, our
            <br />
            catalog has grown to 137 pieces
            <br />
            across six distinct collections.
          </p>

          {/* Горизонтальный ряд карточек */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="-mx-[72px] mt-[12px] flex w-[calc(100%+144px)] cursor-grab gap-[12px] overflow-x-auto overflow-y-visible px-[72px] pb-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-sm:mx-0 max-sm:w-full max-sm:gap-[16px] max-sm:px-0"
          >
            {categories.map((c) => (
              <article
                key={c.title}
                className="flex w-[261px] shrink-0 flex-col items-start gap-[6px] max-sm:w-[46vw]"
              >
                <div className="h-[324px] w-[261px] overflow-clip bg-[#f8f7f1] max-sm:h-[56vw] max-sm:w-full">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={261}
                    height={324}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-full flex-col gap-[8px]">
                  <h3 className="whitespace-nowrap font-['Questrial'] text-[26px] leading-[31.2px] text-[#4a0a05]">
                    {c.title}{" "}
                    <span className="text-[13px] leading-[15.6px]">
                      {c.count}
                    </span>
                  </h3>
                  <Link
                    href={`/shop?cat=${encodeURIComponent(c.cat)}`}
                    className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
                  >
                    Shop
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Нижняя строка: Discover + стрелки */}
          <div className="mt-2 flex items-end justify-between">
            <div className="whitespace-nowrap">
              <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                Discover the collection
              </span>
            </div>
            <div className="flex w-[78px] items-center justify-between">
              <button
                type="button"
                aria-label="Прокрутить влево"
                onClick={() => scroll(-1)}
                className="flex cursor-pointer items-center justify-center p-1 hover:opacity-60"
              >
                <Arrow flip />
              </button>
              <button
                type="button"
                aria-label="Прокрутить вправо"
                onClick={() => scroll(1)}
                className="flex cursor-pointer items-center justify-center p-1 hover:opacity-60"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
