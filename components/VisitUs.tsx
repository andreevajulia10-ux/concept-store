import Image from "next/image";

export default function VisitUs() {
  return (
    <section id="visit" className="mx-auto flex w-full max-w-[1536px] flex-col px-[72px]">
      <div className="flex gap-[12px]">
        {/* Заголовок слева */}
        <div className="flex w-[261px] shrink-0 flex-col items-start border-t-[0.8px] border-[#4a0a05] pt-[12px]">
          <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            Visit Us
          </span>
        </div>

        {/* Правая колонка */}
        <div className="flex w-[1119px] flex-col gap-[60px] border-t-[0.8px] border-[#4a0a05] pt-[12px]">
          {/* Заголовок + описание */}
          <div className="flex gap-[12px]">
            <div className="flex w-[435px] shrink-0 flex-col">
              <h3 className="whitespace-nowrap font-['Questrial'] text-[26px] leading-[31.2px] text-[#4a0a05]">
                Morrow House
              </h3>
            </div>
            <div className="flex w-[245px] shrink-0 flex-col gap-[20px] pl-[87px]">
              <p className="w-[498px] font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">
                Morrow House is a place to experience our lighting and objects
                in a lived-in setting. Explore materials, see pieces
                illuminated in space, and discover how each collection changes
                with its surroundings.
              </p>
              <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60">
                Learn More
              </span>
            </div>
          </div>

          {/* Изображения */}
          <div className="flex gap-[12px]">
            <div className="flex w-[435px] shrink-0 flex-col justify-between">
              <div className="h-[543.75px] w-full overflow-clip">
                <Image
                  src="/assets/visit-left.png"
                  alt="Quarters showroom"
                  width={435}
                  height={544}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[20px] pr-[87px]">
                <div className="font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">
                  <p>
                    Open Wednesday–Saturday
                    <br />
                    11:00am–6:00pm
                  </p>
                  <p className="pt-[43px]">
                    48 Mercer Street
                    <br />
                    New York, NY 10013
                  </p>
                </div>
                <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60">
                  Get Directions
                </span>
              </div>
            </div>

            <div className="h-[840px] w-[672px] shrink-0 overflow-clip">
              <Image
                src="/assets/visit-right.png"
                alt="Morrow House interior"
                width={672}
                height={840}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
