import Container from "@/components/layout/Container";

/* Our technology ecosystem — a logo-wall section, kept deliberately
   plain next to the heavier sections around it: six tools, a lettermark
   each (no real logo assets yet — swap TOOLS[i].logo for an <img> once
   you have them, see the note below), a category line, nothing to
   click. The point is recognition, not persuasion.

   Set on white. Each tile carries three faint slanted bars tucked into
   its right edge — this section's answer to the corner circle on the
   Enterprise Labs and catalogue cards: a quiet shape at rest that slides
   in and deepens a touch on hover.

   The six are examples, not an exhaustive list — the closing line under
   the grid says so, so the section doesn't read as "these are the only
   six tools we support." */

const TOOLS = [
  { name: "n8n", category: "Workflow automation", mark: "n8n" },
  { name: "Zapier", category: "App integrations", mark: "Zap" },
  { name: "Make", category: "Visual automation", mark: "Mk" },
  { name: "Grok", category: "Conversational AI", mark: "Gr" },
  { name: "LangGraph", category: "Agent orchestration", mark: "LG" },
  { name: "LangChain", category: "AI application framework", mark: "LC" },
];

/** The brand asterisk, as it appears on every section eyebrow. */
function Asterisk() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      className="h-3.5 w-3.5 shrink-0 stroke-[#0B5CFF]"
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* Three slanted bars, thick to thin, parked against the tile's right
   edge and partly cut off by it. Very low opacity at rest; on hover the
   group slides a few pixels in and each bar deepens slightly. */
function Slants() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-y-2 -right-3 -z-10 flex skew-x-[-20deg] gap-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2"
    >
      <span className="w-4 bg-[#0B5CFF]/[0.05] transition-colors duration-500 group-hover:bg-[#0B5CFF]/[0.09]" />
      <span className="w-2.5 bg-[#0B5CFF]/[0.05] transition-colors duration-500 group-hover:bg-[#0B5CFF]/[0.09]" />
      <span className="w-1.5 bg-[#0B5CFF]/[0.05] transition-colors duration-500 group-hover:bg-[#0B5CFF]/[0.09]" />
    </span>
  );
}

/* Swap this for a real <img src={tool.logo} alt="" /> once you have
   logo assets — the wordmark tile is only a placeholder so the section
   works today. None of it is meant to imitate the brand's own mark. */
function Lettermark({ mark }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#0B5CFF]/15 bg-[#EEF3FF] font-mono text-[13px] font-semibold tracking-[-0.01em] text-[#0B5CFF] transition-colors duration-300 group-hover:border-[#0B5CFF] group-hover:bg-[#0B5CFF] group-hover:text-white"
    >
      {mark}
    </span>
  );
}

function ToolTile({ tool }) {
  return (
    <div className="group relative isolate flex items-center gap-4 overflow-hidden rounded-2xl border border-[#101418]/10 bg-white px-5 py-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#0B5CFF]/35 hover:shadow-[0_16px_40px_-24px_rgba(11,92,255,0.45)]">
      <Slants />
      <Lettermark mark={tool.mark} />
      <div className="min-w-0 pr-10">
        <p className="truncate text-[16px] font-semibold tracking-[-0.01em] text-[#101418]">{tool.name}</p>
        <p className="mt-0.5 truncate text-[13px] text-[#4A5261]">{tool.category}</p>
      </div>
    </div>
  );
}

export default function TechnologyEcosystem() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      className="relative border-b border-[#101418]/8 bg-white py-20 lg:py-28"
    >
      <Container>
        {/* ---------------------------------------------- the head */}
        <div className="max-w-[680px]">
          <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
            <Asterisk />
            Our technology ecosystem
          </p>

          <h2
            id="ecosystem-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            We build around the tools you already use<span className="text-[#0B5CFF]">.</span>
          </h2>

          <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
            No rip-and-replace. We work inside the platforms your team has already adopted and wire them together,
            rather than asking you to move onto ours.
          </p>
        </div>

        {/* ---------------------------------------------- the grid */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
          {TOOLS.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </div>

        {/* <p className="mt-8 text-[13.5px] leading-6 text-[#4A5261]">
          A representative sample, not the full list — if it's already part of your stack, chances are we can build
          around it.
        </p> */}
      </Container>
    </section>
  );
}
