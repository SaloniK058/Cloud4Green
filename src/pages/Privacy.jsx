import { Link } from "react-router-dom";

import LegalPage from "@/components/legal/LegalPage";

/**
 * /privacy — written against what the site actually does, so it needs
 * revisiting when that changes. In particular: adding analytics, a tag
 * manager, a marketing tool or any cookie means updating "Cookies and similar
 * technologies" and "Who we share it with" in the same change.
 */

const EMAIL = "reach@cloud4green.com";

const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          Cloud4Green Technologies (&ldquo;Cloud4Green&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a learning and
          technology company based in Bengaluru, India. We decide how and why the personal data described here is
          used.
        </p>
        <p>
          This policy covers cloud4green.com. If you use our labs, learning platform or training under an agreement
          with us or your employer, that agreement and any notice provided with the service also apply.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    content: (
      <>
        <p>We only collect what you give us or what a website needs in order to work:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, work email, company, the area you are interested in, and your
            message.
          </li>
          <li>
            <strong>Booking a call:</strong> the name, contact details and any notes you enter in our Microsoft
            Bookings calendar, and the time you choose.
          </li>
          <li>
            <strong>Emails and calls:</strong> your contact details and whatever you choose to tell us.
          </li>
          <li>
            <strong>Technical data:</strong> your IP address, browser and device type, and the pages requested, as
            recorded in standard server logs.
          </li>
        </ul>
        <p>Please don&apos;t send us sensitive personal information through the contact form or calendar.</p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    content: (
      <>
        <p>We use your personal data to:</p>
        <ul>
          <li>reply to your enquiry and prepare quotes or proposals you ask for;</li>
          <li>schedule and hold calls with you;</li>
          <li>run, secure and fix the website; and</li>
          <li>meet our legal obligations and protect our legal rights.</li>
        </ul>
        <p>
          We process it because you provided it for that purpose or consented to it, or where the law otherwise
          allows. We do not sell your personal data.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    content: (
      <>
        <p>
          Our website does not use analytics, advertising or tracking cookies. It keeps one small value in your
          browser&apos;s session storage so the opening animation only plays once per visit. It contains no personal
          data and is cleared when you close the tab.
        </p>
        <p>
          The Microsoft Bookings calendar on our contact page is provided by Microsoft, which may set its own cookies
          when it loads. If you are signed in to a work Microsoft account, it may prefill your details.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <p>We share personal data only with service providers that help us run the website and our business:</p>
        <ul>
          <li>
            <strong>Microsoft</strong>, for the booking calendar and business email; and
          </li>
          <li>
            <strong>Our website hosting provider</strong>, which processes technical data to serve the site and
            relays contact form messages to our inbox.
          </li>
        </ul>
        <p>
          We may also disclose personal data where the law requires it, or to protect our rights or someone&apos;s
          safety. Links to other sites, such as LinkedIn, are governed by those sites&apos; own policies.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    content: (
      <p>
        Our service providers may process personal data outside India. Where they do, we rely on the transfer being
        permitted under applicable law.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <p>
        We keep personal data only for as long as we need it for the purposes above, including any continuing
        conversation or business relationship with you, or as long as the law requires. We then delete or anonymise
        it.
      </p>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    content: (
      <p>
        We use reasonable technical and organisational safeguards to protect personal data, and the website is served
        over HTTPS. No system is completely secure, so we can&apos;t guarantee absolute security. If a breach affects
        your personal data, we will notify you and the relevant authorities as the law requires.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Subject to applicable law, including India&apos;s Digital Personal Data Protection Act, 2023, you can:</p>
        <ul>
          <li>ask what personal data we hold about you and how we use it;</li>
          <li>ask us to correct, complete, update or erase it;</li>
          <li>withdraw your consent at any time, without affecting earlier processing;</li>
          <li>nominate someone to exercise your rights if you die or become incapacitated; and</li>
          <li>raise a grievance with us.</li>
        </ul>
        <p>
          To do any of this, email {mail}. If you are outside India, your local law may give you other rights, and we
          will honour them where they apply.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        Our website is intended for businesses and adult professionals, not for anyone under 18. If you believe a child
        has given us personal data, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "grievances",
    title: "Grievances and contact",
    content: (
      <>
        <p>
          For questions or complaints about this policy, contact our Grievance Officer at {mail}, or Cloud4Green
          Technologies, Bengaluru, India. We aim to respond as quickly as we can and within the time the law requires.
        </p>
        <p>
          If we haven&apos;t resolved your grievance, you may be able to complain to the Data Protection Board of India
          or your local regulator.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy as our website or the law changes. We will post the new version here and change the
        date at the top. Our <Link to="/terms">Terms of Service</Link> explain the rules for using the website.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="31 October 2026"
      intro="What personal data we collect through this website, why we collect it, and the choices you have."
      sections={sections}
    />
  );
}
