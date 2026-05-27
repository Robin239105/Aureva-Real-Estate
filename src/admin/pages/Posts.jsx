import { useEffect, useState } from 'react';
import { Loader2, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { apiGet } from '../api.js';

export function Posts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiGet('/api/posts')
      .then(setRows)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-3">Editorial</div>
        <h1 className="text-3xl font-serif text-navy tracking-tight">Journal</h1>
        <p className="text-slate mt-1 text-sm">{rows.length} posts published.</p>
      </div>
      {loading ? (
        <div className="text-slate text-sm flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : rows.length === 0 ? (
        <Card className="bg-white">
          <CardContent className="p-16 text-center">
            <FileText className="w-10 h-10 mx-auto text-slate-light" strokeWidth={1.3} />
            <p className="mt-4 text-slate text-sm">No posts in the database yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map((p) => (
            <Card key={p.id} className="bg-white overflow-hidden flex flex-row">
              {p.image && (
                <div
                  className="w-40 h-40 bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
              )}
              <CardContent className="p-5 flex-1">
                <div className="text-[10px] uppercase tracking-[0.18em] text-gold-deep">
                  {p.category}
                </div>
                <h3 className="font-serif text-lg text-navy mt-1 leading-snug">{p.title}</h3>
                <p className="text-xs text-slate mt-2 line-clamp-2">{p.excerpt}</p>
                <div className="mt-3 text-[11px] text-slate flex gap-3">
                  <span>{p.author}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
