// ============== App Router (history API, clean URLs) ==============
const React = window.React;
const { useState, useEffect } = React;
const {
  Header, Footer, CookieBanner,
  HomePage, PropertiesPage, BuyPage, RentPage, SellPage, DetailsPage,
  AgentsPage, AgentProfilePage, AboutPage, BlogPage, BlogDetailsPage, ContactPage,
  PrivacyPage, TermsPage, AccessibilityPage, CookiesPage,
} = window;

// ---------- Route table ----------
// Each entry: [routeName, pathRegex, paramsFromMatch]
const ROUTE_TABLE = [
  ["home",          /^\/?$/,                       () => ({})],
  ["properties",    /^\/properties\/?$/,           () => ({})],
  ["details",       /^\/properties\/([^/]+)\/?$/,  (m) => ({ id: window.PROPERTIES.find(p => p.slug === m[1])?.id, slug: m[1] })],
  ["buy",           /^\/buy\/?$/,                  () => ({})],
  ["rent",          /^\/rent\/?$/,                 () => ({})],
  ["sell",          /^\/sell\/?$/,                 () => ({})],
  ["agents",        /^\/agents\/?$/,               () => ({})],
  ["agent",         /^\/agents\/([^/]+)\/?$/,      (m) => ({ id: window.AGENTS.find(a => a.slug === m[1])?.id, slug: m[1] })],
  ["about",         /^\/about\/?$/,                () => ({})],
  ["blog",          /^\/journal\/?$/,              () => ({})],
  ["blog-details",  /^\/journal\/([^/]+)\/?$/,     (m) => ({ id: window.BLOG_POSTS.find(b => b.slug === m[1])?.id, slug: m[1] })],
  ["contact",       /^\/contact\/?$/,              () => ({})],
  ["privacy",       /^\/privacy\/?$/,              () => ({})],
  ["terms",         /^\/terms\/?$/,                () => ({})],
  ["accessibility", /^\/accessibility\/?$/,        () => ({})],
  ["cookies",       /^\/cookies\/?$/,              () => ({})],
];

const buildPath = (name, params = {}) => {
  const find = (col, id) => window[col]?.find(x => x.id === id);
  switch (name) {
    case "home":         return "/";
    case "properties":   return "/properties";
    case "details": {
      const p = find("PROPERTIES", params.id);
      return p ? `/properties/${p.slug}` : "/properties";
    }
    case "buy":          return "/buy";
    case "rent":         return "/rent";
    case "sell":         return "/sell";
    case "agents":       return "/agents";
    case "agent": {
      const a = find("AGENTS", params.id);
      return a ? `/agents/${a.slug}` : "/agents";
    }
    case "about":        return "/about";
    case "blog":         return "/journal";
    case "blog-details": {
      const b = find("BLOG_POSTS", params.id);
      return b ? `/journal/${b.slug}` : "/journal";
    }
    case "contact":       return "/contact";
    case "privacy":       return "/privacy";
    case "terms":         return "/terms";
    case "accessibility": return "/accessibility";
    case "cookies":       return "/cookies";
    default:              return "/" + name;
  }
};

const parsePath = (path) => {
  // Strip query/hash, ensure leading slash
  const clean = ("/" + (path || "").replace(/^\/+|[?#].*$/g, "")).replace(/\/{2,}/g, "/");
  for (const [name, re, getParams] of ROUTE_TABLE) {
    const m = clean.match(re);
    if (m) return { name, params: getParams(m) };
  }
  return { name: "notfound", params: {} };
};

// One-time migration: if user landed on a legacy "#home" or "#details/p01" URL,
// rewrite to the matching clean path before mounting state.
const migrateHash = () => {
  const h = window.location.hash;
  if (!h || h === "#") return;
  const raw = h.slice(1); // drop "#"
  const [name, ...rest] = raw.split("/");
  const params = {};
  if (rest[0]) params.id = rest[0];
  const newPath = buildPath(name, params);
  window.history.replaceState(null, "", newPath);
};

function App() {
  const [route, setRoute] = useState(() => {
    migrateHash();
    return parsePath(window.location.pathname);
  });

  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aureva_favs") || "[]"); } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem("aureva_favs", JSON.stringify(favs));
  }, [favs]);

  useEffect(() => {
    const onPop = () => {
      setRoute(parsePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (name, params = {}) => {
    const path = buildPath(name, params);
    if (path !== window.location.pathname) {
      window.history.pushState(null, "", path);
    }
    setRoute({ name, params });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const toggleFav = (id) => {
    setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const transparentTop = route.name === "home";

  const renderPage = () => {
    const common = { navigate, favs, toggleFav };
    switch (route.name) {
      case "home":          return <HomePage {...common} />;
      case "properties":    return <PropertiesPage {...common} />;
      case "buy":           return <BuyPage {...common} />;
      case "rent":          return <RentPage {...common} />;
      case "sell":          return <SellPage {...common} />;
      case "details":       return <DetailsPage {...common} propertyId={route.params.id || "p01"} />;
      case "agents":        return <AgentsPage {...common} />;
      case "agent":         return <AgentProfilePage {...common} agentId={route.params.id || "a1"} />;
      case "about":         return <AboutPage {...common} />;
      case "blog":          return <BlogPage {...common} />;
      case "blog-details":  return <BlogDetailsPage {...common} postId={route.params.id || "b1"} />;
      case "contact":       return <ContactPage {...common} />;
      case "privacy":       return <PrivacyPage {...common} />;
      case "terms":         return <TermsPage {...common} />;
      case "accessibility": return <AccessibilityPage {...common} />;
      case "cookies":       return <CookiesPage {...common} />;
      default:              return (
        <div className="page" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px" }}>
          <div style={{ maxWidth: 540 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>404</div>
            <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 400, margin: 0, letterSpacing: "-0.02em" }}>Page not found</h1>
            <p style={{ color: "var(--slate)", marginTop: 16, lineHeight: 1.7 }}>The page you were looking for has moved or no longer exists.</p>
            <button className="btn btn-navy" style={{ marginTop: 28 }} onClick={() => navigate("home")}>Return home <span className="arrow"></span></button>
          </div>
        </div>
      );
    }
  };

  // For header active state: collapse sub-routes
  const headerRoute =
    route.name === "details" ? "properties" :
    route.name === "agent" ? "agents" :
    route.name === "blog-details" ? "blog" :
    route.name;

  return (
    <div>
      <Header route={headerRoute} navigate={navigate} transparentOnTop={transparentTop} />
      <main key={route.name + (route.params.id || route.params.slug || "")}>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      <CookieBanner navigate={navigate} />
    </div>
  );
}

Object.assign(window, { App });
