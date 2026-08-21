"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Arrow from "./Arrow";

const collections = [
  { name: "Lido", image: "/assets/collections-lido.webp" },
  { name: "Strata", image: "/assets/collections-strata.webp" },
  { name: "Saga", image: "/assets/collections-saga.webp" },
  { name: "Aster Chandelier", image: "/assets/collections-aster.webp" },
  { name: "Core", image: "/assets/collections-core.webp" },
  { name: "Curio", image: "/assets/collections-curio.webp" },
  { name: "Terra", image: "/assets/collections-terra.webp" },
];

export default function CollectionsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, lastX: 0, scrollLeft: 0, velocity: 0, down: false });
  const raf = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const dx = e.deltaY || e.deltaX;
      if (dx === 0) return;
      const atStart = el.scrollLeft <= 0 && dx < 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && dx > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += dx;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scroll = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * 435, behavior: "smooth" });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    drag.current = { startX: e.pageX, lastX: e.pageX, scrollLeft: el.scrollLeft, velocity: 0, down: true };
    el.setPointerCapture(e.pointerId);
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
    <section id="collections" className="mx-auto flex w-full max-w-[1536px] flex-col px-[72px] max-sm:px-4">
      <div className="flex gap-[12px] max-sm:flex-col">
        {/* Заголовок слева */}
        <div className="flex w-[261px] shrink-0 flex-col items-start border-t-[0.8px] border-[#4a0a05] pt-[12px] max-sm:w-full">
          <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            Collections
          </span>
        </div>

        {/* Правая колонка */}
        <div className="relative flex w-[1119px] flex-col border-t-[0.8px] border-[#4a0a05] pt-[12px] max-sm:w-full">
          <p className="max-w-[522px] font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05] max-sm:max-w-full">
            Every Morrow collection explores a different relationship between
            light, material and form. From sculptural glass to stone, metal and
            ceramic, every series shares a coherent point of view within a
            quiet visual language.
          </p>

          {/* Лента коллекций */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="-mx-[72px] mt-[144px] flex w-[calc(100%+144px)] cursor-grab gap-[12px] overflow-x-auto overflow-y-visible px-[72px] pb-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-sm:mx-0 max-sm:mt-[40px] max-sm:w-full max-sm:gap-[16px] max-sm:px-0"
          >
            {collections.map((c) => (
              <div
                key={c.name}
                className="relative h-[537px] w-[435px] shrink-0 overflow-clip bg-[#bcb6a6] max-sm:h-[120vw] max-sm:w-[80vw]"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="whitespace-nowrap text-center font-['Questrial'] text-[24px] leading-[28.8px] text-[#f8f7f1]">
                    {c.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Стрелки навигации */}
          <div className="mt-6 flex w-full justify-end">
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
