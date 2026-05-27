// ============== Sell Your Property ==============
const React = window.React;
const { useState, useEffect } = React;
const { Icon, PageBanner } = window;

function SellPage({ navigate }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    address: '',
    type: 'Villa',
    beds: '4',
    baths: '4',
    area: '',
    timeline: '1–3 months',
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="page">
      <PageBanner
        eyebrow="Sell with Aureva"
        title="A discreet route to the right buyer."
        kicker="Quietly market your residence to a curated pool of global buyers — or list it publicly with editorial care. You choose the cadence."
        breadcrumb="Home · Sell"
        image={IMG.estate}
      />

      {/* Process */}
      <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="Four considered steps." />
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
            className="grid-4"
          >
            {[
              [
                'Valuation',
                'A confidential, on-site valuation grounded in real comparables — not algorithms.',
              ],
              [
                'Strategy',
                'Pocket listing, soft launch, or full campaign. We tailor cadence and reach to your priorities.',
              ],
              [
                'Editorial Marketing',
                'Photography, film, copy, and placement that befits the residence — across Aureva and trusted press.',
              ],
              [
                'Closing & Beyond',
                'Negotiation, diligence, escrow, and post-close concierge — managed by your advisor.',
              ],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid var(--line)',
                    padding: 30,
                    minHeight: 240,
                  }}
                >
                  <div
                    className="serif"
                    style={{ fontSize: 36, color: 'var(--gold)', fontWeight: 400 }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    className="serif"
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      color: 'var(--navy)',
                      margin: '18px 0 12px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--slate)', margin: 0 }}>
                    {d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .grid-4 { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px)  { .grid-4 { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Valuation form */}
      <section style={{ padding: '120px 0', background: 'var(--navy)', color: 'var(--ivory)' }}>
        <div className="container">
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80 }}
            className="valu-grid"
          >
            <div>
              <div className="eyebrow on-dark" style={{ marginBottom: 18 }}>
                Property Valuation
              </div>
              <h2
                className="serif"
                style={{
                  fontSize: 'clamp(36px, 4.5vw, 56px)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Begin with a quiet,
                <br />
                <em style={{ color: 'var(--gold)' }}>confidential</em> valuation.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: 'rgba(248,245,239,0.7)',
                  marginTop: 28,
                  maxWidth: 420,
                }}
              >
                No public listing. No commitment. A senior advisor will walk your property, study
                the market, and return a thoughtful written valuation within five business days.
              </p>
              <div
                style={{
                  marginTop: 40,
                  paddingTop: 30,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'grid',
                  gap: 14,
                }}
              >
                {[
                  'Confidential — never shared without your consent',
                  'Senior-advisor written report, not an automated estimate',
                  'Includes off-market comparables from our private network',
                  'Free of charge, no obligation to list',
                ].map((b) => (
                  <div
                    key={b}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      fontSize: 14,
                      color: 'rgba(248,245,239,0.8)',
                    }}
                  >
                    <span style={{ color: 'var(--gold)', marginTop: 2 }}>
                      <Icon.Check />
                    </span>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(201,164,92,0.3)',
                padding: 40,
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ color: 'var(--gold)', marginBottom: 16, display: 'inline-block' }}>
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m8 12 3 3 5-6" />
                    </svg>
                  </div>
                  <h3
                    className="serif"
                    style={{ fontSize: 32, fontWeight: 400, fontStyle: 'italic', margin: 0 }}
                  >
                    Thank you.
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      color: 'rgba(248,245,239,0.7)',
                      marginTop: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    Your advisor will reach out within one business day to schedule your valuation
                    visit.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(0);
                    }}
                    className="btn btn-outline-gold"
                    style={{ marginTop: 28 }}
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <>
                  {/* Progress */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 30 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 2,
                          background: i <= step ? 'var(--gold)' : 'rgba(255,255,255,0.12)',
                          transition: 'background 300ms ease',
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'rgba(248,245,239,0.55)',
                    }}
                  >
                    Step {step + 1} of 4
                  </div>
                  <h3
                    className="serif"
                    style={{
                      fontSize: 32,
                      fontWeight: 400,
                      marginTop: 10,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {
                      [
                        'Tell us about the property',
                        'Property specifications',
                        'Your timeline',
                        'Your contact details',
                      ][step]
                    }
                  </h3>

                  <div style={{ marginTop: 30, display: 'grid', gap: 16, minHeight: 220 }}>
                    {step === 0 && (
                      <>
                        <Field label="Property address">
                          <input
                            className="input dark-field"
                            placeholder="123 Mulholland Dr, Beverly Hills, CA"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                          />
                        </Field>
                        <Field label="Property type">
                          <select
                            className="input dark-field"
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                          >
                            {[
                              'Villa',
                              'Penthouse',
                              'Apartment',
                              'Loft',
                              'Estate',
                              'Cottage',
                              'Beachfront',
                              'Duplex',
                            ].map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                      </>
                    )}
                    {step === 1 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Bedrooms">
                          <select
                            className="input dark-field"
                            value={form.beds}
                            onChange={(e) => setForm({ ...form, beds: e.target.value })}
                          >
                            {['2', '3', '4', '5', '6', '7+'].map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Bathrooms">
                          <select
                            className="input dark-field"
                            value={form.baths}
                            onChange={(e) => setForm({ ...form, baths: e.target.value })}
                          >
                            {['2', '3', '4', '5', '6', '7+'].map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Approx. area (ft²)">
                          <input
                            className="input dark-field"
                            placeholder="e.g. 4,200"
                            value={form.area}
                            onChange={(e) => setForm({ ...form, area: e.target.value })}
                          />
                        </Field>
                        <Field label="Year built">
                          <input className="input dark-field" placeholder="e.g. 2018" />
                        </Field>
                      </div>
                    )}
                    {step === 2 && (
                      <div style={{ display: 'grid', gap: 10 }}>
                        <div className="label">When would you like to transact?</div>
                        {['Within 30 days', '1–3 months', '3–6 months', 'Just exploring'].map(
                          (t) => (
                            <label
                              key={t}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: 16,
                                border: '1px solid rgba(255,255,255,0.12)',
                                cursor: 'pointer',
                                background:
                                  form.timeline === t ? 'rgba(201,164,92,0.08)' : 'transparent',
                                borderColor:
                                  form.timeline === t ? 'var(--gold)' : 'rgba(255,255,255,0.12)',
                              }}
                            >
                              <span
                                style={{
                                  width: 14,
                                  height: 14,
                                  border: '1px solid var(--gold)',
                                  borderRadius: 999,
                                  position: 'relative',
                                }}
                              >
                                {form.timeline === t && (
                                  <span
                                    style={{
                                      position: 'absolute',
                                      inset: 3,
                                      background: 'var(--gold)',
                                      borderRadius: 999,
                                    }}
                                  />
                                )}
                              </span>
                              <span style={{ fontSize: 14 }}>{t}</span>
                              <input
                                type="radio"
                                name="timeline"
                                checked={form.timeline === t}
                                onChange={() => setForm({ ...form, timeline: t })}
                                style={{ display: 'none' }}
                              />
                            </label>
                          )
                        )}
                      </div>
                    )}
                    {step === 3 && (
                      <>
                        <Field label="Your name">
                          <input
                            className="input dark-field"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Full name"
                          />
                        </Field>
                        <Field label="Email">
                          <input
                            className="input dark-field"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@example.com"
                          />
                        </Field>
                        <Field label="Phone">
                          <input
                            className="input dark-field"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+1 (___) ___ ____"
                          />
                        </Field>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 30,
                      paddingTop: 24,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <button
                      onClick={back}
                      disabled={step === 0}
                      style={{
                        fontSize: 12,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: step === 0 ? 'rgba(248,245,239,0.3)' : 'rgba(248,245,239,0.7)',
                        padding: '12px 0',
                      }}
                    >
                      ← Back
                    </button>
                    {step < 3 ? (
                      <button onClick={next} className="btn btn-gold">
                        Continue <span className="arrow"></span>
                      </button>
                    ) : (
                      <button onClick={() => setSubmitted(true)} className="btn btn-gold">
                        Get my valuation <span className="arrow"></span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 1000px) { .valu-grid { grid-template-columns: 1fr !important; gap: 50px !important; } }`}</style>
      </section>

      {/* Marketing showcase */}
      <section style={{ padding: '120px 0', background: 'var(--ivory)' }}>
        <div className="container">
          <SectionHead
            eyebrow="Editorial Marketing"
            title="Your residence, presented."
            kicker="Museum-quality photography, cinematic films, and editorial copy. Every Aureva campaign is built around the soul of the property."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr',
              gridTemplateRows: '300px 300px',
              gap: 16,
            }}
            className="market-grid"
          >
            <div
              className="img-zoom"
              style={{ gridColumn: 1, gridRow: '1 / span 2', overflow: 'hidden' }}
            >
              <div
                className="img-bg"
                style={{ backgroundImage: `url(${IMG.heroVilla})`, height: '100%' }}
              />
            </div>
            <div className="img-zoom" style={{ overflow: 'hidden' }}>
              <div
                className="img-bg"
                style={{ backgroundImage: `url(${IMG.livingRoom})`, height: '100%' }}
              />
            </div>
            <div className="img-zoom" style={{ overflow: 'hidden' }}>
              <div
                className="img-bg"
                style={{ backgroundImage: `url(${IMG.kitchen})`, height: '100%' }}
              />
            </div>
            <div className="img-zoom" style={{ overflow: 'hidden' }}>
              <div
                className="img-bg"
                style={{ backgroundImage: `url(${IMG.bedroom})`, height: '100%' }}
              />
            </div>
            <div className="img-zoom" style={{ overflow: 'hidden' }}>
              <div
                className="img-bg"
                style={{ backgroundImage: `url(${IMG.diningRoom})`, height: '100%' }}
              />
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .market-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: 220px !important; } .market-grid > div:first-child { grid-column: span 2 !important; grid-row: auto !important; } }`}</style>
      </section>

      <CTABand navigate={navigate} />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="label">{label}</div>
      {children}
    </div>
  );
}

Object.assign(window, { SellPage, Field });
