import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/EnterpriseCTA/EnterpriseCTA";
import AutomationHero from "@/components/Services/Automation/Automationhero";
import ProblemsWeSolve from "@/components/Services/Automation/Problemswesolve";
import AutomationCapabilities from "@/components/Services/Automation/Automationcapabilities";

/**
 * /services/automation — linked from the Services tab of the navbar mega menu
 * (see src/config/navigation.js).
 *
 * Blank scaffold: replace the section below with the real section components
 * as they get built.
 */
export default function Automation() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <AutomationHero/>
        <ProblemsWeSolve/>
        <AutomationCapabilities/>
        <section id="overview" className="scroll-mt-24 py-20 lg:py-28">
          <Container>
            <h1 className="max-w-2xl font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
              Automation
              <span className="text-[#0B5CFF]">.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[14.5px] leading-7 text-[#4A5261]">
              Streamline operations with cloud and AI-driven automation that
              reduces manual effort and cost.
            </p>
          </Container>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
