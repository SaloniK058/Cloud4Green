/**
 * Search and social metadata — the single source for every page's <head>.
 *
 * Read in three places, which is why this file imports nothing but plain data
 * (no React, no assets, no "@/" aliases): vite.config.js loads it in Node.
 *
 *   1. The build (vite.config.js, seoPages plugin) writes a static HTML file
 *      per route with these tags already in its <head>, plus sitemap.xml,
 *      robots.txt and Netlify's _redirects. Crawlers and link-preview bots
 *      that don't run JavaScript — LinkedIn, Slack, WhatsApp, Bing's first
 *      pass — see the right title and description without booting React.
 *   2. The dev server injects the same tags per request.
 *   3. <RouteSeo /> swaps them on client-side navigation, so the tab title and
 *      the canonical follow the route the reader is actually on.
 *
 * Adding a page: add its route to App.jsx and an entry to PAGES here. Nothing
 * else — it lands in the sitemap and gets its own HTML file automatically.
 */

import { eLearningFaqs, enterpriseLabsFaqs } from "../data/faqs.js";

/* The production origin. Canonicals, og:url and the sitemap are all absolute,
   so this must be the domain the site is actually served from. */
export const SITE_URL = "https://cloud4green.com";

export const SITE_NAME = "Cloud4Green";
const LEGAL_NAME = "Cloud4Green Technologies";
const LANGUAGE = "en-IN";

/* 1200x630, in /public. */
const OG_IMAGE = "/og-image.png";
const LOGO = "/logo.png";

const EMAIL = "reach@cloud4green.com";
const PHONE = "+91-7022424545";
const LINKEDIN = "https://www.linkedin.com/company/cloud4green-technologies/";

/* Indexable pages.
     title        the full <title>; keep it under ~60 characters
     description  the search snippet; ~120–160 characters
     keywords     the phrases the page targets, kept short and truthful
     crumb        names the page in breadcrumb structured data
     h1           must match the page's real <h1>
     lead         a text-only page's intro, word for word, so it paints from the HTML
     leadBand     that intro sits on the page's blue masthead
     pageType     schema.org type, when more specific than WebPage
     service      adds a Service node: what the page sells
     faqs         adds an FAQPage node; only for questions shown on the page */
