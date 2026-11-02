import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* Our solutions — the three-tier offering, laid out as a progression
   rather than three equal boxes: rule-based work on the left, judgment
   in the middle, orchestration on the right. A connecting arrow sits in
   each gap on desktop (a down-arrow on mobile, where the cards stack),
   so the section reads left-to-right the way the headline says it:
   simple automation → intelligent execution.

   Copy is written to be read by a buyer deciding what to ask for, not
   skimmed — each tier says what kind of work it fits and what it's made
   of, and closes with the same dot-separated capability line the brief
   gave, kept as plain text rather than turned into pill chips (the
   catalogue and capabilities sections already use that pattern; this
   one reads more like a spec line, which suits three items better than
   six or twelve). Edit SOLUTIONS below; the markup never needs to
   change.

   Set on navy so it breaks up the run of cream sections around it: the
   house asterisk eyebrow and Recoleta headline, over glassy cards with a
   ghosted tier number and a blue top edge that draws in on hover. */

const SOLUTIONS = [
  {
    kicker: "Rule-based",
    title: "Workflow Automation",
    body: "Connects your applications and carries out repeatable, well-defined work exactly the way you'd do it yourself — every time, without exception.",
    capabilities: ["Process automation", "System integration", "Approval workflows", "RPA"],
    icon: "workflow",
  },
  {
    kicker: "Judgment-based",
    title: "AI Agents",
    body: "Goal-oriented assistants that read the situation, reach into your enterprise tools, and complete tasks you'd otherwise hand to a person.",
    capabilities: ["Knowledge agents", "Task agents", "Research agents", "Multi-agent workflows"],
    icon: "agent",
  },
  {
    kicker: "Orchestrated",
    title: "Agentic Automation",
    body: "Pairs AI reasoning with dependable workflow execution to run complex, multi-step processes end to end — with people kept in the loop where it matters.",
    capabilities: ["Agent orchestration", "Human approvals", "Enterprise integrations", "Monitoring"],
    icon: "agentic",
  },
];

/* Three icons on a shared 24-viewBox / 1.5-stroke grid: a simple wired
   connection for rule-based work, a single reasoning point for an agent,
   and a small hub-and-spoke for orchestration across several of them. */
const ICONS = {
  workflow: (
    <>
      <rect x="2.75" y="4.25" width="6.5" height="6.5" rx="1.5" />
      <rect x="14.75" y="13.25" width="6.5" height="6.5" rx="1.5" />
      <path d="M9.25 7.5h3a2 2 0 0 1 2 2v4.25" />
    </>
  ),
  agent: (
    <>
      <circle cx="12" cy="12" r="7.75" />
      <path d="M12 8.5v3.5l2.4 1.4" />
    </>
  ),
  agentic: (
    <>
      <circle cx="12" cy="5.25" r="2" />
      <circle cx="5.5" cy="17.5" r="2" />
      <circle cx="18.5" cy="17.5" r="2" />
      <path d="M12 7.25v3l-4.7 5.4M15 10.25l3.5 7.25" />
    </>
  ),
};

/** The brand asterisk, as it appears on every section eyebrow. */
function Asterisk({ className = "h-3.5 w-3.5", stroke = "stroke-[#0B5CFF]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 ${stroke} ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* The reveal is the house one (components/motion/Reveal.jsx) — this file
   used to carry its own IntersectionObserver fade on different numbers. */

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </g>
    </svg>
  );
}

/* The arrow that sits in the gap between tiers — a right chevron on
   desktop where the row runs left to right, a down chevron on mobile
   where the cards stack. Decorative only: the tiers aren't a required
   sequence, so it isn't read aloud as one. */
function Connector() {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center py-3 lg:py-0">
      {/* A dashed wire across the gap, like a link on a circuit diagram. */}
      <span className="absolute h-full border-l border-dashed border-[#8FB2FF]/30 lg:h-0 lg:w-full lg:border-l-0 lg:border-t" />
      <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#8FB2FF]/30 bg-[#0A1730] text-[#8FB2FF] shadow-[0_0_0_4px_rgba(11,92,255,0.10),0_0_18px_rgba(11,92,255,0.35)]">
        <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 stroke-current lg:-rotate-90">
          <path d="M8 3v10M4 9.5 8 13l4-3.5" />
        </svg>
      </span>
    </div>
  );
}

