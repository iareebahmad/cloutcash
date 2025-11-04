import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { ForInfluencers } from "@/components/ForInfluencers";
import { ForBrands } from "@/components/ForBrands";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
        <ForInfluencers />
        <ForBrands />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;
