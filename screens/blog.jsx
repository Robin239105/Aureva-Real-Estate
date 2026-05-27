// ============== Blog (Journal) + Blog Details ==============
const React = window.React;
const { useState, useEffect } = React;
const { BLOG_POSTS, IMG, Icon, PageBanner, Reveal } = window;

function BlogPage({ navigate }) {
  const [cat, setCat] = useState('All');
  const cats = ['All', ...Array.from(new Set(BLOG_POSTS.map((b) => b.category)))];
  const filtered = cat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((b) => b.category === cat);
  const featured = BLOG_POSTS[0];
  const rest = filtered.slice(filtered === BLOG_POSTS ? 1 : 0);

  return (
    <div className="page">
      <PageBanner
        eyebrow="The Aureva Journal"
        title="Notes, dispatches & longer reads."
        kicker="Market intelligence, architecture, and a quiet word on residences passing through our hands."
        breadcrumb="Home · Journal"
        image={IMG.blog1}
      />

      {/* Categories */}
      <section
        style={{
          padding: '60px 0 30px',
          background: '#fff',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                fontSize: 12,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '10px 0',
                position: 'relative',
                color: cat === c ? 'var(--gold-deep)' : 'var(--slate)',
                borderBottom: cat === c ? '1px solid var(--gold)' : '1px solid transparent',
                transition: 'all 200ms ease',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      {cat === 'All' && (
        <section style={{ padding: '80px 0 40px', background: 'var(--ivory)' }}>
          <div className="container">
            <Reveal>
              <article
                onClick={() => navigate('blog-details', { id: featured.id })}
                className="card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 1fr',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: '#fff',
                }}
              >
                <div className="img-zoom" style={{ minHeight: 480 }}>
                  <div
                    className="img-bg"
                    style={{
                      backgroundImage: `url(${featured.image})`,
                      height: '100%',
                      minHeight: 480,
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '60px 60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <span className="pill pill-outline" style={{ alignSelf: 'flex-start' }}>
                    Featured
                  </span>
                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-deep)',
                    }}
                  >
                    {featured.category} · {featured.read}
                  </div>
                  <h2
                    className="serif"
                    style={{
                      fontSize: 'clamp(32px, 3.6vw, 48px)',
                      fontWeight: 500,
                      lineHeight: 1.1,
                      color: 'var(--navy)',
                      letterSpacing: '-0.015em',
                      margin: '20px 0 18px',
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--slate)', margin: 0 }}>
                    {featured.excerpt}
                  </p>
                  <div
                    style={{
                      marginTop: 30,
                      paddingTop: 24,
                      borderTop: '1px solid var(--line)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 13,
                      color: 'var(--charcoal)',
                    }}
                  >
                    <span>By {featured.author}</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      <section style={{ padding: '60px 0 120px', background: 'var(--ivory)' }}>
        <div className="container">
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}
            className="grid-3"
          >
            {rest.map((b, i) => (
              <Reveal key={b.id} delay={(i % 6) * 60}>
                <BlogCard b={b} onOpen={() => navigate('blog-details', { id: b.id })} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand navigate={navigate} />
    </div>
  );
}

function BlogDetailsPage({ navigate, postId }) {
  const b = BLOG_POSTS.find((x) => x.id === postId) || BLOG_POSTS[0];
  const related = BLOG_POSTS.filter((x) => x.id !== b.id).slice(0, 3);
  return (
    <div className="page" style={{ background: 'var(--ivory)' }}>
      {/* Hero */}
      <section
        style={{
          paddingTop: 130,
          paddingBottom: 60,
          background: '#fff',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('blog')}
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
            <Icon.ArrowLeft /> Back to journal
          </button>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            {b.category} · {b.read}
          </div>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(40px, 5vw, 68px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {b.title}
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: 'var(--slate)',
              marginTop: 24,
              maxWidth: 620,
              marginInline: 'auto',
            }}
          >
            {b.excerpt}
          </p>
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              justifyContent: 'center',
              gap: 30,
              fontSize: 13,
              color: 'var(--charcoal)',
              paddingTop: 30,
              borderTop: '1px solid var(--line)',
            }}
          >
            <span>
              <strong style={{ color: 'var(--navy)', fontWeight: 500 }}>{b.author}</strong>
            </span>
            <span>·</span>
            <span>{b.date}</span>
            <span>·</span>
            <span>{b.read} read</span>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section style={{ padding: '60px 0 30px', background: 'var(--ivory)' }}>
        <div className="container">
          <div className="img-zoom" style={{ aspectRatio: '2.3/1', overflow: 'hidden' }}>
            <div
              className="img-bg"
              style={{ backgroundImage: `url(${b.image})`, height: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container-narrow">
          <div style={{ fontSize: 18, lineHeight: 1.9, color: 'var(--charcoal)' }}>
            <p
              className="serif"
              style={{
                fontSize: 24,
                lineHeight: 1.5,
                fontStyle: 'italic',
                color: 'var(--navy)',
                borderLeft: '2px solid var(--gold)',
                paddingLeft: 24,
                fontWeight: 300,
                marginBottom: 40,
              }}
            >
              The shape of the global luxury market has changed quietly. Coastal cities continue to
              attract; mountain markets are bifurcating; and an entirely new tier of pocket-listing
              activity sits beneath the headlines.
            </p>
            <p>
              What strikes us most about the first months of 2026 is not the headline price growth —
              that has been there for years — but the change in <em>how</em> trophy homes are
              trading. We are seeing a measured, more discerning buyer, willing to wait several
              seasons for the right residence, and increasingly uninterested in public listings.
            </p>

            <h2
              className="serif"
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: 'var(--navy)',
                letterSpacing: '-0.01em',
                marginTop: 60,
                marginBottom: 20,
              }}
            >
              The quiet market
            </h2>
            <p>
              An estimated 38% of trophy transactions above $10M in our six core markets now happen
              off-market — the highest share we have recorded. The reasons are familiar: privacy,
              certainty, and curatorial fit. The instrument that enables it is increasingly the
              boutique brokerage with a tight Rolodex and the patience to wait.
            </p>

            <p>
              This is the kind of work Aureva was built for. A pocket listing is not simply a closed
              marketplace; it is a careful match between residence and buyer, where the advisor's
              judgment matters more than the marketing budget.
            </p>

            <h2
              className="serif"
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: 'var(--navy)',
                letterSpacing: '-0.01em',
                marginTop: 60,
                marginBottom: 20,
              }}
            >
              What to watch
            </h2>
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
              {[
                'Coastal California: trophy inventory remains tight; buyer pool is deeper than headlines suggest.',
                'Manhattan: pre-war demand returning after a three-year softening — selectively.',
                'Aspen: shoulder-season activity at all-time highs; spring tours are the new fall tours.',
                'Miami: bifurcating between new-construction tower buyers and waterfront estate buyers — almost no overlap.',
              ].map((p) => (
                <li
                  key={p}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    paddingBottom: 14,
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span style={{ color: 'var(--gold)', marginTop: 4 }}>—</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <p style={{ marginTop: 40 }}>
              If you would like the full quarterly market dossier with comparable data and our
              specific market commentary, our advisors are happy to share it on request.
            </p>
          </div>

          {/* Author card */}
          <div
            style={{
              marginTop: 80,
              padding: 36,
              background: '#fff',
              border: '1px solid var(--line)',
              display: 'flex',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <div
              className="img-bg agent-img"
              style={{
                width: 80,
                height: 80,
                borderRadius: 999,
                backgroundImage: `url(${IMG.agent1})`,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div className="eyebrow">Written by</div>
              <h4
                className="serif"
                style={{ fontSize: 24, fontWeight: 500, margin: '6px 0', color: 'var(--navy)' }}
              >
                {b.author}
              </h4>
              <p style={{ fontSize: 14, color: 'var(--slate)', margin: 0, lineHeight: 1.6 }}>
                Managing Director, West Coast · Twelve years representing trophy estates across
                California.
              </p>
            </div>
            <button
              onClick={() => navigate('agent', { id: 'a1' })}
              className="btn btn-outline-navy"
            >
              View profile
            </button>
          </div>
        </div>
      </section>

      {/* Related */}
      <section
        style={{ padding: '100px 0', background: '#fff', borderTop: '1px solid var(--line)' }}
      >
        <div className="container">
          <SectionHead eyebrow="Continue reading" title="More from the journal" />
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}
            className="grid-3"
          >
            {related.map((r) => (
              <BlogCard key={r.id} b={r} onOpen={() => navigate('blog-details', { id: r.id })} />
            ))}
          </div>
        </div>
      </section>

      <CTABand navigate={navigate} />
    </div>
  );
}

Object.assign(window, { BlogPage, BlogDetailsPage });
