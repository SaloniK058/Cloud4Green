

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "../navbar/Logo";
import NavPill from "@/components/navbar/Navpill";
import ContactButton from "../navbar/ContactButton";
import MobileMenu from "../navbar/MobileMenu";
import MegaMenu from "../navbar/MegaMenu";
import AnnouncementBar from "../navbar/AnnouncementBar";

import { navigation } from "@/config/navigation";
import { useNavShell } from "@/components/navbar/Usenavshell";
import { useHideOnScroll } from "@/components/navbar/Usehideonscroll";

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { sentinelRef, isPast } = useNavShell();
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const activeItem = navigation.find((n) => n.label === openMenu && n.mega);

  /* Only ever hides once the announcement bar is gone and no panel is open.
     Retracting over the bar looks like a bug, and retracting out from under
     an open mega menu leaves the panel floating on its own. */
  const hidden = useHideOnScroll({ enabled: isPast && !openMenu });

  // close on route change
  useEffect(() => setOpenMenu(null), [location.pathname]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close on scroll
  useEffect(() => {
    if (!openMenu) return;
    const onScroll = () => setOpenMenu(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu]);

  return (
    <>
      {/* In normal flow and NOT sticky: it is ordinary content above a
          sticky header, so it scrolls away on its own. Nothing hides it. */}
      <AnnouncementBar />

      {/* 1px of nothing — the observer watches this rather than counting
          pixels, so no number here has to match the bar's height. */}
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

      {/* The header keeps its own height in flow, so page content sits
          below it and then slides underneath as you scroll — which is what
          gives the three groups their floating look without a fixed
          position and a matching pad on every page. */}
      <header
        className="sticky top-0 z-50"
        /* Leaving the header entirely is the close. The panel lives inside
           it, so travelling from a pill item down into the panel never
           crosses the boundary and never closes it — no hover-intent timer,
           no dead zone to bridge. */
        onMouseLeave={() => setOpenMenu(null)}
      >
        <motion.div
          className="relative"
          animate={{ y: hidden ? "-125%" : "0%" }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          {/* No bar, no surface. Three groups floating over the page, the
              way the reference does it — the only opaque thing up here is
              the pill itself. */}
          <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8">
            <Logo />

            {/* Centred independently of the two side groups, so an
                unusually wide logo or CTA can't shove the pill off the
                middle of the page. */}
            <div className="pointer-events-none absolute inset-x-0 flex justify-center">
              <div className="pointer-events-auto">
                <NavPill
                  items={navigation}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <ContactButton />
              </div>
              <MobileMenu />
            </div>
          </div>

          {/* Hangs below the row without adding height to it, and travels
              with the retract because it is inside the same wrapper. */}
          <div className="absolute inset-x-0 top-full px-5 sm:px-8">
            <div className="mx-auto w-full max-w-[1240px]">
              <AnimatePresence initial={false}>
                {activeItem && (
                  /* One constant key, on purpose. Keying on the item's
                     label unmounts the panel and mounts a fresh one every
                     time the pointer moves along the pill — that is the
                     jump. With a stable key the panel survives, the props
                     change under it, and it resizes into the new content. */
                  <MegaMenu
                    key="mega"
                    mega={activeItem.mega}
                    rounded
                    onClose={() => setOpenMenu(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Full-screen and *under* the header rather than beside it, so it
          never has to know where the header ends. */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenMenu(null)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-[3px]"
          />
        )}
      </AnimatePresence>
    </>
  );
}