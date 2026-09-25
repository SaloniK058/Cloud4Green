

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// /* The line that carries the idea, and the signature under it. */
// const TAGLINE = "Turning Technology Into Capability.";
// const WORDMARK = "Cloud4Green";

// /* ------------------------------------------------------------------ *
//  * Timeline, in seconds at pace 1. Every delay downstream is derived
//  * from these, so nudging one keeps the sequence in sync — and the
//  * `pace` prop scales the whole thing if you want it slower still.
//  * ------------------------------------------------------------------ */
// const BASE = {
//   lineIn: 0.35,     // a beat of empty panel first — the pause is the point
//   typeDur: 1.5,     // the line types itself out, first letter to full stop
//   caretHold: 0.35,  // the caret sits blinking on the finished line
//   ruleDur: 0.62,    // the hairline draws itself out under it
//   brandGap: 0.14,   // ...and the signature follows out of the same beat
//   brandDur: 0.66,
//   hold: 0.5,        // beat with the whole lockup up before anything leaves
//   fadeDur: 0.7,     // the sheet dissolves into the page beneath
// };

// const EASE_OUT = [0.22, 1, 0.36, 1];

// /** How long we're prepared to wait for the display face before starting. */
// const FONT_WAIT = 700;

// function useTimeline(pace) {
//   return useMemo(() => {
//     const t = Object.fromEntries(
//       Object.entries(BASE).map(([k, v]) => [k, v * pace])
//     );

//     /* Derived, never typed in: `typeDur` is the whole line, so editing the
//        copy changes the *rate* the keys land at, not how long the line takes
//        — and everything after it still queues up behind the last character
//        rather than needing to be re-timed by hand. */
//     t.charStep = t.typeDur / Math.max(TAGLINE.length, 1);
//     t.lineDone = t.lineIn + t.typeDur;
//     t.ruleIn = t.lineDone + t.caretHold; // the caret leaves as the rule draws
//     t.brandIn = t.ruleIn + t.brandGap;
//     t.exitAt = t.brandIn + t.brandDur + t.hold;
//     t.leaveDur = t.fadeDur;

//     return t;
//   }, [pace]);
// }

// /**
//  * Characters, wrapped word by word.
//  *
//  * The word wrapper is what keeps the line breaking at spaces. A bare
//  * per-character split lets the browser break between any two letters, and
//  * at 375px wide that is exactly what it does. The space sits *between*
//  * wrappers, not inside one, or the break opportunity is lost with it.
//  *
//  * `i` runs across the whole line, so the reveal walks the sentence rather
//  * than restarting inside each word.
//  */
// function splitTagline(render) {
//   const words = TAGLINE.split(" ");
//   let i = -1;

//   return words.flatMap((word, w) => {
//     const chars = [...word].map((ch, c) => {
//       i += 1;
//       return render(ch, i, `${w}-${c}`);
//     });

//     const out = [
//       <span className="c4g-pre__word-wrap" key={`w${w}`}>
//         {chars}
//       </span>,
//     ];
//     if (w < words.length - 1) {
//       i += 1; // spaces still take a beat, so the rhythm stays even
//       out.push(" ");
//     }
//     return out;
//   });
// }

// export default function Preloader({
//   /** Panel has *started* dissolving — the moment to bring the hero up, so
//       it is arriving as the sheet clears rather than appearing on a blank
//       page afterwards. With a cross-fade this matters more than it did with
//       the old lift: the hero is what the panel dissolves *into*. */
//   onReveal,
//   /** Panel is gone and unmounted. Safe point for the expensive things. */
//   onComplete,
//   /** The company mark that leads the signature line. Without it the line
//       is the wordmark on its own. */
//   logoSrc,
//   logoAlt = "Cloud4Green",
//   /** Scales every delay and duration. 1.15 is noticeably statelier, 0.85
//       brisker — one number, and nothing goes out of phase. */
//   pace = 1,
//   /** Shortest time the panel stays up, even on a warm cache. */
//   minDuration = 2000,
//   /** Hard ceiling — never hold the page hostage to a slow asset. */
//   maxDuration = 6000,
//   /** Show once per browser tab session. */
//   once = true,
// }) {
//   const reduce = useReducedMotion();
//   const T = useTimeline(pace);
//   const finished = useRef(false);
//   const revealed = useRef(false);

