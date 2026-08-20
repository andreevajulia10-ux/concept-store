import Image from "next/image";

type Post = {
  date: string;
  image: string;
  title: string;
  body: string;
};

const posts: Post[] = [
  {
    date: "August 12, 2026",
    image: "/assets/journal-august.webp",
    title: "Inside Morrow House",
    body: "A closer look at the spaces, materials and objects shaping our New York showroom.",
  },
  {
    date: "July 24, 2026",
    image: "/assets/journal-july.webp",
    title: "The Shape of Quiet Light",
    body: "Exploring how proportion, texture and shadow influence the way a room feels.",
  },
  {
    date: "June 8, 2026",
    image: "/assets/journal-june.webp",
    title: "From Material to Object",
    body: "A study in stone, glass and metal — and the small decisions behind every Morrow piece.",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="mx-auto flex w-full max-w-[1536px] flex-col px-[72px]">
      <div className="flex gap-[12px]">
        {/* Заголовок слева */}
        <div className="flex w-[261px] shrink-0 flex-col items-start border-t-[0.8px] border-[#4a0a05] pt-[12px]">
          <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            Journal
          </span>
        </div>

        {/* Список постов */}
        <div className="flex w-[1119px] gap-[12px] border-t-[0.8px] border-[#4a0a05] pt-[12px]">
          {posts.map((post) => (
            <article key={post.title} className="flex w-[365px] shrink-0 flex-col">
              <span className="pb-[8px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                {post.date}
              </span>
              <div className="mt-[16px] h-[424.9px] w-full overflow-clip">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={365}
                  height={425}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-[24px] flex flex-col gap-[24px]">
                <div className="font-['Questrial'] text-[#4a0a05]">
                  <h3 className="leading-[21.6px] text-[20px]">{post.title}</h3>
                  <p className="mt-[8px] text-[18px] leading-[21.6px]">
                    {post.body}
                  </p>
                </div>
                <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] opacity-50 hover:opacity-100">
                  Read More
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