function SolutionCard({ solution, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative isolate flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-[#8FB2FF]/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-30px_rgba(11,92,255,0.55)] lg:p-8">
      {/* A blue edge along the top that draws in from the left on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#0B5CFF] via-[#8FB2FF] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* The tier number, set large and ghosted into the top-right corner;
          it brightens a little on hover. Recoleta ships as a single
          Medium file, so font-medium. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-4 font-recoleta text-[4.5rem] font-medium leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-[#8FB2FF]/[0.16] lg:right-7"
      >
        {number}
      </span>

      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#8FB2FF]/25 bg-[#0B5CFF]/15 text-[#8FB2FF] transition-colors duration-300 group-hover:border-[#0B5CFF] group-hover:bg-[#0B5CFF] group-hover:text-white">
        <Icon name={solution.icon} />
      </span>

      <p className="mt-7 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8FB2FF]">
        <span aria-hidden="true" className="h-px w-4 bg-[#8FB2FF]" />
        {solution.kicker}
      </p>

      <h3 className="mt-3 font-recoleta text-[1.5rem] font-medium leading-[1.15] tracking-[-0.015em] text-white lg:text-[1.65rem]">
        {solution.title}
      </h3>

      <p className="mt-3 text-[15px] leading-6 text-white/65">{solution.body}</p>

      {/* The capability line, kept as the brief's dot-separated list
          rather than broken into pills — a spec, not a set of tags.
          mt-auto pins it, so the three cards line up at the foot. */}
      <p className="mt-auto pt-7">
        <span className="block border-t border-white/10 pt-5 text-[12.5px] leading-5 text-white/55 transition-colors duration-300 group-hover:text-white/85">
          {solution.capabilities.join(" · ")}
        </span>
      </p>
    </div>
  );
}

export default function OurSolutions() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#0A1730] py-20 text-white lg:py-28"
    >
      {/* The navy ground: a faint blueprint grid that fades out toward the
          edges, and a blue glow rising from behind the tiers. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(143,178,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(143,178,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 h-[460px] w-[1000px] -translate-x-1/2 rounded-full bg-[#0B5CFF]/25 blur-[120px]"
      />

      <Container>
        {/* ---------------------------------------------- the head */}
        <RevealGroup delay={CUE.lead} className="max-w-[760px]">
          <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8FB2FF]">
            <Asterisk stroke="stroke-[#8FB2FF]" />
            Our solutions
          </RevealItem>

          <RevealItem
            as="h2"
            id="solutions-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            From simple automation{" "}
            <em className="not-italic text-[#8FB2FF]">to intelligent execution.</em>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-[600px] text-[15px] leading-7 text-white/65 lg:text-[16px]">
            Three ways to take work off your team's plate, in order of how much judgment it needs. Start with rules
            — add reasoning only where the process calls for it.
          </RevealItem>
        </RevealGroup>

        {/* ---------------------------------------------- the tiers */}
        {/* Each tier arrives a beat after the one before, so the row reads
            left to right the way the headline does — and the connectors are
            beats of their own, so each arrow lands between the two tiers it
            joins. */}
        <RevealGroup delay={CUE.follow} className="mt-12 grid grid-cols-1 items-stretch gap-0 lg:mt-14 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-x-5">
          <RevealItem className="h-full">
            <SolutionCard solution={SOLUTIONS[0]} index={0} />
          </RevealItem>
          <RevealItem className="grid">
            <Connector />
          </RevealItem>
          <RevealItem className="h-full">
            <SolutionCard solution={SOLUTIONS[1]} index={1} />
          </RevealItem>
          <RevealItem className="grid">
            <Connector />
          </RevealItem>
          <RevealItem className="h-full">
            <SolutionCard solution={SOLUTIONS[2]} index={2} />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}