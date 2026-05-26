// ============== About Us ==============
const { IMG, AGENTS, Icon, PageBanner, Reveal, SectionHead, CTABand } = window;

function AboutPage({ navigate }) {
  return (
    <div className="page">
      <PageBanner
        eyebrow="About Aureva"
        title="A boutique house with global reach."
        kicker="Founded in 2009, Aureva represents the world's most considered residences through a small, senior team — and an exchange network across 12 countries."
        breadcrumb="Home · About"
        image={IMG.beach}
      />

      {/* Story */}
      <section style={{ padding: "140px 0", background: "var(--ivory)" }}>
        <div className="container-narrow">
          <Reveal>
            <div className="eyebrow center underline-gold" style={{ textAlign: "center", marginBottom: 40 }}>Our Story</div>
            <p className="serif" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.4, fontWeight: 300, textAlign: "center", color: "var(--charcoal)", letterSpacing: "-0.01em", fontStyle: "italic", margin: 0 }}>
              "We started Aureva because the houses we loved most were never quite represented as they deserved. The work, we felt, was as much editorial as transactional."
            </p>
            <p style={{ textAlign: "center", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--slate)", marginTop: 30 }}>
              Camille Aurevoix · Founder & Principal
            </p>
          </Reveal>

          <div style={{ marginTop: 100, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="story-grid">
            <Reveal>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--charcoal)" }}>
                Aureva began as a single office representing six estates in Beverly Hills. Today we are a boutique house of advisors across New York, Los Angeles, Miami, Aspen, and London — bound less by geography than by a shared sensibility about what makes a residence remarkable.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--charcoal)" }}>
                We grew slowly on purpose. Senior advisors. Fewer clients. Quiet rooms. Our work is measured in trusted introductions, in residences that find their right keeper, and in relationships that often outlast the deal itself.
              </p>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 800px) { .story-grid { grid-template-columns: 1fr !important; gap: 30px !important; } }`}</style>
      </section>

      {/* Imagery */}
      <section style={{ padding: "0 0 140px", background: "var(--ivory)" }}>
        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1fr", gap: 16, height: 540 }} className="img-strip">
            <div className="img-zoom" style={{ marginTop: 60, overflow: "hidden" }}>
              <div className="img-bg" style={{ backgroundImage: `url(${IMG.exterior})`, height: "100%" }} />
            </div>
            <div className="img-zoom" style={{ overflow: "hidden" }}>
              <div className="img-bg" style={{ backgroundImage: `url(${IMG.heroVilla})`, height: "100%" }} />
            </div>
            <div className="img-zoom" style={{ marginTop: 100, overflow: "hidden" }}>
              <div className="img-bg" style={{ backgroundImage: `url(${IMG.livingRoom})`, height: "100%" }} />
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 800px) { .img-strip { grid-template-columns: 1fr !important; height: auto !important; } .img-strip > div { margin-top: 0 !important; height: 240px !important; } }`}</style>
      </section>

      {/* Values */}
      <section className="section-dark" style={{ padding: "140px 0" }}>
        <div className="container">
          <SectionHead eyebrow="Our Values" title="Quiet principles, kept." onDark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginTop: 20 }} className="grid-3">
            {[
              ["Discretion", "We work in confidence. Most of our transactions never reach a public listing."],
              ["Craft", "A house is a work of art. We treat its representation with editorial seriousness."],
              ["Patience", "We wait for the right house and the right keeper. We never push."],
              ["Counsel", "We say no often — to listings, to clients, to deals. That's why our advice can be trusted."],
              ["Reach", "Boutique footprint, global network. 38 markets, 12 countries, one team."],
              ["Stewardship", "We help you acquire well. We also help you sell well, when the time comes."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i*60}>
                <div style={{ borderTop: "1px solid rgba(201,164,92,0.4)", paddingTop: 24 }}>
                  <div className="serif" style={{ fontSize: 24, color: "var(--gold)", fontWeight: 400 }}>0{i+1}</div>
                  <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, color: "var(--ivory)", margin: "16px 0 12px", letterSpacing: "-0.01em" }}>{t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(248,245,239,0.7)", margin: 0 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }} className="grid-4">
            {[["$4.2B","Sold in 2025"],["1,400+","Residences represented"],["38","Markets globally"],["94%","Repeat & referral"]].map(([n, l]) => (
              <Reveal key={l}>
                <div style={{ textAlign: "center", padding: "40px 20px", borderRight: "1px solid var(--line)" }}>
                  <div className="serif" style={{ fontSize: "clamp(48px, 6vw, 76px)", color: "var(--gold-deep)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em" }}>{n}</div>
                  <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--slate)", marginTop: 14 }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: "100px 0 120px", background: "#fff" }}>
        <div className="container">
          <SectionHead eyebrow="Leadership" title="The people behind the house." action={<button onClick={() => navigate("agents")} className="btn btn-outline-navy">All advisors <span className="arrow"></span></button>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="grid-3">
            {AGENTS.slice(0,3).map(a => (
              <AgentCard key={a.id} a={a} onOpen={() => navigate("agent", { id: a.id })} />
            ))}
          </div>
        </div>
      </section>

      <CTABand navigate={navigate} />
    </div>
  );
}

Object.assign(window, { AboutPage });
