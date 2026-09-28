import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/EnterpriseCTA/EnterpriseCTA";
import AutomationHero from "@/components/Services/Automation/Automationhero";
import ProblemsWeSolve from "@/components/Services/Automation/Problemswesolve";
import AutomationCapabilities from "@/components/Services/Automation/Automationcapabilities";
import AutomationCatalogue from "@/components/Services/Automation/Automationcatalogue";
import AutoEcosystem from "@/components/Services/Automation/AutoEcosystem";
import DeliveryProcess from "@/components/Services/Automation/Deliveryprocess";

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
        <AutomationCatalogue/>
        <AutoEcosystem/>
        <DeliveryProcess/>
        

        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
