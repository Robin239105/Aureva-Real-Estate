// ============== Home page ==============
const React = window.React;
const { useState, useEffect, useRef, useMemo } = React;
const {
  IMG, PROPERTIES, LOCATIONS, AGENTS, TESTIMONIALS, BLOG_POSTS, formatPrice,
  Icon, Reveal, SectionHead, PropertyCard, CTABand,
} = window;

function HomePage({ navigate, favs, toggleFav }) {
  const featured = PROPERTIES.slice(0, 6);
  return (
    <div className="page">
      <HeroCinematic navigate={navigate} />

      {/* Trust strip */}
      <section style={{ borderBottom: "1px solid var(--line)", borderTop: "1px solid var(--line)", padding: "32px 0", background: "#fff" }}>
        <div className="container-wide" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 30 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--slate)" }}>
            As featured in
          </span>
          {["ARCHITECTURAL DIGEST","FORBES","ROBB REPORT","WSJ","VOGUE LIVING","FT WEEKEND"].map(n => (
            <span key={n} className="serif" style={{ fontSize: 18, color: "var(--charcoal)", letterSpacing: "0.06em", opacity: 0.7 }}>
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{ padding: "120px 0 100px", background: "var(--ivory)" }}>
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="The Collection"
              title="Featured residences"
              kicker="Hand-selected by our advisors — newly listed and pocket properties not found elsewhere."
              action={
                <button className="btn btn-outline-navy" onClick={() => navigate("properties")}>
                  View all listings <span className="arrow"></span>
                </button>
              }
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="grid-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <PropertyCard p={p} onOpen={(id) => navigate("details", { id })} onFav={toggleFav} faved={favs.includes(p.id)} />
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .grid-3 { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 700px)  { .grid-3 { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* POPULAR LOCATIONS */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Where we represent"
              title="Popular destinations"
              kicker="From hillside hideaways to skyline penthouses — our network spans the markets that matter most."
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "300px 300px", gap: 20 }} className="loc-grid">
            {LOCATIONS.slice(0,5).map((loc, i) => (
              <Reveal key={loc.name} delay={i*60} style={{
                gridColumn: i === 0 ? "span 1" : "auto",
                gridRow: i === 0 ? "span 2" : "auto",
              }}>
                <LocationCard loc={loc} large={i===0} onClick={() => navigate("properties")} />
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .loc-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; } .loc-grid > * { grid-column: auto !important; grid-row: auto !important; height: 240px; } }
        `}</style>
      </section>

      {/* WHY AUREVA */}
      <section className="section-dark" style={{ padding: "140px 0", position: "relative" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "center" }} className="why-grid">
            <Reveal>
              <div className="eyebrow on-dark" style={{ marginBottom: 18 }}>Why Aureva</div>
              <h2 className="serif" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.02, letterSpacing: "-0.02em", margin: 0 }}>
                A quieter way<br />to buy, sell,<br /><em style={{ color: "var(--gold)" }}>and belong.</em>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(248,245,239,0.7)", marginTop: 28, maxWidth: 480 }}>
                We are a small house of advisors representing fewer clients, more deeply. Every listing is curated; every introduction, deliberate.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30, marginTop: 50, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {[["$4.2B","Sold in '25"],["1,400+","Residences"],["38","Markets"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="serif" style={{ fontSize: 40, color: "var(--gold)", fontWeight: 400, letterSpacing: "-0.01em" }}>{n}</div>
                    <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(248,245,239,0.55)", marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { t: "Discreet representation", d: "Pocket listings, private showings, and confidential transactions for clients who require it." },
                  { t: "World-class marketing", d: "Editorial-grade photography, film, and placement across global luxury press." },
                  { t: "Concierge from offer to keys", d: "Legal, inspection, financing, design — coordinated through a single advisor." },
                  { t: "Global reach, local depth", d: "A boutique footprint in 38 markets and an exchange network across 12 countries." },
                ].map((f, i) => (
                  <div key={f.t} style={{
                    border: "1px solid rgba(201,164,92,0.25)",
                    padding: "32px 26px",
                    background: "rgba(255,255,255,0.02)",
                    minHeight: 220,
                  }}>
                    <div className="serif" style={{ fontSize: 28, color: "var(--gold)", fontWeight: 400 }}>0{i+1}</div>
                    <h4 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "16px 0 10px", letterSpacing: "-0.01em" }}>{f.t}</h4>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(248,245,239,0.65)", margin: 0 }}>{f.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .why-grid { grid-template-columns: 1fr !important; gap: 60px !important; } }
        `}</style>
      </section>

      {/* LUXURY SHOWCASE — full bleed split */}
      <section style={{ background: "var(--ivory)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", minHeight: 720 }} className="showcase-grid">
          <div className="img-zoom" style={{ minHeight: 540 }}>
            <div className="img-bg" style={{ backgroundImage: `url(${IMG.livingRoom})` }} />
          </div>
          <div style={{ padding: "100px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }} className="showcase-body">
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Showcase No. 04</div>
              <h2 className="serif underline-gold" style={{ fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
                The Sterling Penthouse
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--slate)", marginTop: 30, maxWidth: 480 }}>
                Full-floor sky residence above Tribeca. Six exposures, private elevator, 1,800 ft² of wraparound terrace. A rare moment of pause above the city.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 36, paddingTop: 30, borderTop: "1px solid var(--line)", maxWidth: 480 }}>
                {[["4","Beds"],["4","Baths"],["4,200","Sq Ft"],["$8.2M","Price"]].map(([n,l]) => (
                  <div key={l}>
                    <div className="serif" style={{ fontSize: 24, fontWeight: 500, color: "var(--navy)" }}>{n}</div>
                    <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--slate)", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 40 }}>
                <button className="btn btn-navy" onClick={() => navigate("details", { id: "p02" })}>
                  Tour this residence <span className="arrow"></span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .showcase-grid { grid-template-columns: 1fr !important; }
            .showcase-body { padding: 60px 30px !important; }
          }
        `}</style>
      </section>

      {/* AGENT HIGHLIGHT */}
      <section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Your Advisors"
              title="Counsel that opens doors."
              kicker="A small group of advisors, each with a deep specialization. They are the reason our clients come back."
              action={
                <button className="btn btn-outline-navy" onClick={() => navigate("agents")}>
                  Meet the team <span className="arrow"></span>
                </button>
              }
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="agents-grid">
            {AGENTS.slice(0,4).map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <AgentMiniCard a={a} onOpen={(id) => navigate("agent", { id })} />
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .agents-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px)  { .agents-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "140px 0", background: "var(--ivory-warm)" }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <Reveal>
            <div style={{ color: "var(--gold)", display: "flex", justifyContent: "center", marginBottom: 30 }}>
              <Icon.Quote />
            </div>
            <TestimonialRotator />
          </Reveal>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="The Journal"
              title="Notes & dispatches"
              kicker="Market intelligence, architecture, and a quiet word on the residences passing through our hands."
              action={
                <button className="btn btn-outline-navy" onClick={() => navigate("blog")}>
                  Read the journal <span className="arrow"></span>
                </button>
              }
            />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }} className="blog-grid">
            {BLOG_POSTS.slice(0, 3).map((b, i) => (
              <Reveal key={b.id} delay={i * 80}>
                <BlogCard b={b} onOpen={() => navigate("blog-details", { id: b.id })} />
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .blog-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 700px)  { .blog-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CTABand navigate={navigate} />
    </div>
  );
}

function LocationCard({ loc, large, onClick }) {
  return (
    <div onClick={onClick} className="img-zoom card" style={{
      height: "100%", position: "relative", cursor: "pointer", borderRadius: 4, overflow: "hidden",
      border: "1px solid var(--line)",
    }}>
      <div className="img-bg" style={{ backgroundImage: `url(${loc.img})`, height: "100%" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 40%, rgba(11,18,32,0.85))",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: 26,
        color: "var(--ivory)", display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      }}>
        <div>
          <div className="eyebrow on-dark" style={{ marginBottom: 6 }}>Destination</div>
          <h3 className="serif" style={{ fontSize: large ? 38 : 24, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>
            {loc.name}
          </h3>
          <div style={{ fontSize: 13, color: "rgba(248,245,239,0.75)", marginTop: 6 }}>
            {loc.listings} residences
          </div>
        </div>
        <div style={{
          width: 40, height: 40, border: "1px solid rgba(201,164,92,0.6)", borderRadius: 999,
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)",
        }}>
          <Icon.ArrowRight />
        </div>
      </div>
    </div>
  );
}

function AgentMiniCard({ a, onOpen }) {
  return (
    <div onClick={() => onOpen(a.id)} className="card" style={{ cursor: "pointer", background: "#fff" }}>
      <div className="img-zoom" style={{ aspectRatio: "4/5" }}>
        <div className="img-bg agent-img" style={{ backgroundImage: `url(${a.image})` }} />
      </div>
      <div style={{ padding: "22px 22px 26px" }}>
        <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: 0, color: "var(--navy)", letterSpacing: "-0.01em" }}>{a.name}</h3>
        <div style={{ fontSize: 12, color: "var(--slate)", letterSpacing: "0.06em", marginTop: 6 }}>{a.title}</div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--slate)" }}>
          <span>{a.listings} listings</span>
          <span style={{ color: "var(--gold-deep)", display: "inline-flex", gap: 4, alignItems: "center" }}><Icon.Star /> {a.rating}</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x+1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <div>
      <p className="serif" key={i} style={{
        fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.4, fontWeight: 300,
        color: "var(--charcoal)", fontStyle: "italic", margin: 0, animation: "fadeIn 600ms ease",
      }}>
        "{t.quote}"
      </p>
      <div style={{ marginTop: 40 }}>
        <div className="serif" style={{ fontSize: 18, color: "var(--navy)", fontWeight: 500 }}>{t.name}</div>
        <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--slate)", marginTop: 6 }}>{t.role}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 36 }}>
        {TESTIMONIALS.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} style={{
            width: idx === i ? 30 : 8, height: 2,
            background: idx === i ? "var(--gold)" : "var(--line-strong)",
            transition: "width 300ms ease, background 200ms ease",
          }} aria-label={`Testimonial ${idx+1}`} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({ b, onOpen }) {
  return (
    <article onClick={onOpen} className="card" style={{ cursor: "pointer", background: "#fff" }}>
      <div className="img-zoom" style={{ aspectRatio: "3/2" }}>
        <div className="img-bg" style={{ backgroundImage: `url(${b.image})` }} />
      </div>
      <div style={{ padding: "26px 26px 30px" }}>
        <div style={{ display: "flex", gap: 14, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--slate)" }}>
          <span style={{ color: "var(--gold-deep)" }}>{b.category}</span>
          <span>·</span>
          <span>{b.read}</span>
        </div>
        <h3 className="serif" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.25, margin: "14px 0 12px", color: "var(--navy)", letterSpacing: "-0.01em" }}>{b.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--slate)", margin: 0 }}>{b.excerpt}</p>
        <div style={{ marginTop: 22, fontSize: 12, color: "var(--charcoal)", letterSpacing: "0.06em" }}>
          {b.date}
        </div>
      </div>
    </article>
  );
}

// =================================================================
// HERO — Cinematic, editorial, distinct from typical RE site
// =================================================================

const HERO_SLIDES = [
  { img: IMG.heroVilla, label: "Casa del Mirador",      city: "Beverly Hills",       price: "$12.45M", id: "p01" },
  { img: IMG.penthouse, label: "The Sterling Penthouse", city: "Tribeca, Manhattan", price: "$8.20M",  id: "p02" },
  { img: IMG.beach,     label: "Ocean House Malibu",    city: "Malibu Colony",       price: "$18.90M", id: "p03" },
  { img: IMG.estate,    label: "Maple Ridge Estate",    city: "Aspen Highlands",     price: "$6.75M",  id: "p04" },
];

function HeroCinematic({ navigate }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setActive(a => (a + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [hovered]);

  const headline = ["Find", "spaces", "that", "feel"];
  const headline2 = ["like"];

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", color: "var(--ivory)", overflow: "hidden",
        marginTop: "-88px", paddingTop: "88px",
        background: "var(--navy)",
        display: "flex", flexDirection: "column",
        minHeight: "100vh",
      }}>
      {/* === Crossfading Ken-Burns backgrounds === */}
      {HERO_SLIDES.map((s, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          opacity: i === active ? 1 : 0,
          transition: "opacity 1400ms cubic-bezier(.2,.7,.2,1)",
          zIndex: 0,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${s.img})`,
            backgroundSize: "cover", backgroundPosition: "center",
            animation: i === active ? "kenburns 18s ease-out forwards" : "none",
            transformOrigin: i % 2 === 0 ? "30% 40%" : "70% 60%",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(11,18,32,0.88) 0%, rgba(11,18,32,0.55) 45%, rgba(11,18,32,0.45) 70%, rgba(11,18,32,0.7) 100%)",
          }} />
        </div>
      ))}

      {/* === Top live ticker === */}
      <div style={{
        position: "relative", zIndex: 4,
        borderBottom: "1px solid rgba(201,164,92,0.18)",
        background: "rgba(11,18,32,0.22)", backdropFilter: "blur(6px)",
        flexShrink: 0,
      }}>
        <div className="container-wide hero-ticker" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "11px 40px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(248,245,239,0.85)", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--gold)", animation: "pulseDot 1.6s infinite" }}></span>
            <span style={{ color: "var(--gold)", fontWeight: 500 }}>Live</span>
            <span className="ticker-msg">· 3 private viewings booked in the last hour</span>
          </div>
          <div className="ticker-stats" style={{ display: "flex", gap: 28, color: "rgba(248,245,239,0.6)" }}>
            <span><span style={{ color: "var(--gold)" }}>$4.2B</span>&nbsp; Sold YTD</span>
            <span><span style={{ color: "var(--gold)" }}>1,400+</span>&nbsp; Residences</span>
            <span><span style={{ color: "var(--gold)" }}>7</span>&nbsp; New this week</span>
          </div>
        </div>
      </div>

      {/* === Main hero content === */}
      <div className="container-wide hero-grid" style={{
        position: "relative", zIndex: 3,
        paddingTop: "clamp(40px, 6vh, 80px)",
        paddingBottom: "clamp(30px, 5vh, 60px)",
        display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)",
        columnGap: "clamp(32px, 5vw, 80px)", rowGap: 50,
        alignItems: "center",
        flex: 1,
      }}>

        {/* LEFT — copy */}
        <div style={{ minWidth: 0 }}>
          {/* eyebrow with drawing line */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <span style={{
              display: "block", width: 0, height: 1, background: "var(--gold)",
              animation: "drawLine 1100ms cubic-bezier(.2,.7,.2,1) 300ms forwards",
            }}></span>
            <span className="eyebrow on-dark" style={{ animation: "fadeUp 700ms 400ms both" }}>
              Aureva Estates · Est. 2009
            </span>
          </div>

          {/* Word-by-word headline */}
          <h1 className="serif" style={{
            fontSize: "clamp(44px, 6.2vw, 96px)", fontWeight: 300, lineHeight: 0.98, margin: 0,
            letterSpacing: "-0.028em",
          }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              {headline.slice(0,2).map((w, i) => (
                <span key={i} style={{
                  display: "inline-block", marginRight: "0.28em",
                  animation: `wordUp 900ms cubic-bezier(.2,.7,.2,1) ${500 + i*120}ms both`,
                }}>{w}</span>
              ))}
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              {headline.slice(2).concat(headline2).map((w, i) => (
                <span key={i} style={{
                  display: "inline-block", marginRight: "0.28em",
                  animation: `wordUp 900ms cubic-bezier(.2,.7,.2,1) ${800 + i*120}ms both`,
                }}>{w}</span>
              ))}
            </span>
            <span style={{ display: "block", overflow: "hidden", marginTop: "0.04em" }}>
              <em style={{
                color: "var(--gold)", fontWeight: 400, display: "inline-block",
                position: "relative", fontStyle: "italic",
                animation: "wordUp 900ms cubic-bezier(.2,.7,.2,1) 1200ms both",
              }}>
                success.
                <span style={{
                  position: "absolute", bottom: "0.12em", left: 0, right: 0, height: 2,
                  background: "var(--gold)", transformOrigin: "left",
                  animation: "drawUnder 900ms cubic-bezier(.2,.7,.2,1) 1850ms both",
                }}></span>
              </em>
            </span>
          </h1>

          <p className="hero-body" style={{
            fontSize: "clamp(15px, 1.15vw, 18px)", lineHeight: 1.7,
            color: "rgba(248,245,239,0.8)", maxWidth: 520, marginTop: 28,
            animation: "fadeUp 800ms 1500ms both",
          }}>
            A curated collection of the world's most considered residences — represented by advisors who treat your move as their craft.
          </p>

          <div style={{ display: "inline-flex", gap: 14, marginTop: 32, flexWrap: "wrap", animation: "fadeUp 800ms 1700ms both" }}>
            <button className="btn btn-gold" onClick={() => navigate("properties")}>
              Explore Properties <span className="arrow"></span>
            </button>
            <button className="btn btn-outline-gold" onClick={() => navigate("contact")}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: 999, background: "var(--gold)", color: "var(--navy)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon.Play style={{ width: 10, height: 10 }} />
                </span>
                Watch the reel
              </span>
            </button>
          </div>

          {/* Animated stat counters */}
          <div className="hero-stats" style={{
            marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, auto)",
            gap: "clamp(28px, 4vw, 56px)", animation: "fadeUp 800ms 1900ms both",
            justifyContent: "start",
          }}>
            {[
              { n: 4.2, suffix: "B", prefix: "$", label: "Sold in '25" },
              { n: 1400, suffix: "+", prefix: "", label: "Residences" },
              { n: 38, suffix: "",  prefix: "", label: "Markets" },
            ].map((s, i) => (
              <div key={i}>
                <div className="serif" style={{ fontSize: "clamp(26px, 2.4vw, 34px)", color: "var(--gold)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.01em" }}>
                  {s.prefix}<Counter target={s.n} duration={1800} delay={2100 + i*180} />{s.suffix}
                </div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(248,245,239,0.55)", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Now Showing property carousel */}
        <div className="hero-side" style={{
          position: "relative", height: "min(56vh, 520px)", minHeight: 380,
          animation: "fadeUp 900ms 800ms both", minWidth: 0,
        }}>
          <div style={{
            position: "absolute", top: -22, left: 0,
            fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(248,245,239,0.65)", display: "inline-flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--gold)" }}></span>
            Now showing
          </div>

          <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            {HERO_SLIDES.map((s, i) => {
              const offset = (i - active + HERO_SLIDES.length) % HERO_SLIDES.length;
              return (
                <div key={i}
                  onClick={() => offset === 0 && navigate("details", { id: s.id })}
                  style={{
                    position: "absolute", inset: 0,
                    transform: `translateY(${offset * 18}px) scale(${1 - offset * 0.04})`,
                    opacity: offset === 0 ? 1 : offset < 3 ? 0.45 - offset * 0.15 : 0,
                    transition: "all 900ms cubic-bezier(.2,.7,.2,1)",
                    zIndex: HERO_SLIDES.length - offset,
                    cursor: offset === 0 ? "pointer" : "default",
                    pointerEvents: offset === 0 ? "auto" : "none",
                  }}>
                  <div style={{
                    height: "100%", border: "1px solid rgba(201,164,92,0.4)",
                    background: `url(${s.img}) center/cover`, position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(180deg, transparent 45%, rgba(11,18,32,0.92))",
                    }}></div>
                    <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="mono" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em" }}>
                        {String(i+1).padStart(2,"0")} / {String(HERO_SLIDES.length).padStart(2,"0")}
                      </span>
                    </div>
                    <div style={{ position: "absolute", top: 16, right: 16 }}>
                      <span className="pill" style={{ background: "rgba(11,18,32,0.7)", color: "var(--gold)", border: "1px solid rgba(201,164,92,0.4)" }}>For Sale</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,245,239,0.75)", marginBottom: 8 }}>
                        {s.city}
                      </div>
                      <h3 className="serif" style={{ fontSize: "clamp(22px, 1.8vw, 30px)", fontWeight: 400, color: "var(--ivory)", margin: 0, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
                        {s.label}
                      </h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(248,245,239,0.18)" }}>
                        <span className="serif" style={{ fontSize: "clamp(20px, 1.6vw, 26px)", color: "var(--gold)", fontWeight: 500 }}>{s.price}</span>
                        <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                          View <Icon.ArrowRight />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* progress dots */}
          <div style={{ position: "absolute", bottom: -32, left: 0, display: "flex", gap: 8 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i+1}`} style={{
                width: i === active ? 36 : 10, height: 2,
                background: i === active ? "var(--gold)" : "rgba(248,245,239,0.3)",
                transition: "all 400ms ease", cursor: "pointer", padding: 0,
              }}></button>
            ))}
          </div>
        </div>
      </div>

      {/* === Bottom marquee (now in flow) === */}
      <div style={{
        position: "relative", zIndex: 3,
        borderTop: "1px solid rgba(201,164,92,0.18)",
        background: "linear-gradient(180deg, transparent, rgba(11,18,32,0.75))",
        padding: "14px 0",
        overflow: "hidden",
        flexShrink: 0,
        animation: "fadeUp 900ms 1900ms both",
      }}>
        <div style={{ display: "flex", animation: "marquee 60s linear infinite", whiteSpace: "nowrap", gap: 0 }}>
          {[...Array(2)].map((_, dup) => (
            <div key={dup} style={{ display: "flex", gap: 60, paddingRight: 60 }}>
              {["New York","Los Angeles","Malibu","Aspen","Miami","The Hamptons","Beverly Hills","London","Paris","Tokyo","Lake Como","Saint-Tropez","Palm Beach","Zurich","Sydney"].map((c) => (
                <span key={c} style={{ fontFamily: "var(--serif)", fontSize: 20, color: "rgba(248,245,239,0.8)", fontStyle: "italic", display: "inline-flex", alignItems: "center", gap: 60 }}>
                  {c}
                  <span style={{ width: 5, height: 5, background: "var(--gold)", borderRadius: 999, opacity: 0.6 }}></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.0) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1.5%, -1.5%); }
        }
        @keyframes wordUp {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes drawLine {
          from { width: 0; }
          to   { width: 56px; }
        }
        @keyframes drawUnder {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollDot {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }
        @media (max-width: 1280px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          .hero-side { height: 420px !important; max-width: 540px; }
        }
        @media (max-width: 760px) {
          .hero-ticker .ticker-stats { display: none !important; }
          .hero-ticker .ticker-msg { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// Animated counter
function Counter({ target, duration = 1500, delay = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);

  const isInt = Number.isInteger(target);
  const display = target >= 1000
    ? Math.round(val).toLocaleString()
    : isInt ? Math.round(val) : val.toFixed(1);
  return <span>{display}</span>;
}

Object.assign(window, { HomePage, LocationCard, AgentMiniCard, BlogCard, TestimonialRotator, HeroCinematic, Counter });
