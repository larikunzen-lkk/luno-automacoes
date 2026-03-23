import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Cases } from "@/components/sections/Cases";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { StickyMobileCTA } from "@/components/sections/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ROICalculator />
        <HowItWorks />
        <Cases />
        <PackagesPreview />
        <CTAFinal />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