//   const [visible, setVisible] = useState(() => {
//     if (typeof window === "undefined") return false;
//     if (!once) return true;
//     try {
//       return sessionStorage.getItem("c4g:preloaded") !== "1";
//     } catch {
//       return true;
//     }
//   });

//   /* Nothing animates until the display face has landed.
//    *
//    * Recoleta is materially wider than the serif fallback, so starting
//    * without it means the line writes itself in one face and then jumps
//    * — re-wrapping mid-reveal — when the real one arrives. Holding a beat
//    * costs less than the reflow, and the wait is capped so a font that
//    * never loads can't stall the page. */
//   const [ready, setReady] = useState(false);
//   useEffect(() => {
//     if (!visible) return;
//     let live = true;
//     const go = () => live && setReady(true);

//     const cap = setTimeout(go, FONT_WAIT);
//     if (document.fonts?.ready) document.fonts.ready.then(go);
//     else go();

//     return () => {
//       live = false;
//       clearTimeout(cap);
//     };
//   }, [visible]);

//   /* How much of the line has been typed, and whether the caret is still
//      sitting on it. One counter and one flag drive the whole effect. */
//   const [typed, setTyped] = useState(0);
//   const [caretOn, setCaretOn] = useState(false);

//   /* The line types itself.
//    *
//    * One rAF loop advancing a single integer, rather than a per-character
//    * animation each: the characters are already laid out and only their
//    * opacity flips, so between two keystrokes the only thing actually
//    * moving on the panel is the caret's blink — which is a CSS animation
//    * the compositor owns. `setTyped` with an unchanged value is a bail-out
//    * in React, so calling it every frame costs a comparison, not a render.
//    *
//    * Timed off `ready` because that is when the characters mount and when
//    * every framer delay below starts counting; timing it from mount would
//    * run the line while the display face was still landing. */
//   useEffect(() => {
//     if (!visible || !ready) return;

//     if (reduce) {
//       setTyped(TAGLINE.length); // no keystrokes, just the finished line
//       return;
//     }

//     const startAt = performance.now() + T.lineIn * 1000;
//     const span = T.typeDur * 1000;
//     let raf = requestAnimationFrame(function tick(now) {
//       const p = Math.min(1, Math.max(0, (now - startAt) / span));
//       setTyped(Math.round(p * TAGLINE.length));
//       if (p < 1) raf = requestAnimationFrame(tick);
//     });

//     /* The caret is lit for the writing and the beat after it, then goes out
//        as the rule starts drawing — so the line hands off to the signature
//        instead of two things competing for the eye. */
//     const lit = setTimeout(() => setCaretOn(true), T.lineIn * 1000);
//     const out = setTimeout(() => setCaretOn(false), T.ruleIn * 1000);

//     return () => {
//       cancelAnimationFrame(raf);
//       clearTimeout(lit);
//       clearTimeout(out);
//     };
//   }, [visible, ready, reduce, T]);

//   /* Which character the caret hangs off. It sits *after* the last glyph
//      typed; when that beat was a space the caret stays on the letter before
//      it, since the spaces are between the word wrappers and have no box of
//      their own to hang from (and a caret parked on a break opportunity is
//      the one place it can end up alone on the next line). */
//   const caretIndex = useMemo(() => {
//     const last = typed - 1;
//     if (last < 0) return -1;
//     return TAGLINE[last] === " " ? last - 1 : last;
//   }, [typed]);

//   /* Both callbacks are latched, because both have more than one caller: the
//      leave can be started by the timeline, by the max-duration ceiling or by
//      an unmount, and in React 18's StrictMode every effect runs twice in dev. */
//   const beginReveal = useCallback(() => {
//     if (revealed.current) return;
//     revealed.current = true;

//     /* Land at the top of the document before anything of it is visible.
//      *
//      * Restoration is already off (main.jsx), so this is aimed at the other
//      * way the offset used to drift under the panel: the products section
//      * sets its own height from a measurement that only settles once the
//      * webfonts land, so the document grows while the sheet is down — and a
//      * scroll position clamped against the shorter document creeps back down
//      * with it. Doing it at the leave, not only on mount, is what pins it. */
//     window.scrollTo(0, 0);

