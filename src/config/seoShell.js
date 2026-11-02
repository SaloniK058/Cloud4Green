/**
 * The page's real words as plain HTML, written into #root at build time so a
 * crawler that doesn't run JavaScript gets the page instead of an empty div.
 * React replaces it on mount.
 *
 * Build-time only: vite.config.js imports this, the app must not, or the whole
 * snapshot lands in the JavaScript bundle.
 *
 * The text comes from seoSnapshot.json, recorded from the rendered pages by
 * scripts/snapshot-content.mjs. It has to stay what visitors see: serving
 * crawlers words the page doesn't show is cloaking. Re-run the snapshot after
 * changing page copy.
 */

import { PAGES, metaFor } from "./seo.js";
import snapshot from "../data/seoSnapshot.json" with { type: "json" };

const esc = (s) =>
  String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const SHELL_LINKS = Object.entries(PAGES)
  .filter(([path]) => path !== "/privacy" && path !== "/terms")
  .map(([path, page]) => `<li><a href="${path}">${esc(page.crumb ?? "Home")}</a></li>`)
  .join("");

/* The logo sits exactly where the navbar will put it, so a phone paints the
   brand as soon as the HTML arrives instead of a blank page while the
   JavaScript loads, and React's real navbar lands on top without a jump. */
const chrome = (logo) =>
  `<div class="seo-chrome"><div class="seo-promo"></div><div class="seo-nav">` +
  `<img src="/${logo}" width="234" height="64" alt="Cloud4Green" fetchpriority="high" /></div></div>`;

/* The hero's backdrop, painted before any JavaScript runs. On a phone this is
   what turns "waiting for 300 KB of scripts" into "the page is there". It stops
   at the navbar on purpose: browsers treat an image filling the whole viewport
   as a background and don't count it as content. */
const heroImage = (hero) =>
  hero ? `<img class="seo-hero" src="/${hero}" alt="" fetchpriority="high" />` : "";

/* The home page opens on the preloader's cream sheet, which needs JavaScript.
   This puts the brand mark on that same sheet from the first paint. */
const brandMark = (mark) =>
  mark ? `<img class="seo-mark" src="/${mark}" width="160" height="160" alt="" fetchpriority="high" />` : "";

/* A text-only page's largest paint is its intro, so that goes in the HTML too,
   where the page will put it. */
const lead = (text, band) =>
  text ? `${band ? '<div class="seo-band"></div>' : ""}<p class="seo-lead${band ? " seo-lead--band" : ""}">${esc(text)}</p>` : "";

/* Paints first, scripts second. On a slow connection scripts started alongside
   the first paint compete with it, so the page's code begins as soon as the
   browser reports the hero on screen. Capped, so a slow image never holds up
   the page, and skipped if there is nothing in the HTML to wait for. */
export function bootScript(entry, tags) {
  const files = JSON.stringify(tags);
  return (
    `<script>(function(){var f=${files},d=0,go=function(){if(d)return;d=1;` +
    `f.forEach(function(a){var l=document.createElement("link");for(var k in a)l.setAttribute(k,a[k]);document.head.appendChild(l)});` +
    `var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src="/${entry}";document.head.appendChild(s)},` +
    `i=document.querySelector(".seo-hero,.seo-mark,.seo-lead");` +
    `if(!i||!window.PerformanceObserver)return go();setTimeout(go,800);` +
    `new PerformanceObserver(function(l){if(l.getEntries().some(function(e){return e.element===i}))go()})` +
    `.observe({type:"largest-contentful-paint",buffered:true})})()</script>`
  );
}

export function shellHtml(path, logo, hero, mark) {
  const meta = metaFor(path);
  if (!meta.h1) return "";

  const blocks = (snapshot[meta.path] ?? []).filter(([tag]) => tag !== "h1");
  const shown = new Set(blocks.map(([, text]) => text));

  /* Accordions can leave answers out of the rendered page; the FAQ data is what
     the page shows when one is opened, so it counts as the page's text. */
  const faqs = (meta.faqs ?? [])
    .filter(({ q, a }) => typeof a === "string" && !shown.has(a) && !shown.has(q))
    .flatMap(({ q, a }) => [
      ["h3", q],
      ["p", a],
    ]);

  const body = [...blocks, ...faqs]
    .map(([tag, text]) => {
      const name = /^h[2-6]$/.test(tag) ? tag : "p";
      return `<${name}>${esc(text)}</${name}>`;
    })
    .join("");

  return (
    `${heroImage(hero)}${brandMark(mark)}${chrome(logo)}${lead(meta.lead, meta.leadBand)}<main class="seo-shell"><h1>${esc(meta.h1)}</h1><p>${esc(meta.description)}</p>${body}` +
    `<nav aria-label="Pages"><ul>${SHELL_LINKS}</ul></nav></main>`
  );
}

/* The app mounts well inside this delay, so a normal visit never shows the
   shell. If the JavaScript is slow or blocked, the copy fades in and the
   visitor has something to read instead of a blank page. */
export const SHELL_STYLE =
  "<style>.seo-promo{height:2.5rem;background:#010d1b}" +
  ".seo-nav{box-sizing:border-box;height:5rem;max-width:1600px;margin:1px auto 0;padding:8px 20px}" +
  ".seo-nav img{display:block;height:65px;width:auto}" +
  ".seo-lead{position:absolute;top:286px;left:20px;right:20px;max-width:760px;margin:0;" +
  "font:15px/28px system-ui,sans-serif;color:#4A5261}" +
  ".seo-band{position:absolute;top:calc(2.5rem + 1px + 5rem);left:0;right:0;z-index:-1;height:590px;background:#0B5CFF}" +
  ".seo-lead--band{top:428px;color:#fff;max-width:576px}" +
  ".seo-mark{position:fixed;top:50%;left:50%;width:160px;height:160px;margin:-80px 0 0 -80px}" +
  ".seo-hero{position:absolute;top:calc(2.5rem + 1px + 5rem);left:0;z-index:-1;width:100%;" +
  "height:calc(100svh - 2.5rem - 1px - 5rem);object-fit:cover;opacity:.45}" +
  "@media(min-width:640px){.seo-nav{padding-inline:32px}}" +
  ".seo-shell{max-width:720px;margin:0 auto;padding:48px 20px;font:16px/1.6 system-ui,sans-serif;" +
  "color:#101418;opacity:0;animation:seo-shell-in .3s 4s forwards}" +
  "@keyframes seo-shell-in{to{opacity:1}}</style>";
