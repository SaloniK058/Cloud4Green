import { lazy } from "react";

/* Each page is its own chunk, so a phone only downloads the page it opened.
   The build writes <link rel="modulepreload"> for a page's chunks into that
   page's HTML (see vite.config.js), which is what removes the extra round trip
   that used to make splitting slower than a single bundle. */

function page(load) {
  let loaded = null;
  const Lazy = lazy(load);

  /* Once preload() has run, the page renders straight away instead of
     suspending, so nothing flashes on the first paint. */
  const Page = (props) => (loaded ? <loaded.default {...props} /> : <Lazy {...props} />);
  Page.preload = () =>
    load().then((module) => {
      loaded = module;
    });
  return Page;
}

export const routes = {
  "/": page(() => import("@/pages/Home")),
  "/enterprise": page(() => import("@/pages/Enterprise")),
  "/contact": page(() => import("@/pages/Contact")),
  "/about": page(() => import("@/pages/About")),
  "/products/enterprise-labs": page(() => import("@/pages/products/EnterpriseLabs")),
  "/products/e-learning": page(() => import("@/pages/products/ELearning")),
  "/products/certifications": page(() => import("@/pages/products/Certifications")),
  "/products/enterprise-training": page(() => import("@/pages/products/EnterpriseTraining")),
  "/services/automation": page(() => import("@/pages/services/Automation")),
  "/services/consulting": page(() => import("@/pages/services/Consulting")),
  "/customers": page(() => import("@/pages/CustomerStories")),
  "/whats-new": page(() => import("@/pages/WhatsNew")),
  "/privacy": page(() => import("@/pages/Privacy")),
  "/terms": page(() => import("@/pages/Terms")),
};

export const NotFound = page(() => import("@/pages/NotFound"));

const normalise = (path) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export const routeFor = (path) => routes[normalise(path)] ?? NotFound;

/* A link the pointer or keyboard reaches is likely to be followed, so fetch its
   page now and the click lands on code that's already here. */
export function preloadLinkedPages() {
  const preload = (event) => {
    const link = event.target.closest?.('a[href^="/"]');
    if (!link) return;
    routeFor(new URL(link.href).pathname)
      .preload()
      .catch(() => {});
  };
  document.addEventListener("pointerover", preload, { passive: true });
  document.addEventListener("focusin", preload);
}