export const PAGES = {
  "/": {
    title: "Cloud & AI Labs in India & Corporate Training | Cloud4Green",
    description:
      "Hands-on cloud and AI labs, an enterprise LMS and corporate IT training from Bengaluru, India. 1M+ learners trained in 13+ years. Book a demo today.",
    keywords:
      "cloud labs India, AI labs, hands-on labs, corporate IT training India, enterprise LMS India, certification training, Cloud4Green",
    h1: "Hands-on labs for enterprise learning",
    priority: 1.0,
  },
  "/enterprise": {
    crumb: "Enterprise",
    title: "Enterprise Learning Platform for Cloud & AI | Cloud4Green",
    description:
      "One connected enterprise learning platform for cloud labs, AI labs, an LMS, certifications and analytics, built to upskill modern organisations at scale.",
    keywords: "enterprise learning platform, enterprise upskilling, workforce training platform, learning analytics",
    h1: "Enterprise learning platform",
    service: "Enterprise learning platform",
    priority: 0.9,
  },
  "/products/enterprise-labs": {
    crumb: "Enterprise Labs",
    title: "Cloud Labs India: AWS, Azure, GCP & AI Labs | Cloud4Green",
    description:
      "Live cloud labs in India for enterprise teams: 28 domains and 415 technologies across AWS, Azure, GCP and Kubernetes, validated as people work. Book a demo.",
    keywords:
      "cloud labs India, enterprise cloud labs, AI labs, hands-on labs, AWS labs, Azure labs, GCP labs, Kubernetes labs",
    h1: "Enterprise cloud and AI labs",
    service: "Enterprise cloud and AI labs",
    faqs: enterpriseLabsFaqs,
    priority: 0.9,
  },
  "/products/e-learning": {
    crumb: "E-Learning",
    title: "Enterprise LMS & E-Learning Solutions India | Cloud4Green",
    description:
      "Managed enterprise LMS and e-learning in India: needs analysis, content development, LMS management and ROI reporting, with hands-on cloud and AI training.",
    keywords:
      "enterprise LMS India, enterprise e-learning, managed LMS, LMS management, learning content development, managed learning services",
    h1: "Enterprise e-learning and LMS solutions",
    service: "Enterprise e-learning and LMS management",
    faqs: eLearningFaqs,
    priority: 0.9,
  },
  "/products/certifications": {
    crumb: "Certifications",
    title: "AWS & Azure Certification Training Bangalore | Cloud4Green",
    description:
      "AWS, Azure and Google Cloud certification training from Bengaluru: exam-mapped tracks with hands-on practice labs, mock exams and voucher support. Enquire now.",
    keywords:
      "AWS training Bangalore, Azure training Bangalore, cloud certification training, AWS certification training, Google Cloud certification, Kubernetes certification",
    h1: "Turn Hands-On Skills Into Industry Credentials",
    service: "Cloud and IT certification training",
    priority: 0.9,
  },
  "/products/enterprise-training": {
    crumb: "Enterprise Training",
    title: "Corporate Cloud & AI Training in India | Cloud4Green",
    description:
      "Corporate training in India for cloud, GenAI, DevOps, data and security: instructor-led, self-paced or blended, on live cloud accounts, built for your goals.",
    keywords:
      "corporate training India, corporate cloud training, enterprise AI training, GenAI training, DevOps training, instructor-led training",
    h1: "Corporate cloud and AI training",
    service: "Corporate cloud and AI training",
    priority: 0.9,
  },
  "/services/automation": {
    crumb: "Automation",
    title: "Workflow Automation & AI Agent Services | Cloud4Green",
    description:
      "Automate repetitive processes, connect enterprise systems and deploy AI agents. Workflow automation, AI agents and agentic automation built on your own stack.",
    keywords:
      "workflow automation services, AI agents, agentic automation, business process automation, enterprise automation, RPA",
    h1: "Workflow automation and AI agents",
    service: "Workflow automation and AI agents",
    priority: 0.8,
  },
  "/services/consulting": {
    crumb: "Consulting",
    title: "Business & Technology Consulting Services | Cloud4Green",
    description:
      "Strategy, operations, digital, technology and marketing consulting: twenty services across four practices that turn ambition into measurable business outcomes.",
    keywords:
      "business consulting, technology consulting, strategy consulting, operational excellence, digital transformation consulting",
    h1: "Business and technology consulting",
    service: "Business and technology consulting",
    priority: 0.8,
  },
  "/customers": {
    crumb: "Customer Stories",
    title: "Customer Stories & Learner Reviews | Cloud4Green",
    description:
      "Read what learners say about Cloud4Green's AWS, Azure, VMware and cloud training in their own Google reviews, and how teams build skills with our programmes.",
    keywords: "Cloud4Green reviews, cloud training reviews, AWS training reviews, Azure training reviews, customer stories",
    h1: "Customer stories and reviews",
    priority: 0.8,
  },
  "/whats-new": {
    crumb: "What's New",
    title: "What's New: ReyvanX Zero Trust & More | Cloud4Green",
    description:
      "The latest from Cloud4Green: ReyvanX zero trust network access, new cloud and GenAI labs, LMS updates and refreshed certification tracks.",
    keywords: "ReyvanX, zero trust network access, ZTNA, new cloud labs, GenAI labs, Cloud4Green updates",
    h1: "The latest from Cloud4Green",
    priority: 0.7,
  },
  "/about": {
    crumb: "About",
    title: "About Cloud4Green: Cloud & AI Training in Bengaluru",
    description:
      "Cloud4Green Technologies is a Bengaluru-based learning and technology company: 13+ years of hands-on cloud, AI and security training for people and enterprises.",
    keywords: "about Cloud4Green, Cloud4Green Technologies, cloud training company Bengaluru, IT training company India",
    h1: "About Cloud4Green Technologies",
    pageType: "AboutPage",
    priority: 0.7,
  },
  "/contact": {
    crumb: "Contact",
    title: "Contact Cloud4Green | Cloud & AI Training, Bengaluru",
    description:
      "Talk to Cloud4Green about hands-on cloud and AI labs, an enterprise LMS or tailored training. Book a 30-minute call or send us a message to get started.",
    keywords: "contact Cloud4Green, enterprise training enquiry, book a cloud training consultation",
    h1: "Let's build the right solution together",
    lead: "Whether you need hands-on Cloud & AI Labs, an enterprise LMS, AI engineering, or a tailored learning solution, our team is here to help.",
    leadBand: true,
    pageType: "ContactPage",
    priority: 0.7,
  },
  "/privacy": {
    crumb: "Privacy Policy",
    title: "Privacy Policy | Cloud4Green",
    description:
      "How Cloud4Green collects, uses and protects personal data through this website, who we share it with, and the rights and choices you have.",
    h1: "Privacy Policy",
    lead: "What personal data we collect through this website, why we collect it, and the choices you have.",
    priority: 0.3,
  },
  "/terms": {
    crumb: "Terms of Service",
    title: "Terms of Service | Cloud4Green",
    description:
      "The terms for using the Cloud4Green website and lab logins, including acceptable use, intellectual property, disclaimers and our service agreements.",
    h1: "Terms of Service",
    lead: "The rules for using the Cloud4Green website and lab logins, and how they relate to any services you buy from us.",
    priority: 0.3,
  },
};

/* Linked from the site but not built yet. They answer 200 with the
   "in progress" page and are kept out of the index (noindex, not in the
   sitemap) until they have content. A trailing /* matches everything under
   that path. Anything that is neither here nor in PAGES is a real 404. */
