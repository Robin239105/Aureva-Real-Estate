// ============== Properties (listing) ==============
const React = window.React;
const { useState, useEffect, useMemo } = React;
const { PROPERTIES, formatPrice, Icon, PageBanner, PropertyCard, Reveal } = window;

function PropertiesPage({ navigate, favs, toggleFav, mode = "all" }) {
  const [filters, setFilters] = useState({
    type: "Any",
    beds: "Any",
    priceMax: "Any",
    intent: mode === "rent" ? "rent" : mode === "buy" ? "buy" : "all",
    sort: "Featured",
  });
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(true);

  const filtered = useMemo(() => {
    let arr = PROPERTIES.slice();
    if (filters.intent === "rent") arr = arr.filter(p => p.rent);
    else if (filters.intent === "buy") arr = arr.filter(p => !p.rent);
    if (filters.type !== "Any") arr = arr.filter(p => p.type === filters.type);
    if (filters.beds !== "Any") arr = arr.filter(p => p.beds >= parseInt(filters.beds, 10));
    if (filters.priceMax !== "Any") {
      const max = parseInt(filters.priceMax, 10);
      arr = arr.filter(p => p.price <= max);
    }
    if (filters.sort === "Price ↑") arr.sort((a,b) => a.price - b.price);
    else if (filters.sort === "Price ↓") arr.sort((a,b) => b.price - a.price);
    else if (filters.sort === "Area ↓") arr.sort((a,b) => b.area - a.area);
    return arr;
  }, [filters]);

  const banner = mode === "rent"
    ? { eyebrow: "For Rent", title: "Residences to lease.", kicker: "Furnished and unfurnished homes, vetted by Aureva. From month-long stays to multi-year residency." }
    : mode === "buy"
    ? { eyebrow: "For Sale", title: "Residences to acquire.", kicker: "Trophy homes, pre-construction, and pocket listings across our 38 markets." }
    : { eyebrow: "The Collection", title: "Every residence.", kicker: "Browse Aureva's full collection — for sale, for lease, and reserved." };

  return (
    <div className="page">
      <PageBanner {...banner} breadcrumb={`Home · ${banner.eyebrow}`} image={IMG.heroCity} />

      {/* Filter bar */}
      <section style={{ background: "#fff", borderBottom: "1px solid var(--line)", position: "sticky", top: 76, zIndex: 50 }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <button onClick={() => setFiltersOpen(!filtersOpen)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--charcoal)", letterSpacing: "0.06em" }}>
              <Icon.Filter /> Filters
            </button>
            <span style={{ fontSize: 13, color: "var(--slate)" }}>
              <strong style={{ color: "var(--navy)", fontWeight: 600 }}>{filtered.length}</strong> residences
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--slate)" }}>
              Sort
              <select
                value={filters.sort}
                onChange={e => setFilters({...filters, sort: e.target.value})}
                style={{ border: 0, background: "transparent", fontSize: 13, fontFamily: "inherit", color: "var(--navy)", cursor: "pointer", outline: 0 }}
              >
                {["Featured","Price ↑","Price ↓","Area ↓"].map(o => <option key={o}>{o}</option>)}
              </select>
            </label>
            <div style={{ display: "flex", border: "1px solid var(--line-strong)" }}>
              <button onClick={() => setView("grid")} style={{ padding: 10, color: view==="grid" ? "var(--navy)" : "var(--slate)", background: view==="grid" ? "var(--ivory)" : "transparent" }}><Icon.Grid /></button>
              <button onClick={() => setView("list")} style={{ padding: 10, color: view==="list" ? "var(--navy)" : "var(--slate)", background: view==="list" ? "var(--ivory)" : "transparent" }}><Icon.List /></button>
            </div>
          </div>
        </div>
        {filtersOpen && (
          <div style={{ background: "var(--ivory)", borderTop: "1px solid var(--line)" }}>
            <div className="container filter-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr) auto", gap: 0, padding: 0 }}>
              <FilterField label="Status">
                <select value={filters.intent} onChange={e => setFilters({...filters, intent: e.target.value})}>
                  <option value="all">Any</option>
                  <option value="buy">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </FilterField>
              <FilterField label="Property type">
                <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
                  {["Any","Villa","Penthouse","Apartment","Loft","Estate","Cottage","Beachfront","Duplex"].map(o => <option key={o}>{o}</option>)}
                </select>
              </FilterField>
              <FilterField label="Bedrooms">
                <select value={filters.beds} onChange={e => setFilters({...filters, beds: e.target.value})}>
                  {["Any","2","3","4","5","6"].map(o => <option key={o}>{o === "Any" ? o : `${o}+`}</option>)}
                </select>
              </FilterField>
              <FilterField label="Max price">
                <select value={filters.priceMax} onChange={e => setFilters({...filters, priceMax: e.target.value})}>
                  <option value="Any">Any</option>
                  <option value="3000000">Under $3M</option>
                  <option value="8000000">Under $8M</option>
                  <option value="15000000">Under $15M</option>
                  <option value="50000000">Under $50M</option>
                </select>
              </FilterField>
              <button
                onClick={() => setFilters({ type: "Any", beds: "Any", priceMax: "Any", intent: "all", sort: "Featured" })}
                style={{ padding: "0 30px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--slate)", borderLeft: "1px solid var(--line)" }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Results */}
      <section style={{ padding: "60px 0 120px" }}>
        <div className="container">
          {view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="grid-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 6) * 60}>
                  <PropertyCard p={p} onOpen={(id) => navigate("details", { id })} onFav={toggleFav} faved={favs.includes(p.id)} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gap: 20 }}>
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 6) * 50}>
                  <ListRow p={p} onOpen={(id) => navigate("details", { id })} onFav={toggleFav} faved={favs.includes(p.id)} />
                </Reveal>
              ))}
            </div>
          )}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 80, color: "var(--slate)" }}>
              <p className="serif" style={{ fontSize: 28, color: "var(--navy)" }}>No matches.</p>
              <p>Try widening the filters.</p>
            </div>
          )}
        </div>
        <style>{`
          @media (max-width: 1100px) { .grid-3 { grid-template-columns: 1fr 1fr !important; } .filter-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 700px)  { .grid-3 { grid-template-columns: 1fr !important; } .filter-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CTABand navigate={navigate} />
    </div>
  );
}

function FilterField({ label, children }) {
  return (
    <div style={{ padding: "16px 24px", borderRight: "1px solid var(--line)" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--slate)", marginBottom: 4, fontWeight: 500 }}>{label}</div>
      {React.cloneElement(children, {
        style: { border: 0, background: "transparent", fontSize: 14, fontFamily: "inherit", color: "var(--navy)", outline: 0, width: "100%", appearance: "none", cursor: "pointer" }
      })}
    </div>
  );
}

function ListRow({ p, onOpen, onFav, faved }) {
  return (
    <div className="card" onClick={() => onOpen(p.id)} style={{ display: "grid", gridTemplateColumns: "320px 1fr auto", cursor: "pointer", padding: 0 }}>
      <div className="img-zoom" style={{ aspectRatio: "4/3", position: "relative" }}>
        <div className="img-bg" style={{ backgroundImage: `url(${p.image})` }} />
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span className={`pill ${p.rent ? "pill-navy" : "pill-gold"}`}>{p.status}</span>
        </div>
      </div>
      <div style={{ padding: "26px 30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="loc" style={{ fontSize: 13, color: "var(--slate)", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon.Pin /> {p.location}
        </div>
        <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: "8px 0 12px", color: "var(--navy)", letterSpacing: "-0.01em" }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--slate)", margin: 0, maxWidth: 500 }}>{p.description}</p>
        <div className="spec-row" style={{ marginTop: 18 }}>
          <span><Icon.Bed /> {p.beds} Beds</span>
          <span className="spec-divider"></span>
          <span><Icon.Bath /> {p.baths} Baths</span>
          <span className="spec-divider"></span>
          <span><Icon.Area /> {p.area.toLocaleString()} ft²</span>
          <span className="spec-divider"></span>
          <span style={{ color: "var(--gold-deep)" }}>{p.type}</span>
        </div>
      </div>
      <div style={{ padding: "26px 30px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", borderLeft: "1px solid var(--line)", minWidth: 220 }}>
        <button onClick={(e)=>{e.stopPropagation(); onFav(p.id);}} style={{ color: faved ? "var(--gold)" : "var(--slate)", marginBottom: 14 }}>
          <Icon.Heart filled={faved} />
        </button>
        <div className="serif" style={{ fontSize: 28, color: "var(--gold-deep)", fontWeight: 500 }}>{formatPrice(p.price, p.rent)}</div>
        <button className="btn btn-outline-navy" style={{ marginTop: 18, padding: "10px 20px", fontSize: 11 }}>
          View details
        </button>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .card[style*="grid-template-columns: 320px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { PropertiesPage, FilterField, ListRow });
