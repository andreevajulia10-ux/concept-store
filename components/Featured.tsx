import Image from "next/image";
import Link from "next/link";

type FeaturedItem = {
  slug: string;
  badge: string;
  description: React.ReactNode;
  miniImage: string;
  productName: string;
  price: string;
  mainImage: string;
};

const items: FeaturedItem[] = [
  {
    slug: "arc-glass-sconce",
    badge: "Arc Glass Sconce",
    description: (
      <>
        A sculptural wall light shaped from hand-blown glass and warm brushed
        metal. Its softened curves diffuse light in both directions, creating a
        quiet glow that changes with the room.
      </>
    ),
    miniImage: "/assets/featured-arc-mini.png",
    productName: "Arc Glass Sconce",
    price: "From $285",
    mainImage: "/assets/featured-arc-main.png",
  },
  {
    slug: "orbis-wall-light",
    badge: "Orbis Wall Light",
    description: (
      <>
        A sculptural wall light designed to feel quietly expressive.
        Hand-finished glass and warm metal create a soft, diffused glow, while
        the compact silhouette keeps the focus on material, texture and light.
        Available in a selection of finishes, each piece brings subtle
        variation and character to the space.
      </>
    ),
    miniImage: "/assets/featured-ceramic-mini.png",
    productName: "Ceramic Disc Surface Mount",
    price: "From $1,200.00",
    mainImage: "/assets/featured-orbis-main.png",
  },
];

export default function Featured() {
  return (
    <section className="mx-auto flex w-full max-w-[1536px] flex-col px-[72px]">
      <div className="flex gap-[12px]">
        {/* Левая колонка: заголовок */}
        <div className="flex w-[261px] shrink-0 flex-col items-start border-t-[0.8px] border-[#4a0a05] pt-[12px]">
          <div className="flex items-start gap-[4px]">
            <span className="mt-[2px] inline-block size-[8px] shrink-0 rounded-full bg-[#4a0a05]" />
            <span className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              New
              <br />
              Featured
            </span>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="flex w-[1119px] flex-col gap-[80px] border-t-[0.8px] border-[#4a0a05] pt-[12px]">
          {items.map((item) => (
            <article key={item.badge} className="group flex gap-[12px]">
              {/* Большое изображение с бейджем */}
              <Link
                href={`/product/${item.slug}`}
                className="relative block h-[1068.85px] w-[870px] shrink-0 overflow-clip"
              >
                <Image
                  src={item.mainImage}
                  alt={item.badge}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute left-[14px] top-[14px] flex items-center gap-[6px]">
                  <span className="inline-block size-[14px] rounded-full bg-[#fafaf9]" />
                  <span className="whitespace-nowrap font-['Questrial'] text-[18px] leading-[21.6px] text-[#fafaf9]">
                    {item.badge}
                  </span>
                </div>
              </Link>

              {/* Правая колонка: описание + мини-карточка */}
              <div className="sticky top-0 flex h-fit w-[237px] shrink-0 flex-col gap-[80px] self-start">
                <div className="font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">
                  {item.description}
                </div>

                <div className="flex flex-col gap-[12px]">
                  <Link href={`/product/${item.slug}`} className="flex flex-col gap-[6px]">
                    <div className="h-[294.2px] w-full overflow-clip bg-[#f8f7f1]">
                      <Image
                        src={item.miniImage}
                        alt={item.productName}
                        width={237}
                        height={294}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                        {item.productName}
                      </h3>
                      <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                        {item.price}
                      </span>
                    </div>
                  </Link>
                  <Link
                    href={`/product/${item.slug}`}
                    className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
                  >
                    Shop
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

