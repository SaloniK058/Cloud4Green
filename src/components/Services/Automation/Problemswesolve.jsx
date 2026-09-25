import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";

/* "Problems we solve" — the FAQ layout from the reference, re-cut for the
   automation page: a kicker, a two-part headline, one line of context,
   then an open two-column list hanging off a thin vertical thread.
   Nothing is collapsed: a visitor should recognise their problem at a
   glance, not open five boxes to find it.

   Every problem is a link. It takes the visitor to the matching solution
   and its example workflows, so the section works as a menu, not just a
   list. Edit the copy, examples and links in PROBLEMS below; the markup
   never needs to change. */

const PROBLEMS = [
  {
    slug: "repetitive-tasks",
    title: "Too many repetitive tasks",
    body: "Automate recurring activities, approvals, reporting and operational workflows.",
    examples: ["Expense approvals", "Weekly ops reports", "Employee onboarding"],
  },
  {
    slug: "disconnected-systems",
    title: "Disconnected enterprise systems",
    body: "Connect cloud platforms, business applications and IT tools through integrated workflows.",
    examples: ["CRM → ERP sync", "Jira ↔ ServiceNow", "Cloud cost → Finance"],
  },
  {
    slug: "incident-response",
    title: "Slow incident response",
    body: "Automate alert enrichment, incident classification, routing and remediation.",
    examples: ["Alert enrichment", "Auto-triage & routing", "Self-healing restarts"],
  },
  {
    slug: "infrastructure-management",
    title: "Manual infrastructure management",
    body: "Automate provisioning, configuration, scaling and lifecycle operations.",
    examples: ["Environment provisioning", "Auto-scaling rules", "Patch & lifecycle"],
  },
  {
    slug: "operational-visibility",
    title: "Lack of operational visibility",
    body: "Monitor workflows, track execution and surface failures or bottlenecks.",
    examples: ["Run history & audit", "SLA breach alerts", "Bottleneck reports"],
  },
];

/* Where each problem leads. For now it's an anchor further down this
   page; when each solution gets its own page, change this one line
   (e.g. `/services/automation/${slug}`). */
const solutionHref = (slug) => `#${slug}`;

/* Fades each item up the first time it scrolls into view — the
   reference's `.reveal.in`. It runs once and then stops observing, and
   anyone with reduced motion just sees the finished state. */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, shown];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`motion-safe:transition motion-safe:duration-700 motion-safe:ease-out ${
        shown ? "translate-y-0 opacity-100" : "motion-safe:translate-y-3 motion-safe:opacity-0"
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function ProblemItem({ problem, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    /* Right-hand column items get the reference's 70ms stagger, so a
       row arrives left then right instead of both at once. */
    <Reveal delay={index % 2 ? 70 : 0}>
      <Link
        to={solutionHref(problem.slug)}
        className="group relative block h-full rounded-2xl border border-transparent p-6 transition-colors duration-300 hover:border-[#101418]/8 hover:bg-white focus-visible:border-[#0B5CFF]/40 focus-visible:bg-white focus-visible:outline-none lg:p-7"
      >
        <span className="font-mono text-[12px] tracking-[0.08em] text-[#0B5CFF]">{number}</span>

        <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[#101418] lg:text-[20px]">
          {problem.title}
        </h3>

        <p className="mt-2 max-w-[46ch] text-[15px] leading-6 text-[#4A5261]">{problem.body}</p>

        {/* Example workflows: the concrete version of the sentence above,
            so someone scanning for "Jira" or "onboarding" finds it. */}
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Example workflows">
          {problem.examples.map((example) => (
            <li
              key={example}
              className="rounded-full border border-[#101418]/10 bg-[#FAFAF7] px-3 py-1 text-[12.5px] text-[#4A5261] transition-colors group-hover:border-[#0B5CFF]/20 group-hover:bg-[#EEF3FF]"
            >
              {example}
            </li>
          ))}
        </ul>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0B5CFF]">
          See the solution
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
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
          <Reveal>
            <p className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
              Problems we solve
            </p>
          </Reveal>

          <Reveal>
            <h2
              id="problems-title"
              className="mt-3 max-w-[18ch] font-recoleta text-[2rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.4rem] lg:text-[2.75rem]"
            >
              Five problems we hear{" "}
              {/* The reference's <em>: the second half of the line in a
                  softer voice, so the heading reads as a statement and a
                  turn. */}
              <em className="not-italic text-[#0B5CFF]">before anything gets automated.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p className="mt-4 max-w-[560px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
              Start with the one that sounds like your week. Each opens the fix we build for it and the
              workflows we've already shipped.
            </p>
          </Reveal>

          {/* ---------------------------------------------- the list */}
          {/* Two open columns from md up. The -mx-6 lets each card's hover
              background reach past the text, while the words themselves
              stay aligned with the heading above. */}
          <ul className="-mx-6 mt-12 grid gap-2 md:grid-cols-2 md:gap-x-6 md:gap-y-4 lg:mt-14 lg:-mx-7">
            {PROBLEMS.map((problem, index) => (
              <li key={problem.slug}>
                <ProblemItem problem={problem} index={index} />
              </li>
            ))}
          </ul>

          {/* The reference's closing line: where to go for the long version. */}
          <Reveal>
            <p className="mt-10 max-w-[640px] text-[15px] leading-6 text-[#4A5261]">
              Not on the list? Most projects start with a problem like one of these and grow from there.{" "}
              <Link
                to="/contact"
                className="font-medium text-[#0B5CFF] underline decoration-[#0B5CFF]/30 underline-offset-4 transition-colors hover:decoration-[#0B5CFF]"
              >
                Tell us about yours →
              </Link>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}