//     setVisible(false);
//     onReveal?.();
//   }, [onReveal]);

//   const finish = useCallback(() => {
//     if (finished.current) return;
//     finished.current = true;
//     try {
//       sessionStorage.setItem("c4g:preloaded", "1");
//     } catch {
//       /* private mode — just replay next time */
//     }
//     onComplete?.();
//   }, [onComplete]);

//   /* Skipped entirely (already seen this session) -------------------- */
//   useEffect(() => {
//     if (!visible) {
//       revealed.current = true;
//       onReveal?.();
//       finish();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /* Lock the page while the panel is up ----------------------------- */
//   useEffect(() => {
//     if (!visible) return;

//     /* Scroll restoration itself is disabled app-wide in main.jsx — it has to
//        be off before the first paint, and before the preloader exists. This is
//        just the belt to that braces, for a browser that ignores the flag. */
//     window.scrollTo(0, 0);

//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     /* Tells the hero's world map to hold its blink while it can't be seen —
//        288 animated SVG nodes that would otherwise be spending the panel's
//        frame budget drawing behind an opaque sheet. See index.css. */
//     document.documentElement.dataset.preloading = "true";

//     return () => {
//       document.body.style.overflow = prevOverflow;
//       delete document.documentElement.dataset.preloading;
//     };
//   }, [visible]);

//   /* Hold for whichever comes last: the timeline or the page load -----
//    *
//    * The clock starts at `ready`, not at mount, because that is when the
//    * animation starts — timing it from mount would let the release fire
//    * part-way through the line on a cold font cache.
//    *
//    * Nothing else calls `beginReveal`, so without this the panel has no way
//    * out. Three things can release it: the floor once `load` has fired, the
//    * ceiling at `maxDuration`, and `beginReveal` being latched so whichever
//    * arrives first wins and the rest are no-ops.
//    */
//   useEffect(() => {
//     if (!visible || !ready) return;

//     const started = performance.now();
//     let hardStop;

//     const release = () => {
//       const elapsed = performance.now() - started;
//       const floor = reduce ? 600 : Math.max(minDuration, T.exitAt * 1000 + 150);
//       hardStop = setTimeout(beginReveal, Math.max(0, floor - elapsed));
//     };

//     /* `load` never fires again once it has fired, so a warm cache (or a
//        StrictMode remount, which lands after it) has to be handled by hand. */
//     if (document.readyState === "complete") {
//       release();
//     } else {
//       window.addEventListener("load", release, { once: true });
//     }

//     const ceiling = setTimeout(beginReveal, maxDuration);

//     return () => {
//       window.removeEventListener("load", release);
//       clearTimeout(hardStop);
//       clearTimeout(ceiling);
//     };
//   }, [visible, ready, reduce, minDuration, maxDuration, beginReveal, T]);

//   return (
//     <AnimatePresence onExitComplete={finish}>
//       {visible && (
//         /* The sheet no longer travels — it dissolves into the page beneath
//            it. Opacity on one full-viewport layer is a compositor job; the
//            clip-path this replaced was a main-thread repaint every frame. */
//         <motion.div
//           className="c4g-pre"
//           role="status"
//           aria-live="polite"
//           aria-label="Loading Cloud4Green"
//           initial={{ opacity: 1 }}
//           animate={{ opacity: 1 }}
//           exit={{
//             opacity: 0,
//             transition: reduce
//               ? { duration: 0.3 }
//               : { duration: T.fadeDur, ease: "linear" },
//           }}
//         >
//           <div className="c4g-pre__viewport">
//             {/* The panel's own label above does the announcing, so the
//                 per-character spans stay out of the accessibility tree —
//                 otherwise a screen reader spells the line out letter by
//                 letter. */}
//             <div className="c4g-pre__stage" aria-hidden="true">
//               {/* This takes the font utility, unlike the wordmark below it.
//                   Recoleta is the site's display face, set by `font-recoleta`
//                   on every other heading — taking it from the same place is
//                   what stops the panel and the hero drifting apart when the
//                   config changes. The wordmark is the exception: it is set in
//                   the logo's own face, which is not the display face. */}
//               <p className="c4g-pre__tagline font-heading ">
//                 {ready &&
//                   splitTagline((ch, i, key) => (
//                     /* Every character is in the DOM from the first frame and
//                        only its ink is switched on, so the line is measured
//                        and wrapped once. Typing it by appending text instead
//                        would re-wrap the paragraph on almost every keystroke,
//                        and a centred line re-centres itself as it grows —
//                        the words would crawl sideways under the caret. */
//                     <span
//                       className={
//                         "c4g-pre__char" +
//                         (i < typed ? " is-typed" : "") +
//                         (caretOn && i === caretIndex ? " is-caret" : "")
//                       }
//                       key={key}
//                     >
//                       {/* the closing full stop picks up the accent, the
//                           same way the hero headline's does */}
//                       {ch === "." ? <span className="accent">{ch}</span> : ch}
//                     </span>
//                   ))}
//               </p>

