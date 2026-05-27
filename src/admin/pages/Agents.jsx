import { useEffect, useState } from 'react';
import { Loader2, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { apiGet } from '../api.js';

export function Agents() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiGet('/api/agents')
      .then(setRows)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-3">Team</div>
        <h1 className="text-3xl font-serif text-navy tracking-tight">Advisors</h1>
        <p className="text-slate mt-1 text-sm">{rows.length} advisors representing the house.</p>
      </div>
      {loading ? (
        <div className="text-slate text-sm flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : rows.length === 0 ? (
        <Card className="bg-white">
          <CardContent className="p-16 text-center">
            <Users className="w-10 h-10 mx-auto text-slate-light" strokeWidth={1.3} />
            <p className="mt-4 text-slate text-sm">No advisors yet. Seed the DB first.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((a) => (
            <Card key={a.id} className="bg-white overflow-hidden hover:gold-glow transition-shadow">
              <div
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: a.image
                    ? `url(${a.image})`
                    : 'linear-gradient(135deg, #1E293B, #0B1220)',
                }}
              />
              <CardContent className="p-5">
                <h3 className="font-serif text-lg text-navy">{a.name}</h3>
                <p className="text-xs text-slate mt-1">{a.title}</p>
                <div className="flex justify-between mt-4 pt-3 border-t border-border text-xs text-slate">
                  <span>{a.listings} listings</span>
                  <span className="text-gold-deep">★ {(a.rating / 10).toFixed(1)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
