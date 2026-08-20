import Image from "next/image";

export default function TradeProgram() {
  return (
    <section className="relative mx-auto w-full max-w-[1536px]">
      {/* Градиентный фон на всю ширину */}
      <div
        className="pointer-events-none absolute inset-0 -left-[72px] w-[1536px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(202, 234, 254, 0) 0%, rgba(202, 234, 254, 0.6) 6.25%, rgba(202, 234, 254, 0.6) 92.71%, rgba(202, 234, 254, 0) 100%)",
        }}
      />

      <div className="relative flex px-[72px]">
        {/* Заголовок слева */}
        <div className="flex w-[261px] shrink-0 flex-col items-start border-t-[0.8px] border-[#4a0a05] pt-[12px]">
          <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            Trade Program
          </span>
        </div>

        {/* Правая колонка */}
        <div className="flex w-[1119px] flex-col border-t-[0.8px] border-[#4a0a05] py-[80px] pr-[87px]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[32px]">
              <p className="w-[633px] whitespace-pre-wrap font-['Questrial'] text-[26px] leading-[31.2px] text-[#4a0a05]">
                Designed for interior designers, architects and
                <br />
                studios. Access dedicated support, material
                <br />
                guidance and custom options for your projects.
              </p>
              <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60">
                Learn More
              </span>
            </div>

            <div className="h-[200px] w-[160px] shrink-0 overflow-clip">
              <Image
                src="/assets/trade-image.webp"
                alt="Trade Program"
                width={160}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
