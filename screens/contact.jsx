// ============== Contact ==============
const React = window.React;
const { useState, useEffect } = React;
const { AGENTS, Icon, PageBanner } = window;

function ContactPage({ navigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    intent: "Buy a property",
    name: "", email: "", phone: "", message: "",
  });

  return (
    <div className="page">
      <PageBanner
        eyebrow="Talk to Aureva"
        title="Begin a conversation."
        kicker="Buying, selling, or just curious — a quiet conversation is the start of every Aureva relationship."
        breadcrumb="Home · Contact"
        image={IMG.modernApt}
      />

      <section style={{ padding: "100px 0 120px", background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80 }} className="contact-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Get in touch</div>
              <h2 className="serif underline-gold" style={{ fontSize: "clamp(36px, 4.4vw, 52px)", fontWeight: 400, lineHeight: 1.05, color: "var(--navy)", letterSpacing: "-0.02em", margin: 0 }}>
                We will match you with the right advisor.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--slate)", marginTop: 30, maxWidth: 460 }}>
                Tell us a little about what you're hoping to do. Within one business day, one of our senior advisors with the right specialty will reach out personally.
              </p>

              <div style={{ marginTop: 50, display: "grid", gap: 26 }}>
                {[
                  { icon: <Icon.Phone />, label: "Call", value: "+1 (212) 555 0100" },
                  { icon: <Icon.Mail />,  label: "Email", value: "concierge@aureva.vercel.app" },
                  { icon: <Icon.Pin />,   label: "New York", value: "455 Madison Avenue, Floor 23" },
                  { icon: <Icon.Pin />,   label: "Los Angeles", value: "9200 Sunset Boulevard, Suite 800" },
                ].map(o => (
                  <div key={o.label} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, border: "1px solid var(--line-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-deep)", borderRadius: 999, flexShrink: 0 }}>
                      {o.icon}
                    </div>
                    <div>
                      <div className="eyebrow" style={{ marginBottom: 4 }}>{o.label}</div>
                      <div className="serif" style={{ fontSize: 20, color: "var(--navy)", fontWeight: 500 }}>{o.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 60, padding: 26, background: "var(--navy)", color: "var(--ivory)" }}>
                <div className="eyebrow on-dark" style={{ marginBottom: 10 }}>Office hours</div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.5 }}>
                  Mon — Sat<br />9:00 am — 7:00 pm ET
                </div>
                <div style={{ fontSize: 13, color: "rgba(248,245,239,0.6)", marginTop: 14 }}>
                  Off-hours response within four hours for current clients.
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid var(--line)", padding: 48 }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "80px 20px" }}>
                  <div style={{ color: "var(--gold)", display: "inline-flex", marginBottom: 20 }}>
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10" /><path d="m8 12 3 3 5-6" /></svg>
                  </div>
                  <h3 className="serif" style={{ fontSize: 40, fontWeight: 400, fontStyle: "italic", color: "var(--navy)", margin: 0, letterSpacing: "-0.01em" }}>Thank you, {form.name.split(" ")[0] || "we"}.</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--slate)", marginTop: 18, maxWidth: 400, marginInline: "auto" }}>
                    Your message is on its way to an advisor. Expect a personal response within one business day.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline-navy" style={{ marginTop: 30 }}>
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "grid", gap: 22 }}>
                  <div className="eyebrow">Send a message</div>
                  <div>
                    <div className="label">I'd like to…</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {["Buy a property","Sell a property","Rent a property","Just learn more"].map(opt => (
                        <button key={opt} type="button" onClick={() => setForm({...form, intent: opt})} style={{
                          padding: "14px 16px",
                          border: form.intent === opt ? "1px solid var(--gold)" : "1px solid var(--line-strong)",
                          background: form.intent === opt ? "rgba(201,164,92,0.08)" : "#fff",
                          color: form.intent === opt ? "var(--gold-deep)" : "var(--charcoal)",
                          fontSize: 13, textAlign: "left",
                          transition: "all 180ms ease",
                        }}>{opt}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                    <Field label="Name"><input required className="input" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Full name" /></Field>
                    <Field label="Email"><input required type="email" className="input" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="you@example.com" /></Field>
                  </div>
                  <Field label="Phone"><input type="tel" className="input" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} placeholder="Optional" /></Field>
                  <Field label="Tell us more"><textarea className="input" rows="5" value={form.message} onChange={e=>setForm({...form, message: e.target.value})} placeholder="A few words about what you're looking for — location, price range, timing…" /></Field>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--slate)", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--gold)" }}><Icon.Check /></span>
                    Your message is treated with full confidentiality. Aureva never shares your contact information.
                  </div>

                  <button type="submit" className="btn btn-gold" style={{ marginTop: 4, justifySelf: "start" }}>
                    Send message <span className="arrow"></span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 1000px) { .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; } }`}</style>
      </section>

      {/* Locations strip */}
      <section style={{ padding: "100px 0", background: "#fff", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <SectionHead eyebrow="Offices" title="Visit us, by appointment." align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="grid-4">
            {[
              ["New York","455 Madison Ave"],
              ["Los Angeles","9200 Sunset Blvd"],
              ["Miami","240 Worth Avenue"],
              ["London","12 Mount Street, Mayfair"],
            ].map(([city, addr], i) => (
              <Reveal key={city} delay={i*60}>
                <div style={{ borderTop: "1px solid var(--gold)", paddingTop: 22 }}>
                  <div className="eyebrow">{`0${i+1}`}</div>
                  <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, color: "var(--navy)", margin: "10px 0 8px", letterSpacing: "-0.01em" }}>{city}</h3>
                  <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.7, margin: 0 }}>{addr}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ContactPage });
