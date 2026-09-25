import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";

/* Automation capabilities — the core of the page. Same build as the
   Enterprise Learning "6 Pillars" section: a head (eyebrow, title, lede)
   over a 3 × 2 grid of tall image cards. Each card shows its icon, number
   and title at rest; on hover or keyboard focus the panel opens to show
   what's in scope and one concrete example.

   All copy lives in CAPABILITIES below. To add photos, import them at the
   top and set `image` on each entry, e.g.
     import cloudImg from "@/assets/images/automation/cloud.webp";
     { ..., image: cloudImg }
   Without an image a card falls back to a dark gradient, so the section
   already works before the photos exist. */

const CAPABILITIES = [
  {
    slug: "cloud-infrastructure",
    title: "Cloud & infrastructure automation",
    scope: "Provisioning, infrastructure as code, resource scaling, configuration management and cloud cost optimisation.",
    example: "Automatically provision a standardised AWS environment following an approved request.",
    icon: "cloud",
    image: null,
  },
  {
    slug: "devops-deployment",
    title: "DevOps & deployment automation",
    scope: "CI/CD pipelines, automated testing, release orchestration, GitOps and infrastructure deployment.",
    example: "Run automated security checks and deploy approved application changes.",
    icon: "branch",
    image: null,
  },
  {
    slug: "it-operations-incident",
    title: "IT operations & incident automation",
    scope: "Event correlation, incident routing, automated remediation, ticketing and service management.",
    example: "Detect an infrastructure issue and create an enriched ServiceNow incident.",
    icon: "pulse",
    image: null,
  },
  {
    slug: "security-compliance",
    title: "Security & compliance automation",
    scope: "Vulnerability workflows, access reviews, security alert triage, policy enforcement and compliance reporting.",
    example: "Route high-priority security findings for review and remediation.",
    icon: "shield",
    image: null,
  },
  {
    slug: "data-ai",
    title: "Data & AI automation",
    scope: "Data pipelines, workflow scheduling, AI-assisted classification, document processing and intelligent agents.",
    example: "Extract information from incoming documents and route exceptions for human approval.",
    icon: "spark",
    image: null,
  },
  {
    slug: "business-process",
    title: "Business process automation",
    scope: "Multi-system approvals, employee onboarding, notifications, document workflows and repetitive back-office processes.",
    example: "Coordinate an employee onboarding workflow across HR, identity and IT systems.",
    icon: "flow",
    image: null,
  },
];

/* Line icons drawn on the same 30 × 30 grid and 1.25 stroke as the
   pillar icons, so the two sections read as one family. */
const ICONS = {
  cloud: (
    <>
      <path d="M8.6 20.4h13.2a4.4 4.4 0 0 0 .5-8.8 6.4 6.4 0 0 0-12.3-1.5 4.9 4.9 0 0 0-1.4 10.3Z" />
      <path d="M11 25h8M15 20.4V25" />
    </>
  ),
  branch: (
    <>
      <circle cx="9" cy="6.6" r="2.6" />
      <circle cx="9" cy="23.4" r="2.6" />
      <circle cx="21" cy="11.4" r="2.6" />
      <path d="M9 9.2v11.6M21 14c0 4.6-3.8 5.6-8.6 6.6" />
    </>
  ),
  pulse: (
    <>
      <rect x="3.4" y="5.4" width="23.2" height="16.4" rx="2" />
      <path d="M11 25.4h8M15 21.8v3.6" />
      <path d="M6.8 14h3.6l2-4.4 3.2 8 2.2-5.2 1.6 1.6h3.8" />
    </>
  ),
  shield: (
    <>
      <path d="M15 3.8 5.6 7.4v6.8c0 5.8 4 10 9.4 12 5.4-2 9.4-6.2 9.4-12V7.4L15 3.8Z" />
      <path d="m10.8 15 3 3 5.6-6.2" />
    </>
  ),
  spark: (
    <>
      <path d="M13 4.6c.6 4.8 2.6 6.8 7.4 7.4-4.8.6-6.8 2.6-7.4 7.4-.6-4.8-2.6-6.8-7.4-7.4 4.8-.6 6.8-2.6 7.4-7.4Z" />
      <path d="M22.4 17.8c.3 2.4 1.3 3.4 3.7 3.7-2.4.3-3.4 1.3-3.7 3.7-.3-2.4-1.3-3.4-3.7-3.7 2.4-.3 3.4-1.3 3.7-3.7Z" />
    </>
  ),
  flow: (
    <>
      <rect x="3.6" y="4.4" width="9.2" height="7.2" rx="1.6" />
      <rect x="17.2" y="18.4" width="9.2" height="7.2" rx="1.6" />
      <path d="M8.2 11.6v5.2a2 2 0 0 0 2 2h7" />
      <path d="m14.8 16.4 2.4 2.4-2.4 2.4" />
    </>
  ),
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" className="h-[30px] w-[30px]">
      <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </g>
    </svg>
  );
}

