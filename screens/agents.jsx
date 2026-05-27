// ============== Agents + Agent Profile ==============
const React = window.React;
const { useState, useEffect } = React;
const { AGENTS, PROPERTIES, formatPrice, Icon, PageBanner, PropertyCard, Reveal } = window;

function AgentsPage({ navigate }) {
  const [q, setQ] = useState('');
  const filtered = AGENTS.filter(
    (a) => !q || (a.name + a.title + a.bio).toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="page">
      <PageBanner
        eyebrow="Our Advisors"
        title="A small house of specialists."
        kicker="Six senior advisors, each with deep regional and asset specialization. They are who our clients come back for."
        breadcrumb="Home · Agents"
        image={IMG.penthouse}
      />

      <section
        style={{
          padding: '80px 0 40px',
          background: '#fff',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--slate)' }}>{filtered.length} advisors</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              border: '1px solid var(--line-strong)',
              padding: '10px 16px',
              minWidth: 320,
            }}
          >
            <Icon.Search style={{ color: 'var(--slate)' }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, market, language…"
              style={{ border: 0, outline: 0, flex: 1, fontSize: 14, background: 'transparent' }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0 120px', background: 'var(--ivory)' }}>
        <div className="container">
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}
            className="grid-3"
          >
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={(i % 6) * 60}>
                <AgentCard a={a} onOpen={() => navigate('agent', { id: a.id })} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand navigate={navigate} />
    </div>
  );
}

function AgentCard({ a, onOpen }) {
  return (
    <div onClick={onOpen} className="card" style={{ cursor: 'pointer', background: '#fff' }}>
      <div className="img-zoom" style={{ aspectRatio: '4/5' }}>
        <div className="img-bg agent-img" style={{ backgroundImage: `url(${a.image})` }} />
      </div>
      <div style={{ padding: 28 }}>
        <h3
          className="serif"
          style={{
            fontSize: 28,
            fontWeight: 500,
            margin: 0,
            color: 'var(--navy)',
            letterSpacing: '-0.01em',
          }}
        >
          {a.name}
        </h3>
        <div
          style={{ fontSize: 12, color: 'var(--gold-deep)', letterSpacing: '0.06em', marginTop: 4 }}
        >
          {a.title}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--slate)', marginTop: 16 }}>
          {a.bio}
        </p>
        <div
          style={{
            marginTop: 22,
            paddingTop: 20,
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--slate)',
            letterSpacing: '0.04em',
          }}
        >
          <span>
            {a.listings} active · {a.sold} sold
          </span>
          <span
            style={{
              color: 'var(--gold-deep)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Icon.Star /> {a.rating}
          </span>
        </div>
      </div>
    </div>
  );
}

function AgentProfilePage({ navigate, agentId, favs, toggleFav }) {
  const a = AGENTS.find((x) => x.id === agentId) || AGENTS[0];
  const listings = PROPERTIES.filter((p) => p.agentId === a.id);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page" style={{ background: 'var(--ivory)' }}>
      <section
        style={{
          paddingTop: 130,
          paddingBottom: 60,
          background: '#fff',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container-wide">
          <button
            onClick={() => navigate('agents')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--slate)',
              marginBottom: 30,
            }}
          >
            <Icon.ArrowLeft /> All advisors
          </button>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: 60,
              alignItems: 'center',
            }}
            className="agent-grid"
          >
            <div
              className="img-zoom"
              style={{ aspectRatio: '4/5', maxHeight: 540, overflow: 'hidden' }}
            >
              <div className="img-bg agent-img" style={{ backgroundImage: `url(${a.image})` }} />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                {a.title}
              </div>
              <h1
                className="serif"
                style={{
                  fontSize: 'clamp(48px, 6vw, 88px)',
                  fontWeight: 300,
                  lineHeight: 1,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {a.name}
              </h1>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.8,
                  color: 'var(--charcoal)',
                  marginTop: 28,
                  maxWidth: 540,
                }}
              >
                {a.bio} Working with private clients across her region, she balances editorial taste
                with negotiation rigor — and the patience to wait for the right house.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 24,
                  marginTop: 36,
                  paddingTop: 30,
                  borderTop: '1px solid var(--line)',
                }}
              >
                {[
                  ['Listings', a.listings],
                  ['Sold', a.sold],
                  ['Rating', a.rating],
                  ['Years', '12'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div
                      className="serif"
                      style={{ fontSize: 36, color: 'var(--gold-deep)', fontWeight: 400 }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--slate)',
                        marginTop: 4,
                      }}
                    >
                      {k}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
                <a href={`tel:${a.phone}`} className="btn btn-navy">
                  <Icon.Phone /> Call {a.phone.split(' ')[0]} {a.phone.split(' ')[1]}
                </a>
                <a href={`mailto:${a.email}`} className="btn btn-outline-navy">
                  <Icon.Mail /> Email
                </a>
              </div>
              <div style={{ marginTop: 28, fontSize: 13, color: 'var(--slate)' }}>
                <strong style={{ color: 'var(--navy)', fontWeight: 500 }}>Languages:</strong>{' '}
                {a.langs.join(', ')}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .agent-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <section style={{ padding: '100px 0', background: 'var(--ivory)' }}>
        <div className="container">
          <SectionHead eyebrow={`Represented by ${a.name.split(' ')[0]}`} title="Active listings" />
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}
            className="grid-3"
          >
            {listings.length > 0 ? (
              listings.map((p) => (
                <PropertyCard
                  key={p.id}
                  p={p}
                  onOpen={(id) => navigate('details', { id })}
                  onFav={toggleFav}
                  faved={favs.includes(p.id)}
                />
              ))
            ) : (
              <p style={{ color: 'var(--slate)' }}>
                No active listings at this moment — please reach out for off-market opportunities.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        style={{ padding: '100px 0', background: '#fff', borderTop: '1px solid var(--line)' }}
      >
        <div className="container-narrow">
          <SectionHead
            eyebrow={`Contact ${a.name.split(' ')[0]}`}
            title="Reach out directly"
            kicker="Whether you're buying, selling, or just considering — a private conversation is the first step."
            align="center"
          />
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: 40,
                border: '1px solid var(--line-gold)',
                background: 'var(--ivory-warm)',
              }}
            >
              <h3 className="serif" style={{ fontSize: 32, fontStyle: 'italic', margin: 0 }}>
                Message sent.
              </h3>
              <p style={{ color: 'var(--slate)', marginTop: 12 }}>
                {a.name} will respond within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              style={{ display: 'grid', gap: 18, maxWidth: 640, margin: '0 auto' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <Field label="Name">
                  <input className="input" required placeholder="Your name" />
                </Field>
                <Field label="Email">
                  <input className="input" type="email" required placeholder="you@example.com" />
                </Field>
              </div>
              <Field label="Subject">
                <select className="input">
                  <option>I'd like to view a property</option>
                  <option>I'm considering selling</option>
                  <option>Tell me about off-market opportunities</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  className="input"
                  placeholder="A few words about what you're looking for…"
                />
              </Field>
              <button type="submit" className="btn btn-gold" style={{ justifySelf: 'start' }}>
                Send message <span className="arrow"></span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { AgentsPage, AgentCard, AgentProfilePage });
