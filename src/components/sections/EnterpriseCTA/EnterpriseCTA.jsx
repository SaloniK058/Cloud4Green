
"use client";

import {
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";

/**
 * CtaSection — closing CTA, structured after the Webflow MCP card:
 * pitch on the left, a video thumbnail on the right.
 *
 * Light on purpose. The footer below is black, so an ink card here would have
 * made the whole bottom third of the page one dark slab. The card is a white →
 * pale-blue wash instead, and the video panel is the single dark element —
 * which then reads as a deliberate step down into the footer rather than a
 * collision with it.
 *
 * Palette sampled off the live homepage:
 *   ink    #101418   primary button, display type
 *   blue   #0B5CFF   hero asterisk, terminal period, button badge
 *   cream  #FAFAF7   page background
 *   cream  #ecece9   page background
 *   grid   #EFEFEC   the hero's faint rules
 *
 * Numbers are the portfolio's (28 domains, 415 technologies, 3–5 working days),
 * relabelled in plain words.
 */
export default function CtaSection({
  onPlay,
  demoHref = "/book-a-demo",
  contactHref = "/contact",
  hook = "No slides. Real consoles.",
  video = {
    label: "Inside a real lab",
    caption: "Forty people, real cloud accounts, one afternoon.",
    duration: "6:04",
    footerLeft: "Cloud4Green Labs",
    footerRight: "No slides",
  },
}) {
  return (
    <section className="bg-[#FAFAF7] px-6 py-16 sm:px-8 lg:px-12" >
      {/* The card is the frame, so it arrives first and on its own — then the
          copy inside it comes up beat by beat off the same trigger. Previously
          the whole thing was one 0.55s fade, which meant the section appeared
          fully formed and there was nothing to read as arriving. */}
      <RevealGroup
        rise
        delay={0.12}
        className="relative isolate mx-auto w-full max-w-7xl overflow-hidden rounded-[20px]
                   border border-[#DFE6F5] p-8 shadow-[0_16px_40px_-12px_rgba(16,32,74,0.14)] lg:p-11 bg-[#ecece9]"
        style={{
          backgroundImage: `
           `,

        }}
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-0"  />

        <div className="relative grid items-center gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 ">
          {/* ── left: the pitch ─────────────────────────────────── */}
          <div>
            {/* the hook */}
            <RevealItem
              as="p"
              className="flex items-center gap-2.5 text-[12px] font-semibold uppercase
                          tracking-[0.16em] text-[#0B5CFF]"
            >
              <Asterisk />
              {hook}
            </RevealItem>

            {/* display face + the blue terminal period, as on the hero.
             *
             * Masked-line reveal, like the hero's — this is the last display
             * type on the page and it should land the same way the first did.
             *
             * The break between the two lines was already stated here as a
             * `<br className="hidden sm:block" />`; the lines are two boxes
             * now, so it holds below sm as well. That is a change: on a phone
             * the sentence used to flow and wrap wherever it landed. Two
             * deliberate lines is the better of the two at 2.1rem, and the
             * mask needs a known break to read as anything other than the
             * whole paragraph sliding. */}
            <RevealLines
              nested
              as="h2"
              lines={[
                "Tell us the roles.",
                <>
                  We&apos;ll send back a plan
                  <span className="text-[#0B5CFF]">.</span>
                </>,
              ]}
              className="mt-5 font-medium uppercase leading-[1.04] tracking-[-0.01em]
                           text-[#101418] text-[2.1rem] sm:text-[2.4rem] lg:text-[2.7rem]"
              style={DISPLAY}
            />

            <RevealItem
              as="p"
              className="mt-6 max-w-xl text-[15px] leading-7 text-[#4A5261]"
            >
             Share your goals with us. We’ll help you chart the right path forward.
            </RevealItem>

            <RevealItem
              as="dl"
              className="mt-8 grid grid-cols-3 gap-x-4 border-t border-[#101418]/10 pt-6
                           sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-4"
            >
              {[
                ["28", "Subject areas"],
                ["415", "Tools, hands on"],
                ["3–5", "Days to a real quote"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-[24px] font-semibold text-[#101418] sm:text-[28px]" style={DISPLAY}>
                    {value}
                  </dt>
                  <dd className="mt-1 text-[10px] uppercase leading-tight tracking-[0.14em]
                                 text-[#101418]/45 sm:text-[11px]">
                    {label}
                  </dd>
                </div>
              ))}
            </RevealItem>

            {/* the homepage buttons, unchanged: black pill + blue badge, white outline */}
            <RevealItem className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={demoHref}
                className="group inline-flex items-center gap-3 rounded-[10px] bg-[#101418] py-2 pl-5 pr-2
                           text-sm font-semibold text-white transition-colors hover:bg-[#1C2228]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF]
                           focus-visible:ring-offset-2"
              >
                Book a demo
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0B5CFF]
                                 text-white transition-transform group-hover:translate-x-0.5">
                  <Chevrons className="h-3.5 w-3.5 stroke-current" />
                </span>
              </a>

              <a
                href={contactHref}
                className="group inline-flex items-center gap-2.5 rounded-[10px] border border-[#101418]/12
                           bg-white px-5 py-2.5 text-sm font-semibold text-[#101418] shadow-sm
                           transition-colors hover:border-[#101418]/25
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF]
                           focus-visible:ring-offset-2"
              >
                Contact us
                <Chevrons className="h-3.5 w-3.5 stroke-[#0B5CFF] transition-transform group-hover:translate-x-0.5" />
              </a>
            </RevealItem>
          </div>

          {/* ── right: the one dark thing in the section ────────── */}
          {/* Last beat, so the eye has finished the pitch on the left by the
              time the dark panel lands beside it. */}
          <RevealItem>
            <VideoPanel video={video} onPlay={onPlay} />
          </RevealItem>
        </div>
      </RevealGroup>
    </section>
  );
}

function VideoPanel({ video, onPlay }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play: ${video.caption} (${video.duration})`}
      className="group relative block aspect-[5/4] w-full overflow-hidden rounded-2xl text-left
                 shadow-[0_18px_40px_-14px_rgba(16,32,74,0.45)] sm:aspect-[16/10]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF]
                 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      style={{
        backgroundImage: `
          radial-gradient(circle at 72% 26%, rgba(11,92,255,.34), rgba(0,0,0,0) 48%),
          linear-gradient(150deg,#12171E 0%,#07090C 78%)`,
      }}
    >
      {/* swap this span for your <img> poster frame once the video exists */}
      <span aria-hidden="true" className="absolute inset-0" style={INK_GRID} />

      <span className="absolute left-5 top-5 flex items-center gap-2">
        <span className="block h-[7px] w-[7px] rounded-full bg-[#0B5CFF]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-[11px]">
          {video.label}
        </span>
      </span>

      <span className="absolute right-5 top-5 rounded-md bg-black/50 px-2 py-1
                       text-[11px] font-semibold tabular-nums text-white/80">
        {video.duration}
      </span>

      <span className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2
                       rounded-xl border border-white/10 bg-[#07090C]/70 px-4 py-3
                       text-center text-[13px] leading-relaxed text-white/90
                       sm:w-[76%] sm:px-5 sm:py-4 sm:text-[15px]">
        “{video.caption}”
      </span>

      <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase
                       tracking-[0.16em] text-white/40 sm:text-[11px]">
        {video.footerLeft}
      </span>
      <span className="absolute bottom-5 right-[104px] hidden text-[11px] font-semibold
                       uppercase tracking-[0.16em] text-white/40 sm:block">
        {video.footerRight}
      </span>

      <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center
                       rounded-full bg-white shadow-lg transition-transform
                       group-hover:scale-105 sm:bottom-5 sm:right-5 sm:h-[62px] sm:w-[62px]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-4 w-4 fill-[#101418] sm:h-5 sm:w-5">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

/* the hero's eight-point mark */
function Asterisk() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" strokeWidth="2.4" strokeLinecap="round"
         className="h-3.5 w-3.5 shrink-0 stroke-[#0B5CFF]">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* the » on the homepage buttons */
function Chevrons({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" strokeWidth="2.6" strokeLinecap="round"
         strokeLinejoin="round" className={`fill-none ${className}`}>
      <path d="m7 5 6 7-6 7M13 5l6 7-6 7" />
    </svg>
  );
}

/* Bodoni Moda stands in for the homepage display face — swap for whatever the
   hero actually loads. It's the one value here matched by eye, not sampled. */
const DISPLAY = { fontFamily: '"Bodoni Moda", Didot, "Times New Roman", serif' };

const PAGE_GRID = {
  backgroundImage: `
    linear-gradient(to right,#EFEFEC 1px,transparent 1px),
    linear-gradient(to bottom,#EFEFEC 1px,transparent 1px)`,
  backgroundSize: "120px 120px",
};

const CARD_GRID = {
  backgroundImage: `
    linear-gradient(to right,rgba(11,92,255,.055) 1px,transparent 1px),
    linear-gradient(to bottom,rgba(11,92,255,.055) 1px,transparent 1px)`,
  backgroundSize: "60px 60px",
};

const INK_GRID = {
  backgroundImage: `
    linear-gradient(to right,rgba(250,250,247,.05) 1px,transparent 1px),
    linear-gradient(to bottom,rgba(250,250,247,.05) 1px,transparent 1px)`,
  backgroundSize: "44px 44px",
};