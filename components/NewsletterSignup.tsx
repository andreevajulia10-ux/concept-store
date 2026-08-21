"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="mx-auto flex w-full max-w-[1536px] flex-col px-[72px] max-sm:px-4">
      <div className="flex gap-[12px] max-sm:flex-col">
        {/* Заголовок слева */}
        <div className="flex w-[261px] shrink-0 flex-col items-start border-t-[0.8px] border-[#4a0a05] pt-[12px] max-sm:w-full">
          <span className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16.8px] text-[#4a0a05]">
            Newsletter
          </span>
        </div>

        {/* Правая колонка */}
        <div className="flex w-[1119px] flex-col items-end border-t-[0.8px] border-[#4a0a05] pt-[60px] pr-[87px] max-sm:w-full max-sm:items-start max-sm:pr-0 max-sm:pt-[40px]">
          <div className="flex w-[609px] flex-col gap-[40px] pl-[24px] py-[20px] max-sm:w-full max-sm:pl-0">
            <h2 className="w-full whitespace-pre-wrap font-['Questrial'] text-[26px] leading-[31.2px] text-[#4a0a05]">
              A slower way to stay in the know.
              <br />
              New collections, studio stories, material
              <br />
              studies and occasional notes from Morrow.
            </h2>

            <form
              onSubmit={submit}
              className="flex w-full flex-col gap-[10px]"
            >
              <div className="flex w-full items-center">
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
              <p className="max-w-[340px] whitespace-nowrap font-['Arimo'] text-[14px] leading-[16.8px] text-[#4a0a05] max-sm:whitespace-normal">
                {done
                  ? "Thank you for subscribing."
                  : "By signing up you are agreeing to our Privacy Policy."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
