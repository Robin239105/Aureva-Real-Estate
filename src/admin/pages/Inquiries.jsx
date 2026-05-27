import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Inbox } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { apiGet, apiSend } from '../api.js';

const STATUS = [
  { id: 'new', label: 'New' },
  { id: 'in_review', label: 'In review' },
  { id: 'closed', label: 'Closed' },
];

const SOURCE_LABEL = {
  contact: 'Contact form',
  sell: 'Sell request',
  viewing: 'Viewing',
  newsletter: 'Newsletter',
};

export function Inquiries() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet('/api/inquiries');
      setRows(data);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = filter === 'all' ? rows : rows.filter((r) => r.status === filter);

  const setStatus = async (id, status) => {
    try {
      await apiSend('/api/inquiries', 'PATCH', { id, status });
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
      toast.success(`Marked ${STATUS.find((s) => s.id === status)?.label.toLowerCase()}`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="eyebrow mb-3">Inbox</div>
          <h1 className="text-3xl font-serif text-navy tracking-tight">Inquiries</h1>
          <p className="text-slate mt-1 text-sm">
            Submissions from contact, viewing, sell, and newsletter forms.
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-sm border border-border bg-white">
          {['all', ...STATUS.map((s) => s.id)].map((id) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={cn(
                'px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors rounded-sm',
                filter === id ? 'bg-navy text-ivory' : 'text-slate hover:text-navy'
              )}
            >
              {id === 'all' ? 'All' : STATUS.find((s) => s.id === id).label}
            </button>
          ))}
        </div>
      </div>

      <Card className="bg-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 flex items-center justify-center text-slate text-sm">
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading inquiries…
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <Inbox className="w-10 h-10 mx-auto text-slate-light" strokeWidth={1.3} />
              <p className="mt-4 text-slate text-sm">
                No inquiries
                {filter !== 'all' ? ` in “${STATUS.find((s) => s.id === filter)?.label}”` : ''} yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Intent</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} onClick={() => setActive(r)} className="cursor-pointer">
                    <TableCell>
                      <div className="font-medium text-navy">{r.name || '—'}</div>
                      <div className="text-xs text-slate">{r.email}</div>
                    </TableCell>
                    <TableCell className="text-slate text-xs uppercase tracking-[0.16em]">
                      {SOURCE_LABEL[r.source] || r.source}
                    </TableCell>
                    <TableCell className="text-foreground">{r.intent || '—'}</TableCell>
                    <TableCell className="text-slate text-xs font-mono">
                      {formatDate(r.createdAt)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        size="sm"
                        variant={r.status === 'closed' ? 'outline' : 'navy'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatus(r.id, r.status === 'closed' ? 'new' : 'closed');
                        }}
                      >
                        {r.status === 'closed' ? 'Reopen' : 'Close'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {active && (
        <DetailDrawer inquiry={active} onClose={() => setActive(null)} onStatusChange={setStatus} />
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    new: 'bg-gold/15 text-gold-deep border-gold/40',
    in_review: 'bg-navy/5 text-navy border-navy/20',
    closed: 'bg-slate/10 text-slate border-slate/20',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] font-medium border rounded-sm',
        map[status] || map.new
      )}
    >
      {STATUS.find((s) => s.id === status)?.label || status}
    </span>
  );
}

function DetailDrawer({ inquiry, onClose, onStatusChange }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-navy/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-border flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">{SOURCE_LABEL[inquiry.source]}</div>
            <h2 className="font-serif text-2xl text-navy">{inquiry.name || inquiry.email}</h2>
            <div className="text-sm text-slate mt-1">{inquiry.email}</div>
            {inquiry.phone && <div className="text-sm text-slate">{inquiry.phone}</div>}
          </div>
          <button onClick={onClose} className="text-slate hover:text-navy text-xl leading-none">
            ×
          </button>
        </div>
        <div className="p-6 space-y-5 overflow-auto">
          <Field label="Intent" value={inquiry.intent} />
          <Field label="Received" value={formatDate(inquiry.createdAt)} />
          <Field label="Status">
            <div className="flex gap-2 mt-2">
              {STATUS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onStatusChange(inquiry.id, s.id)}
                  className={cn(
                    'px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] border rounded-sm',
                    inquiry.status === s.id
                      ? 'bg-navy text-ivory border-navy'
                      : 'bg-white text-slate border-border hover:border-navy'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Field>
          {inquiry.message && (
            <Field label="Message">
              <div className="mt-2 p-4 bg-ivory-warm/40 border border-border rounded-sm text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {inquiry.message}
              </div>
            </Field>
          )}
          <div className="pt-2">
            <a
              href={`mailto:${inquiry.email}?subject=Re%3A%20Your%20Aureva%20inquiry`}
              className="inline-flex items-center gap-2 text-gold-deep hover:text-gold text-sm"
            >
              Reply via email →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, children }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-slate font-medium">{label}</div>
      {children || <div className="mt-1 text-sm text-foreground">{value || '—'}</div>}
    </div>
  );
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
