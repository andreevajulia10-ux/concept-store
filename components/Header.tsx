import Link from "next/link";
import MorrowLogo from "./MorrowLogo";
import HeaderActions from "./HeaderActions";

type HeaderProps = {
  className?: string;
  property1?: "Default" | "Hover";
};

export default function Header({
  className,
  property1 = "Default",
}: HeaderProps) {
  const isHover = property1 === "Hover";

  return (
    <div
      className={`font-['Questrial'] absolute left-0 top-0 z-30 flex h-[60px] w-full items-center justify-between px-[72px] transition-colors duration-300 max-sm:px-4 ${
        isHover ? "bg-[#ffffff] text-[#4a0a05]" : "bg-transparent text-[#f8f7f1]"
      } hover:bg-[#ffffff] hover:text-[#4a0a05] ${className ?? ""}`}
    >
      <MorrowLogo className="shrink-0" />
      <nav className="flex items-center gap-[56px] text-[16px] leading-[20px] whitespace-nowrap max-sm:hidden">
        <Link href="/shop" className="cursor-pointer">Shop</Link>
        <Link href="/#collections" className="cursor-pointer hover:opacity-60">Collections</Link>
        <Link href="/#collection" className="cursor-pointer hover:opacity-60">Objects</Link>
        <Link href="/#visit" className="cursor-pointer hover:opacity-60">About</Link>
      </nav>
      <HeaderActions />
    </div>
  );
}
