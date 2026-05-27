// ============== Legal pages (Privacy, Terms, Accessibility, Cookies) ==============
const React = window.React;
const { useEffect } = React;
const { PageBanner } = window;

function LegalShell({ eyebrow, title, kicker, updated, breadcrumb, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="page">
      <PageBanner eyebrow={eyebrow} title={title} kicker={kicker} breadcrumb={breadcrumb} />
      <section style={{ padding: '80px 0 120px', background: '#fff' }}>
        <div className="container-narrow" style={{ maxWidth: 820 }}>
          {updated && (
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--slate)',
                marginBottom: 40,
                paddingBottom: 20,
                borderBottom: '1px solid var(--line)',
              }}
            >
              Last updated: {updated}
            </div>
          )}
          <div
            className="legal-body"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 15.5,
              lineHeight: 1.8,
              color: 'var(--charcoal)',
            }}
          >
            {children}
          </div>
        </div>
        <style>{`
          .legal-body h2 {
            font-family: var(--serif); font-weight: 500;
            font-size: clamp(24px, 2.4vw, 30px);
            color: var(--navy); margin: 56px 0 16px;
            letter-spacing: -0.01em;
          }
          .legal-body h2:first-child { margin-top: 0; }
          .legal-body h3 {
            font-family: var(--serif); font-weight: 500;
            font-size: 20px; color: var(--navy); margin: 36px 0 10px;
          }
          .legal-body p { margin: 0 0 18px; }
          .legal-body ul { padding-left: 22px; margin: 0 0 22px; }
          .legal-body li { margin-bottom: 8px; }
          .legal-body a { color: var(--gold-deep); text-decoration: underline; text-underline-offset: 3px; }
          .legal-body a:hover { color: var(--gold); }
          .legal-body table { width: 100%; border-collapse: collapse; margin: 18px 0 26px; font-size: 14px; }
          .legal-body th, .legal-body td {
            text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--line);
            vertical-align: top;
          }
          .legal-body th { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--slate); font-weight: 500; }
          .legal-body strong { color: var(--navy); font-weight: 600; }
        `}</style>
      </section>
    </div>
  );
}

// ---------- Privacy Policy ----------
function PrivacyPage({ navigate }) {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Privacy Policy"
      kicker="How Aureva Estates collects, uses, and protects your personal information."
      updated="May 27, 2026"
      breadcrumb="Home · Legal · Privacy"
    >
      <h2>1. Introduction</h2>
      <p>
        Aureva Estates ("Aureva", "we", "us", or "our") respects your privacy and is committed to
        protecting your personal data. This Privacy Policy explains how we collect, use, store, and
        disclose information about you when you visit our website, contact our advisors, or engage
        our services.
      </p>
      <p>
        By using our website you consent to the practices described in this policy. If you do not
        agree, please discontinue use of the site.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Contact details</strong> — name, email address, phone number, mailing address.
        </li>
        <li>
          <strong>Property preferences</strong> — search criteria, saved favorites, budget range,
          intended use.
        </li>
        <li>
          <strong>Transaction information</strong> — when you list a property or make an offer
          through Aureva.
        </li>
        <li>
          <strong>Communications</strong> — messages you send to our advisors via forms, email, or
          phone.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>IP address, browser type and version, operating system.</li>
        <li>Pages visited, time on page, referring URL, exit pages.</li>
        <li>Device identifiers and analytics events.</li>
      </ul>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to inquiries and provide brokerage services.</li>
        <li>To match you with relevant listings and advisors.</li>
        <li>To send transactional communications (showings, contracts, closing updates).</li>
        <li>
          To send marketing communications (only with your consent — you can opt out anytime).
        </li>
        <li>To improve our site, services, and advisor performance.</li>
        <li>To comply with legal obligations including anti-money-laundering and tax reporting.</li>
      </ul>

      <h2>4. Legal bases (EEA/UK residents)</h2>
      <p>
        We process personal data on the following legal bases: your <strong>consent</strong>, the
        necessity to <strong>perform a contract</strong> with you, our{' '}
        <strong>legitimate interests</strong> (improving services, fraud prevention), and{' '}
        <strong>compliance with legal obligations</strong>.
      </p>

      <h2>5. Sharing and disclosure</h2>
      <p>We do not sell your personal information. We share information only with:</p>
      <ul>
        <li>Aureva advisors and authorized staff working on your matter.</li>
        <li>
          Service providers (hosting, analytics, email delivery, escrow) under written
          confidentiality agreements.
        </li>
        <li>Government or regulatory bodies when required by law.</li>
        <li>Successors in a merger, acquisition, or reorganization, subject to confidentiality.</li>
      </ul>

      <h2>6. Data retention</h2>
      <p>
        We retain personal data only as long as necessary for the purposes set out in this policy,
        or as required by law (typically 7 years for transaction records).
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard administrative, technical, and physical safeguards including TLS
        encryption in transit, encrypted storage at rest, and access controls. No system is
        perfectly secure; we cannot guarantee absolute security.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on your jurisdiction you may have the right to access, correct, delete, or port
        your personal data, restrict or object to processing, and withdraw consent. Contact{' '}
        <a href="mailto:privacy@aureva.vercel.app">privacy@aureva.vercel.app</a> to exercise these
        rights. We respond within 30 days.
      </p>

      <h2>9. International transfers</h2>
      <p>
        Aureva operates globally. Your data may be transferred to and processed in jurisdictions
        outside your country of residence. We rely on Standard Contractual Clauses and adequacy
        decisions where applicable.
      </p>

      <h2>10. Children</h2>
      <p>
        Our services are not directed to persons under 18. We do not knowingly collect data from
        minors.
      </p>

      <h2>11. Updates</h2>
      <p>
        We may update this policy from time to time. The "Last updated" date above reflects the most
        recent revision. Material changes will be notified via the website or email.
      </p>

      <h2>12. Contact</h2>
      <p>
        Aureva Estates · Data Protection Office
        <br />
        Email: <a href="mailto:privacy@aureva.vercel.app">privacy@aureva.vercel.app</a>
        <br />
        Mail: 1 Park Avenue, Suite 4000, New York, NY 10016
      </p>
    </LegalShell>
  );
}

