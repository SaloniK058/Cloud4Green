

// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// import Container from "./Container";
// import Logo from "../navbar/Logo";
// import NavLinks from "../navbar/NavLinks";
// import ContactButton from "../navbar/ContactButton";
// import MobileMenu from "../navbar/MobileMenu";
// import MegaMenu from "../navbar/MegaMenu";
// import AnnouncementBar from "../navbar/AnnouncementBar";

// import { navigation } from "@/config/navigation";
// import { cn } from "@/lib/utils";
// import { useScrolled } from "@/hooks/useScrolled";

// export default function Navbar() {
//   const isScrolled = useScrolled();
//   const [openMenu, setOpenMenu] = useState(null);
//   const location = useLocation();

//   const activeItem = navigation.find((n) => n.label === openMenu && n.mega);

//   // close on route change
//   useEffect(() => setOpenMenu(null), [location.pathname]);

//   // close on Escape
//   useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   useEffect(() => {
//   if (!openMenu) return;
//   const onScroll = () => setOpenMenu(null);
//   window.addEventListener("scroll", onScroll, { passive: true });
//   return () => window.removeEventListener("scroll", onScroll);
// }, [openMenu]);

//   return (
//     <>

//     <AnnouncementBar />
//       <header
//   className={cn(
//     "sticky top-0 z-50 transition-all duration-300",
//     // `relative` = positioning context for the absolute panel
//     "relative",
//     isScrolled || openMenu
//       ? "border-b bg-background/95 backdrop-blur shadow-sm"
//       : "bg-transparent"
//   )}
// >
//   <Container>
//     <div className="flex h-20 items-center justify-between">
//       <Logo />
//       <NavLinks openMenu={openMenu} setOpenMenu={setOpenMenu} />
//       <div className="flex items-center gap-4">
//         <div className="hidden lg:block">
//           <ContactButton />
//         </div>
//         <MobileMenu />
//       </div>
//     </div>
//   </Container>

//   {/* absolute + top-full => panel hangs BELOW the header without adding height */}
//   <div className="absolute inset-x-0 top-full">
//     <AnimatePresence initial={false}>
//       {activeItem && (
//         <MegaMenu
//           key={activeItem.label}
//           mega={activeItem.mega}
//           onClose={() => setOpenMenu(null)}
//         />
//       )}
//     </AnimatePresence>
//   </div>
// </header>

//       {/* scrim — top-20 matches the h-20 nav row */}
//       <AnimatePresence>
//         {openMenu && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={() => setOpenMenu(null)}
//             className={cn(
//               "fixed inset-x-0 bottom-0 z-40 bg-foreground/50 backdrop-blur-[3px]",
//               isScrolled ? "top-20" : "top-[120px]"
//             )}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

//////2nd attept
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// import Container from "./Container";
// import Logo from "../navbar/Logo";
// import NavLinks from "../navbar/NavLinks";
// import ContactButton from "../navbar/ContactButton";
// import MobileMenu from "../navbar/MobileMenu";
// import MegaMenu from "../navbar/MegaMenu";
// import AnnouncementBar from "../navbar/AnnouncementBar";

// import { navigation } from "@/config/navigation";
// import { cn } from "@/lib/utils";
// import { useNavShell } from "@/components/navbar/Usenavshell";

// export default function Navbar() {
//   const { sentinelRef, isPast } = useNavShell();
//   const [openMenu, setOpenMenu] = useState(null);
//   const location = useLocation();

//   const activeItem = navigation.find((n) => n.label === openMenu && n.mega);

//   // close on route change
//   useEffect(() => setOpenMenu(null), [location.pathname]);

//   // close on Escape
//   useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   // close on scroll
//   useEffect(() => {
//     if (!openMenu) return;
//     const onScroll = () => setOpenMenu(null);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [openMenu]);

//   /* Island once we're past the bar, or any time the menu is open — an open
//      panel needs an opaque bar to hang off whatever the scroll position is. */
//   const solid = isPast || Boolean(openMenu);

//   return (
//     <>
//       {/* In normal flow, and NOT sticky. This is the whole trick: the bar
//           scrolls away because it is ordinary content above a sticky header,
//           so there is no "hide the bar" state to write, no height to animate,
//           and no layout shift when it goes — the header was never holding it
//           up in the first place. */}
//       <AnnouncementBar />

//       {/* 1px of nothing. The observer watches this instead of counting
//           pixels, so nothing here knows how tall the bar is. */}
//       <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

//       <header className="sticky top-0 z-50">
//         {/* The gutter is what lifts the bar into an island. It is padding on
//             a wrapper rather than margin on the bar itself, so the sticky
//             element still spans the full width and `top-0` still means the
//             top of the viewport. */}
//         <div
//           className={cn(
//             "transition-[padding] duration-300 ease-out",
//             solid ? "px-3 pt-3 sm:px-4 sm:pt-4" : "px-0 pt-0"
//           )}
//         >
//           <div
//             className={cn(
//               "mx-auto w-full transition-all duration-300 ease-out",
//               solid
//                 ? "max-w-[1400px] rounded-2xl border bg-background/85 shadow-lg backdrop-blur-md"
//                 : "max-w-none rounded-none border-transparent bg-transparent shadow-none"
//             )}
//           >
//             <Container>
//               <div
//                 className={cn(
//                   "flex items-center justify-between transition-[height] duration-300 ease-out",
//                   solid ? "h-16" : "h-20"
//                 )}
//               >
//                 <Logo />
//                 <NavLinks openMenu={openMenu} setOpenMenu={setOpenMenu} />
//                 <div className="flex items-center gap-4">
//                   <div className="hidden lg:block">
//                     <ContactButton />
//                   </div>
//                   <MobileMenu />
//                 </div>
//               </div>
//             </Container>
//           </div>
//         </div>

//         {/* Hangs below the header without adding height to it. The same
//             gutter as the bar above, so the panel lines up with the island
//             instead of floating out to the viewport edges. */}
//         <div
//           className={cn(
//             "absolute inset-x-0 top-full transition-[padding] duration-300 ease-out",
//             solid ? "px-3 pt-2 sm:px-4" : "px-0 pt-0"
//           )}
//         >
//           <div className="mx-auto w-full max-w-[1400px]">
//             <AnimatePresence initial={false}>
//               {activeItem && (
//                 /* One constant key, on purpose. Keying on the item's label
//                    unmounts the whole panel and mounts a fresh one every time
//                    the pointer moves to the next nav item — which is the jump
//                    you were seeing. With a stable key the panel survives, the
//                    props change under it, and it resizes into the new content
//                    instead of collapsing and reopening. */
//                 <MegaMenu
//                   key="mega"
//                   mega={activeItem.mega}
//                   rounded={solid}
//                   onClose={() => setOpenMenu(null)}
//                 />
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </header>

//       {/* Full-screen, and under the header rather than beside it.
//           `fixed inset-0 z-40` against the header's z-50 means the scrim never
//           needs to know where the header ends — which is what the old
//           `isScrolled ? "top-20" : "top-[120px]"` was trying to guess, and got
//           wrong for the two frames mid-transition and for every viewport where
//           the bar wrapped to two lines. */}
//       <AnimatePresence>
//         {openMenu && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={() => setOpenMenu(null)}
//             aria-hidden="true"
//             className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-[3px]"
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

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