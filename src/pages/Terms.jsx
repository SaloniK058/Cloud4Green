import { Link } from "react-router-dom";

import LegalPage from "@/components/legal/LegalPage";

/**
 * /terms — the terms for using the website, plus baseline rules for lab and
 * platform logins. Paid labs, training and services are governed by their own
 * agreements, which take priority (see "Our services"), so nothing commercial
 * (fees, renewals, liability caps) belongs here.
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
    id: "lab-access",
    title: "Labs and platform access",
    content: (
      <>
        <p>
          If we give you a login to a lab or learning platform, these rules apply unless your agreement says otherwise.
          You are responsible for keeping your login details safe and for activity under them, and you agree to tell us
          promptly if you think they have been misused.
        </p>
        <p>You agree not to:</p>
        <ul>
          <li>share your access, or resell or provide the service to anyone else;</li>
          <li>copy, modify or reverse engineer our software, except where the law allows it;</li>
          <li>use lab environments for anything other than the learning they were provided for;</li>
          <li>
            use lab resources for cryptocurrency mining, attacks on other systems, or to get around their limits and
            controls; or
          </li>
          <li>break the terms of the cloud or software providers whose services a lab uses.</li>
        </ul>
        <p>
          Lab environments are temporary. Unless we agree otherwise, don&apos;t store confidential or personal data in
          them, and save anything you want to keep, because it may be deleted when the lab ends.
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
          <li>introduce malware, or send spam or misleading information through our forms;</li>
          <li>submit content that is unlawful or that you have no right to share; or</li>
          <li>scrape or copy the website with automated tools, except as ordinary search engine indexing allows.</li>
        </ul>
        <p>
          We may suspend or end your access to the website, or to a lab or platform login, if you break these terms or
          to protect our systems or other users. Your agreement with us may set out further steps.
        </p>
      </>
    ),
  },
  {
    id: "submissions",
    title: "What you send us",
    content: (
      <p>
        You are responsible for what you send us through the website. If you give us feedback or suggestions about our
        website or services, we may use them without any obligation to you.
      </p>
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
      <>
        <p>
          The website links to, or embeds, services we don&apos;t control, such as Microsoft Bookings, LinkedIn and
          Google Maps. Their own terms and privacy policies apply, and we are not responsible for them.
        </p>
        <p>
          Reviews shown from Google Maps are the opinions of their authors, and using them or our embedded map is
          subject to the{" "}
          <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">
            Google Maps Terms of Service
          </a>
          .
        </p>
      </>
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
    id: "general",
    title: "General",
    content: (
      <>
        <p>
          You agree to comply with the laws that apply to your use of the website and our services, including export
          control laws.
        </p>
        <p>
          If any part of these terms can&apos;t be enforced, the rest still applies. If we don&apos;t enforce a right
          straight away, we haven&apos;t given it up. You may not transfer your rights under these terms without our
          written consent.
        </p>
      </>
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
      updated="2 November 2026"
      intro="The rules for using the Cloud4Green website and lab logins, and how they relate to any services you buy from us."
      sections={sections}
    />
  );
}
