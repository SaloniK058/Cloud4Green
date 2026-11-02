import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
import CatalougeSection from "@/components/enterprise-labs/CatalogueSections";

import Howitworks from "@/components/enterprise-labs/HowItWorks";
import WhoItsFor from "@/components/enterprise-labs/WhoIsItFor";
import FaqSection from "@/components/faq/FaqSection";
import { enterpriseLabsFaqs } from "@/data/faqs";

/**
 * /products/enterprise-labs — the first of the five product pages the Products
 * mega menu links to (see src/config/navigation.js).
 *
 * The masthead is the editorial pattern: a section sub-nav under the site
 * navbar, then a full-bleed photograph with a dark translucent card sitting on
 * the left third of it carrying the label, the headline and the calls to
 * action. Everything below it is the site's own language — cream ground, ink
 * display type set in Recoleta and uppercased with the blue full stop, blue
 * only as an accent — and the page closes on the same <CtaSection> the homepage
 * does, so the step down into the black footer is identical across the site.
 *
 * Recoleta ships as a single Medium file (see the @font-face in index.css), so
 * every display line here is font-medium. Asking for a heavier weight would get
 * a synthesised bold.
 */

const EASE = [0.22, 1, 0.36, 1];

/* The sub-nav doubles as the page's table of contents; each entry is the id of
   a section below. */

/* --- Content ------------------------------------------------------------- */

/* The numbers are the portfolio's, the same three quoted in the closing CTA. */

/* --- Page ---------------------------------------------------------------- */

export default function EnterpriseLabs() {
  return (
    <>
      <Navbar />

      {/* ── Section sub-nav ────────────────────────────────────────── */}
      {/* Sits under the site navbar, in flow rather than sticky: the navbar
          above it is already sticky, and two stacked sticky bars eat a third of
          a laptop viewport. Scrolls horizontally on a phone instead of
          wrapping, so the row stays one line at every width. */}
      {/*  */}

      <main className="bg-[#FAFAF7]">
        {/* ── Masthead ─────────────────────────────────────────────── */}
                      

        {/* ── Overview ─────────────────────────────────────────────── */}
<Howitworks/> {/* this is where svg and hero lies */}
<CatalougeSection />
 <WhoItsFor/>
        
       

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        {/* Same component as /products/e-learning; only the questions
            differ. The copy lives in src/data/faqs.js. */}
        <FaqSection faqs={enterpriseLabsFaqs} />

        {/* ── Closing CTA — the homepage's, unchanged ──────────────── */}
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}

/* --- Overview visual ----------------------------------------------------- */

/**
 * A lab environment being provisioned: the product's one irreducible moment,
 * drawn rather than screenshotted so it stays legible at any width and doesn't
 * date the page the next time a cloud console gets restyled.
 *
 * Static on purpose. A ticking fake terminal reads as a loading state that
 * never resolves, and the point of the panel is the resolved state — the last
 * line is the environment being ready.
 */