/* The eyebrow's asterisk, from the pillars head. */
function Asterisk() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 text-[#0B5CFF]">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CapabilityCard({ item, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    /* `group` drives every hover state inside; `isolate` keeps the image,
       scrim and panel stacking to this card. The card stays in flow, so as
       the detail opens it grows like an accordion panel and pushes the card
       below it in the same column down. */
    <article
      tabIndex={0}
      className="group relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#101418] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] lg:min-h-[320px]"
    >
      {/* ---- background: photo if there is one, gradient if not */}
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_85%_0%,rgba(11,92,255,0.55),transparent_60%),radial-gradient(90%_70%_at_0%_100%,rgba(21,147,90,0.35),transparent_60%)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}

      {/* The scrim: dark at the foot where the words sit, clear at the top
          so the photo still reads. It deepens on hover as the panel grows. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101418]/90 via-[#101418]/35 to-[#101418]/5 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:hover)]:opacity-90"
      />

      {/* ---- top row: icon + number */}
      <div className="flex items-start justify-between p-6 lg:p-7">
        <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
          <Icon name={item.icon} />
        </span>
        <span className="font-mono text-[13px] tracking-[0.08em] text-white/70">{number}</span>
      </div>

      {/* ---- bottom panel: title always, detail on hover/focus */}
      <div className="p-6 pt-0 lg:p-7 lg:pt-0">
        <h3 className="max-w-[20ch] text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] lg:text-[22px]">
          {item.title}
        </h3>

        {/* The rule grows from a stub to full width as the card opens. */}
        <span
          aria-hidden="true"
          className="mt-4 block h-px w-10 bg-[#0B5CFF] transition-all duration-500 group-hover:w-full group-focus-within:w-full"
        />

        {/* The reveal: a 0fr → 1fr grid row animates to the content's real
            height, which max-height tricks can't. On touch screens (no
            hover) it simply stays open, so nothing is hidden on a phone. */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-4 text-[14.5px] leading-6 text-white/80">{item.scope}</p>

            <p className="mt-4 rounded-xl border border-white/15 bg-white/10 p-3.5 text-[13.5px] leading-[1.5] text-white/90 backdrop-blur-sm">
              <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#8FB2FF]">
                Example workflow
              </span>
              {item.example}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* How many columns the cards sit in, following Tailwind's sm / lg
   breakpoints: 1 on phones, 2 from 640px, 3 from 1024px. */
const COLUMN_QUERIES = [
  ["(min-width: 1024px)", 3],
  ["(min-width: 640px)", 2],
];

function getColumnCount() {
  if (typeof window === "undefined") return 3;
  const match = COLUMN_QUERIES.find(([query]) => window.matchMedia(query).matches);
  return match ? match[1] : 1;
}

function useColumnCount() {
  const [count, setCount] = useState(getColumnCount);

  useEffect(() => {
    const lists = COLUMN_QUERIES.map(([query]) => window.matchMedia(query));
    const update = () => setCount(getColumnCount());
    lists.forEach((list) => list.addEventListener("change", update));
    return () => lists.forEach((list) => list.removeEventListener("change", update));
  }, []);

  return count;
}

export default function AutomationCapabilities() {
  const columnCount = useColumnCount();
  const columns = Array.from({ length: columnCount }, () => []);
  CAPABILITIES.forEach((item, index) => columns[index % columnCount].push({ item, index }));

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <Container>
        {/* ---------------------------------------------- the head */}
        <div className="max-w-[920px]">
          <p className="flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
            <Asterisk />
            Automation capabilities
          </p>

          <h2
            id="capabilities-title"
            className="mt-3 font-recoleta text-[2rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.4rem] lg:text-[2.75rem]"
          >
            What would you like to automate
            <span className="text-[#0B5CFF]">?</span>
          </h2>

          <p className="mt-4 max-w-[600px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
            Each one is delivered as a managed engagement: we design the workflow, build it on your stack and run it
            with you — so you get working automations, not a list of tools.
          </p>
        </div>

        {/* ---------------------------------------------- the grid
            Independent columns rather than grid rows: an opening card only
            pushes down the card beneath it, not the whole next row. Cards
            are dealt across columns (0,1,2 / 3,4,5) so they still read in
            order left to right. */}
        <div className="mt-12 flex items-start gap-5 lg:mt-14 lg:gap-6">
          {columns.map((column, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
              {column.map(({ item, index }) => (
                <CapabilityCard key={item.slug} item={item} index={index} />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}