//               {/* A hairline for the signature to sit on. It draws out from
//                   the centre just before the lockup lands, so the second
//                   element arrives on something rather than in empty space. */}
//               <motion.span
//                 className="c4g-pre__rule"
//                 initial={{ width: 0 }}
//                 animate={
//                   ready
//                     ? {
//                         width: 72,
//                         transition: reduce
//                           ? { duration: 0.3 }
//                           : {
//                               delay: T.ruleIn,
//                               duration: T.ruleDur,
//                               ease: EASE_OUT,
//                             },
//                       }
//                     : { width: 0 }
//                 }
//               />

//               <motion.div
//                 className="c4g-pre__lockup"
//                 initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.55em" }}
//                 animate={
//                   ready
//                     ? {
//                         opacity: 1,
//                         y: 0,
//                         transition: reduce
//                           ? { duration: 0.3 }
//                           : {
//                               delay: T.brandIn,
//                               duration: T.brandDur,
//                               ease: EASE_OUT,
//                             },
//                       }
//                     : { opacity: 0 }
//                 }
//               >
//                 {logoSrc && (
//                   /* The logo variant is a fixed window onto the artwork
//                      rather than a plain box around the <img> — the asset
//                      carries its own transparent margin, and only the
//                      modifier crops it back to the mark. See
//                      `.c4g-pre__mark--logo` in index.css. */
//                   <span className="c4g-pre__mark c4g-pre__mark--logo">
//                     <img src={logoSrc} alt={logoAlt} className="c4g-pre__logo" />
//                   </span>
//                 )}

//                 <span className="c4g-pre__word">{WORDMARK}</span>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Adjust to wherever Sparkle lives in your tree. */
import Sparkle from "@/components/Preloader/Sparkle";

/* The line that leads, and the line it opens onto. */
const LEAD = "Building the Future of Tech Skills.";
const SUB =
  "Building The World’s Most Advanced Zero Trust Access, Identity, and Security Platform for the Modern Enterprise.";

/* ------------------------------------------------------------------ *
 * Timeline, in seconds at pace 1. Every delay downstream is derived
 * from these, so nudging one keeps the sequence in sync — and the
 * `pace` prop scales the whole thing if you want it brisker.
 *
 *   lead washes in, on the centre of the screen  ->  a mark lands either
 *   side of it  ->  each mark divides, one rising and one dropping to the
 *   corners of the block, the block rides up by half the second line's
 *   height, and that line is revealed in the space it opens underneath
 *   ->  the sheet dissolves out from under the words.
 * ------------------------------------------------------------------ */
const BASE = {
  leadIn: 0.4,     // a beat of empty panel first — the pause is the point
  leadStep: 0.04,  // the wash that walks across the lead line
  leadDur: 0.68,   // how long any one word takes to come up
  markGap: 0.26,   // the line settles, *then* the marks arrive
  markStep: 0.2,   // right first, left a beat behind it
  markDur: 0.5,
  settle: 0.3,     // both marks sit before they divide
  splitDur: 0.8,   // the travel out to the corners
  liftDur: 0.9,    // the block riding up off the centre line
  subGap: 0.14,    // the second line follows them out
  subStep: 0.018,
  subDur: 0.58,
  hold: 1.4,       // the finished block sits before anything leaves
  fadeDur: 0.95,   // the sheet dissolves into the page beneath
};

const EASE_OUT = [0.22, 1, 0.36, 1];

/** How long we're prepared to wait for the display face before starting. */
const FONT_WAIT = 700;

