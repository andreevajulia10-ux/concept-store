"use client";

import Image from "next/image";
import { useState } from "react";

const shopLinks = [
  "All Objects",
  "New Arrivals",
  "Lighting",
  "Wall Lights",
  "Table & Floor Lamps",
  "Collections",
];

const aboutLinks = [
  "Our Story",
  "Morrow House",
  "Journal",
  "Trade Program",
  "Materials & Care",
  "Contact",
];

const supportLinks = [
  "Shipping & Delivery",
  "Returns",
  "FAQ",
  "Terms",
  "Privacy",
  "Accessibility",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <footer className="mx-auto w-full max-w-[1536px] px-[72px]">
      {/* Уровень 1: теглайн + контакты */}
      <div className="flex items-start justify-between gap-[12px] border-t-[0.8px] border-[#4a0a05] pt-[12px]">

        <Image
          src="/assets/footer-tagline.svg"
          alt="Old-world craft reimagined for contemporary spaces"
          width={78}
          height={15}
          unoptimized
          className="mt-[2px] h-[15px] w-[78px]"
        />

        <div className="grid w-[783px] grid-cols-3 gap-x-[12px] gap-y-[28px]">
          {/* col 1 */}
          <div className="flex flex-col">
            <div className="font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              <p>hello@morrowobjects.com</p>
              <p>+1 (917) 830-8700</p>
            </div>
          </div>
          {/* col 2 */}
          <div className="flex flex-col">
            <p className="whitespace-pre font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              Morrow House{`\n`}48 Mercer Street{`\n`}New York, NY 10013{`\n`}
              Wednesday–Saturday, 11am–6pm
            </p>
          </div>
          {/* col 3 */}
          <div className="flex flex-col">
            <p className="whitespace-pre font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              Studio{`\n`}Brooklyn, New York{`\n`}By appointment only
            </p>
          </div>
          {/* row 2 links */}
          <div className="flex flex-col">
            <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60">
              @morrowobjects
            </span>
          </div>
          <div className="flex flex-col">
            <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60">
              Plan your visit
            </span>
          </div>
          <div className="flex flex-col">
            <span className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60">
              Contact the studio
            </span>
          </div>
        </div>
      </div>

      {/* Уровень 2: Newsletter + колонки ссылок */}
      <div className="mt-[36px] flex justify-between gap-[12px] border-t-[0.8px] border-[#4a0a05] pt-[10px]">
        {/* Newsletter слева */}
        <div className="flex w-[597px] flex-col gap-[48px] pr-[12px]">
          <span className="max-w-[340px] whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            Newsletter
          </span>
          <form onSubmit={submit} className="flex flex-col gap-[10px]">
            <p className="max-w-[307px] font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              Occasional notes on new objects, materials, studio stories and
              upcoming releases.
            </p>
            <div className="flex w-full max-w-[430px] items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="h-[32px] flex-1 overflow-clip border-[0.8px] border-[#4a0a05] bg-transparent px-[12px] font-['Questrial'] text-[14px] text-black outline-none placeholder:text-black"
              />
              <button
                type="submit"
                className="flex h-[32px] min-w-[123px] cursor-pointer items-center justify-center border-y-[0.8px] border-r-[0.8px] border-[#4a0a05] font-['Questrial'] text-[14px] text-black hover:opacity-60"
              >
                Sign Up
              </button>
            </div>
            <span className="max-w-[340px] whitespace-nowrap font-['Arimo'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              {done
                ? "Thank you for subscribing."
                : "By subscribing, you agree to our Privacy Policy."}
            </span>
          </form>
        </div>

        {/* Колонки ссылок */}
        <div className="flex gap-[24px]">
          {[
            { title: "Shop", links: shopLinks },
            { title: "About", links: aboutLinks },
            { title: "Support", links: supportLinks },
          ].map((col) => (
            <div
              key={col.title}
              className="flex w-[253px] flex-col gap-[32px] pt-[10px]"
            >
              <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
                {col.title}
              </span>
              <div className="flex flex-col gap-[4px]">
                {col.links.map((link) => (
                  <span
                    key={link}
                    className="cursor-pointer whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05] hover:opacity-60"
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Уровень 3: копирайт */}
      <div className="mt-[12px] flex items-end justify-between border-t-[0.8px] border-[#4a0a05] pt-[12px]">
        <p className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
          © Morrow Objects 2026. All rights reserved.
        </p>
        <p className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
          Privacy · Terms · Site Credits
        </p>
      </div>
    </footer>
  );
}
