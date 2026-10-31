import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { RevealGroup, RevealItem, RevealLines } from "@/components/motion/Reveal";

/**
 * The shared layout for /privacy and /terms: a short masthead, then the
 * document on a contents rail. House language — cream ground, Recoleta medium
 * uppercase for display type, #0B5CFF spent on the asterisk and the full stop.
 *
 * Only the masthead moves. A legal document is read, and often printed, so the
 * body renders in place rather than revealing on scroll.
 *
 * Each section is { id, title, content }; `content` is plain JSX, styled from
 * here so the two documents can't drift apart.
 */

/* The document's type, set once on the wrapper. */
const PROSE =
  "text-[15px] leading-7 text-[#4A5261] " +
  "[&_p+p]:mt-4 [&_p+ul]:mt-3 [&_ul+p]:mt-4 " +
  "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-[#0B5CFF] " +
  "[&_strong]:font-semibold [&_strong]:text-[#101418] " +
  "[&_a]:font-medium [&_a]:text-[#0B5CFF] [&_a]:underline [&_a]:underline-offset-4";

/** The brand asterisk, as it appears on every section eyebrow. */
function Asterisk() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      className="h-3.5 w-3.5 shrink-0 stroke-[#0B5CFF]"
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

export default function LegalPage({ title, updated, intro, sections }) {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        {/* ── Masthead ─────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden border-b border-[#101418]/8 py-16 lg:py-24">
          <PageGrid diagonal="tl-br" />

          <Container>
            <RevealGroup mount delay={0.08} className="max-w-[760px]">
              <RevealItem
                as="p"
                className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]"
              >
                <Asterisk />
                Legal
              </RevealItem>

              {/* Recoleta ships as a single Medium file, so font-medium. */}
              <RevealLines
                nested
                as="h1"
                lines={[
                  <>
                    {title}
                    <span className="text-[#0B5CFF]">.</span>
                  </>,
                ]}
                className="mt-5 font-recoleta text-[2.4rem] font-medium uppercase leading-[1.02] tracking-[-0.025em] text-[#101418] sm:text-[3.2rem] lg:text-[3.8rem]"
              />

              <RevealItem as="p" className="mt-6 text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
                {intro}
              </RevealItem>

              <RevealItem as="p" className="mt-5 text-[13px] text-[#8A93A3]">
                Last updated {updated}
              </RevealItem>
            </RevealGroup>
          </Container>
        </section>

        {/* ── The document ─────────────────────────────────────────── */}
        <section className="py-14 lg:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
              <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#101418]/45">
                  On this page
                </p>

                <ol className="mt-4 space-y-2.5 text-[13.5px] leading-5">
                  {sections.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex gap-2.5 text-[#4A5261] transition-colors hover:text-[#0B5CFF]"
                      >
                        <span className="tabular-nums text-[#8A93A3]">{String(i + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="max-w-[720px]">
                {sections.map((section, i) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-title`}
                    className="scroll-mt-28 border-t border-[#101418]/10 py-8 first:border-t-0 first:pt-0"
                  >
                    <h2
                      id={`${section.id}-title`}
                      className="font-recoleta text-[1.4rem] font-medium leading-[1.2] tracking-[-0.015em] text-[#101418]"
                    >
                      {i + 1}. {section.title}
                    </h2>

                    <div className={`mt-4 ${PROSE}`}>{section.content}</div>
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
