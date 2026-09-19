import { useId, useRef, useState } from "react";
import {
  SiApachespark,
  SiAsana,
  SiClaude,
  SiConfluence,
  SiDatabricks,
  SiDocker,
  SiGithubactions,
  SiGooglegemini,
  SiHuggingface,
  SiJira,
  SiKubernetes,
  SiLangchain,
  SiOwasp,
  SiPython,
  SiSnowflake,
  SiSnyk,
  SiTerraform,
  SiTrello,
  SiTrivy,
  SiVault,
} from "@icons-pack/react-simple-icons";

import Container from "@/components/layout/Container";
import GoogleCloudMark from "@/components/brand/GoogleCloudMark";

/*
  Skills catalog: tabs on desktop, accordion on mobile.

  The reference page writes out every panel twice (desktop and mobile), by
  hand — six categories × two layouts is 12 copies of nearly the same HTML.
  Here the content is ONE data array and ONE <CategoryPanel>. The tabs and
  the accordion are just two ways of choosing which item to show, and they
  share the same `active` state, so resizing the window keeps you on the
  same category.

  ⚠ DRAFT CONTENT — the categories, skills and tools below are my guess at
  a Cloud4Green catalogue. Confirm them with the team before launch.

  Visuals: give a category `image` (an import) to show your own artwork.
  Without one it draws a built-in "lab" illustration, so the section looks
  finished while the real images are being made.
  Tools: a category lists tool NAMES; the logo for each comes from
  TOOL_MARKS below.
*/

/*
  Tool logos. Three sources, all of them ours to serve — nothing is
  hotlinked from the vendors' own sites:

    · Simple Icons (@icons-pack/react-simple-icons), CC0, for most brands;
    · local SVGs in /public/logos for brands Simple Icons had to drop after
      trademark requests (AWS, Azure);
    · our own GoogleCloudMark, because Google doesn't publish the gradient
      logo as an SVG.

  Same set-up as the partner banner — see sections/Partners/PartnerBanner.

  Every mark is square (all these viewBoxes are 1:1), which is what lets
  <ToolMark> size them from one number and have the row line up.

  ⚠ Only put a tool in a category's `tools` if it has an entry here. A
  missing mark renders nothing, and a gap in a logo row reads to visitors
  as a broken image. Several obvious names have NO mark available —
  OpenAI, Amazon Bedrock, Power BI, ServiceNow, Wiz, Microsoft Defender —
  which is why the lists below avoid them. To add one, drop an official
  SVG into /public/logos and add an `img` entry.
*/
const TOOL_MARKS = {
  AWS: { img: "/logos/aws.svg" },
  "Microsoft Azure": { img: "/logos/azure.svg" },
  "Google Cloud": { Mark: GoogleCloudMark },
  Terraform: { Mark: SiTerraform },
  Claude: { Mark: SiClaude },
  "Google Gemini": { Mark: SiGooglegemini },
  // Simple Icons paints each mark in one brand colour, and these three
  // brands use a pale one (#FFD21E, #7FC8FF, #FFEC6E) that all but
  // disappears on a white card. Their own guidelines say to go dark on a
  // light ground, so `color` overrides the brand hex with the page ink.
  "Hugging Face": { Mark: SiHuggingface, color: "#101418" },
  LangChain: { Mark: SiLangchain, color: "#101418" },
  Docker: { Mark: SiDocker },
  Kubernetes: { Mark: SiKubernetes },
  "GitHub Actions": { Mark: SiGithubactions },
  Python: { Mark: SiPython },
  "Apache Spark": { Mark: SiApachespark },
  Databricks: { Mark: SiDatabricks },
  Snowflake: { Mark: SiSnowflake },
  "HashiCorp Vault": { Mark: SiVault, color: "#101418" },
  Snyk: { Mark: SiSnyk },
  Trivy: { Mark: SiTrivy },
  OWASP: { Mark: SiOwasp },
  Jira: { Mark: SiJira },
  Confluence: { Mark: SiConfluence },
  Trello: { Mark: SiTrello },
  Asana: { Mark: SiAsana },
};

