"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopProduct } from "@/lib/shop";
import { useCart } from "@/components/cart-context";

export default function ShopProductCard({
  product,
}: {
  product: ShopProduct;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Медиа-контент карточки (изображение товара).
  const media = (
    <div className="relative h-[336px] w-full overflow-clip bg-[#f8f7f1]">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(min-width: 1280px) 271px, (min-width: 960px) 33vw, 50vw"
      />
    </div>
  );

  // Текстовый блок: название + цена.
  const caption = (
    <div className="flex flex-col">
      <h3 className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
        {product.name}
      </h3>
      <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
        {product.price}
      </span>
    </div>
  );

  // Кнопка добавления в корзину.
  const addButton = (
    <button
      type="button"
      onClick={handleAdd}
      className="mt-[8px] flex h-[28px] w-full cursor-pointer items-center justify-center border-[0.8px] border-[#4a0a05] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );

  // Если есть slug — изображение и название ведут на страницу товара,
  // а кнопка «Add to Cart» остаётся отдельным интерактивным элементом.
  if (product.slug) {
    return (
      <div className="flex flex-col gap-[6px] group">
        <Link
          href={`/product/${product.slug}`}
          className="flex flex-col gap-[6px]"
        >
          {media}
          {caption}
        </Link>
        {addButton}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[6px]">
      {media}
      {caption}
      {addButton}
    </div>
  );
}
