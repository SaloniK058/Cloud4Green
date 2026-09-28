import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/EnterpriseCTA/EnterpriseCTA";

/**
 * /services/consulting — linked from the Services tab of the navbar mega menu
 * (see src/config/navigation.js).
 *
 * Blank scaffold: replace the section below with the real section components
 * (src/components/Services/Consulting/) as they get built.
 */
export default function Consulting() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <section id="overview" className="scroll-mt-24 py-20 lg:py-28">
          <Container>
            <h1 className="max-w-2xl font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
              Consulting
              <span className="text-[#0B5CFF]">.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[14.5px] leading-7 text-[#4A5261]">
              Strategic guidance from cloud experts to plan, migrate and
              optimize your technology landscape.
            </p>
          </Container>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
