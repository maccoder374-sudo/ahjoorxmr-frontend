import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SupportedBy from "@/components/sections/SupportedBy";
import DashboardPreview from "@/components/sections/DashboardPreview";
import HowItWorks from "@/components/sections/HowItWorks";
import CalculatorSection from "@/components/sections/CalculatorSection";
import WhyAhjoor from "@/components/sections/WhyAhjoor";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Ahjoor — Save With Friends",
  description:
    "Save together with friends, family or your community in on-chain savings circles. Ahjoor automates contributions and payouts — borderless, trustless and fully transparent.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SupportedBy />
      <DashboardPreview />
      <HowItWorks />
      <CalculatorSection />
      <WhyAhjoor />
      <Testimonials />
      <FAQSection />
      <Footer />
    </main>
  );
}