/* Words, not characters.
 *
 * A per-character reveal on a sentence this long is a hundred animating
 * spans and a wash so fine it reads as noise; per word it reads as one
 * movement of light across the line, which is what the reference does.
 * The space lives *between* the spans, never inside one, or the line
 * loses its break opportunities and stops wrapping at 375px. */
const LEAD_WORDS = LEAD.split(" ");
const SUB_WORDS = SUB.split(" ");

function useTimeline(pace) {
  return useMemo(() => {
    const t = Object.fromEntries(
      Object.entries(BASE).map(([k, v]) => [k, v * pace])
    );

    /* Derived, never typed in — editing the copy re-times the sequence
       instead of needing every downstream delay nudged by hand. */
    t.leadDone = t.leadIn + t.leadStep * (LEAD_WORDS.length - 1) + t.leadDur;
    t.markRight = t.leadDone + t.markGap;
    t.markLeft = t.markRight + t.markStep;
    t.splitAt = t.markLeft + t.markDur + t.settle;
    t.subIn = t.splitAt + t.subGap;
    t.subDone = t.subIn + t.subStep * (SUB_WORDS.length - 1) + t.subDur;
    t.exitAt =
      Math.max(t.subDone, t.splitAt + Math.max(t.splitDur, t.liftDur)) + t.hold;

    return t;
  }, [pace]);
}

/* Which corner each mark owns, and how it behaves while the pair is still
   joined. The two `lead` marks are the ones you see land beside the line;
   the other two sit underneath them at zero opacity and only light up as
   they pull away, so the division reads as one mark becoming two rather
   than two more fading in. Right lands first, left a beat behind. */
const MARKS = [
  { key: "tr", side: "right", edge: "top", lead: true, order: 0 },
  { key: "tl", side: "left", edge: "top", lead: true, order: 1 },
  { key: "br", side: "right", edge: "bottom", lead: false, order: 0 },
  { key: "bl", side: "left", edge: "bottom", lead: false, order: 1 },
];

