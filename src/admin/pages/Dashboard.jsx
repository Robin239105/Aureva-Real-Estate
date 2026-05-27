import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Inbox, Building2, Users, FileText, TrendingUp, Loader2 } from 'lucide-react';
import { apiGet } from '../api.js';

const STATS = [
  { id: 'inquiries', label: 'New inquiries', icon: Inbox, accent: 'text-gold-deep' },
  { id: 'properties', label: 'Listings', icon: Building2, accent: 'text-navy' },
  { id: 'agents', label: 'Advisors', icon: Users, accent: 'text-navy' },
  { id: 'posts', label: 'Journal', icon: FileText, accent: 'text-navy' },
];

export function Dashboard({ navigate }) {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const [inq, props, agents, posts] = await Promise.allSettled([
          apiGet('/api/inquiries'),
          apiGet('/api/properties'),
          apiGet('/api/agents'),
          apiGet('/api/posts'),
        ]);
        if (!live) return;
        const get = (r) => (r.status === 'fulfilled' && Array.isArray(r.value) ? r.value : []);
        const inqRows = get(inq);
        setCounts({
          inquiries: inqRows.filter((x) => x.status === 'new').length,
          properties: get(props).length,
          agents: get(agents).length,
          posts: get(posts).length,
        });
        setRecent(inqRows.slice(0, 5));
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero header */}
      <div className="flex items-start justify-between flex-wrap gap-6">
        <div>
          <div className="eyebrow mb-3">Overview</div>
          <h1 className="text-4xl font-serif text-navy tracking-tight">Good {timeOfDay()}.</h1>
          <p className="text-slate mt-2 max-w-md">
            A snapshot of the residences, advisors, and conversations passing through Aureva today.
          </p>
        </div>
        <span className="gold-rule mt-6" />
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.id} className="bg-white hover:gold-glow transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-slate font-medium">
                      {s.label}
                    </div>
                    <div className="font-serif text-4xl font-medium text-navy mt-3 leading-none tabular-nums">
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate" />
                      ) : (
                        (counts[s.id] ?? '—')
                      )}
                    </div>
                  </div>
                  <div className={'p-2 rounded-sm bg-ivory ' + s.accent}>
                    <Icon className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white">
          <CardHeader>
            <CardTitle>Recent inquiries</CardTitle>
            <CardDescription>The latest conversations to land in your inbox.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-slate text-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
              </div>
            ) : recent.length === 0 ? (
              <EmptyState text="No inquiries yet. Form submissions will appear here in real time." />
            ) : (
              <ul className="divide-y divide-border">
                {recent.map((r) => (
                  <li key={r.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-navy truncate">
                        {r.name || r.email}
                      </div>
                      <div className="text-xs text-slate truncate">
                        {r.intent || r.source} · {r.email}
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate font-mono shrink-0">
                      {timeAgo(r.createdAt)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="bg-navy text-ivory border-gold/30">
          <CardHeader>
            <div className="eyebrow text-gold">Setup checklist</div>
            <CardTitle className="text-ivory">Ship the admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-ivory/80">
            <Check label="Vercel project linked" />
            <Check label="Neon database provisioned (DATABASE_URL)" />
            <Check label="Clerk keys set (CLERK_*)" />
            <Check label="Run `npm run db:push` then `npm run db:seed`" />
            <button
              onClick={() => navigate('/admin/inquiries')}
              className="mt-2 inline-flex items-center gap-2 text-gold hover:underline text-[12px] uppercase tracking-[0.18em]"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Open inquiries
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="border border-dashed border-border rounded-sm p-8 text-center text-slate text-sm">
      {text}
    </div>
  );
}

function Check({ label }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
      <span>{label}</span>
    </div>
  );
}

function timeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}
function timeAgo(d) {
  if (!d) return '';
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
