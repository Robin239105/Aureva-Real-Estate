import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Inbox,
  Settings as SettingsIcon,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'properties', label: 'Properties', icon: Building2, path: '/admin/properties' },
  { id: 'agents', label: 'Agents', icon: Users, path: '/admin/agents' },
  { id: 'posts', label: 'Journal', icon: FileText, path: '/admin/posts' },
  { id: 'inquiries', label: 'Inquiries', icon: Inbox, path: '/admin/inquiries' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/admin/settings' },
];

export function Shell({ route, navigate, user, userButton, children }) {
  return (
    <div className="min-h-screen flex bg-ivory">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-navy text-ivory flex flex-col">
        <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
          <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
            <path
              d="M3 31 L18 5 L33 31 M10 31 L18 17 L26 31 M3 31 L33 31"
              stroke="#C9A45C"
              strokeWidth="1.4"
            />
            <circle cx="18" cy="5" r="1.5" fill="#C9A45C" />
          </svg>
          <div>
            <div className="font-serif text-lg tracking-[0.1em] uppercase leading-none">Aureva</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-gold mt-1">Admin</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = route === n.id;
            return (
              <button
                key={n.id}
                onClick={() => navigate(n.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-[13px] transition-colors',
                  active
                    ? 'bg-white/5 text-gold border-l-2 border-gold pl-[10px]'
                    : 'text-ivory/70 hover:bg-white/5 hover:text-ivory'
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={1.6} />
                {n.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-ivory/50 hover:text-gold transition-colors"
          >
            View public site <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-border bg-white/60 backdrop-blur-md flex items-center justify-between px-8">
          <div>
            <div className="eyebrow">{NAV.find((n) => n.id === route)?.label || 'Admin'}</div>
            <div className="text-[11px] text-slate font-mono mt-0.5">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right hidden sm:block">
                <div className="text-[13px] font-medium text-navy leading-none">
                  {user.fullName || user.primaryEmailAddress?.emailAddress}
                </div>
                <div className="text-[11px] text-slate mt-0.5">Administrator</div>
              </div>
            )}
            {userButton}
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