// ---------- Terms of Service ----------
function TermsPage({ navigate }) {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Terms of Service"
      kicker="The terms governing your use of the Aureva Estates website and services."
      updated="May 27, 2026"
      breadcrumb="Home · Legal · Terms"
    >
      <h2>1. Agreement</h2>
      <p>
        By accessing or using aureva.vercel.app (the "Site") you agree to be bound by these Terms of
        Service ("Terms"). If you do not agree, do not use the Site.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and able to form a binding contract to use the Site or
        engage our brokerage services.
      </p>

      <h2>3. Services</h2>
      <p>
        Aureva is a licensed real estate brokerage. Listings, pricing, and property information
        shown on the Site are provided for informational purposes and are subject to change without
        notice. All measurements, prices, and amenities should be independently verified.
      </p>
      <p>
        Aureva makes no warranty as to the accuracy of third-party listing data, images, or
        descriptions.
      </p>

      <h2>4. No advice</h2>
      <p>
        Nothing on the Site constitutes legal, tax, financial, or investment advice. Consult
        qualified professionals before making any real estate decision.
      </p>

      <h2>5. User conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site for unlawful purposes or to violate any law or regulation.</li>
        <li>Scrape, crawl, or harvest listings or contact information.</li>
        <li>
          Interfere with the operation of the Site, attempt to gain unauthorized access, or
          introduce malware.
        </li>
        <li>Impersonate any person or misrepresent affiliation.</li>
        <li>Use the Site to send unsolicited communications.</li>
      </ul>

      <h2>6. Intellectual property</h2>
      <p>
        All content on the Site — including the Aureva mark, logo, design, photography, copy, and
        code — is owned by Aureva Estates or its licensors and protected by copyright, trademark,
        and other laws. You may not reproduce, distribute, or create derivative works without our
        prior written consent.
      </p>

      <h2>7. User-submitted content</h2>
      <p>
        By submitting any information through forms (contact, sell, newsletter) you grant Aureva a
        non-exclusive, royalty-free license to use that information to provide services and to
        communicate with you.
      </p>

      <h2>8. Third-party links</h2>
      <p>
        The Site may link to third-party websites. Aureva is not responsible for the content,
        policies, or practices of any third-party site.
      </p>

      <h2>9. Disclaimer</h2>
      <p>
        The Site is provided "as is" and "as available" without warranty of any kind. To the maximum
        extent permitted by law, Aureva disclaims all warranties, express or implied, including
        merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Aureva shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising from your use of the Site.
        Our total liability under these Terms shall not exceed one hundred U.S. dollars ($100).
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Aureva, its officers, employees, and advisors from
        any claim arising out of your use of the Site or breach of these Terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of New York, without regard to
        conflict-of-law principles. Exclusive jurisdiction and venue lie in the state and federal
        courts located in New York County, New York.
      </p>

      <h2>13. Changes</h2>
      <p>
        We may modify these Terms at any time. Continued use of the Site after changes are posted
        constitutes acceptance of the revised Terms.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these Terms? Email{' '}
        <a href="mailto:legal@aureva.vercel.app">legal@aureva.vercel.app</a>.
      </p>
    </LegalShell>
  );
}

