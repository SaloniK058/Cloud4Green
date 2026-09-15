import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/EnterpriseCTA/EnterpriseCTA";
// import { Button } from "@/components/ui/button";
import CatalougeSection from "@/pages/products/CatalougeSections";



// import heroImage from "@/assets/images/clients.jpg";
// // import flowBackdrop from "@/assets/images/pexels-steve-12843342.jpg";
// import labFlowIllustration from "@/assets/images/lab10.png";
// import LabFlow from "@/components/sections/EnterpriseLab/Labflow";
import Howitworks from "@/components/EnterpriseLabs/Howitworks";
import WhoItsFor from "@/pages/products/WhoIsItFor";
import FaqSection from "@/components/faq/Faqsection";
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
const sections = [
  // { label: "Overview", href: "#overview" },
  // { label: "What a lab is", href: "#what-a-lab-is" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "Who it's for", href: "#who-its-for" },
  { label: "FAQ", href: "#faq" },
];

/** Scroll-triggered entrance, matching <CtaSection>'s timing. */
function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

/* --- Content ------------------------------------------------------------- */

/* The numbers are the portfolio's, the same three quoted in the closing CTA. */
const stats = [
  { value: "28", label: "Technology domains" },
  { value: "415", label: "Technologies covered" },
  { value: "3–5", label: "Working days to launch" },
  { value: "1:1", label: "Cloud account per learner" },
];

const pillars = [
  {
    title: "Provisioned, not simulated",
    body: "Every learner gets their own cloud account or namespace with real credentials and a real console — built on demand when the lab opens, torn down when it closes.",
  },
  {
    title: "Tasks that are checked",
    body: "Objectives validate against the live environment rather than a quiz. A task is complete when the thing the learner built actually works.",
  },
  {
    title: "Guardrails and budgets",
    body: "Scoped IAM, spend caps and automatic expiry on every environment, so an afternoon of training can't turn into an incident or an invoice.",
  },
  {
    title: "Evidence, not attendance",
    body: "Per-learner records of what was attempted, built and completed — the thing a capability review needs, and the thing a sign-in sheet has never been.",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell us the roles",
    body: "Who you're training, how many people, and by when. Job roles, not course codes.",
  },
  {
    n: "02",
    title: "We build the track",
    body: "Labs mapped to the tools your stack actually runs, sequenced into a track with the environments and datasets already prepared.",
  },
  {
    n: "03",
    title: "Your teams run it",
    body: "Instructor-led cohorts or self-paced, on your calendar. Progress, completion and spend land in one place.",
  },
];

/* The domain list is the shape of the catalogue, not the whole of it — a full
   catalogue belongs in the brochure the hero links to. */
const domains = [
  { name: "Cloud & Platform Engineering" },
  { name: "Containers, Kubernetes & Platform Engineering" },
  { name: "DevOps, DevSecOps & GitOps" },
  { name: "Observability, SRE & FinOps" },
  { name: "Data Engineering & Lakehouse" },
  { name: "Machine Learning & MLOps" },
  { name: "Generative AI, RAG & Agentic AI" },
  { name: "Enterprise Copilots & AI Platforms" },
  { name: "AI Infrastructure & GPU Computing" },
  { name: "Cybersecurity Operations & SOC" },
  { name: "Offensive Security & Red Team" },
  { name: "Zero Trust, SASE & Identity" },
  { name: "Cloud Security, CNAPP & AI Security" },
  { name: "Networking & Network Automation" },
  { name: "Virtualization, Private & Sovereign Cloud" },
  { name: "AI Governance, Risk & Compliance" },
  { name: "Enterprise Applications & Low-Code" },
  { name: "Emerging & Sustainable Technology" },
  { name: "Software Engineering & API Development", isNew: true },
  { name: "Quality Engineering & Test Automation", isNew: true },
  { name: "Databases & Data Platforms", isNew: true },
  { name: "Storage, Backup & Cyber Resilience", isNew: true },
  { name: "Operating Systems & Enterprise Directory", isNew: true },
  { name: "Digital Workplace & End-User Computing", isNew: true },
  { name: "Mainframe & Legacy Modernisation", isNew: true },
  { name: "Embedded, Real-Time & Simulation", isNew: true },
  { name: "AI Fluency for the Workforce", isNew: true },
  { name: "Agile, ITIL & Ways of Working", isNew: true },
];

