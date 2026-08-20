import Image from "next/image";
import Header from "./Header";
import Tagline from "./Tagline";

export default function Hero() {
  return (
    <div className="group relative h-[695px] w-[1536px] overflow-hidden bg-black">
      {/* Фоновое изображение */}
      <Image
        alt=""
        src="/assets/morrow-hero.png"
        fill
        priority
        sizes="1536px"
        style={{ objectFit: "cover" }}
      />

      {/* Видео поверх правой части; выезжает вперёд при наведении */}
      <video
        className="absolute top-0 z-10 h-[695px] w-[768px] object-cover transition-transform duration-700 ease-out group-hover:-translate-x-[400.5px]"
        style={{ left: "1168.5px" }}
        autoPlay
        muted
        loop
        playsInline
        src="/assets/morrow-hero.mp4"
      />

      {/* Центральный слоган из макета */}
      <div
        className="absolute z-10 text-[#f8f7f1]"
        style={{ left: "159px", top: "336px" }}
      >
        <Tagline />
      </div>

      {/* Контейнер с текстом в нижней части */}
      <div
        className="absolute z-20 flex flex-col justify-end items-end"
        style={{ left: "72px", top: 0, width: "1392px", height: "695px", paddingBottom: "28px", paddingRight: "348px" }}
      >
        <div
          className="flex flex-col justify-between items-start"
          style={{ width: "261px", height: "333.5px" }}
        >
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

