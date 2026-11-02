import { useEffect, useRef, useState } from "react";

/**
 * For a third-party iframe: says when to mount it. Bookings and Maps bring
 * hundreds of kilobytes of someone else's scripts and cookies, so they wait
 * until the page has finished loading and the visitor is close to them.
 * Native loading="lazy" alone isn't enough: a frame near the top of a desktop
 * page still starts at once and competes with the page itself.
 */
export function useDeferredEmbed() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let io;
    let wait;
    const watch = () => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setShow(true);
        },
        { rootMargin: "400px" },
      );
      io.observe(el);
    };
    const start = () => {
      wait = setTimeout(watch, 1000);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      clearTimeout(wait);
      io?.disconnect();
    };
  }, []);

  return [ref, show];
}