const audiences = [
  {
    title: "Platform and cloud teams",
    body: "Bring a team onto a new provider, a new orchestrator or a new pipeline without practising on production.",
  },
  {
    title: "Learning and enablement",
    body: "Run a programme with completion data that stands up to scrutiny, instead of a catalogue nobody finishes.",
  },
  {
    title: "Partners and pre-sales",
    body: "Give engineers a live environment to demo from and to break, so the answer in the room comes from having done it.",
  },
  {
    title: "Certification cohorts",
    body: "Pair exam tracks with the hands-on hours candidates are short of, then measure who is ready before booking the seat.",
  },
];


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
<Howitworks/>
<CatalougeSection />
 <WhoItsFor/>
        {/* ── Who it's for ─────────────────────────────────────────── */}
        {/* <section
          id="who-its-for"
          className="scroll-mt-24 border-t border-[#101418]/8 bg-white py-20 lg:py-28"
        >
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>Who it's for</Eyebrow>

              <h2 className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
                Built for the teams
                <br className="hidden sm:block" /> doing the work
                <span className="text-[#0B5CFF]">.</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {audiences.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.06}>
                  <div className="border-t border-[#101418]/10 pt-6">
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#101418]">
                      {a.title}
                    </h3>

                    <p className="mt-3 max-w-md text-[14.5px] leading-7 text-[#4A5261]">
                      {a.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section> */}
       

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
function LabConsole() {
  const lines = [
    { text: "$ lab start aws/eks-production-readiness", tone: "cmd" },
    { text: "→ provisioning account  ······  learner-0148", tone: "dim" },
    { text: "→ applying guardrails   ······  iam, budget, ttl 4h", tone: "dim" },
    { text: "→ seeding cluster       ······  3 nodes, 2 namespaces", tone: "dim" },
    {
      text: "✓ environment ready     ······  console + credentials issued",
      tone: "ok",
    },
  ];

  const tasks = [
    { label: "Expose the service behind an ingress", state: "done" },
    { label: "Set a pod disruption budget", state: "done" },
    { label: "Survive a node drain", state: "active" },
    { label: "Cap the namespace at 4 vCPU", state: "todo" },
  ];

  return (
    <div className="relative">
      {/* ambient blue wash, the section's only colour behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[32px] bg-[#0B5CFF]/[0.07] blur-[60px]"
      />

      <div className="relative overflow-hidden rounded-[18px] border border-[#DFE6F5] bg-white shadow-[0_24px_60px_-24px_rgba(16,32,74,0.3)]">
        {/* title bar */}
        <div className="flex items-center gap-3 border-b border-[#101418]/8 bg-[#FBFDFF] px-5 py-3.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E4E8EB]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E4E8EB]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E4E8EB]" />
          </span>

          <span className="truncate text-[12px] font-medium tracking-[-0.01em] text-[#6B7280]">
            eks-production-readiness · lab session
          </span>

          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0B5CFF]/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0B5CFF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0B5CFF]" />
            Live
          </span>
        </div>

        {/* the shell */}
        <div className="overflow-x-auto bg-[#101418] px-5 py-5 font-mono text-[12.5px] leading-6">
          {lines.map((l) => (
            <p
              key={l.text}
              className={`whitespace-pre ${
                l.tone === "cmd"
                  ? "text-white"
                  : l.tone === "ok"
                    ? "text-[#5CE08A]"
                    : "text-white/45"
              }`}
            >
              {l.text}
            </p>
          ))}
        </div>

        {/* the tasks the environment is there to serve */}
        <div className="px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
            Objectives
          </p>

          <ul className="mt-3.5 space-y-2.5">
            {tasks.map((t) => (
              <li key={t.label} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
                    t.state === "done"
                      ? "border-[#0B5CFF] bg-[#0B5CFF] text-white"
                      : t.state === "active"
                        ? "border-[#0B5CFF] text-[#0B5CFF]"
                        : "border-[#E4E8EB] text-transparent"
                  }`}
                >
                  ✓
                </span>

                <span
                  className={`text-[13.5px] ${
                    t.state === "todo" ? "text-[#9AA3AF]" : "text-[#101418]"
                  }`}
                >
                  {t.label}
                </span>

                {t.state === "active" && (
                  <span className="ml-auto shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-[#0B5CFF]">
                    Checking
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
