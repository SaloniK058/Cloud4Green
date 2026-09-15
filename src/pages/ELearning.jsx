import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/EnterpriseCTA/EnterpriseCTA";

import LearningSolutions from "@/components/E-learning/LearningSolutions";
import ScrubSection from "@/components/E-learning/ScrubSection";
import Pillarssection from "@/components/E-learning/Pillarssecton";
import Statssection from "@/components/E-learning/Statssection";
import Industriessection from "@/components/E-learning/Industriessection";
import FaqSection from "@/components/faq/Faqsection";
import { eLearningFaqs } from "@/data/faqs";

/**
 * /products/e-learning — the second of the five product pages the Products
 * mega menu links to (see src/config/navigation.js).
 *
 * House rules the sections below follow, same as /products/enterprise-labs:
 *   · cream ground (#FAFAF7), white for the alternating band
 *   · display type in font-recoleta, uppercase, tracking tightened, with the
 *     blue full stop; Recoleta ships Medium only, so always font-medium
 *   · #101418 ink, #4A5261 body copy, #0B5CFF blue as an accent only
 *   · every section scroll-mt-24 so the sub-nav anchors don't sit under the navbar
 */

/* The sub-nav doubles as the page's table of contents; each entry is the id of
   a section below. Rename, reorder or trim as the page takes shape. */
const sections = [
  { label: "Overview", href: "#overview" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Courses", href: "#courses" },
  { label: "Who it's for", href: "#who-its-for" },
  { label: "FAQ", href: "#faq" },
];

export default function ELearning() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <LearningSolutions />
        <ScrubSection />
        <Pillarssection />
        <Statssection />
        <Industriessection />

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        {/* Same component as /products/enterprise-labs; only the questions and
            the layout differ. This page runs eight of them, so the centred
            two-column arrangement keeps the list off the fold. */}
        <FaqSection
          faqs={eLearningFaqs}
          layout="centered"
          title="The ones we always get"
        />

        {/* ── Closing CTA — the homepage's, unchanged ─────────────────────── */}
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