const CATEGORIES = [
  {
    key: "cloud",
    label: "Cloud Platforms",
    intro: ["Get teams fluent in ", "AWS, Azure and Google Cloud", " by building on the real consoles, not slides about them."],
    skills: [
      "AWS Solutions Architecture",
      "Azure Administration",
      "Google Cloud Engineering",
      "Multi-cloud Networking",
      "Serverless Applications",
      "Cloud Cost Optimisation (FinOps)",
      "Identity & Access Management",
    ],
    tools: ["AWS", "Microsoft Azure", "Google Cloud", "Terraform"],
  },
  {
    key: "genai",
    label: "GenAI & Agentic AI",
    intro: ["Take teams from prompts to production ", "GenAI apps and agents", " on the cloud services your company already pays for."],
    skills: [
      "Prompt Engineering",
      "Retrieval-Augmented Generation",
      "Building AI Agents",
      "Azure OpenAI Service",
      "Amazon Bedrock",
      "Vertex AI",
      "GenAI for Leadership",
    ],
    tools: ["Claude", "Google Gemini", "LangChain", "Hugging Face"],
  },
  {
    key: "devops",
    label: "DevOps & Containers",
    intro: ["Ship faster with ", "containers, pipelines and infrastructure as code", " — practised on live clusters."],
    skills: [
      "Docker Fundamentals",
      "Kubernetes Administration",
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "GitOps",
      "Monitoring & Observability",
      "Site Reliability Engineering",
    ],
    tools: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"],
  },
  {
    key: "data",
    label: "Data & ML",
    intro: ["Build the ", "data and machine-learning", " skills to turn cloud data into models and decisions."],
    skills: [
      "Data Engineering",
      "Python for Data",
      "Machine Learning on Cloud",
      "MLOps",
      "Big Data with Spark",
      "Analytics & Dashboards",
      "Data Governance",
    ],
    tools: ["Python", "Apache Spark", "Databricks", "Snowflake"],
  },
  {
    key: "security",
    label: "Cloud Security",
    intro: ["Keep workloads safe with hands-on ", "cloud security", " — from identity to incident response."],
    skills: [
      "Cloud Security Fundamentals",
      "Zero Trust Architecture",
      "DevSecOps",
      "Threat Detection",
      "Compliance on Cloud",
      "Incident Response",
      "Secrets Management",
    ],
    tools: ["HashiCorp Vault", "Snyk", "Trivy", "OWASP"],
  },
  {
    key: "pm-it",
    label: "Project & IT Management",
    intro: ["Run cloud programmes and IT services with recognised ", "project & IT management", " frameworks that keep delivery on track."],
    skills: [
      "PMP Exam Prep",
      "PRINCE2",
      "Agile & Scrum",
      "SAFe (Scaled Agile)",
      "ITIL 4",
      "Cloud Project Management",
      "Lean Six Sigma",
    ],
    tools: ["Jira", "Confluence", "Trello", "Asana"],
  },
];

