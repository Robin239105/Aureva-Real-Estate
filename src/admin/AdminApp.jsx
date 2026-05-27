import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router';
import { SignIn, SignUp, Show, useAuth, useUser, UserButton } from '@clerk/react';
import { Shell } from './Shell.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Properties } from './pages/Properties.jsx';
import { Agents } from './pages/Agents.jsx';
import { Posts } from './pages/Posts.jsx';
import { Inquiries } from './pages/Inquiries.jsx';
import { Settings } from './pages/Settings.jsx';

export default function AdminApp() {
  return (
    <>
      <Show when="signed-out">
        <SignedOutRoutes />
      </Show>
      <Show when="signed-in">
        <SignedInRoutes />
      </Show>
    </>
  );
}

function SignedOutRoutes() {
  return (
    <Routes>
      <Route path="/sign-in/*" element={<SignInScreen mode="sign-in" />} />
      <Route path="/sign-up/*" element={<SignInScreen mode="sign-up" />} />
      <Route path="*" element={<SignInScreen mode="sign-in" />} />
    </Routes>
  );
}

function SignedInRoutes() {
  return (
    <AuthedShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sign-in/*" element={<Navigate to="/" replace />} />
        <Route path="/sign-up/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthedShell>
  );
}

function AuthedShell({ children }) {
  const { getToken } = useAuth();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Expose token-fetcher globally for the simple fetch wrapper.
  useEffect(() => {
    window.__getAdminToken = () => getToken();
    return () => {
      delete window.__getAdminToken;
    };
  }, [getToken]);

  const route =
    {
      '/': 'dashboard',
      '/properties': 'properties',
      '/agents': 'agents',
      '/posts': 'posts',
      '/inquiries': 'inquiries',
      '/settings': 'settings',
    }[location.pathname] || 'dashboard';

  return (
    <Shell
      route={route}
      navigate={(path) => navigate(stripBasename(path))}
      user={user}
      userButton={<UserButton afterSignOutUrl="/admin" />}
    >
      {children}
    </Shell>
  );
}

// Sidebar uses absolute paths like "/admin/properties". BrowserRouter has
// basename="/admin", so we strip it before navigate().
function stripBasename(p) {
  if (p.startsWith('/admin/')) return p.slice(6);
  if (p === '/admin') return '/';
  return p;
}

function SignInScreen({ mode }) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-navy text-ivory">
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/80 to-navy/40" />
        <div className="relative z-10 flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <path
              d="M3 31 L18 5 L33 31 M10 31 L18 17 L26 31 M3 31 L33 31"
              stroke="#C9A45C"
              strokeWidth="1.4"
            />
            <circle cx="18" cy="5" r="1.5" fill="#C9A45C" />
          </svg>
          <span className="font-serif text-xl tracking-[0.1em] uppercase">Aureva</span>
        </div>
        <div className="relative z-10 max-w-md">
          <div className="eyebrow text-gold mb-4">Admin Console</div>
          <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tight">
            A quiet desk
            <br />
            <em className="text-gold not-italic font-normal">for considered work.</em>
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ivory/70 max-w-sm">
            Sign in to manage residences, advisors, and the Aureva Journal.
          </p>
        </div>
        <div className="relative z-10 text-[11px] uppercase tracking-[0.22em] text-ivory/40">
          © 2026 Aureva Estates
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12 bg-ivory text-foreground">
        <div className="w-full max-w-md">
          {mode === 'sign-up' ? (
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/"
            />
          ) : (
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/"
            />
          )}
        </div>
      </div>
    </div>
  );
}
