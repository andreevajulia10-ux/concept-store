import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Featured from "@/components/Featured";
import TradeProgram from "@/components/TradeProgram";
import CollectionsCarousel from "@/components/CollectionsCarousel";
import VisitUs from "@/components/VisitUs";
import NewsletterSignup from "@/components/NewsletterSignup";
import Journal from "@/components/Journal";
import Footer from "@/components/Footer";
import NewsletterPopover from "@/components/NewsletterPopover";

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <Hero />
      <div className="mt-[20px]">
        <Collection />
      </div>
      <div className="mt-[58px]">
        <Featured />
      </div>
      <div className="mt-[88px]">
        <TradeProgram />
      </div>
      <div className="mt-[88px]">
        <CollectionsCarousel />
      </div>
      <div className="mt-[40px]">
        <VisitUs />
      </div>
      <div className="mt-[40px]">
        <NewsletterSignup />
      </div>
      <div className="mt-[8px]">
        <Journal />
      </div>
      <div className="mt-[121px]">
        <Footer />
      </div>
      <NewsletterPopover />
    </main>
  );
}

