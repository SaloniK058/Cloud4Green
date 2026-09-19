import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

// Swap these for your own photos (real team / client training shots work best).
import slideImg1 from "@/assets/images/lab4.png";
import slideImg2 from "@/assets/images/lab6.png";
import slideImg3 from "@/assets/images/lab7.png";
import heroBg from "@/assets/images/CT1.png";

/*
  Each slide pairs a photo with one stat. The photo and the stat change
  together, so the card always talks about what's in the picture.

  ⚠ PLACEHOLDER FIGURES — replace with real Cloud4Green numbers before
  this ships. A made-up stat on a sales page is worse than no stat.
*/
const SLIDES = [
  { image: slideImg1, value: "40+", label: "hands-on cloud & AI learning paths" },
  { image: slideImg2, value: "3 clouds", label: "AWS, Azure and GCP labs in every programme" },
  { image: slideImg3, value: "24/7", label: "lab access, so teams train on their own schedule" },
];

const INTERVAL = 4500; // ms per slide

/*
  Autoplay that behaves:
    • pauses while the pointer is over the card or a dot has keyboard focus
      (people can't read a stat that vanishes under them),
    • never runs for prefers-reduced-motion users — they use the dots,
    • the timer restarts whenever the slide changes, so clicking a dot
      gives that slide its full 4.5s instead of whatever was left over.
*/
function useAutoplay(count, paused) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, count]);

  return [index, setIndex];
}

export default function CorporateTrainingHero() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useAutoplay(SLIDES.length, paused);

  return (
    <section
      id="corporate-training"
      className="relative isolate overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7] text-[#101418]"
    >
      {/* Background photo, washed with the site's warm off-white so the dark
          headline stays readable. The wash is strongest on the left, behind
          the copy, and lighter on the right where the carousel sits. */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(250,250,247,0.95)_0%,rgba(250,250,247,0.88)_45%,rgba(250,250,247,0.7)_100%)]"
      />
      {/* One soft brand-blue haze behind the photo — the only colour in the
          background, so blue stays an accent rather than the surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-[560px] w-[760px] -translate-y-1/2 rounded-full bg-[#0B5CFF]/[0.07] blur-[110px]"
      />

      <Container>
        <div className="grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-16 lg:py-24">
          {/* ------------------------------------------------ the words */}
          <div className="max-w-[560px]">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[#0B5CFF]">
              For Enterprises
            </p>

            <h2 className="mt-3 font-recoleta text-[2.4rem] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]">
              Cloud4Green
              <br />
              Corporate Training
            </h2>

            <p className="mt-6 text-[16px] leading-7 text-[#4A5261] lg:text-[18px] lg:leading-8">
              Upskill whole teams on the cloud and AI stack they actually run.
              Instructor-led cohorts, hands-on labs in live cloud accounts, and
              progress reports your L&amp;D team can act on — in one programme.
            </p>

            <div className="mt-9">
              <Button variant="ink" arrow render={<Link to="/contact" />}>
                Explore training plans
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------ the visual */}
          <div className="relative mx-auto w-full max-w-[500px] lg:mx-0">
            {/* Dot grid peeking out from behind the photo. It's one
                radial-gradient dot repeated with background-size; the mask
                fades it out towards the far edge so it doesn't end in a
                hard line. */}
            <div
              aria-hidden="true"
              className="absolute -right-6 top-6 -z-10 hidden h-[62%] w-[70%] translate-x-1/3 bg-[radial-gradient(circle,rgba(11,92,255,0.22)_2px,transparent_2.5px)] bg-[length:22px_22px] [mask-image:linear-gradient(to_right,black_55%,transparent)] sm:block"
            />

            <div
              className="relative aspect-[20/19] overflow-hidden rounded-2xl bg-[#101418]/5 text-white ring-1 ring-[#101418]/8 shadow-[0_30px_60px_-30px_rgba(16,20,24,0.35)]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              role="region"
              aria-roledescription="carousel"
              aria-label="Corporate training highlights"
            >
              {/* All photos are mounted and stacked; only opacity changes.
                  That makes the swap a cheap GPU crossfade, and the next
                  image is already loaded when its turn comes. */}
              {SLIDES.map((s, i) => (
                <img
                  key={i}
                  src={s.image}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* The stat card. Every stat sits in the SAME grid cell
                  ([grid-area:1/1]), so the card is always as tall as its
                  longest label and doesn't jump in height between slides. */}
              <div className="absolute inset-x-5 bottom-14 rounded-xl border border-white/15 bg-[#101418]/45 p-6 backdrop-blur-md sm:inset-x-8 sm:p-7">
                <div className="grid" aria-live={paused ? "off" : "polite"}>
                  {SLIDES.map((s, i) => (
                    <div
                      key={i}
                      aria-hidden={i !== active}
                      className={`[grid-area:1/1] transition-all duration-500 ease-out motion-reduce:transition-none ${
                        i === active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      }`}
                    >
                      <p className="text-[2.6rem] font-medium leading-none tracking-[-0.02em] sm:text-5xl">
                        {s.value}
                      </p>
                      <p className="mt-3 text-[15px] font-medium text-white/90">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots — real buttons, so they work by keyboard too. */}
              <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    aria-label={`Show highlight ${i + 1} of ${SLIDES.length}`}
                    aria-current={i === active}
                    className={`h-2.5 rounded-full bg-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      i === active ? "w-6" : "w-2.5 opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}