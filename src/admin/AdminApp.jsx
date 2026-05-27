import { useEffect, useState } from 'react';
import { SignIn, SignedIn, SignedOut, useAuth, useUser, UserButton } from '@clerk/clerk-react';
import { Shell } from './Shell.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Properties } from './pages/Properties.jsx';
import { Agents } from './pages/Agents.jsx';
import { Posts } from './pages/Posts.jsx';
import { Inquiries } from './pages/Inquiries.jsx';
import { Settings } from './pages/Settings.jsx';

const ROUTES = {
  '/admin': 'dashboard',
  '/admin/properties': 'properties',
  '/admin/agents': 'agents',
  '/admin/posts': 'posts',
  '/admin/inquiries': 'inquiries',
  '/admin/settings': 'settings',
};

function useAdminRoute() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/admin');
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname.replace(/\/$/, '') || '/admin');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = (next) => {
    const clean = next.replace(/\/$/, '') || '/admin';
    if (clean !== window.location.pathname.replace(/\/$/, '')) {
      window.history.pushState(null, '', clean);
    }
    setPath(clean);
  };
  return [path, navigate];
}

export default function AdminApp() {
  return (
    <>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
      <SignedIn>
        <AdminAuthed />
      </SignedIn>
    </>
  );
}

function SignInScreen() {
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
          <SignIn
            routing="hash"
            signUpUrl="/admin#sign-up"
            afterSignInUrl="/admin"
            afterSignUpUrl="/admin"
          />
        </div>
      </div>
    </div>
  );
}

function AdminAuthed() {
  const [path, navigate] = useAdminRoute();
  const route = ROUTES[path] || 'dashboard';
  const { getToken } = useAuth();
  const { user } = useUser();

  // Expose the token-fetcher globally so simple fetch helpers can call it.
  useEffect(() => {
    window.__getAdminToken = () => getToken();
    return () => {
      delete window.__getAdminToken;
    };
  }, [getToken]);

  const PageComp =
    {
      dashboard: Dashboard,
      properties: Properties,
      agents: Agents,
      posts: Posts,
      inquiries: Inquiries,
      settings: Settings,
    }[route] || Dashboard;

  return (
    <Shell
      route={route}
      navigate={navigate}
      user={user}
      userButton={<UserButton afterSignOutUrl="/admin" />}
    >
      <PageComp navigate={navigate} />
    </Shell>
  );
}
