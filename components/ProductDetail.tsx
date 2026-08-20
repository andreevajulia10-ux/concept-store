"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MorrowLogo from "./MorrowLogo";
import Arrow from "./Arrow";
import Footer from "./Footer";
import type { Product } from "@/lib/products";

type DropdownProps = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

function FieldDropdown({ value, options, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-[437px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[31px] w-full cursor-pointer items-center justify-between px-[8px] text-left font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] ${open ? "bg-[#fafaf9]" : ""} hover:opacity-70`}
      >
        <span>{value}</span>
        <svg viewBox="0 0 9 5" width="9" height="5" fill="none" xmlns="http://www.w3.org/2000/svg" className={open ? "rotate-180" : ""}>
          <path d="M0.5 0.5L4.5 4.5L8.5 0.5" stroke="#4A0A05" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-[31px] z-50 w-full border-[0.8px] border-[#4a0a05] bg-[#fafaf9] shadow-xl">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between bg-[#fafaf9] px-[8px] py-[5px] text-left font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:bg-[#e9e4dc]"
            >
              <span>{opt}</span>
              {opt === value && <span className="inline-block size-[8px] rounded-full bg-[#4a0a05]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center border-b-[0.8px] border-[#4a0a05] opacity-90">
      <div className="flex w-[259px] shrink-0 items-center">
        <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{label}</span>
      </div>
      {children}
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex h-[60px] w-full items-center justify-between px-[72px] font-['Questrial'] text-[16px] leading-[20px] text-[#4a0a05]">
      <Link href="/">
        <MorrowLogo className="shrink-0" />
      </Link>
      <nav className="flex items-center gap-[56px] whitespace-nowrap">
        <span className="cursor-pointer">Shop</span>
        <Link href="/" className="cursor-pointer">Collections</Link>
        <span className="cursor-pointer">Objects</span>
        <span className="cursor-pointer">About</span>
      </nav>
      <nav className="flex items-center gap-[20px] whitespace-nowrap">
        <span className="cursor-pointer">Search</span>
        <span className="cursor-pointer">Journal</span>
        <span className="cursor-pointer">Cart (0)</span>
      </nav>
    </div>
  );
}

function SmallLink({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[6px]">
      <span className="flex items-center">
        <Arrow />
      </span>
      <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60">
        {label}
      </span>
    </div>
  );
}

function FinishGrid({
  title,
  items,
  note,
}: {
  title: string;
  items: { label: string; image: string }[];
  note: string;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-start justify-between border-t-[0.8px] border-[#4a0a05] pt-[10px]">
        <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{title}</span>
        <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{note}</span>
      </div>
      <div className="grid w-full grid-cols-5 gap-[12px]">
        {items.map((f) => (
          <div key={f.label} className="relative h-[159.5px] overflow-clip bg-[#e9e4dc]">
            <Image src={f.image} alt={f.label} fill className="object-cover" />
            <span className="absolute left-[8px] top-[8px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ViewGallery() {
  return (
    <div className="flex items-center gap-[8px]">
      <Image src="/assets/icon-view-gallery.svg" alt="" width={10} height={10} unoptimized />
      <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#fafaf9]">View Gallery</span>
    </div>
  );
}

function GalleryFigure({
  g,
}: {
  g: { figure: string; image: string; caption: string; w: number; h: number };
}) {
  return (
    <div className="flex flex-col" style={{ width: g.w }}>
      <div className="relative overflow-clip" style={{ height: g.h }}>
        <Image src={g.image} alt={g.figure} fill className="object-cover" />
        <span className="absolute inset-0 m-auto flex items-center justify-center">
          <ViewGallery />
        </span>
      </div>
      <span className="mt-[12px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{g.figure}</span>
      <p className="mt-[8px] whitespace-pre font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{g.caption}</p>
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const [finish, setFinish] = useState(product.defaultFinish);
  const [shade, setShade] = useState(product.defaultShade);
  const [size, setSize] = useState(product.defaultSize);
  const [qty, setQty] = useState(1);

  return (
    <div className="mx-auto flex w-full flex-col bg-[#fafaf9]">
      <PageHeader />

      {/* ===== HERO товара ===== */}
      <section className="mx-auto flex w-[1392px] gap-[12px]">
        <div className="flex w-[696px] flex-col pb-[28px] pt-[92px]">
          <div>
            <h1 className="whitespace-nowrap font-['Questrial'] text-[26px] leading-[31.2px] text-[#4a0a05]">
              {product.name}
            </h1>
            <p className="mr-[40px] mt-[30px] border-t-[0.8px] border-[#4a0a05] pt-[10px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              {product.heroTagline}
            </p>

            <form className="mt-[70px] flex flex-col">
              <Row label="Finish">
                <FieldDropdown value={finish} options={product.finishOptions} onChange={setFinish} />
              </Row>
              <Row label="Shade">
                <FieldDropdown value={shade} options={product.shadeOptions} onChange={setShade} />
              </Row>
              <Row label="Size">
                <FieldDropdown value={size} options={product.sizeOptions} onChange={setSize} />
              </Row>
              <Row label="Lead time">
                <div className="flex h-[31px] w-[437px] items-center px-[8px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] opacity-50">
                  {product.leadLabel}
                </div>
              </Row>

              <div className="mt-[14px] flex items-start gap-[8px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                <span className="w-[258px] whitespace-nowrap">Item Number: {product.itemNumber}</span>
                <span className="w-[430px]">
                  Lead Time: {product.leadTime}
                  <br />
                  {product.estShipDate}
                </span>
              </div>
            </form>

            <div className="mt-[26px] flex items-center">
              <div className="flex h-[32px] w-[265px] items-center justify-between border-y-[0.8px] border-l-[0.8px] border-[#4a0a05] px-[16px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                <div className="flex items-center">
                  <button type="button" aria-label="Уменьшить количество" onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))} className="cursor-pointer hover:opacity-60">
                    −
                  </button>
                  <span className="mx-[10px] w-[12px] text-center">{qty}</span>
                  <button type="button" aria-label="Увеличить количество" onClick={() => setQty((q) => q + 1)} className="cursor-pointer hover:opacity-60">
                    +
                  </button>
                </div>
                <span className="whitespace-nowrap">Quantity</span>
              </div>
              <button
                type="button"
                className="flex h-[32px] w-[431px] cursor-pointer items-center justify-between border-[0.8px] border-[#4a0a05] px-[16px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-70"
              >
                <span className="whitespace-nowrap">{product.price}</span>
                <span className="whitespace-nowrap opacity-50">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative h-[700px] w-[675px] shrink-0 self-end overflow-clip">
          <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
        </div>
      </section>

      {/* ===== Контент: nav + основной ===== */}
      <section className="mx-auto flex w-[1392px] gap-[6px] pt-[64px]">
        <aside className="relative w-[267px] shrink-0">
          <div className="sticky top-0 flex w-[261px] flex-col gap-[17px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            <div className="flex items-center gap-[14px]">
              <span className="inline-block size-[8px] rounded-full bg-[#4a0a05]" />
              <span>Overview</span>
            </div>
            <span className="cursor-pointer pl-[22px] hover:opacity-60">Description</span>
            <span className="cursor-pointer pl-[22px] hover:opacity-60">Tech Specs + Downloads</span>
            <span className="cursor-pointer pl-[22px] hover:opacity-60">Explore the Collection</span>
            <span className="cursor-pointer pl-[22px] hover:opacity-60">Finish Samples</span>
            <span className="cursor-pointer pl-[22px] hover:opacity-60">Bulbs + Spare Parts</span>
          </div>
        </aside>

        <div className="flex w-[1121px] flex-col gap-[20px]">
          <div className="flex flex-col gap-[4px]">
            <SmallLink label="Add Sidemark" />
            <SmallLink label="Inquire About This Item" />
            <SmallLink label="Download a Tear Sheet" />
          </div>

          {/* Описание */}
          <div className="flex flex-col gap-[60px] pt-[60px]">
            <div className="border-t-[0.8px] border-[#4a0a05] pt-[14px]">
              <p className="w-[870px] whitespace-pre font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">
                {product.leadParagraph}
                {product.bodyParagraph ? `\n\n${product.bodyParagraph}` : ""}
              </p>
            </div>

            <div className="flex gap-[12px]">
              <GalleryFigure g={product.gallery[0]} />
              <GalleryFigure g={product.gallery[1]} />
            </div>
          </div>

          {/* Tech Specs + Downloads */}
          <div className="flex gap-[12px] pt-[60px]">
            <div className="flex w-[783px] flex-col gap-[60px] border-t-[0.8px] border-[#4a0a05] pt-[10px]">
              <h2 className="font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">Tech Specs</h2>
              <div className="flex flex-col">
                {product.techSpecs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-[2px] border-t-[0.8px] border-[#bcb6a6] py-[8px] last:border-b-[0.8px]">
                    <span className="w-[261px] shrink-0 font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{spec.label}</span>
                    <span className="whitespace-pre font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-[326px] flex-col gap-[60px] border-t-[0.8px] border-[#4a0a05] pt-[10px]">
              <h2 className="font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">Downloads</h2>
              <div className="flex flex-col">
                {product.downloads.map((label) => (
                  <div
                    key={label}
                    className="mb-[6px] flex h-[38px] cursor-pointer items-center justify-between border-[0.8px] border-[#4a0a05] px-[14px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
                  >
                    <span>{label}</span>
                    <svg viewBox="0 0 12 12" width="12" height="12" className="rotate-90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.5 10.5L11 8L8.5 5.5M11 8H1" stroke="#4A0A05" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Баннер */}
          <div className="relative mt-[120px] h-[853px] w-full overflow-clip">
            <Image src={product.bannerImage} alt="Explore the collection" fill className="object-cover" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between px-[72px] pb-[24px] pt-[44px]">
              <p className="max-w-[696px] font-['Questrial'] text-[17px] leading-[20.4px] text-[#f8f7f1]">{product.bannerText}</p>
              <Link href="/" className="flex shrink-0 items-center gap-[14px] whitespace-nowrap font-['Questrial'] text-[18px] leading-[21.6px] text-[#f8f7f1] hover:opacity-70">
                <svg viewBox="0 0 19 11" width="22" height="13" className="-scale-x-100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 10.5L18.5 5.5L13.5 0.5M18.5 5.5H0.5" stroke="#f8f7f1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Explore the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Finish Samples ===== */}
      <section className="mx-auto flex w-[1121px] flex-col gap-[60px] pt-[80px]">
        <div className="flex items-center border-t-[0.8px] border-[#4a0a05] pt-[10px]">
          <h2 className="font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">Finish Samples</h2>
        </div>
        <FinishGrid title="Shade Finishes" note="$18 each · $60 for the full set" items={product.shadeFinishes} />
        <FinishGrid title="Metal Finishes" note="$18 each · $60 for the full set" items={product.metalFinishes} />
      </section>

      {/* ===== Bulbs + Spare Parts ===== */}
      <section className="mx-auto flex w-[1121px] flex-col gap-[60px] pt-[80px]">
        <div className="flex items-center border-t-[0.8px] border-[#4a0a05] pt-[10px]">
          <h2 className="font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">Bulbs + Spare Parts</h2>
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex items-start justify-between border-t-[0.8px] border-[#c5b2b0] pt-[10px]">
            <span className="w-[194px] whitespace-pre font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              {product.replacementName}{"\n"}{product.replacementDesc}
            </span>
            <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{product.replacementPrice}</span>
          </div>
          <div className="relative h-[159.5px] w-[129.6px] overflow-clip bg-[#e9e4dc]">
            <Image src={product.replacementImage} alt={product.replacementName} fill className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex items-start justify-between border-t-[0.8px] border-[#c5b2b0] pt-[10px]">
            <span className="w-[194px] whitespace-pre font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{product.bulbName}</span>
            <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">{product.bulbPrice}</span>
          </div>
          <div className="relative h-[159.5px] w-[129.6px] overflow-clip bg-[#f2eae3]">
            <Image src={product.bulbImage} alt={product.bulbName} fill className="object-contain" />
            <span className="absolute left-[8px] top-[8px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">2200-2700K</span>
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="mx-auto flex w-[1121px] flex-col gap-[60px] pt-[90px]">
        <div className="flex flex-wrap gap-[12px]">
          {product.gallery.map((g) => (
            <GalleryFigure key={g.figure} g={g} />
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <div className="mt-[120px]">
        <Footer />
      </div>
    </div>
  );
}
