"use client";

import { useEffect, useState } from "react";

export default function NewsletterPopover() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail("");
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-[72px]">
      <div className="relative flex w-full max-w-[1392px] border-t-[0.8px] border-[#4a0a05] bg-white px-[16.8px] pb-[10px] pt-[12.8px]">
        {/* Крестик закрытия */}
        <button
          type="button"
          aria-label="Закрыть окно подписки"
          onClick={() => setOpen(false)}
          className="absolute right-[4px] top-[4px] flex cursor-pointer items-center justify-center p-2 text-[#4a0a05] hover:opacity-60"
        >
          <svg viewBox="0 0 11 11" width="11" height="11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1L10 10M10 1L1 10"
              stroke="#4A0A05"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Заголовок */}
        <div className="mr-[60px] flex w-[261px] shrink-0 flex-col">
          <h3 className="whitespace-nowrap font-['Questrial'] text-[14px] leading-[16px] text-[#4a0a05]">
            Our Newsletter
          </h3>
        </div>

        {/* Контент */}
        <div className="flex w-[1119px] flex-col gap-[22px]">
          <p className="max-w-[340px] font-['Questrial'] text-[18px] leading-[21.6px] text-[#4a0a05]">
            Sign up for our Newsletter to receive seasonal promotions and event
            invitations. We respect your inbox and only send e-mails worth your
            time.
          </p>

          <form onSubmit={submit} className="flex w-full max-w-[426px] flex-col gap-[10px]">
            <div className="flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="h-[32px] flex-1 border-[0.8px] border-[#4a0a05] bg-transparent px-[12px] font-['Questrial'] text-[14px] text-black outline-none placeholder:text-black"
              />
              <button
                type="submit"
                className="flex h-[32px] min-w-[123px] cursor-pointer items-center justify-center border-y-[0.8px] border-r-[0.8px] border-[#4a0a05] font-['Questrial'] text-[14px] text-[#4a0a05] hover:opacity-60"
              >
                Sign Up
              </button>
            </div>
            <p className="max-w-[340px] font-['Arimo'] text-[14px] leading-[16.8px] text-[#4a0a05]">
              By signing up you are agreeing to our{" "}
              <span className="cursor-pointer underline">Privacy Policy</span>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

