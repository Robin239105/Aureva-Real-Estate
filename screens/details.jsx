// ============== Property Details ==============
const React = window.React;
const { useState, useEffect, useMemo } = React;
const { PROPERTIES, AGENTS, formatPrice, Icon } = window;

function DetailsPage({ navigate, propertyId, favs, toggleFav }) {
  const p = PROPERTIES.find(x => x.id === propertyId) || PROPERTIES[0];
  const agent = AGENTS.find(a => a.id === p.agentId) || AGENTS[0];
  const similar = PROPERTIES.filter(x => x.id !== p.id && x.type === p.type).slice(0, 3);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [tourDate, setTourDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page" style={{ background: "var(--ivory)" }}>
      {/* Top section: breadcrumbs + gallery */}
      <section style={{ paddingTop: 120, paddingBottom: 30 }}>
        <div className="container-wide">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <button onClick={() => navigate("properties")} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--slate)" }}>
              <Icon.ArrowLeft /> Back to listings
            </button>
            <div style={{ display: "flex", gap: 14 }}>
              <button onClick={() => toggleFav(p.id)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: favs.includes(p.id) ? "var(--gold-deep)" : "var(--slate)" }}>
                <Icon.Heart filled={favs.includes(p.id)} /> Save
              </button>
              <button style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--slate)" }}>
                <Icon.Share /> Share
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "260px 260px", gap: 8, height: 540 }} className="gallery-grid">
            <div onClick={() => setLightbox(true)} className="img-zoom" style={{ gridColumn: "1", gridRow: "1 / span 2", cursor: "zoom-in", position: "relative" }}>
              <div className="img-bg" style={{ backgroundImage: `url(${p.gallery[0]})` }} />
              <div style={{ position: "absolute", top: 18, left: 18, display: "flex", gap: 6 }}>
                <span className={`pill ${p.rent ? "pill-navy" : "pill-gold"}`}>{p.status}</span>
                {p.tag && <span className="pill pill-ivory">{p.tag}</span>}
              </div>
            </div>
            {p.gallery.slice(1, 5).map((g, i) => (
              <div key={i} onClick={() => { setActiveImage(i+1); setLightbox(true); }} className="img-zoom" style={{ cursor: "zoom-in", position: "relative" }}>
                <div className="img-bg" style={{ backgroundImage: `url(${g})` }} />
                {i === 3 && p.gallery.length > 5 && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(11,18,32,0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ivory)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    + {p.gallery.length - 5} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: 280px !important; height: auto !important; }
            .gallery-grid > div:first-child { grid-column: auto !important; grid-row: auto !important; }
            .gallery-grid > div:nth-child(n+4) { display: none !important; }
          }
        `}</style>
      </section>

      {/* Title bar */}
      <section style={{ padding: "30px 0 60px" }}>
        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 60 }} className="title-grid">
            <div>
              <div style={{ fontSize: 13, color: "var(--slate)", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon.Pin /> {p.location}
              </div>
              <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.04, margin: "10px 0 16px", color: "var(--navy)", letterSpacing: "-0.02em" }}>
                {p.title}
              </h1>
              <div className="spec-row" style={{ marginTop: 20 }}>
                <span><Icon.Bed /> {p.beds} Bedrooms</span>
                <span className="spec-divider"></span>
                <span><Icon.Bath /> {p.baths} Bathrooms</span>
                <span className="spec-divider"></span>
                <span><Icon.Area /> {p.area.toLocaleString()} ft²</span>
                {p.lotSize > 0 && (<>
                  <span className="spec-divider"></span>
                  <span>{p.lotSize} acres</span>
                </>)}
                <span className="spec-divider"></span>
                <span style={{ color: "var(--gold-deep)" }}>{p.type}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>{p.rent ? "Monthly" : "Asking Price"}</div>
              <div className="serif" style={{ fontSize: "clamp(40px, 4.5vw, 56px)", fontWeight: 400, color: "var(--gold-deep)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                {formatPrice(p.price, p.rent)}
              </div>
              {!p.rent && (
                <div style={{ fontSize: 13, color: "var(--slate)", marginTop: 8 }}>
                  ${Math.round(p.price / p.area).toLocaleString()} / ft²
                </div>
              )}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .title-grid { grid-template-columns: 1fr !important; } .title-grid > div:last-child { text-align: left !important; } }`}</style>
      </section>

      {/* Main content + sticky agent card */}
      <section style={{ paddingBottom: 100 }}>
        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 60 }} className="detail-grid">
            <div>
              {/* Description */}
              <div>
                <h2 className="serif underline-gold" style={{ fontSize: 32, fontWeight: 500, color: "var(--navy)", margin: 0 }}>About this residence</h2>
                <p style={{ fontSize: 17, lineHeight: 1.8, color: "var(--charcoal)", marginTop: 28 }}>{p.description}</p>
                <p style={{ fontSize: 17, lineHeight: 1.8, color: "var(--charcoal)" }}>
                  Built in {p.yearBuilt}, this {p.type.toLowerCase()} balances editorial restraint with quiet ambition — a residence designed for the rituals of an examined life. Soft north light through the principal rooms, generous proportions throughout, and a thoughtful sequence from public to private quarters.
                </p>
              </div>

              {/* Specs grid */}
              <div style={{ marginTop: 60 }}>
                <h2 className="serif underline-gold" style={{ fontSize: 32, fontWeight: 500, color: "var(--navy)", margin: 0 }}>Property facts</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 28, border: "1px solid var(--line)" }} className="facts-grid">
                  {[
                    ["Type", p.type],
                    ["Status", p.status],
                    ["Year built", p.yearBuilt],
                    ["Area", `${p.area.toLocaleString()} ft²`],
                    ["Bedrooms", p.beds],
                    ["Bathrooms", p.baths],
                    ["Lot size", p.lotSize > 0 ? `${p.lotSize} ac` : "—"],
                    ["MLS #", `AUR-${p.id.toUpperCase()}-2026`],
                  ].map(([k, v]) => (
                    <div key={k} style={{ padding: "20px 22px", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--slate)", fontWeight: 500 }}>{k}</div>
                      <div className="serif" style={{ fontSize: 20, color: "var(--navy)", marginTop: 6, fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div style={{ marginTop: 60 }}>
                <h2 className="serif underline-gold" style={{ fontSize: 32, fontWeight: 500, color: "var(--navy)", margin: 0 }}>Amenities</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px 30px", marginTop: 28 }}>
                  {p.amenities.map(a => (
                    <div key={a} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                      <span style={{ color: "var(--gold)" }}><Icon.Check /></span>
                      <span style={{ fontSize: 14, color: "var(--charcoal)" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor plan */}
              <div style={{ marginTop: 60 }}>
                <h2 className="serif underline-gold" style={{ fontSize: 32, fontWeight: 500, color: "var(--navy)", margin: 0 }}>Floor plan</h2>
                <div style={{ marginTop: 28, border: "1px solid var(--line)", background: "#fff", padding: 30, minHeight: 360, position: "relative" }}>
                  <FloorPlanSVG />
                  <div style={{ position: "absolute", bottom: 20, right: 24, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--slate)" }}>
                    Level 01 of 02 · {p.area.toLocaleString()} ft²
                  </div>
                </div>
              </div>

              {/* Map */}
              <div style={{ marginTop: 60 }}>
                <h2 className="serif underline-gold" style={{ fontSize: 32, fontWeight: 500, color: "var(--navy)", margin: 0 }}>Location & neighborhood</h2>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--slate)", marginTop: 18 }}>
                  {p.location} — {p.lat || "Approximate"} {p.lng || ""}
                </p>
                <div style={{ marginTop: 24, height: 360, position: "relative", border: "1px solid var(--line)", overflow: "hidden", background: "var(--ivory-warm)" }}>
                  <MapPlaceholder city={p.location} />
                </div>
              </div>
            </div>

            {/* RIGHT: agent + tour form */}
            <aside style={{ position: "relative" }}>
              <div style={{ position: "sticky", top: 110, display: "grid", gap: 20 }}>
                <div className="card" style={{ padding: 28, background: "#fff" }}>
                  <div className="eyebrow" style={{ marginBottom: 14 }}>Your Advisor</div>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div className="img-bg agent-img" style={{ width: 64, height: 64, borderRadius: 999, backgroundImage: `url(${agent.image})` }}></div>
                    <div>
                      <div className="serif" style={{ fontSize: 22, fontWeight: 500, color: "var(--navy)" }}>{agent.name}</div>
                      <div style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>{agent.title}</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: 10, marginTop: 22 }}>
                    <a style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--charcoal)" }}>
                      <span style={{ color: "var(--gold-deep)" }}><Icon.Phone /></span> {agent.phone}
                    </a>
                    <a style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--charcoal)" }}>
                      <span style={{ color: "var(--gold-deep)" }}><Icon.Mail /></span> {agent.email}
                    </a>
                  </div>
                  <button onClick={() => navigate("agent", { id: agent.id })} className="btn btn-outline-navy" style={{ width: "100%", marginTop: 18 }}>
                    View profile <span className="arrow"></span>
                  </button>
                </div>

                <div className="card" style={{ padding: 28, background: "var(--navy)", color: "var(--ivory)", border: "1px solid rgba(201,164,92,0.3)" }}>
                  <div className="eyebrow on-dark" style={{ marginBottom: 12 }}>Schedule a viewing</div>
                  <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>Private tour</h3>
                  {submitted ? (
                    <div style={{ marginTop: 24, padding: 20, border: "1px solid rgba(201,164,92,0.3)", textAlign: "center" }}>
                      <div style={{ color: "var(--gold)", display: "inline-flex", margin: "0 0 12px" }}><Icon.Check /></div>
                      <p style={{ fontFamily: "var(--serif)", fontSize: 20, margin: 0, fontStyle: "italic" }}>We'll be in touch.</p>
                      <p style={{ fontSize: 13, color: "rgba(248,245,239,0.6)", marginTop: 6 }}>Your advisor will confirm within the hour.</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ marginTop: 20, display: "grid", gap: 14 }}>
                      <input className="input" placeholder="Your name" required />
                      <input className="input" type="email" placeholder="Email" required />
                      <input className="input" type="tel" placeholder="Phone" />
                      <input className="input" type="date" value={tourDate} onChange={e => setTourDate(e.target.value)} required />
                      <select className="input">
                        <option>In-person tour</option>
                        <option>Private video tour</option>
                        <option>Just send more information</option>
                      </select>
                      <button type="submit" className="btn btn-gold" style={{ marginTop: 4 }}>
                        Request Tour <span className="arrow"></span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .detail-grid { grid-template-columns: 1fr !important; } .facts-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* Similar */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container">
          <SectionHead eyebrow="More from the Collection" title="Similar residences" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="grid-3">
            {similar.map(s => (
              <PropertyCard key={s.id} p={s} onOpen={(id) => navigate("details", { id })} onFav={toggleFav} faved={favs.includes(s.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{
          position: "fixed", inset: 0, background: "rgba(11,18,32,0.96)", zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 40,
        }}>
          <button onClick={() => setLightbox(false)} style={{ position: "absolute", top: 30, right: 30, color: "var(--ivory)" }}><Icon.Close /></button>
          <button onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage - 1 + p.gallery.length) % p.gallery.length); }} style={{ position: "absolute", left: 30, top: "50%", transform: "translateY(-50%)", color: "var(--ivory)", padding: 20 }}><Icon.ArrowLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage + 1) % p.gallery.length); }} style={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-50%)", color: "var(--ivory)", padding: 20 }}><Icon.ArrowRight /></button>
          <img src={p.gallery[activeImage]} alt="" onClick={(e) => e.stopPropagation()} style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain" }} />
          <div style={{ position: "absolute", bottom: 30, color: "rgba(248,245,239,0.7)", fontSize: 12, letterSpacing: "0.16em" }}>
            {activeImage + 1} / {p.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
}

// ----- Floor Plan SVG (abstract, premium) -----
function FloorPlanSVG() {
  return (
    <svg viewBox="0 0 800 360" style={{ width: "100%", height: 320, display: "block" }}>
      <defs>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="3" cy="3" r="0.5" fill="#C9A45C" opacity="0.3" />
        </pattern>
      </defs>
      <rect x="20" y="20" width="760" height="320" fill="none" stroke="#0B1220" strokeWidth="1.4" />
      {/* Rooms */}
      <g stroke="#0B1220" strokeWidth="1" fill="none">
        <rect x="20" y="20" width="240" height="200" />
        <rect x="260" y="20" width="280" height="120" />
        <rect x="540" y="20" width="240" height="200" />
        <rect x="20" y="220" width="180" height="120" />
        <rect x="200" y="140" width="180" height="100" />
        <rect x="380" y="140" width="160" height="200" />
        <rect x="540" y="220" width="240" height="120" />
        <rect x="200" y="240" width="180" height="100" />
      </g>
      {/* Patterns */}
      <rect x="540" y="20" width="240" height="200" fill="url(#dots)" opacity="0.6" />
      <rect x="380" y="140" width="160" height="200" fill="url(#dots)" opacity="0.4" />
      {/* Labels */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#64748B">
        <text x="140" y="120" textAnchor="middle">LIVING</text>
        <text x="400" y="80" textAnchor="middle">FOYER</text>
        <text x="660" y="120" textAnchor="middle">KITCHEN</text>
        <text x="110" y="280" textAnchor="middle">BED 01</text>
        <text x="290" y="190" textAnchor="middle">DINING</text>
        <text x="460" y="240" textAnchor="middle">M. SUITE</text>
        <text x="660" y="280" textAnchor="middle">TERRACE</text>
        <text x="290" y="290" textAnchor="middle">BED 02</text>
      </g>
      {/* Doors */}
      <g stroke="#C9A45C" strokeWidth="1.4" fill="none">
        <path d="M 260 100 a 30 30 0 0 1 30 -30" />
        <path d="M 380 200 a 20 20 0 0 1 -20 20" />
      </g>
      {/* Scale bar */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#0B1220">
        <line x1="20" y1="350" x2="100" y2="350" stroke="#0B1220" strokeWidth="1" />
        <line x1="20" y1="347" x2="20" y2="353" stroke="#0B1220" strokeWidth="1" />
        <line x1="100" y1="347" x2="100" y2="353" stroke="#0B1220" strokeWidth="1" />
        <text x="60" y="346" textAnchor="middle">10 FT</text>
      </g>
    </svg>
  );
}

function MapPlaceholder({ city }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(11,18,32,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="360" fill="#efeae0" />
        <rect width="800" height="360" fill="url(#grid)" />
        {/* Roads */}
        <g stroke="rgba(11,18,32,0.18)" strokeWidth="6" fill="none" strokeLinecap="round">
          <path d="M 0 120 Q 200 100 400 140 T 800 180" />
          <path d="M 0 240 Q 300 220 500 250 T 800 290" />
          <path d="M 150 0 Q 180 150 200 360" />
          <path d="M 580 0 Q 560 180 600 360" />
        </g>
        {/* Blocks */}
        <g fill="rgba(11,18,32,0.06)">
          <rect x="240" y="50" width="80" height="50" />
          <rect x="340" y="60" width="60" height="40" />
          <rect x="450" y="180" width="100" height="50" />
          <rect x="640" y="80" width="70" height="60" />
        </g>
        {/* Park */}
        <ellipse cx="350" cy="240" rx="80" ry="40" fill="rgba(201,164,92,0.15)" />
      </svg>
      {/* Pin */}
      <div style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%, -100%)" }}>
        <div style={{
          width: 14, height: 14, background: "var(--gold)", border: "3px solid #fff",
          borderRadius: 999, boxShadow: "0 0 0 6px rgba(201,164,92,0.25), 0 8px 20px rgba(0,0,0,0.25)",
        }}></div>
      </div>
      <div style={{ position: "absolute", bottom: 16, left: 20, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--slate)" }}>
        Map · {city}
      </div>
      <div style={{ position: "absolute", top: 16, right: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        <button style={{ width: 32, height: 32, background: "#fff", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.Plus /></button>
        <button style={{ width: 32, height: 32, background: "#fff", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.Minus /></button>
      </div>
    </div>
  );
}

Object.assign(window, { DetailsPage, FloorPlanSVG, MapPlaceholder });
