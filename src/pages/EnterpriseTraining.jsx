import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/EnterpriseCTA/EnterpriseCTA";
import CorporateTrainingHero from "@/components/EnterpriseTraining/Corporatetraininghero";
import SkillsCatalog from "@/components/EnterpriseTraining/Skillscatalog";

// import FaqSection from "@/components/faq/Faqsection";
// import { enterpriseTrainingFaqs } from "@/data/faqs";

/**
 * /products/enterprise-training — the fourth of the five product pages the
 * Products mega menu links to (see src/config/navigation.js).
 *
 * Blank scaffold. The placeholder <Placeholder> blocks below are there to hold
 * the shape of the page; replace each one with its real section component as it
 * gets built, and drop <Placeholder> once the last one is gone.
 *
 * House rules the sections follow, same as the other product pages:
 *   · cream ground (#FAFAF7), white for the alternating band
 *   · display type in font-recoleta, uppercase, tracking tightened, with the
 *     blue full stop; Recoleta ships Medium only, so always font-medium
 *   · #101418 ink, #4A5261 body copy, #0B5CFF blue as an accent only
 *   · every section scroll-mt-24 so the sub-nav anchors don't sit under the navbar
 *
 * Section components belong in src/components/EnterpriseTraining/, mirroring
 * src/components/E-learning/ and src/components/Certifications/.
 */

/* The sub-nav doubles as the page's table of contents; each entry is the id of
   a section below. Rename, reorder or trim as the page takes shape. */
const sections = [
  { label: "Overview", href: "#overview" },
  { label: "Programs", href: "#programs" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Who it's for", href: "#who-its-for" },
  { label: "FAQ", href: "#faq" },
];

/** The brand asterisk, as it appears on the hero and in the closing CTA. */
function Asterisk({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 stroke-[#0B5CFF] ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/** Section eyebrow: asterisk, then a tracked-out label in accent blue. */
function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
      <Asterisk />
      {children}
    </p>
  );
}

/**
 * The page's section sub-nav. In flow rather than sticky (the navbar above is
 * already sticky), and scrolls horizontally on a phone instead of wrapping.
 * Plain <a href="#id"> since these are in-page anchors.
 */
function SectionNav() {
  return (
    <nav
      aria-label="On this page"
      className="border-b border-[#101418]/8 bg-[#FAFAF7]"
    >
      <Container>
        <ul className="-mx-1 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <li key={s.href} className="shrink-0">
              <a
                href={s.href}
                className="block rounded-full px-3.5 py-1.5 text-[13.5px] font-medium tracking-[-0.01em] text-[#4A5261] transition-colors hover:bg-[#101418]/5 hover:text-[#101418]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

/**
 * Temporary stand-in for a section that hasn't been built yet. Carries the id
 * so the sub-nav anchors already resolve, and the band/ground alternation so
 * the page reads at the right rhythm while it's still empty.
 */
function Placeholder({ id, eyebrow, title, band = false, children }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[#101418]/8 py-20 lg:py-28 ${
        band ? "bg-white" : "bg-[#FAFAF7]"
      }`}
    >
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>

        <h2 className="mt-5 max-w-2xl font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
          {title}
          <span className="text-[#0B5CFF]">.</span>
        </h2>

        {children ?? (
          <p className="mt-5 max-w-xl text-[14.5px] leading-7 text-[#4A5261]">
            Section to come.
          </p>
        )}
      </Container>
    </section>
  );
}

/* --- Page ---------------------------------------------------------------- */

export default function EnterpriseTraining() {
  return (
    <>
      <Navbar />
      <SectionNav />

      <main className="bg-[#FAFAF7]">
        {/* ── Masthead — drop the hero component in here. ─────────────────── */}
        <CorporateTrainingHero/>
        <SkillsCatalog/>
        <Placeholder
          id="overview"
          eyebrow="Enterprise Training"
          title={
            <>
              Enterprise Training
              <br className="hidden sm:block" /> page masthead
            </>
          }
        />

        {/* ── Programs ─────────────────────────────────────────────────────── */}
        <Placeholder id="programs" eyebrow="Programs" title="Training programs" band />

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <Placeholder id="how-it-works" eyebrow="How it works" title="How it works" />

        {/* ── Who it's for ─────────────────────────────────────────────────── */}
        <Placeholder id="who-its-for" eyebrow="Who it's for" title="Who it's for" band />

        {/* ── FAQ ──────────────────────────────────────────────────────────
            Add an `enterpriseTrainingFaqs` array to src/data/faqs.js, then
            uncomment this and the two imports at the top of the file. */}
        {/* <FaqSection faqs={enterpriseTrainingFaqs} /> */}

        {/* ── Closing CTA — the homepage's, unchanged ─────────────────────── */}
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
