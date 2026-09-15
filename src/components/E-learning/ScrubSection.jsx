import { Fragment, useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import '@/styles/scrub.css';

/* ------------------------------------------------------------------ *
 * Scroll-scrubbed headline.
 *
 * Same idea as the GSAP/SplitText panels: the line is split to `.line` /
 * `.word` / `.char`, every character sits at 0.15 opacity, and scroll
 * position walks the ink across it. Done here on framer-motion, which you
 * already ship — no GSAP, no SplitText, and no per-character React state:
 * one MotionValue feeds N `useTransform`s, and each one writes straight to
 * its own element's style outside the render cycle. Scrolling past this
 * section re-renders nothing.
 *
 * Wrap an accent word in *asterisks* and it picks up the accent colour.
 * ------------------------------------------------------------------ */
const LINES = ["Cloud4Green makes", "enterprise learning *hands-on*."];

/* Where a character starts and stops lighting up, as a fraction of the
   section's scroll. The wave is `SPREAD` long and each character takes
   `WINDOW` to come up, so they overlap — a per-character step with no
   overlap reads as a counter ticking rather than ink spreading. The tail
   between SPREAD + WINDOW and 1 is the beat where the finished line sits
   still before the panel unpins. */
const SPREAD = 0.6;
const WINDOW = 0.15;
const DIM = 0.15;

/* Split once, at module load: the same string every render. */
function splitLines(lines) {
  let i = -1;
  const out = lines.map((line) =>
    line.split(" ").map((raw) => {
      /* the marker can close before trailing punctuation — *hands-on*. —
         so it is stripped wherever it lands rather than sliced off the
         ends, which left the asterisks on screen */
      const accent = raw.includes("*");
      const word = raw.replace(/\*/g, "");
      return {
        accent,
        chars: [...word].map((ch) => ({ ch, i: (i += 1) })),
      };
    })
  );
  return { lines: out, total: i + 1 };
}

const SPLIT = splitLines(LINES);

/* One character. It has to be its own component because `useTransform` is
   a hook and the characters are a list — and because that is what keeps
   each one's opacity on its own MotionValue instead of on state. */
function Char({ progress, index, total, children }) {
  const start = (index / total) * SPREAD;
  const opacity = useTransform(progress, [start, start + WINDOW], [DIM, 1]);
  return (
    <motion.span className="c4g-scrub__char" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export default function ScrubSection({
  /** "blue" — white text on a deep blue panel (default).
      "white" — blue text on white. Same section, one token swap. */
  tone = "blue",
  eyebrow = "Why Cloud4Green",
  blurb =
    "Every lab runs in a live sandbox that mirrors production — the same consoles, the same failure modes, the same blast radius. People finish having done the work, not having watched it.",
  ctaHref = "#catalogue",
  ctaLabel = "See the 2026–27 catalogue",
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  /* Measured on the tall outer section: 0 when it takes the viewport, 1
     when it gives it back. The panel is sticky inside that, so the whole
     range is scroll the reader spends looking at this one block. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = reduce ? null : scrollYProgress;
  const rule = useTransform(scrollYProgress, [0, SPREAD + WINDOW], [0, 1]);

  const body = useMemo(
    () =>
      SPLIT.lines.map((words, l) => (
        <span className="c4g-scrub__line" key={l}>
          {words.map((word, w) => (
            <Fragment key={w}>
              <span
                className={
                  "c4g-scrub__word" +
                  (word.accent ? " c4g-scrub__word--accent" : "")
                }
              >
                {word.chars.map(({ ch, i }) =>
                  progress ? (
                    <Char
                      key={i}
                      progress={progress}
                      index={i}
                      total={SPLIT.total}
                    >
                      {ch}
                    </Char>
                  ) : (
                    /* reduced motion: the line is simply there */
                    <span className="c4g-scrub__char" key={i}>
                      {ch}
                    </span>
                  )
                )}
              </span>
              {/* a real text node between the wrappers — a space faked with
                  ::before would sit *inside* an inline-block and take the
                  line's break opportunity with it */}
              {w < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      )),
    [progress]
  );

  return (
    <section className="c4g-scrub" data-tone={tone} ref={ref}>
      <div className="c4g-scrub__panel">
        {/* the same faint grid the hero uses, so the blue block reads as
            part of the page rather than a slab dropped into it */}
        <div className="c4g-scrub__grid" aria-hidden="true" />

        <div className="c4g-scrub__wrapper">
          <p className="c4g-scrub__eyebrow">
            <span className="c4g-scrub__tick" aria-hidden="true" />
            {eyebrow}
          </p>

          {/* The whole headline is one heading for assistive tech — the
              split spans are presentational, and a screen reader that met
              them one character at a time would read gibberish. */}
          <h2 className="c4g-scrub__head" aria-label={LINES.join(" ").replace(/\*/g, "")}>
            <span aria-hidden="true">{body}</span>
          </h2>

          <div className="c4g-scrub__foot">
            <p className="c4g-scrub__blurb">{blurb}</p>

            <a className="c4g-scrub__cta" href={ctaHref}>
              {ctaLabel}
              <span aria-hidden="true">»</span>
            </a>
          </div>

          {/* Reads the same value the characters do, so the hairline is a
              progress bar for the sentence rather than decoration. */}
          <div className="c4g-scrub__rail" aria-hidden="true">
            <motion.span
              className="c4g-scrub__rail-fill"
              style={reduce ? { scaleX: 1 } : { scaleX: rule }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}