import { useEffect, useState } from 'react';
import { Loader2, Plus, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { apiGet } from '../api.js';

export function Properties() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiGet('/api/properties')
      .then(setRows)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="eyebrow mb-3">Listings</div>
          <h1 className="text-3xl font-serif text-navy tracking-tight">Properties</h1>
          <p className="text-slate mt-1 text-sm">{rows.length} residences in the catalog.</p>
        </div>
        <Button disabled>
          <Plus className="w-3.5 h-3.5" /> New listing (coming)
        </Button>
      </div>
      <Card className="bg-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-slate text-sm">
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> Loading…
            </div>
          ) : rows.length === 0 ? (
            <div className="p-16 text-center">
              <Building2 className="w-10 h-10 mx-auto text-slate-light" strokeWidth={1.3} />
              <p className="mt-4 text-slate text-sm">
                No properties in the database yet. Run{' '}
                <code className="font-mono text-xs">npm run db:seed</code> to import the demo data.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="font-medium text-navy">{r.title}</div>
                      <div className="text-xs text-slate">{r.slug}</div>
                    </TableCell>
                    <TableCell className="text-slate text-sm">{r.location}</TableCell>
                    <TableCell>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-gold-deep border border-gold/40 px-2 py-1 rounded-sm">
                        {r.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6 font-serif text-navy">
                      ${r.price.toLocaleString()}
                      {r.rent ? '/mo' : ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
