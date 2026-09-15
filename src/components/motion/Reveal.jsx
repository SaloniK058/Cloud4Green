"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  DURATION,
  EASE,
  RISE,
  STAGGER,
  VIEWPORT,
} from "@/components/motion/reveal-tokens";

/**
 * The house scroll reveal.
 *
 * One curve, one distance, one stagger, used by every section below the fold,
 * so the page reads as a single object arriving rather than as five sections
 * each doing their own thing. The numbers, and why they are those numbers, are
 * in reveal-tokens.js — they were read off bouayaben.com's and
 * phobos.com.au's own bundles rather than guessed at from watching the sites.
 *
 * Two reveals live here and they are not interchangeable:
 *
 *   Reveal / RevealGroup / RevealItem   fade up. For body copy, cards, panels,
 *                                       and any heading whose line breaks move
 *                                       with the viewport.
 *   RevealLines                         masked line rise, no fade at all. For
 *                                       display type whose breaks are known.
 *
 * Nothing here re-runs — see `once` in VIEWPORT.
 */

const riseVariants = {
  hidden: { opacity: 0, y: RISE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

/* Under reduced motion the content is simply there. Not "the same animation but
   faster" — the request is for no motion, and a 10ms fade is still motion. */
const staticVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/**
 * A single block that fades and rises as it comes into view.
 *
 * `as` takes any intrinsic tag, so this can be the heading/paragraph/section
 * itself rather than a wrapper div — a wrapper would add a block box to layouts
 * (the hero field, the sticky products row) whose spacing is derived from the
 * boxes that are already there.
 */
export function Reveal({
  as = "div",
  delay = 0,
  y = RISE,
  duration = DURATION,
  className,
  children,
  ...rest
}) {
  const still = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      initial={still ? false : { opacity: 0, y }}
      whileInView={still ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A parent that hands the trigger to its `RevealItem` descendants and spaces
 * them out.
 *
 * The group is what makes this look composed rather than scripted: the section
 * is observed *once*, at the group's own edge crossing, and the children then
 * run off that one trigger on a fixed offset. Give each child its own
 * `whileInView` instead and the offsets become a function of how far apart they
 * happen to sit on screen — which on a wide viewport means a whole row fires
 * simultaneously, and on a phone means it fires one item per scroll notch.
 */
export function RevealGroup({
  as = "div",
  delay = 0,
  stagger = STAGGER,
  rise = false,
  className,
  children,
  ...rest
}) {
  const still = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  /* `rise` makes the group a beat of its own as well as the conductor — the
     frame comes up, and the copy inside it follows `delay` later while the
     frame is still settling. Without it the group is pure orchestration and
     only the children move, which is what you want when the group is just a
     layout div that happens to wrap them. */
  const self = rise && !still;

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: self ? { opacity: 0, y: RISE } : {},
        visible: {
          ...(self ? { opacity: 1, y: 0 } : {}),
          transition: still
            ? { duration: 0 }
            : {
                duration: DURATION,
                ease: EASE,
                staggerChildren: stagger,
                delayChildren: delay,
              },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * One beat inside a `RevealGroup`. Carries no trigger of its own — it inherits
 * the group's state through framer's variant propagation, which is what keeps
 * the stagger honest.
 */
export function RevealItem({ as = "div", className, children, ...rest }) {
  const still = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      variants={still ? staticVariants : riseVariants}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A headline whose lines rise out from behind their own baseline, one after
 * the next.
 *
 * This is the effect on both reference sites' display type, and it is a
 * different thing from a fade-up: there is no fade at all. Each line sits in a
 * box clipped to the line's own height and starts fully below it, so what you
 * see is type sliding up out of nothing at full opacity. Fading it as well
 * halves the effect — the mask is already doing the reveal, and an opacity ramp
 * on top just makes it look like the mask isn't tight.
 *
 * `lines` is an array of nodes rather than a string, because our headings carry
 * coloured runs inside them (the blue full stop, the accent phrase in the
 * challenges section) and splitting a string would flatten them.
 *
 *   <RevealLines as="h2" lines={["Tell us the roles.", <>We'll send back a plan<Stop/></>]} />
 *
 * `headroom` and `underhang` grow the clip box past the line box and pull it
 * straight back with an equal negative margin, so they add no layout height.
 * They exist only so that, once the line has landed, nothing is sliced off:
 * ascenders and the hero's asterisk above, descenders below.
 *
 * They are two numbers rather than one because only the bottom edge is load
 * bearing. That is the edge the type enters through, so every em added there is
 * an em of the line that is visible before the reveal starts. The top edge is
 * free — the line is nowhere near it until it has arrived — which is why a
 * headline with something hanging high above the cap band can be given as much
 * room up there as it needs and cost nothing.
 *
 * Hence the 125% start rather than the references' 110%: it has to clear the
 * line box *plus* the underhang. At a typical 1.1em leading, 0.25 × 1.1em =
 * 0.275em of clearance against a 0.14em underhang. Raise the underhang past
 * that and a sliver of the line sits visible at rest.
 */
export function RevealLines({
  as = "h2",
  lines,
  delay = 0,
  stagger = 0.12,
  duration = 1.1,
  headroom = "0.2em",
  underhang = "0.14em",
  nested = false,
  className,
  lineClassName = "",
  ...rest
}) {
  const still = useReducedMotion();
  const Tag = motion[as] ?? motion.h2;

  /* Inside a RevealGroup this has to take its cue from the group rather than
     observe the viewport for itself, or it fires on its own edge crossing and
     drops out of the group's order — the heading would arrive alongside the
     eyebrow above it instead of after it. A motion component inherits its
     parent's variant state only if it declares no `initial`/`animate` of its
     own, so when nested it declares neither and passes the state down to its
     lines through `variants` alone. `delay` is then measured from the group's
     beat for this child, not from the trigger. */
  const trigger = nested
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: VIEWPORT };

  return (
    <Tag
      {...trigger}
      variants={{
        hidden: {},
        visible: {
          transition: still
            ? { duration: 0 }
            : { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
      {...rest}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block overflow-hidden ${lineClassName}`}
          style={{
            paddingBlockStart: headroom,
            marginBlockStart: `calc(-1 * ${headroom})`,
            paddingBlockEnd: underhang,
            marginBlockEnd: `calc(-1 * ${underhang})`,
          }}
        >
          <motion.span
            className="block will-change-transform"
            variants={
              still
                ? { hidden: { y: "0%" }, visible: { y: "0%" } }
                : {
                    hidden: { y: "125%" },
                    visible: {
                      y: "0%",
                      transition: { duration, ease: EASE },
                    },
                  }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