export default function SkillsCatalog() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabId = (i) => `${uid}-tab-${i}`;
  const panelId = (i) => `${uid}-panel-${i}`;
  // Both layouts are in the DOM (one is display:none), so the accordion
  // adds "-m" to its ids — duplicate ids would break aria-controls.
  // On mobile every item can be closed (active = -1). Desktop tabs always
  // need one selected, so they fall back to the first.
  const selected = active < 0 ? 0 : active;

  return (
    <section id="skills-catalog" className="bg-[#F7F6F2] py-14 lg:py-20">
      <Container>
        {/* ---------------------------------------------- header row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 className="font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]">
            A <span className="text-[#0B5CFF]">cloud &amp; AI skills</span> catalog
          </h2>
          <p className="max-w-[480px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
            Every course runs on live cloud accounts, so your teams leave with
            skills they have already used — not just watched.
          </p>
        </div>

        {/* ---------------------------------------------- desktop: tabs */}
        <div className="mt-12 hidden lg:block">
          <Tabs
            active={selected}
            onChange={setActive}
            tabId={tabId}
            panelId={panelId}
          />

          {/* Every panel sits in the same grid cell, so this box is always
              as tall as the TALLEST category and nothing below it jumps
              when you switch tabs. Hidden ones use `invisible`, which also
              removes them from the tab order and from screen readers. */}
          <div className="mt-8 grid">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.key}
                id={panelId(i)}
                role="tabpanel"
                aria-labelledby={tabId(i)}
                tabIndex={i === selected ? 0 : -1}
                className={`[grid-area:1/1] transition-opacity duration-300 motion-reduce:transition-none ${
                  i === selected ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <CategoryPanel cat={cat} />
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------- mobile: accordion */}
        <div className="mt-8 lg:hidden">
          {CATEGORIES.map((cat, i) => {
            const open = i === active;
            return (
              <div key={cat.key} className="border-t border-[#101418]/10 last:border-b">
                <h3>
                  <button
                    type="button"
                    id={`${tabId(i)}-m`}
                    aria-expanded={open}
                    aria-controls={`${panelId(i)}-m`}
                    // Tapping the open one closes it (-1 = nothing open).
                    onClick={() => setActive(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`text-[19px] font-medium transition-colors ${
                        open ? "text-[#0B5CFF]" : "text-[#4A5261]"
                      }`}
                    >
                      {cat.label}
                    </span>
                    <PlusMinus open={open} />
                  </button>
                </h3>

                {/* Animating to "auto" height isn't possible with plain CSS
                    height, but grid rows can go from 0fr to 1fr. The inner
                    div's overflow-hidden clips the content while it grows. */}
                <div
                  id={`${panelId(i)}-m`}
                  role="region"
                  aria-labelledby={`${tabId(i)}-m`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden" inert={!open ? "" : undefined}>
                    <div className="pb-6">
                      <CategoryPanel cat={cat} compact />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ================================================================ tabs */

/*
  Keyboard behaviour from the WAI-ARIA tabs pattern: Tab moves INTO the tab
  row and then out to the panel; the arrow keys move between tabs. Only the
  selected tab has tabIndex 0 ("roving tabindex"), which is what stops Tab
  from walking through all five.
*/
function Tabs({ active, onChange, tabId, panelId }) {
  const refs = useRef([]);
  const current = active;

  const onKeyDown = (e) => {
    const last = CATEGORIES.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  };

  // Six labels only just fit at 1024px. The row can scroll sideways as a
  // safety net (with your real font the widths will differ), and the grey
  // baseline is an inset shadow rather than a border so scrolling doesn't
  // clip the blue underline.
  return (
    <div
      role="tablist"
      aria-label="Training categories"
      onKeyDown={onKeyDown}
      className="flex gap-5 overflow-x-auto shadow-[inset_0_-1px_0_rgba(16,20,24,0.15)] [scrollbar-width:none] xl:gap-8"
    >
      {CATEGORIES.map((cat, i) => {
        const selected = i === current;
        return (
          <button
            key={cat.key}
            ref={(el) => (refs.current[i] = el)}
            id={tabId(i)}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={panelId(i)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(i)}
            className={`relative shrink-0 whitespace-nowrap pb-3 text-[15.5px] font-medium xl:text-[17px] transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B5CFF] ${
              selected ? "text-[#101418]" : "text-[#4A5261] hover:text-[#101418]"
            }`}
          >
            {cat.label}
            {/* underline: scaleX from the left instead of fading, so it
                reads as sliding into place */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-t-sm bg-[#0B5CFF] transition-transform duration-300 motion-reduce:transition-none ${
                selected ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ================================================================ panel */

function CategoryPanel({ cat, compact = false }) {
  const [before, strong, after] = cat.intro;

  return (
    <div className={compact ? "flex flex-col gap-5" : "grid grid-cols-2 gap-10"}>
      {/* On mobile the visual comes first (like the reference), on desktop
          it's the right column — `order` swaps it without duplicating it. */}
      <div className={compact ? "" : "order-2"}>
        <CategoryVisual cat={cat} compact={compact} />
      </div>

      <div
        className={`rounded-2xl bg-white ${
          compact ? "p-5" : "order-1 flex flex-col justify-center gap-10 p-10"
        }`}
      >
        <p className={`text-[#4A5261] ${compact ? "text-[16px] leading-6" : "text-[21px] leading-[1.45]"}`}>
          {before}
          <strong className="font-semibold text-[#101418]">{strong}</strong>
          {after}
        </p>

        <div className={compact ? "mt-6" : ""}>
          <h4 className={`font-semibold text-[#101418] ${compact ? "text-[16px]" : "text-[20px]"}`}>Skills</h4>
          <ul className={`mt-4 grid grid-cols-2 gap-x-4 ${compact ? "gap-y-3" : "gap-y-3.5"}`}>
            {cat.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2.5">
                <CheckIcon className={compact ? "mt-px size-[18px]" : "mt-0.5 size-5"} />
                <span className={`text-[#4A5261] ${compact ? "text-[14px] leading-5" : "text-[16.5px] leading-6"}`}>
                  {skill}
                </span>
              </li>
            ))}
            <li className={`flex items-start gap-2.5 text-[#8A909B] ${compact ? "text-[14px]" : "text-[16.5px]"}`}>
              <span aria-hidden="true" className={`text-center ${compact ? "w-[18px]" : "w-5"}`}>…</span>
              and more
            </li>
          </ul>
        </div>

        <div className={compact ? "mt-6" : ""}>
          <h4 className={`font-semibold text-[#101418] ${compact ? "text-[16px]" : "text-[20px]"}`}>Tools</h4>
          {/* Two columns, the same grid as the Skills list above, so the
              two blocks read as one column of pairs instead of two
              different layouts stacked. */}
          <ul className={`mt-4 grid grid-cols-2 gap-x-4 ${compact ? "gap-y-3.5" : "gap-y-4"}`}>
            {cat.tools.map((tool) => (
              <li key={tool} className="flex items-center gap-2.5">
                <ToolMark name={tool} size={compact ? 22 : 26} />
                <span
                  className={`font-medium text-[#101418] ${
                    compact ? "text-[14px] leading-5" : "text-[15.5px] leading-6"
                  }`}
                >
                  {tool}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/*
  One tool logo, centred in a fixed square box.

  The box is what keeps the row tidy. The marks carry different amounts of
  padding inside their own artwork, so sizing the <svg>/<img> alone leaves
  them looking uneven; centring each in a same-sized box puts every tool
  name on the same left edge.

  Two SEO/a11y notes, since both are easy to get wrong here:

    · The name stays REAL TEXT next to the mark rather than a word baked
      into an image, so crawlers index "Kubernetes" and not just a logo.
      Both layouts also keep every panel in the DOM (desktop hides with
      `invisible`, mobile with a 0fr grid row), so all six categories are
      crawlable, not just the open one.
    · The mark itself is decorative — the text beside it already names the
      tool — so it's aria-hidden and the <img> takes an empty alt. Without
      that a screen reader announces "Docker Docker".

  width/height on the <img> are set so the browser reserves the square
  before the file arrives, which keeps the row from shifting (CLS).
*/
function ToolMark({ name, size }) {
  const mark = TOOL_MARKS[name];
  if (!mark) return null;

  const box = size + 6;

  return (
    <span
      className="flex shrink-0 items-center justify-center"
      style={{ width: box, height: box }}
    >
      {mark.img ? (
        <img
          src={mark.img}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="object-contain"
        />
      ) : (
        <mark.Mark
          size={size}
          color={mark.color ?? "default"}
          aria-hidden="true"
          focusable="false"
        />
      )}
    </span>
  );
}

/* ================================================================ visual */

function CategoryVisual({ cat, compact }) {
  const box = `relative overflow-hidden rounded-2xl ${compact ? "aspect-[4/3]" : "h-full min-h-[520px]"}`;

  if (cat.image) {
    return (
      <div className={box}>
        <img src={cat.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }

  // Built-in placeholder art: a "lab environment" card — the same motif as
  // the lab card in How it works — on a quiet surface one step darker than
  // the page, with a faint dot grid. Neutral on purpose: it's a stand-in,
  // and the white skills card next to it should stay the focus.
  return (
    <div aria-hidden="true" className={`${box} border border-[#101418]/8 bg-[#EDEBE5]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,20,24,0.13)_1.2px,transparent_1.7px)] bg-[length:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

      <div className={`absolute left-1/2 top-1/2 w-[78%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#101418]/10 bg-white shadow-[0_20px_40px_-24px_rgba(16,20,24,0.35)] ${compact ? "p-3.5" : "p-5"}`}>
        <div className="flex items-center justify-between border-b border-[#101418]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-2 rounded-full border border-[#101418]/25" />
              ))}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4A5261]">Lab · {cat.label}</span>
          </div>
          <span className="rounded-full bg-[#E7F7EE] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#1F8A4C]">Ready</span>
        </div>
        <div className={`grid grid-cols-2 ${compact ? "mt-3 gap-2" : "mt-4 gap-2.5"}`}>
          {cat.tools.map((tool, i) => (
            <div
              key={tool}
              className={`flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.06em] ${
                i === 0 ? "border-[#0B5CFF] bg-[#0B5CFF]/[0.06] text-[#0B5CFF]" : "border-[#101418]/12 text-[#4A5261]"
              }`}
            >
              <ToolMark name={tool} size={14} />
              {tool}
            </div>
          ))}
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#101418]/8">
          <div className="h-full w-2/3 rounded-full bg-[#0B5CFF]" />
        </div>
      </div>
    </div>
  );
}

/* ================================================================ icons */

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle cx="10" cy="10" r="10" fill="#0B5CFF" />
      <path d="M6 10.4l2.6 2.5L14 7.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusMinus({ open }) {
  return (
    <span aria-hidden="true" className="relative flex size-7 shrink-0 items-center justify-center rounded-md bg-white">
      <span className="absolute h-0.5 w-3 rounded bg-[#101418]" />
      {/* the vertical bar rotates flat to turn + into − */}
      <span
        className={`absolute h-3 w-0.5 rounded bg-[#101418] transition-transform duration-300 ${
          open ? "rotate-90 scale-y-0" : ""
        }`}
      />
    </span>
  );
}