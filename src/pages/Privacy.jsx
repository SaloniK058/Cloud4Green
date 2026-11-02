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
        <p>This policy covers cloud4green.com. It does not cover the data handled inside our labs and platforms.</p>
      </>
    ),
  },
  {
    id: "labs-and-platforms",
    title: "Labs, platforms and training",
    content: (
      <>
        <p>
          If you use our labs, learning platform or training under an agreement with us or your employer, that
          agreement and any notice provided with the service apply to the data involved.
        </p>
        <p>
          Where we provide a service to an organisation, that organisation usually decides how its learners&apos; data
          is used, and we handle it on the organisation&apos;s behalf. If your employer or institution gave you access,
          please send requests about your data to them first. We will help them respond.
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
            <strong>Contact form:</strong> your name, work email, company, the area you are interested in, your
            message, and the service named in the link you followed, if any.
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
            recorded in standard server logs, plus a hashed form of your IP address used to limit repeated form
            submissions.
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
          allows. We do not sell your personal data or share it for cross-context behavioural advertising.
        </p>
        <p>If we send you marketing emails, you can opt out at any time by replying or emailing {mail}.</p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for EEA and UK visitors",
    content: (
      <>
        <p>If the GDPR or UK GDPR applies to you, we rely on the following legal bases:</p>
        <ul>
          <li>
            <strong>Steps before a contract:</strong> to answer your enquiry and prepare a quote or proposal you ask
            for.
          </li>
          <li>
            <strong>Legitimate interests:</strong> to respond to business enquiries and to run and secure the website.
          </li>
          <li>
            <strong>Legal obligation:</strong> to meet legal duties that apply to us.
          </li>
          <li>
            <strong>Consent:</strong> where the law requires it. You can withdraw it at any time.
          </li>
        </ul>
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
        <p>
          The Google Map on our contact page is provided by Google, which may set its own cookies and receives your IP
          address and browser details when the map loads. Our customers page shows reviews from Google Maps. We fetch
          the reviews from our own server, but reviewers&apos; profile pictures load directly from Google in the same
          way. Google&apos;s use of data is covered by the{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          .
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
            <strong>Microsoft</strong>, for the booking calendar and business email;
          </li>
          <li>
            <strong>Google</strong>, for the map on our contact page and the reviews on our customers page; and
          </li>
          <li>
            <strong>Our website hosting provider</strong>, which processes technical data to serve the site and
            relays contact form messages to our inbox.
          </li>
        </ul>
        <p>
          We may also disclose personal data to our professional advisers, where the law requires it, or to protect
          our rights or someone&apos;s safety. If our business is reorganised, merged or sold, personal data may
          transfer to the new owner, and this policy will continue to protect it until any new policy is published.
        </p>
        <p>Links to other sites, such as LinkedIn, are governed by those sites&apos; own policies.</p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    content: (
      <p>
        We are based in India, and our service providers may process personal data in other countries, including the
        United States. Where they do, we rely on the transfer being permitted under applicable law and on any
        safeguards it requires, such as contractual protections.
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
        <p>
          Depending on where you live and the law that applies, including India&apos;s Digital Personal Data Protection
          Act, 2023, the GDPR and UK GDPR, and US state privacy laws, you can:
        </p>
        <ul>
          <li>ask what personal data we hold about you and how we use it;</li>
          <li>ask us to correct, complete, update or erase it;</li>
          <li>ask for a copy of it;</li>
          <li>object to or restrict how we use it;</li>
          <li>withdraw your consent at any time, without affecting earlier processing;</li>
          <li>nominate someone to exercise your rights if you die or become incapacitated; and</li>
          <li>raise a grievance with us.</li>
        </ul>
        <p>To do any of this, email {mail}. We may need to confirm your identity first.</p>
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
          For questions or complaints about this policy, contact our Grievance Officer at {mail} or +91 7022424545, or
          write to Cloud4Green Technologies, Bengaluru, India. We aim to respond as quickly as we can and within the
          time the law requires.
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
      updated="2 November 2026"
      intro="What personal data we collect through this website, why we collect it, and the choices you have."
      sections={sections}
    />
  );
}
