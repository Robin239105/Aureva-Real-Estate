// ============== App Router ==============
const React = window.React;
const { useState, useEffect } = React;
const {
  Header, Footer, CookieBanner,
  HomePage, PropertiesPage, BuyPage, RentPage, SellPage, DetailsPage,
  AgentsPage, AgentProfilePage, AboutPage, BlogPage, BlogDetailsPage, ContactPage,
  PrivacyPage, TermsPage, AccessibilityPage, CookiesPage,
} = window;

function App() {
  const [route, setRoute] = useState({ name: "home", params: {} });
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("aureva_favs") || "[]"); } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem("aureva_favs", JSON.stringify(favs));
  }, [favs]);

  // Read initial route from URL hash
  useEffect(() => {
    const readHash = () => {
      const h = (window.location.hash || "#home").slice(1);
      const [name, ...rest] = h.split("/");
      const params = {};
      if (rest.length > 0) {
        if (name === "details" || name === "properties") params.id = rest[0];
        if (name === "agent") params.id = rest[0];
        if (name === "blog-details") params.id = rest[0];
      }
      setRoute({ name: name || "home", params });
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  const navigate = (name, params = {}) => {
    let hash = name;
    if (params.id) hash += "/" + params.id;
    window.location.hash = hash;
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
      case "home":         return <HomePage {...common} />;
      case "properties":   return <PropertiesPage {...common} />;
      case "buy":          return <BuyPage {...common} />;
      case "rent":         return <RentPage {...common} />;
      case "sell":         return <SellPage {...common} />;
      case "details":      return <DetailsPage {...common} propertyId={route.params.id || "p01"} />;
      case "agents":       return <AgentsPage {...common} />;
      case "agent":        return <AgentProfilePage {...common} agentId={route.params.id || "a1"} />;
      case "about":        return <AboutPage {...common} />;
      case "blog":         return <BlogPage {...common} />;
      case "blog-details": return <BlogDetailsPage {...common} postId={route.params.id || "b1"} />;
      case "contact":      return <ContactPage {...common} />;
      case "privacy":      return <PrivacyPage {...common} />;
      case "terms":        return <TermsPage {...common} />;
      case "accessibility": return <AccessibilityPage {...common} />;
      case "cookies":      return <CookiesPage {...common} />;
      default:             return (
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
      <main key={route.name + (route.params.id || "")}>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      <CookieBanner navigate={navigate} />
    </div>
  );
}

Object.assign(window, { App });