// ---------- Accessibility ----------
function AccessibilityPage({ navigate }) {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Accessibility Statement"
      kicker="Our commitment to making aureva.vercel.app accessible to all visitors, including those with disabilities."
      updated="May 27, 2026"
      breadcrumb="Home · Legal · Accessibility"
    >
      <h2>Our commitment</h2>
      <p>
        Aureva Estates is committed to ensuring digital accessibility for people with disabilities.
        We continually improve the user experience for everyone and apply the relevant accessibility
        standards.
      </p>

      <h2>Conformance status</h2>
      <p>
        The{' '}
        <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">
          Web Content Accessibility Guidelines (WCAG)
        </a>{' '}
        defines requirements for designers and developers to improve accessibility for people with
        disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
      </p>
      <p>
        aureva.vercel.app is <strong>partially conformant</strong> with WCAG 2.1 level AA. Partially
        conformant means that some parts of the content do not fully conform to the accessibility
        standard.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Semantic HTML and ARIA landmarks for screen-reader navigation.</li>
        <li>Visible keyboard focus indicators on all interactive elements.</li>
        <li>Sufficient color contrast (4.5:1 minimum for body text).</li>
        <li>Alternative text on meaningful images.</li>
        <li>
          Respect for the <code>prefers-reduced-motion</code> media query — animations are minimized
          when requested.
        </li>
        <li>Resizable text up to 200% without loss of content or function.</li>
        <li>Form fields with associated labels and error messages.</li>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <li>Some third-party listing images may lack descriptive alt text.</li>
        <li>
          The hero carousel auto-rotates; pausing on hover is supported, but a manual pause control
          will be added in a future release.
        </li>
        <li>
          Property floor-plan SVGs do not currently include text descriptions of room layouts.
        </li>
      </ul>

      <h2>Assessment approach</h2>
      <p>
        Aureva assesses accessibility by self-evaluation and external audit. Automated tools (axe,
        Lighthouse) run on every release, and manual screen-reader testing is performed quarterly.
      </p>

      <h2>Feedback</h2>
      <p>
        We welcome your feedback on the accessibility of aureva.vercel.app. If you encounter any
        barriers, please contact us:
      </p>
      <ul>
        <li>
          Email: <a href="mailto:access@aureva.vercel.app">access@aureva.vercel.app</a>
        </li>
        <li>Phone: +1 (212) 555 0100</li>
      </ul>
      <p>We aim to respond to accessibility feedback within 5 business days.</p>
    </LegalShell>
  );
}

// ---------- Cookies ----------
function CookiesPage({ navigate }) {
  const reset = () => {
    try {
      localStorage.removeItem('aureva_cookie_consent');
    } catch (e) {}
    window.location.reload();
  };
  return (
    <LegalShell
      eyebrow="Legal"
      title="Cookie Policy"
      kicker="How aureva.vercel.app uses cookies and similar technologies, and how to control them."
      updated="May 27, 2026"
      breadcrumb="Home · Legal · Cookies"
    >
      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They allow the
        site to remember your preferences, keep you signed in, and understand how you use the site.
      </p>

      <h2>Categories we use</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Purpose</th>
            <th>Examples</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Strictly necessary</strong>
            </td>
            <td>
              Enable core functionality such as saving favorites and remembering your cookie choice.
            </td>
            <td>
              <code>aureva_favs</code>, <code>aureva_cookie_consent</code>
            </td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <strong>Analytics</strong>
            </td>
            <td>Measure traffic and improve the site.</td>
            <td>Page-view counts, event timing</td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <strong>Marketing</strong>
            </td>
            <td>Personalize advertising on other sites.</td>
            <td>Conversion pixels, retargeting tags</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>

      <h2>Third-party cookies</h2>
      <p>We use the following third-party services that may set cookies:</p>
      <ul>
        <li>
          <strong>Google Fonts</strong> — to deliver typography. Does not set tracking cookies.
        </li>
        <li>
          <strong>Unsplash</strong> — image CDN. Does not set tracking cookies.
        </li>
      </ul>
      <p>
        If we add analytics or advertising tags in the future, they will be listed here and disabled
        by default until you opt in.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can accept, reject, or revisit your choice at any time using the controls below or your
        browser settings.
      </p>
      <p>
        <button className="btn btn-navy" onClick={reset}>
          Reset cookie preferences <span className="arrow"></span>
        </button>
      </p>
      <p>
        To manage cookies at the browser level:{' '}
        <a
          href="https://support.google.com/chrome/answer/95647"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome
        </a>{' '}
        ·{' '}
        <a
          href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firefox
        </a>{' '}
        ·{' '}
        <a
          href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
          target="_blank"
          rel="noopener noreferrer"
        >
          Safari
        </a>{' '}
        ·{' '}
        <a
          href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edge
        </a>
        .
      </p>

      <h2>Do-Not-Track</h2>
      <p>
        We honor the browser-level Do-Not-Track signal where supported. When DNT is enabled,
        optional analytics and marketing categories remain off regardless of your cookie choice.
      </p>

      <h2>Contact</h2>
      <p>
        Email <a href="mailto:privacy@aureva.vercel.app">privacy@aureva.vercel.app</a> with
        questions about our use of cookies.
      </p>
    </LegalShell>
  );
}

Object.assign(window, { PrivacyPage, TermsPage, AccessibilityPage, CookiesPage });
