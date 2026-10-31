import { Link } from "react-router-dom";

import LegalPage from "@/components/legal/LegalPage";

/**
 * /terms — the terms for using the website. Paid labs, training and services
 * are governed by their own agreements, which take priority (see "Our
 * services"), so nothing commercial belongs here.
 */

const EMAIL = "reach@cloud4green.com";

const sections = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    content: (
      <>
        <p>
          These terms apply to your use of cloud4green.com, operated by Cloud4Green Technologies, Bengaluru, India
          (&ldquo;Cloud4Green&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the website, you agree to them. If
          you don&apos;t agree, please don&apos;t use it.
        </p>
        <p>If you use the website on behalf of an organisation, you confirm that you are authorised to do so.</p>
      </>
    ),
  },
  {
    id: "services",
    title: "Our services",
    content: (
      <>
        <p>
          The website describes our labs, learning platforms, training, certification, automation and consulting
          services. It is general information, not an offer that can be accepted. Availability, scope and pricing are
          confirmed in a written quote or agreement.
        </p>
        <p>
          If you buy or use a service from us, the agreement for that service applies. Where it conflicts with these
          terms, the agreement takes priority.
        </p>
      </>
    ),
  },
  {
    id: "content",
    title: "Examples and third-party certifications",
    content: (
      <>
        <p>
          Workflows, scenarios and similar examples are illustrative unless we say otherwise. They are not claims about
          a particular implementation or a promise of a particular result.
        </p>
        <p>
          Training helps you prepare, but it does not guarantee that you will pass an exam, gain a certification or
          find a job. Third-party certifications and exams are controlled by the organisations that issue them, under
          their own rules and fees.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>use the website unlawfully, or in a way that harms us or anyone else;</li>
          <li>try to gain unauthorised access to, disrupt or overload the website or its systems;</li>
          <li>introduce malware, or send spam or misleading information through our forms; or</li>
          <li>scrape or copy the website with automated tools, except as ordinary search engine indexing allows.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          We or our licensors own the website and its content, including its text, design, graphics and logos. You may
          view it, download our published materials and share links to it for your own or your organisation&apos;s
          internal use. You may not otherwise copy, change, sell or republish it without our written permission.
        </p>
        <p>
          Other companies&apos; names, logos and trademarks shown on the website belong to their owners. Showing them
          does not mean those companies endorse or are affiliated with us, unless we say so.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party sites and tools",
    content: (
      <p>
        The website links to, or embeds, services we don&apos;t control, such as Microsoft Bookings and LinkedIn. Their
        own terms and privacy policies apply, and we are not responsible for them.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    content: (
      <p>
        We work to keep the website accurate and available, but it is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;. To the extent the law allows, we make no warranties that it will be complete, current,
        uninterrupted or error-free. It does not give professional advice, so please check anything important with us
        before relying on it.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the extent the law allows, we are not liable for any indirect, incidental or consequential loss, or for lost
        profits, data or business, arising from your use of the website. Nothing in these terms excludes liability that
        cannot legally be excluded.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    content: (
      <p>
        Our <Link to="/privacy">Privacy Policy</Link> explains how we handle personal data collected through the
        website.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These terms are governed by the laws of India. Subject to any rights you have under mandatory consumer law, the
        courts in Bengaluru, Karnataka have exclusive jurisdiction over any dispute arising from them.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time. We will post the new version here and change the date at the top.
        Continuing to use the website after that means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about these terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or use our{" "}
        <Link to="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="31 October 2026"
      intro="The rules for using the Cloud4Green website, and how they relate to any services you buy from us."
      sections={sections}
    />
  );
}
