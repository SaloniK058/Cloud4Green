/**
 * Records the text each page really shows, so the build can put it in the HTML
 * for crawlers that don't run JavaScript (see src/config/seoShell.js).
 *
 *   npm run build && npm run seo:snapshot && npm run build
 *
 * Re-run it after changing page copy and commit src/data/seoSnapshot.json. It
 * needs Edge or Chrome installed, so it stays a manual step rather than part of
 * the build: Netlify's build machines have neither, and they only need the JSON.
 */
import { execFile } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { preview } from "vite";

import { PAGES } from "../src/config/seo.js";

const BROWSERS = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);

const browser = BROWSERS.find(existsSync);
if (!browser) throw new Error("Edge or Chrome is required. Set CHROME_PATH to its path.");

const PORT = 4190;
const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: "error" });
const profile = mkdtempSync(join(tmpdir(), "c4g-snapshot-"));

/* Asynchronous on purpose: the preview server lives in this process, and a
   blocking call here would stop it answering the browser it is waiting for. */
const run = promisify(execFile);

async function dump(path) {
  const { stdout } = await run(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--ignore-certificate-errors",
      `--user-data-dir=${profile}`,
      "--virtual-time-budget=12000",
      "--dump-dom",
      `https://localhost:${PORT}${path}`,
    ],
    { maxBuffer: 64 * 1024 * 1024, timeout: 60_000 },
  );
  return stdout;
}

const toText = (html) =>
  html
    .replace(/<br\s*\/?>/g, " ")
    .replace(/<\/?(p|div|li|ul|ol|h[1-6]|dt|dd|td|tr)\b[^>]*>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .replace(/([a-z][.!?])([A-Z])/g, "$1 $2")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();

function extract(dom) {
  const main = dom
    .replace(/<(script|style|svg|nav|header|footer|iframe|button|select|form)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<div[^>]*aria-hidden="true"[^>]*>\s*<\/div>/g, " ");

  const seen = new Set();
  const blocks = [];
  for (const [, tag, inner] of main.matchAll(/<(h[1-6]|p|li|dd)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const text = toText(inner);
    if (text.length < 3 || seen.has(text) || /^[\d\W]+$/.test(text)) continue;
    seen.add(text);
    blocks.push([tag, text]);
  }
  return blocks;
}

const snapshot = {};
for (const path of Object.keys(PAGES)) {
  const blocks = extract(await dump(path));
  snapshot[path] = blocks;
  console.log(path.padEnd(34), blocks.length, "blocks");
}

writeFileSync("src/data/seoSnapshot.json", `${JSON.stringify(snapshot, null, 1)}\n`);
await server.close();
process.exit(0);
