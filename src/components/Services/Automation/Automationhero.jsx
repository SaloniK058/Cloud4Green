import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import automationFlow from '@/components/Services/Automation/Automationflow.svg' 

/* Automation service hero — the "hybrid" of the two references:
   Retool's split (copy left, workflow canvas right) set in the Enterprise
   Labs paper, type and buttons. Backgrounds (SilkGradient, GridCorner) come
   in the next pass; the section already has `relative isolate` and the
   z-index slots they expect, so they drop in without touching the layout. */

export default function AutomationHero() {
  return (
    <section
      id="automation-hero"
      className="relative isolate overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7]"
    >
      {/* The corner grid and its sparkles. PageGrid picks which two corners
          from the page's URL, so each sub-page carries the same detail in a
          different diagonal. */}
      <PageGrid />

      <Container>
        {/* Same fold rule as HowItWorks: the hero fills the viewport under
            the navbar, and the two columns centre vertically inside it.
            Below lg it stacks — copy first, illustration second — because
            on a phone the promise should be read before the picture. */}
        <div className="grid min-h-[calc(100svh_-_var(--c4g-chrome-h))] items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10 lg:py-12">
          {/* ---------------------------------------------- the words */}
          {/* Left-aligned from lg (it's a column now, not a centred block),
              centred on small screens where it spans the full width. */}
          <div className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left">
            <p className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
              Automation services
            </p>

            {/* h1: this is the page's hero, not a section inside one. The
                split column is narrower than the centred one, so the size
                steps up and the line breaks are allowed — three short
                stacked lines is the Retool rhythm. */}
            <h1 className="mt-3 font-recoleta text-[2.1rem] font-medium uppercase leading-[1.04] tracking-[-0.02em] text-[#101418] sm:text-[2.6rem] lg:text-[3.1rem]">
              Automate the work.
              <br />
              Keep the control
              <span className="text-[#0B5CFF]">.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-6 text-[#4A5261] lg:mx-0 lg:text-[16px] lg:leading-7">
              We design, build and run automations across your cloud, apps and
              AI tools — with approvals, logs and alerts built in from day one.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3.5 lg:justify-start">
              <Button arrow render={<Link to="/contact" />}>
                Explore Automation
              </Button>

              <Button variant="paper" arrow>
               Talk to an Expert
              </Button>
            </div>
          </div>

          
          
          {/* ---------------------------------------------- the canvas */}
                {/* From lg the canvas bleeds past the container's right edge
                    (the section's overflow-hidden clips any excess) so the
                    diagram reads larger without squeezing the copy column. */}
                <div className="relative mx-auto aspect-[6/5] w-full max-w-[760px] lg:-mr-6 lg:w-[calc(100%+1.5rem)] lg:max-w-none min-[1440px]:-mr-16 min-[1440px]:w-[calc(100%+4rem)]">
                {/* soft white bloom behind the cards, same idea as HowItWorks */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/70 blur-3xl"
                />
                <img
                    src={automationFlow}
                    alt="Expense approval automation: an employee submits a claim, the system captures the data, checks it against policy and approves it automatically"
                    className="absolute inset-0 h-full w-full object-contain"
                    decoding="async"
                />
                </div>
        </div>
      </Container>
    </section>
  );
}