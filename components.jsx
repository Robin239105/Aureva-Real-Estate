// ============== Shared components ==============

const React = window.React;
const { useState, useEffect, useRef, useMemo } = React;
const { IMG, formatPrice } = window;

// ---------- Logo ----------
// Minimal "A" mark with roof gable lines + serif wordmark.
function Logo({ size = 28, tone = "navy", showWord = true }) {
  const stroke = tone === "gold" ? "#C9A45C" : tone === "ivory" ? "#F8F5EF" : "#0B1220";
  const wordColor = tone === "gold" ? "#C9A45C" : tone === "ivory" ? "#F8F5EF" : "#0B1220";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        {/* outer A / roof */}
        <path d="M3 31 L18 5 L33 31" stroke={stroke} strokeWidth="1.2" strokeLinecap="square" />
        {/* inner gable */}
        <path d="M10 31 L18 17 L26 31" stroke={stroke} strokeWidth="1.2" strokeLinecap="square" />
        {/* baseline */}
        <path d="M3 31 L33 31" stroke={stroke} strokeWidth="1.2" strokeLinecap="square" opacity="0.6" />
        {/* keystone dot */}
        <circle cx="18" cy="5" r="1" fill={stroke} />
      </svg>
      {showWord && (
        <span className="logo-text" style={{
          fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: "0.08em",
          color: wordColor, textTransform: "uppercase",
        }}>
          Aureva
        </span>
      )}
    </div>
  );
}

// ---------- Icons (thin, monoline, gold/navy by currentColor) ----------
const Icon = {
  Bed: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M3 18V8m0 6h18m0 4v-6a3 3 0 0 0-3-3H9m-6 9h18" />
      <path d="M7 11a2 2 0 1 1 4 0v0a2 2 0 0 1-4 0Z" />
    </svg>
  ),
  Bath: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M4 12V6a2 2 0 0 1 4 0M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Zm3 7 1 2m10-2 1 2" />
    </svg>
  ),
  Area: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />
    </svg>
  ),
  Pin: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Heart: ({ filled, ...p }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.65 12 21 12 21Z" />
    </svg>
  ),
  Search: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  ),
  ArrowLeft: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M20 12H4m6 6-6-6 6-6" />
    </svg>
  ),
  Chevron: (p) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Star: ({ filled = true, ...p }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M12 3 14.7 9.3 21 9.9l-4.8 4 1.5 6.3L12 17l-5.7 3.2 1.5-6.3L3 9.9l6.3-.6L12 3Z" />
    </svg>
  ),
  Phone: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  Mail: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  ),
  Calendar: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  ),
  Check: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="m4 12 5 5 11-12" />
    </svg>
  ),
  Plus: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Minus: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M5 12h14" />
    </svg>
  ),
  Menu: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  ),
  Close: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  ),
  Play: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5v14l11-7-11-7Z" />
    </svg>
  ),
  Quote: (p) => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor" {...p}>
      <path d="M11 8c-3 0-6 2.5-6 7v13h10V16H9c0-3 2-4.5 4-5l-2-3Zm15 0c-3 0-6 2.5-6 7v13h10V16h-6c0-3 2-4.5 4-5l-2-3Z" />
    </svg>
  ),
  Filter: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  ),
  Grid: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  List: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
  Share: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" />
    </svg>
  ),
};

