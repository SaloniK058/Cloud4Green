import { useEffect, useRef, useState } from "react";

/**
 * Tells you when the announcement bar has scrolled out from under the header.
 *
 * Not a scroll listener and not a pixel threshold. A 1px sentinel sits
 * directly under the bar; when it leaves the top of the viewport the header
 * has taken over the top edge, and that is the only thing the nav needs to
 * know. The upshot is that no number in this file, or in the components that
 * use it, has to agree with the bar's height — change the bar, dismiss it,
 * add a second line to it, and this keeps being right.
 *
 *   const { sentinelRef, isPast } = useNavShell();
 *   …
 *   <AnnouncementBar />
 *   <div ref={sentinelRef} aria-hidden className="h-px" />
 *   <header className="sticky top-0">…</header>
 */
export function useNavShell() {
  const sentinelRef = useRef(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setIsPast(!entry.isIntersecting),
      /* rootMargin trims the top of the viewport by nothing and the bottom by
         everything, so the sentinel counts as "visible" only while it is
         within 1px of the top edge. Without this it would still be
         intersecting all the way down the page. */
      { threshold: 0, rootMargin: "0px 0px -100% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { sentinelRef, isPast };
}