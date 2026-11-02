import Container from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE, STAGGER } from "@/components/motion/reveal-tokens";

/* Business challenges — six problems in an open two-column list hanging
   off a thin vertical thread. Same build as before (IntersectionObserver
   reveal, no framer-motion), rephrased and expanded from five items to
   six after comparing against the client's own "Business challenges"
   copy (Manual processes / Disconnected systems / Limited scalability /
   Operational errors):

     - "Manual processes" absorbed into the existing repetitive-tasks
       item, retitled "Manual, repetitive processes".
     - "Disconnected systems" already existed under that name — kept.
     - "Limited scalability" is new, and takes over the provisioning /
       scaling ground the old "Manual infrastructure management" item
       covered, so that item was retired rather than kept alongside it.
     - "Operational errors" is new: manual handoffs, inconsistency and
       compliance risk, distinct from "slow incident response".
     - "Slow incident response" and "Lack of operational visibility" are
       unchanged — nothing in the new copy overlapped them.

   The closing "Not on the list?" CTA line has been removed, so the
   section now ends with the grid. The example-workflow chips and the
   "See the solution" link are gone too — each item is now just a number,
   title and one line, and the hover tell is a blue quote rule down the
   left edge plus the row's hairline filling blue, not a card. Edit
   PROBLEMS below; the markup never needs to change. */

const PROBLEMS = [
  {
    slug: "manual-processes",
    title: "Manual, repetitive processes",
    body: "Automate recurring tasks, approvals and reporting so your team stops spending hours on work a workflow can handle.",
  },
  {
    slug: "disconnected-systems",
    title: "Disconnected enterprise systems",
    body: "Connect cloud platforms, business applications and IT tools so information moves between them without manual re-entry.",
  },
  {
    slug: "limited-scalability",
    title: "Limited scalability",
    body: "Automate provisioning, configuration and scaling so growing workloads don't demand more manual time and coordination.",
  },
  {
    slug: "operational-errors",
    title: "Operational errors",
    body: "Remove the manual handoffs between teams and systems that create delays, inconsistencies and compliance risk.",
  },
  {
    slug: "incident-response",
    title: "Slow incident response",
    body: "Automate alert enrichment, incident classification, routing and remediation so issues get resolved faster.",
  },
  {
    slug: "operational-visibility",
    title: "Lack of operational visibility",
    body: "Monitor workflows, track execution and surface failures or bottlenecks before they become incidents.",
  },
];

/* The reveal is the house one (components/motion/Reveal.jsx). This file
   used to run its own IntersectionObserver fade at 0.7s / 12px on a plain
   ease-out, a beat out of step with every other section on the site. */

function ProblemItem({ problem, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    /* Right-hand column items trail by one STAGGER, so a row arrives left
       then right instead of both at once. */
    <Reveal delay={index % 2 ? STAGGER : 0} className="h-full">
      <div className="group relative flex h-full flex-col px-5 py-6 sm:p-6 lg:p-7">
        {/* The hover tell: no card, just a blue quote rule that draws down
            the left edge, like a pull quote. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-0 top-6 w-[2px] origin-top scale-y-0 rounded-full bg-[#0B5CFF] transition-transform duration-500 ease-out group-hover:scale-y-100 lg:bottom-7 lg:top-7"
        />

        {/* Number and a hairline that runs to the edge — the row's rule,
            and the item's hover tell: the line fills blue from the left. */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold tabular-nums tracking-[0.16em] text-[#0B5CFF]">{number}</span>
          <span aria-hidden="true" className="relative h-px flex-1 bg-[#101418]/10">
            <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#0B5CFF] via-[#0B5CFF]/50 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </span>
        </div>

        <h3 className="mt-5 font-recoleta text-[1.45rem] font-medium leading-[1.15] tracking-[-0.015em] text-[#101418] lg:text-[1.6rem]">
          {problem.title}
        </h3>

        <p className="mt-3 max-w-[46ch] text-[15px] leading-6 text-[#4A5261]">{problem.body}</p>
      </div>
    </Reveal>
  );
}

export default function ProblemsWeSolve() {
  return (
    <section
      id="problems"
      aria-labelledby="problems-title"
      className="relative border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <Container>
        <div className="relative lg:pl-16">
          {/* The thread the list hangs from — the reference's ::before: a
              glowing bead at the top and a line that fades as it runs down.
              Decorative only, and hidden on small screens where there is no
              gutter for it. */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-2 left-3 top-2 hidden w-[7px] lg:block">
            <span className="absolute left-0 top-0 h-[7px] w-[7px] rounded-full bg-[#0B5CFF] shadow-[0_0_0_4px_rgba(11,92,255,0.12),0_0_16px_rgba(11,92,255,0.5)]" />
            <span className="absolute bottom-0 left-[3px] top-[14px] w-px bg-gradient-to-b from-[#0B5CFF]/40 to-[#0B5CFF]/0" />
          </div>

          {/* ---------------------------------------------- the intro */}
          {/* One trigger for the three, so they arrive on the stagger rather
              than on however far apart they happen to sit. */}
          <RevealGroup delay={CUE.lead}>
            <RevealItem as="p" className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
              Business challenges
            </RevealItem>

            <RevealItem
              as="h2"
              id="problems-title"
              className="mt-3 max-w-[22ch] font-recoleta text-[2rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.4rem] lg:text-[2.75rem]"
            >
              Your teams deserve better{" "}
              {/* The reference's <em>: the second half of the line in a
                  softer voice, so the heading reads as a statement and a
                  turn. */}
              <em className="not-italic text-[#0B5CFF]">than repetitive work.</em>
            </RevealItem>

            <RevealItem as="p" className="mt-4 max-w-[560px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
              Before we talk about automation, here's what's usually getting in the way. Start with the one that
              sounds like your week.
            </RevealItem>
          </RevealGroup>

          {/* ---------------------------------------------- the list */}
          {/* Two open columns from md up. The negative margin gives each
              item's hover quote rule a gutter to sit in, while the words
              themselves stay aligned with the heading above. It matches the
              Container's own padding at each width (px-5 on phones), so the
              list never reaches past the edge of the screen. Six items fill
              the grid evenly at three rows, so no closing CTA cell is
              needed. */}
          <ul className="-mx-5 mt-12 grid gap-3 sm:-mx-6 md:grid-cols-2 md:gap-x-6 md:gap-y-4 lg:-mx-7 lg:mt-14">
            {PROBLEMS.map((problem, index) => (
              <li key={problem.slug}>
                <ProblemItem problem={problem} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}