// ---------- Header / Navigation ----------
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "properties", label: "Properties" },
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "sell", label: "Sell" },
  { id: "agents", label: "Agents" },
  { id: "blog", label: "Journal" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function Header({ route, navigate, transparentOnTop = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparentOnTop || scrolled;
  const tone = solid ? "navy" : "ivory";

  return (
    <header className={`header ${solid ? "solid" : "transparent"}`}>
      {/* Top contrast band — only when transparent, gives nav legibility on hero image */}
      {!solid && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 140,
          background: "linear-gradient(180deg, rgba(11,18,32,0.55), transparent)",
          pointerEvents: "none", zIndex: -1,
        }}></div>
      )}
      <div className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: solid ? "16px 40px" : "22px 40px", transition: "padding 220ms ease" }}>
        <a onClick={() => navigate("home")} style={{ cursor: "pointer" }}>
          <Logo tone={tone} />
        </a>

        <nav className="nav-desktop" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV_LINKS.map((l, i) => (
            <React.Fragment key={l.id}>
              {i > 0 && <span style={{
                width: 3, height: 3, borderRadius: 999,
                background: "var(--gold)", opacity: 0.7,
                margin: "0 14px",
              }}></span>}
              <a
                className={`nav-link ${route === l.id ? "active" : ""}`}
                onClick={() => navigate(l.id)}
                style={{ cursor: "pointer", fontWeight: 500, letterSpacing: "0.04em", display: "inline-flex", alignItems: "baseline", gap: 6 }}
              >
                <span className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--gold)", opacity: solid ? 0.7 : 0.85, fontWeight: 500 }}>
                  {String(i+1).padStart(2,"0")}
                </span>
                {l.label}
              </a>
            </React.Fragment>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="btn btn-gold" onClick={() => navigate("contact")}>
            Talk to an Advisor
            <span className="arrow"></span>
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            style={{ display: "none", color: tone === "ivory" ? "var(--ivory)" : "var(--navy)" }}
            className="mobile-toggle"
          >
            <Icon.Menu />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(11,18,32,0.98)", zIndex: 200,
          padding: "30px 40px", color: "var(--ivory)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Logo tone="ivory" />
            <button onClick={() => setMenuOpen(false)} style={{ color: "var(--ivory)" }}><Icon.Close /></button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 60 }}>
            {NAV_LINKS.map(l => (
              <a key={l.id} onClick={() => { navigate(l.id); setMenuOpen(false); }}
                 style={{ fontFamily: "var(--serif)", fontSize: 36, color: "var(--ivory)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 14 }}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .nav-desktop { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
          .btn-gold span { display: none; }
        }
      `}</style>
    </header>
  );
}

// ---------- Footer ----------
function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 60, paddingBottom: 60, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <Logo tone="gold" />
            <p style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.35, color: "var(--ivory)", marginTop: 24, fontStyle: "italic", fontWeight: 300 }}>
              "Find spaces that feel like success."
            </p>
            <p style={{ fontSize: 13, color: "rgba(248,245,239,0.55)", marginTop: 18, lineHeight: 1.7 }}>
              Aureva Estates · A boutique brokerage representing the world's most considered residences.
            </p>
          </div>

          <div>
            <h4 className="eyebrow on-dark" style={{ marginBottom: 22 }}>Navigate</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {["home","properties","buy","rent","sell"].map(id => (
                <li key={id}><a onClick={() => navigate(id)} style={{ cursor: "pointer" }}>{NAV_LINKS.find(n=>n.id===id).label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow on-dark" style={{ marginBottom: 22 }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {["agents","about","blog","contact"].map(id => (
                <li key={id}><a onClick={() => navigate(id)} style={{ cursor: "pointer" }}>{NAV_LINKS.find(n=>n.id===id).label}</a></li>
              ))}
              <li><a style={{ cursor: "pointer" }}>Careers</a></li>
              <li><a style={{ cursor: "pointer" }}>Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow on-dark" style={{ marginBottom: 22 }}>Subscribe</h4>
            <p style={{ fontSize: 13, color: "rgba(248,245,239,0.6)", lineHeight: 1.7, marginBottom: 16 }}>
              The Aureva Journal — monthly notes on architecture, markets and rare residences.
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(201,164,92,0.4)" }}>
              <input placeholder="you@example.com" style={{
                flex: 1, background: "transparent", border: 0, outline: 0,
                color: "var(--ivory)", padding: "12px 0", fontSize: 14,
              }} />
              <button type="submit" style={{ color: "var(--gold)", padding: "10px 8px" }}>
                <Icon.ArrowRight />
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 30, fontSize: 12, color: "rgba(248,245,239,0.5)" }}>
          <span>© 2026 Aureva Estates. All rights reserved.</span>
          <div style={{ display: "flex", gap: 22 }}>
            <a>Privacy</a><a>Terms</a><a>Accessibility</a><a>Cookies</a>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <a aria-label="Instagram">IG</a>
            <a aria-label="LinkedIn">LI</a>
            <a aria-label="Pinterest">PN</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer > .container > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  );
}

// ---------- Property Card ----------
function PropertyCard({ p, onOpen, onFav, faved, compact = false }) {
  return (
    <article className="card prop-card" onClick={() => onOpen && onOpen(p.id)} style={{ cursor: "pointer" }}>
      <div className="img-wrap img-zoom">
        <div className="img-bg" style={{ backgroundImage: `url(${p.image})` }} />
        <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6, zIndex: 2 }}>
          <span className={`pill ${p.rent ? "pill-navy" : "pill-gold"}`}>{p.status}</span>
          {p.tag && <span className="pill pill-ivory">{p.tag}</span>}
        </div>
        <button
          className={`fav ${faved ? "active" : ""}`}
          onClick={(e) => { e.stopPropagation(); onFav && onFav(p.id); }}
          aria-label="Favorite"
        >
          <Icon.Heart filled={faved} style={{ color: faved ? "var(--navy)" : "var(--charcoal)" }} />
        </button>
        <div className="overlay"><span>View Details →</span></div>
      </div>
      <div className="body">
        <div className="loc"><Icon.Pin /> {p.location}</div>
        <h3>{p.title}</h3>
        <div className="price">{formatPrice(p.price, p.rent)}</div>
        <div className="specs spec-row">
          <span><Icon.Bed /> {p.beds} Beds</span>
          <span className="spec-divider"></span>
          <span><Icon.Bath /> {p.baths} Baths</span>
          <span className="spec-divider"></span>
          <span><Icon.Area /> {p.area.toLocaleString()} ft²</span>
        </div>
      </div>
    </article>
  );
}

// ---------- Search Bar ----------
function SearchBar({ variant = "light", onSearch }) {
  const [intent, setIntent] = useState("buy");
  const isDark = variant === "dark";
  const tabActive = isDark ? "var(--gold)" : "var(--navy)";
  const tabInactive = isDark ? "rgba(248,245,239,0.5)" : "var(--slate)";

  return (
    <div style={{
      background: isDark ? "rgba(11,18,32,0.55)" : "#fff",
      backdropFilter: "blur(14px)",
      border: isDark ? "1px solid rgba(201,164,92,0.3)" : "1px solid var(--line)",
      borderRadius: 4,
      boxShadow: isDark ? "0 30px 80px rgba(0,0,0,0.5)" : "var(--shadow-md)",
      padding: 0,
      width: "100%",
    }}>
      <div style={{ display: "flex", gap: 0, padding: "0 0", borderBottom: isDark ? "1px solid rgba(201,164,92,0.18)" : "1px solid var(--line)" }}>
        {["buy","rent","sell"].map(t => (
          <button
            key={t}
            onClick={() => setIntent(t)}
            style={{
              flex: "0 0 auto",
              padding: "16px 28px",
              fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
              color: intent === t ? tabActive : tabInactive,
              borderBottom: `2px solid ${intent === t ? "var(--gold)" : "transparent"}`,
              transition: "all 200ms ease",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr auto", gap: 0, alignItems: "stretch" }}>
        <SearchField isDark={isDark} label="Location" placeholder="City, neighborhood, ZIP">
          <Icon.Pin />
        </SearchField>
        <SearchField isDark={isDark} label="Property Type" placeholder="Any" select options={["Any","Villa","Penthouse","Apartment","Loft","Estate","Cottage"]}>
        </SearchField>
        <SearchField isDark={isDark} label="Price Range" placeholder="Any" select options={["Any","< $1M","$1M – $5M","$5M – $15M","$15M+"]}>
        </SearchField>
        <SearchField isDark={isDark} label="Bedrooms" placeholder="Any" select options={["Any","1+","2+","3+","4+","5+"]}>
        </SearchField>
        <button
          onClick={() => onSearch && onSearch(intent)}
          style={{
            background: "var(--gold)", color: "var(--navy)",
            padding: "0 36px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500,
            transition: "background 200ms ease",
          }}
          onMouseEnter={e=>e.currentTarget.style.background='var(--gold-soft)'}
          onMouseLeave={e=>e.currentTarget.style.background='var(--gold)'}
        >
          <Icon.Search /> Search
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .search-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SearchField({ isDark, label, placeholder, select, options, children }) {
  return (
    <div style={{
      padding: "16px 22px",
      borderRight: isDark ? "1px solid rgba(201,164,92,0.18)" : "1px solid var(--line)",
      color: isDark ? "var(--ivory)" : "var(--charcoal)",
    }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: isDark ? "rgba(248,245,239,0.55)" : "var(--slate)", marginBottom: 6, fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: isDark ? "var(--gold)" : "var(--gold-deep)" }}>
        {children}
        {select ? (
          <select style={{
            border: 0, background: "transparent", color: isDark ? "var(--ivory)" : "var(--charcoal)",
            fontSize: 14, outline: 0, padding: 0, width: "100%", appearance: "none", cursor: "pointer",
            fontFamily: "var(--sans)",
          }}>
            {options.map(o => <option key={o} value={o} style={{ color: "#000" }}>{o}</option>)}
          </select>
        ) : (
          <input placeholder={placeholder} style={{
            border: 0, background: "transparent", color: isDark ? "var(--ivory)" : "var(--charcoal)",
            fontSize: 14, outline: 0, padding: 0, width: "100%",
          }} />
        )}
      </div>
    </div>
  );
}

// ---------- Section header ----------
function SectionHead({ eyebrow, title, kicker, align = "left", onDark = false, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, gap: 40, flexWrap: "wrap" }}>
      <div style={{ textAlign: align, maxWidth: 700 }}>
        {eyebrow && <div className={`eyebrow ${onDark ? "on-dark" : ""}`} style={{ marginBottom: 14 }}>{eyebrow}</div>}
        <h2 className="serif" style={{
          fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 400, lineHeight: 1.05,
          color: onDark ? "var(--ivory)" : "var(--navy)", margin: 0, letterSpacing: "-0.015em",
        }}>{title}</h2>
        {kicker && <p style={{
          fontSize: 16, lineHeight: 1.7, color: onDark ? "rgba(248,245,239,0.7)" : "var(--slate)",
          marginTop: 18, maxWidth: 560,
        }}>{kicker}</p>}
      </div>
      {action}
    </div>
  );
}

// ---------- CTA Band ----------
function CTABand({ navigate }) {
  return (
    <section style={{ background: "var(--navy)", color: "var(--ivory)", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(11,18,32,0.78), rgba(11,18,32,0.86)), url(${IMG.heroCity})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div className="container-narrow" style={{ position: "relative", textAlign: "center" }}>
        <div className="eyebrow on-dark" style={{ marginBottom: 18 }}>Aureva Estates</div>
        <h2 className="serif" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.04, margin: 0, letterSpacing: "-0.02em" }}>
          Find spaces that feel<br /><em style={{ color: "var(--gold)", fontWeight: 400 }}>like success.</em>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(248,245,239,0.7)", marginTop: 28, maxWidth: 560, marginInline: "auto" }}>
          From private listings to seamless transactions — work with an Aureva advisor who knows the residences before they reach the market.
        </p>
        <div style={{ display: "inline-flex", gap: 14, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={() => navigate("properties")}>
            Explore Properties <span className="arrow"></span>
          </button>
          <button className="btn btn-outline-gold" onClick={() => navigate("contact")}>
            Talk to an Agent <span className="arrow"></span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------- Reveal on scroll ----------
function Reveal({ children, delay = 0, as = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} {...rest} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      ...rest.style,
    }}>
      {children}
    </Tag>
  );
}

// ---------- Page Banner ----------
function PageBanner({ eyebrow, title, kicker, breadcrumb, image }) {
  return (
    <section style={{
      position: "relative", padding: "180px 0 80px", color: "var(--ivory)",
      backgroundColor: "var(--navy)",
    }}>
      {image && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(11,18,32,0.72), rgba(11,18,32,0.85)), url(${image})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
      )}
      <div className="container" style={{ position: "relative" }}>
        <div className="eyebrow on-dark anim-up">{eyebrow}</div>
        <h1 className="serif anim-up" style={{
          fontSize: "clamp(46px, 6vw, 88px)", fontWeight: 300, lineHeight: 1, margin: "18px 0 24px",
          letterSpacing: "-0.02em", animationDelay: "60ms",
        }}>{title}</h1>
        {kicker && (
          <p className="anim-up" style={{
            fontSize: 18, lineHeight: 1.7, color: "rgba(248,245,239,0.75)", maxWidth: 640,
            animationDelay: "120ms",
          }}>{kicker}</p>
        )}
        {breadcrumb && (
          <div className="anim-up" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(248,245,239,0.5)", marginTop: 28, animationDelay: "180ms" }}>
            {breadcrumb}
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, {
  Logo, Icon, Header, Footer, PropertyCard, SearchBar, SectionHead, CTABand, Reveal, PageBanner, NAV_LINKS,
});
