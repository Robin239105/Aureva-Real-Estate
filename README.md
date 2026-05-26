# Aureva Estates

Boutique luxury real estate marketing site. React + Vite, hash-routed SPA, fully static.

## Stack

- React 18
- Vite 5
- Plain CSS (no framework)
- Static images via Unsplash CDN

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve dist/ locally
```

## Project structure

```
index.html              entry HTML with SEO/CSP meta
src/
  main.jsx              bootstrap: globals → modules → render
  _globals.js           attaches React/ReactDOM to window
  styles.css            all CSS (design tokens + components)
  ErrorBoundary.jsx     top-level error UI
data.jsx                static data (properties, agents, blog posts)
components.jsx          shared UI (Header, Footer, PropertyCard, etc.)
app.jsx                 hash router + App shell
screens/*.jsx           one file per page
public/                 static files served at root (robots.txt)
vercel.json             SPA rewrites + security/cache headers
```

Legacy global pattern: each `.jsx` reads its deps from `window` and writes its exports back to `window`. Module load order in `src/main.jsx` is the dependency order.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the repo in the Vercel dashboard.
3. Framework preset auto-detects as **Vite**. No env vars required.
4. Deploy.

`vercel.json` handles SPA rewrites, immutable asset caching, and security headers (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).

## Security

- CSP meta with allowlists for Unsplash images + Google Fonts.
- No inline scripts beyond a hashed JSON-LD block.
- All forms are client-only — wire to a backend before launch.
- Run `npm audit` periodically.

## License

Proprietary.
