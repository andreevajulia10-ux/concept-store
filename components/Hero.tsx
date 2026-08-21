import Image from "next/image";
import Header from "./Header";
import Tagline from "./Tagline";

export default function Hero() {
  return (
    <div className="group relative h-[695px] w-full overflow-hidden bg-black max-sm:h-[560px]">
      {/* Фоновое изображение */}
      <Image
        alt=""
        src="/assets/morrow-hero.webp"
        fill
        priority
        sizes="(max-width: 640px) 100vw, 1536px"
        className="object-cover"
      />

      {/* Видео поверх правой части; выезжает вперёд при наведении */}
      <video
        className="absolute left-[1168.5px] top-0 z-10 hidden h-[695px] w-[768px] object-cover transition-transform duration-700 ease-out group-hover:-translate-x-[400.5px] lg:block"
        poster="/assets/morrow-hero.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src="/assets/morrow-hero.mp4"
      />

      {/* Центральный слоган из макета */}
      <div className="absolute left-[159px] top-[336px] z-10 text-[#f8f7f1] max-sm:left-1/2 max-sm:top-[38%] max-sm:-translate-x-1/2 max-sm:-translate-y-1/2">
        <Tagline />
      </div>

      {/* Контейнер с текстом в нижней части */}
      <div className="absolute left-[72px] top-0 z-20 flex h-[695px] w-[1392px] flex-col items-end justify-end pb-7 pr-[348px] max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:h-auto max-sm:w-full max-sm:items-start max-sm:px-4 max-sm:pb-6 max-sm:pr-4">
        <div className="flex h-[333.5px] w-[261px] flex-col items-start justify-between max-sm:h-auto max-sm:w-full max-sm:gap-[18px]">
          <p className="font-['Questrial'] whitespace-nowrap text-[14px] leading-[16.8px] text-[#f8f7f1]">
            Objects for slower living
          </p>
          <a
            className="font-['Questrial'] block w-full whitespace-nowrap text-[14px] leading-[16.8px] text-[#f8f7f1]"
            href="#collection"
          >
            Explore the collection
          </a>
        </div>
      </div>

      {/* Шапка */}
      <Header />
    </div>
  );
}