export default function Preloader({
  /** Panel has *started* dissolving — the moment to bring the hero up, so
      it is arriving as the sheet clears rather than appearing on a blank
      page afterwards. The sheet fades before the words do, so the hero
      comes up behind them exactly like the reference. */
  onReveal,
  /** Panel is gone and unmounted. Safe point for the expensive things. */
  onComplete,
  /** Scales every delay and duration. 0.85 is noticeably brisker, 1.15
      statelier — one number, and nothing goes out of phase. */
  pace = 1,
  /** Shortest time the panel stays up, even on a warm cache. */
  minDuration = 2000,
  /** Hard ceiling — never hold the page hostage to a slow asset. */
  maxDuration = 7000,
  /** Show once per browser tab session. */
  once = true,
}) {
  const reduce = useReducedMotion();
  const T = useTimeline(pace);
  const finished = useRef(false);
  const revealed = useRef(false);

  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!once) return true;
    try {
      return sessionStorage.getItem("c4g:preloaded") !== "1";
    } catch {
      return true;
    }
  });

  /* Nothing animates until the display face has landed.
   *
   * Recoleta is materially wider than the serif fallback, so starting
   * without it means the line comes up in one face and then jumps —
   * re-wrapping mid-reveal — when the real one arrives. Holding a beat
   * costs less than the reflow, and the wait is capped so a font that
   * never loads can't stall the page. */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!visible) return;
    let live = true;
    const go = () => live && setReady(true);

    const cap = setTimeout(go, FONT_WAIT);
    if (document.fonts?.ready) document.fonts.ready.then(go);
    else go();

    return () => {
      live = false;
      clearTimeout(cap);
    };
  }, [visible]);

  /* ---------------------------------------------------------------- *
   * Where the marks travel, and where the block sits.
   *
   * The pair lands on the *lead line's* centre and ends on the corners of
   * the whole block, so both distances are measured rather than guessed:
   * the block's height changes with the viewport, with the wrap, and once
   * more when the webfont lands. `rails.top` is how far a top mark has to
   * be pushed down to sit on the lead line; `rails.bottom` is the same
   * trip upward for its twin. Both are 0 at the corners, which is where
   * the split animates them to.
   *
   * The second line is in flow from the first frame at zero opacity — it
   * has to be, or revealing it would grow the block and shunt the lead
   * line upward halfway through the sequence. But that reserved space is
   * also why the block, centred as a whole, would put the lead line high
   * of the screen's middle from the very first frame. So `rails.lift` is
   * the third measurement: the distance from the block's centre to the
   * lead line's, which the frame is offset *down* by to start with. The
   * lead therefore washes in dead centre, and giving that offset up — at
   * the same beat the marks divide — is the block riding up to make room
   * for a line that was always there.
   * ---------------------------------------------------------------- */
  const frameRef = useRef(null);
  const leadRef = useRef(null);
  const [rails, setRails] = useState({ top: 0, bottom: 0, lift: 0 });

  /* The ratio the lead line is sized down by to hold it on one line. In a
     ref as well as state because the next measurement needs to know what
     the last one applied — see below. */
  const fitRef = useRef(1);
  const [fit, setFit] = useState(1);

  useLayoutEffect(() => {
    if (!visible) return;
    const frame = frameRef.current;
    const lead = leadRef.current;
    if (!frame || !lead) return;

    /* Hold the lead line to one line.
     *
     * The range is the *ink* of the line, and it is the only honest way to
     * read a line that has overrun a centred box: `scrollWidth` counts
     * what hangs off the right and silently drops what hangs off the left,
     * which on `text-align: center` is half the overflow. Dividing by the
     * ratio already applied recovers the line's natural width — the
     * paragraph is sized in `em` throughout, so its width is linear in the
     * font size — which is what lets this land on the answer in one pass
     * instead of chasing its own tail down. */
    const refit = () => {
      const room = lead.clientWidth;
      if (!room) return;

      const range = document.createRange();
      range.selectNodeContents(lead);
      const ink = range.getBoundingClientRect().width;
      if (!ink) return; // pre-`ready`: the words aren't mounted yet

      const natural = ink / fitRef.current;
      const next = Math.min(1, room / natural);

      /* A hair of tolerance, so sub-pixel disagreement between the
         measured width and the width the browser then lays out can't sit
         here trading renders with the ResizeObserver. */
      if (Math.abs(next - fitRef.current) > 0.004) {
        fitRef.current = next;
        setFit(next);
      }
    };

    const measure = () => {
      refit();

      const h = frame.offsetHeight;
      const centre = lead.offsetTop + lead.offsetHeight / 2;

      /* Pushing the block down to centre the lead line also pushes its
         bottom edge toward the fold, so the offset is capped at whatever
         room is actually left under the block — on a short landscape
         phone the lead line lands as near the centre as it can get
         instead of hanging the second line off the screen. */
      const headroom = Math.max(0, window.innerHeight / 2 - h / 2 - 24);

      setRails({
        top: centre,
        bottom: centre - h,
        lift: Math.min(Math.max(0, h / 2 - centre), headroom),
      });
    };

    let live = true;
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(lead);

    /* The block's own box doesn't change when only the viewport *height*
       does — a mobile URL bar collapsing, say — but the cap above does. */
    window.addEventListener("resize", measure);

    /* And the face can still land after `ready`, because the wait for it is
       capped: the fit would otherwise be left holding a ratio measured
       against the fallback, which is not the same width. The observer
       usually catches the swap, but only if it happens to change the line's
       height — this doesn't depend on that. */
    document.fonts?.ready?.then(() => live && measure());

    return () => {
      live = false;
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [visible, ready]);

  /* Three states, two timers. Keeping the marks on discrete states rather
     than one long keyframe track is what lets the join distance stay a
     measured number that can change under them. */
  const [phase, setPhase] = useState("hidden");
  useEffect(() => {
    if (!visible || !ready) return;

    if (reduce) {
      setPhase("apart"); // no travel, just the finished arrangement
      return;
    }

    const a = setTimeout(() => setPhase("joined"), T.markRight * 1000);
    const b = setTimeout(() => setPhase("apart"), T.splitAt * 1000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [visible, ready, reduce, T]);

  /* Both callbacks are latched, because both have more than one caller: the
     leave can be started by the timeline, by the max-duration ceiling or by
     an unmount, and in React 18's StrictMode every effect runs twice in dev. */
  const beginReveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;

    /* Land at the top of the document before anything of it is visible.
     *
     * Restoration is already off (main.jsx), so this is aimed at the other
     * way the offset used to drift under the panel: the products section
     * sets its own height from a measurement that only settles once the
     * webfonts land, so the document grows while the sheet is down — and a
     * scroll position clamped against the shorter document creeps back down
     * with it. Doing it at the leave, not only on mount, is what pins it. */
    window.scrollTo(0, 0);

    setVisible(false);
    onReveal?.();
  }, [onReveal]);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem("c4g:preloaded", "1");
    } catch {
      /* private mode — just replay next time */
    }
    onComplete?.();
  }, [onComplete]);

  /* Skipped entirely (already seen this session) -------------------- */
  useEffect(() => {
    if (!visible) {
      revealed.current = true;
      onReveal?.();
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Lock the page while the panel is up ----------------------------- */
  useEffect(() => {
    if (!visible) return;

    /* Scroll restoration itself is disabled app-wide in main.jsx — it has to
       be off before the first paint, and before the preloader exists. This is
       just the belt to that braces, for a browser that ignores the flag. */
    window.scrollTo(0, 0);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* Tells the hero's world map to hold its blink while it can't be seen —
       288 animated SVG nodes that would otherwise be spending the panel's
       frame budget drawing behind an opaque sheet. See index.css. */
    document.documentElement.dataset.preloading = "true";

    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.documentElement.dataset.preloading;
    };
  }, [visible]);

  /* Hold for whichever comes last: the timeline or the page load -----
   *
   * The clock starts at `ready`, not at mount, because that is when the
   * animation starts — timing it from mount would let the release fire
   * part-way through the line on a cold font cache.
   *
   * Nothing else calls `beginReveal`, so without this the panel has no way
   * out. Three things can release it: the floor once `load` has fired, the
   * ceiling at `maxDuration`, and `beginReveal` being latched so whichever
   * arrives first wins and the rest are no-ops.
   */
  useEffect(() => {
    if (!visible || !ready) return;

    const started = performance.now();
    let hardStop;

    const release = () => {
      const elapsed = performance.now() - started;
      const floor = reduce ? 600 : Math.max(minDuration, T.exitAt * 1000 + 150);
      hardStop = setTimeout(beginReveal, Math.max(0, floor - elapsed));
    };

    /* `load` never fires again once it has fired, so a warm cache (or a
       StrictMode remount, which lands after it) has to be handled by hand. */
    if (document.readyState === "complete") {
      release();
    } else {
      window.addEventListener("load", release, { once: true });
    }

    const ceiling = setTimeout(beginReveal, maxDuration);

    return () => {
      window.removeEventListener("load", release);
      clearTimeout(hardStop);
      clearTimeout(ceiling);
    };
  }, [visible, ready, reduce, minDuration, maxDuration, beginReveal, T]);

  /* ---------------------------------------------------------------- *
   * Exit, in two passes.
   *
   * The words clear first and the sheet keeps going, so the hero is coming
   * up under an emptying panel rather than under a second block of copy —
   * the reference can overlap the two because it is the *same* sentence on
   * both sides of the cut, and ours is not. The parent carries no opacity
   * of its own; it only passes the variant label down, or the two fades
   * would multiply.
   * ---------------------------------------------------------------- */
  const passthrough = useMemo(() => ({ visible: {}, exit: {} }), []);

  const sheetVariants = useMemo(
    () => ({
      visible: { opacity: 1 },
      exit: {
        opacity: 0,
        transition: reduce
          ? { duration: 0.3 }
          : { duration: T.fadeDur, ease: "linear" },
      },
    }),
    [reduce, T]
  );

  const contentVariants = useMemo(
    () => ({
      visible: { opacity: 1, scale: 1 },
      exit: {
        opacity: 0,
        /* barely there — just enough parallax that the block feels like it
           is settling into the page rather than switching off */
        scale: reduce ? 1 : 1.012,
        transition: reduce
          ? { duration: 0.3 }
          : { duration: T.fadeDur * 0.55, ease: EASE_OUT },
      },
    }),
    [reduce, T]
  );

  /* Variants as functions, because each mark's join distance and stagger
     are its own — `custom` carries them in. */
  const markVariants = useMemo(
    () => ({
      hidden: ({ join }) => ({ opacity: 0, scale: 0.35, y: join }),

      joined: ({ join, lead, order }) => ({
        /* the twin is here too, exactly underneath, waiting */
        opacity: lead ? 1 : 0,
        scale: 1,
        y: join,
        transition: reduce
          ? { duration: 0.3 }
          : {
              delay: order * T.markStep,
              duration: T.markDur,
              ease: EASE_OUT,
            },
      }),

      apart: () => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: reduce
          ? { duration: 0.3 }
          : {
              duration: T.splitDur,
              ease: EASE_OUT,
              /* the twin lights up early in its travel, so it is clear of
                 its sibling before you can see it arrive */
              opacity: { duration: T.splitDur * 0.45, ease: "linear" },
            },
      }),
    }),
    [reduce, T]
  );

  /* One renderer for both lines — same wash, different clock. */
  const wash = (words, className, start, step, dur, ref) => (
    <p className={className} ref={ref}>
      {ready &&
        words.map((word, i) => {
          /* the closing full stop picks up the accent, the same way the
             hero headline's does */
          const dot = word.endsWith(".");
          const body = dot ? word.slice(0, -1) : word;

          return (
            <Fragment key={`${word}-${i}`}>
              <motion.span
                className="c4g-pre__word"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: reduce
                    ? { duration: 0.3 }
                    : { delay: start + i * step, duration: dur, ease: EASE_OUT },
                }}
              >
                {body}
                {dot && <span className="accent">.</span>}
              </motion.span>
              {/* the space sits *between* the wrappers, never inside one,
                  or the line loses the break opportunity along with it */}
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
    </p>
  );

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          className="c4g-pre"
          role="status"
          aria-live="polite"
          aria-label="Loading Cloud4Green"
          variants={passthrough}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          {/* The opaque layer, on its own so it can leave ahead of the
              words. Opacity on one full-viewport element is a compositor
              job; the clip-path this replaced was a main-thread repaint
              every frame. */}
          <motion.div className="c4g-pre__sheet" variants={sheetVariants} />

          <motion.div className="c4g-pre__viewport" variants={contentVariants}>
            {/* The panel's own label above does the announcing, so the
                per-word spans stay out of the accessibility tree —
                otherwise a screen reader reads the lines a word at a time. */}
            {/* Offset down to hang the *lead line* on the screen's centre,
                and animated back to 0 — the block's own centre — on the
                beat the marks divide. Only that release is animated: while
                the panel is still filling, the offset has to be free to
                change instantly under a re-measure (the webfont landing, a
                rotation, a resize) instead of gliding to the new number in
                front of the reader. */}
            <motion.div
              className="c4g-pre__frame"
              ref={frameRef}
              aria-hidden="true"
              /* the measured ratio that holds the lead line to one line;
                 the CSS multiplies its own clamp by it */
              style={{ "--c4g-lead-fit": fit }}
              initial={false}
              animate={{
                y: phase === "apart" ? 0 : rails.lift,
                transition:
                  phase === "apart"
                    ? reduce
                      ? { duration: 0 }
                      : { duration: T.liftDur, ease: EASE_OUT }
                    : { duration: 0 },
              }}
            >
              {MARKS.map((m) => (
                <motion.span
                  key={m.key}
                  className={`c4g-pre__glint c4g-pre__glint--${m.side} c4g-pre__glint--${m.edge}`}
                  custom={{
                    join: m.edge === "top" ? rails.top : rails.bottom,
                    lead: m.lead,
                    order: m.order,
                  }}
                  variants={markVariants}
                  initial="hidden"
                  animate={phase}
                >
                  {/* The flare, not the fat four-point glint: a small hot
                      core with long hairline rays, the same star the grid
                      sparkles use. The CSS sizes the svg (--c4g-mark), so
                      the size prop here is only the fallback. */}
                  <Sparkle variant="flare" size={28} />
                </motion.span>
              ))}

              {/* This takes the font utility, the same way every other
                  heading on the site does — taking the display face from
                  one place is what stops the panel and the hero drifting
                  apart when the config changes. */}
              {wash(
                LEAD_WORDS,
                "c4g-pre__lead font-heading",
                T.leadIn,
                T.leadStep,
                T.leadDur,
                leadRef
              )}

              {wash(
                SUB_WORDS,
                "c4g-pre__sub",
                T.subIn,
                T.subStep,
                T.subDur
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}