export const COMING_SOON = [];

const COMING_SOON_META = {
  title: `Coming soon | ${SITE_NAME}`,
  description: "This page is under construction and will be up soon.",
  noindex: true,
};

const NOT_FOUND_META = {
  title: `Page not found | ${SITE_NAME}`,
  description: "The page you were looking for doesn't exist.",
  noindex: true,
};

const normalise = (path) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function isComingSoon(path) {
  const p = normalise(path);
  return COMING_SOON.some((pattern) =>
    pattern.endsWith("/*")
      ? p.startsWith(pattern.slice(0, -1))
      : p === pattern,
  );
}

/** The metadata for any path: a page, a coming-soon route, or a 404. */
export function metaFor(path) {
  const p = normalise(path.split(/[?#]/)[0] || "/");
  if (PAGES[p]) return { ...PAGES[p], path: p };
  if (isComingSoon(p)) return { ...COMING_SOON_META, path: p };
  return { ...NOT_FOUND_META, path: p };
}

export const absolute = (path) => SITE_URL + (path === "/" ? "/" : path);

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/* No aggregateRating here, on purpose: Google treats ratings a business puts
   on its own site as self-serving and won't show them, and marking up the
   Google Maps score as ours breaks its review snippet policy. */
function structuredData(meta) {
  const url = absolute(meta.path);

  const graph = [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: LEGAL_NAME,
      legalName: LEGAL_NAME,
      url: `${SITE_URL}/`,
      logo: SITE_URL + LOGO,
      description:
        "Bengaluru-based learning and technology company providing hands-on cloud and AI labs, enterprise learning, certification training, automation and consulting.",
      foundingDate: "2013",
      email: EMAIL,
      telephone: PHONE,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      sameAs: [LINKEDIN],
      areaServed: { "@type": "Country", name: "India" },
      knowsAbout: [
        "Cloud computing",
        "Artificial intelligence",
        "DevOps",
        "Cybersecurity",
        "Corporate training",
        "Workflow automation",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: EMAIL,
          telephone: PHONE,
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: LANGUAGE,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": meta.pageType ?? "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: LANGUAGE,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      primaryImageOfPage: SITE_URL + OG_IMAGE,
    },
  ];

  if (meta.crumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: meta.crumb, item: url },
      ],
    });
  }

  if (meta.service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: meta.service,
      description: meta.description,
      url,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "India" },
    });
  }

  if (meta.faqs) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: meta.faqs
        .filter(({ a }) => typeof a === "string")
        .map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
    });
  }

  /* `<` escaped so no string in the data can close the script element. */
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
}

/**
 * Every tag this module owns, as an HTML string. Each carries data-seo so the
 * client can find and replace exactly this set and nothing else in <head>.
 */
export function headTags(path) {
  const meta = metaFor(path);
  const url = absolute(meta.path);
  const image = SITE_URL + OG_IMAGE;

  const tags = [
    `<title data-seo>${esc(meta.title)}</title>`,
    `<meta data-seo name="description" content="${esc(meta.description)}" />`,
  ];

  /* Google ignores this tag; Bing and smaller engines may still read it. */
  if (meta.keywords) {
    tags.push(`<meta data-seo name="keywords" content="${esc(meta.keywords)}" />`);
  }

  if (meta.noindex) {
    tags.push(`<meta data-seo name="robots" content="noindex, follow" />`);
  } else {
    tags.push(
      `<meta data-seo name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
      `<link data-seo rel="canonical" href="${esc(url)}" />`,
      `<meta data-seo property="og:type" content="website" />`,
      `<meta data-seo property="og:site_name" content="${SITE_NAME}" />`,
      `<meta data-seo property="og:locale" content="en_IN" />`,
      `<meta data-seo property="og:title" content="${esc(meta.title)}" />`,
      `<meta data-seo property="og:description" content="${esc(meta.description)}" />`,
      `<meta data-seo property="og:url" content="${esc(url)}" />`,
      `<meta data-seo property="og:image" content="${esc(image)}" />`,
      `<meta data-seo property="og:image:width" content="1200" />`,
      `<meta data-seo property="og:image:height" content="630" />`,
      `<meta data-seo property="og:image:alt" content="${SITE_NAME} — hands-on cloud and AI labs for enterprise learning" />`,
      `<meta data-seo name="twitter:card" content="summary_large_image" />`,
      `<meta data-seo name="twitter:title" content="${esc(meta.title)}" />`,
      `<meta data-seo name="twitter:description" content="${esc(meta.description)}" />`,
      `<meta data-seo name="twitter:image" content="${esc(image)}" />`,
      `<meta data-seo name="twitter:image:alt" content="${SITE_NAME} — hands-on cloud and AI labs for enterprise learning" />`,
      `<script data-seo type="application/ld+json">${structuredData(meta)}</script>`,
    );
  }

  return tags.join("\n    ");
}
