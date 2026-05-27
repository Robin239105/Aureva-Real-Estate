import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function Settings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="eyebrow mb-3">Configuration</div>
        <h1 className="text-3xl font-serif text-navy tracking-tight">Settings</h1>
        <p className="text-slate mt-1 text-sm">Environment status for this deployment.</p>
      </div>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Environment</CardTitle>
          <CardDescription>
            Set these in Vercel Project Settings → Environment Variables.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <Env
            name="VITE_CLERK_PUBLISHABLE_KEY"
            present={!!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
          />
          <Env name="CLERK_SECRET_KEY" note="Server-only. Cannot be checked from the client." />
          <Env name="DATABASE_URL" note="Server-only. Cannot be checked from the client." />
        </CardContent>
      </Card>
    </div>
  );
}

function Env({ name, present, note }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-0">
      <code className="font-mono text-xs text-navy">{name}</code>
      {present === true ? (
        <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-sm">
          Set
        </span>
      ) : present === false ? (
        <span className="text-[10px] uppercase tracking-[0.18em] text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-sm">
          Missing
        </span>
      ) : (
        <span className="text-[10px] text-slate">{note}</span>
      )}
    </div>
  );
}
