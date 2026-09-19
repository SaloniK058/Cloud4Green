"use client";

import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import img1 from "@/assets/images/CertBanner2.png";
import backgroundimg from "@/assets/images/certBanner.png";
import CertificationFlow from "../illustrations/CertificationFlow";

/* ------------------------------------------------------------------
   Cloud4Green — the /products/certifications masthead.

   Same stacked layout as the Enterprise Labs "How it works" masthead
   (components/EnterpriseLabs/Howitworks.jsx): the illustration across
   the top, then the centred eyebrow, headline, lede and buttons.
------------------------------------------------------------------ */

/** The brand asterisk, as it appears on every section eyebrow. `stroke` is a
    full Tailwind class rather than a bare colour so the two variants — brand
    blue on cream, the lifted blue on a photograph — are both statically
    present for the compiler to find. */
function Asterisk({ className = "h-3.5 w-3.5", stroke = "stroke-[#0B5CFF]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 ${stroke} ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

export default function Certifications({ imageSrc = img1, imageAlt = "" }) {
  return (
    <section
      id="overview"
      /* The viewport minus everything above it — the announcement bar, the
         navbar's scroll sentinel and the navbar row. --c4g-chrome-h is
         defined in index.css next to the heights it adds up, so the fold is
         stated once rather than re-counted per page. */
      className="relative isolate flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] scroll-mt-24 items-center overflow-hidden border-b border-[#101418]/8 py-6 lg:py-7"
    >
      {/* Full-bleed image, the same masthead treatment as Learning Solutions. */}
      <img
        src={backgroundimg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Copy is centred under the illustration, so the scrim runs top to
          bottom: lightest behind the drawing, heaviest under the type. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/45 via-white/60 to-white/80"
      />

      <Container>
        <div className="flex flex-col items-center">
          {/* ---------------------------------------------- the band */}
          {/* Width is capped so the 960:440 drawing never takes more than
              60% of the fold in height, leaving the copy room below it. */}
          <div className="relative isolate mx-auto w-full max-w-[min(1216px,(100svh_-_var(--c4g-chrome-h))*0.6*960/440)]">
            {/* Same soft bloom as the Enterprise Labs diagram: a light ground
                for the thin strokes with no card edge to see. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[125%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/75 blur-3xl"
            />
            <CertificationFlow />
          </div>

          {/* ---------------------------------------------- the words */}
          <div className="mx-auto mt-4 max-w-[860px] text-center lg:mt-5">
            <p className="flex items-center justify-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Certifications
            </p>

            {/* Recoleta ships as a single Medium file (see the @font-face in
                index.css), so the headline is font-medium — asking for
                bolder gets a synthesised bold. */}
            <h1 className="mt-2.5 font-recoleta text-[1.85rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.35rem] lg:text-[2.6rem]">
              Turn Hands-On Skills Into Industry Credentials
              <span className="text-[#0B5CFF]">.</span>
            </h1>

            <p className="mx-auto mt-3.5 max-w-[560px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
              Get that career in IT. Earn that promotion. Stand out in your field.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3.5 lg:mt-6">
              <Button arrow render={<Link to="/contact" />}>
                Talk to an advisor
              </Button>

              {/* No href yet — the certification catalogue PDF isn't in the
                  repo. Same treatment as "Download brochure" on Enterprise
                  Labs. */}
              <Button variant="paper" arrow>
                View certification paths
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}