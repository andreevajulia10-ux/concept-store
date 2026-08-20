import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";

const questrial = Questrial({
  variable: "--font-questrial",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Morrow Objects",
  description: "Old-world craft reimagined for contemporary spaces",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${questrial.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
