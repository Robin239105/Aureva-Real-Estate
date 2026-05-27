import { db, schema } from '../db/index.js';
import { desc, eq } from 'drizzle-orm';
import { requireUser, sendError, httpError } from './_lib/auth.js';

const SOURCES = new Set(['contact', 'sell', 'viewing', 'newsletter']);

export default async function handler(req, res) {
  try {
    if (!db) throw httpError(503, 'Database is not configured');

    if (req.method === 'POST') {
      // Public — accept inquiry from forms
      const body = await readBody(req);
      const source = String(body.source || 'contact');
      if (!SOURCES.has(source)) throw httpError(400, 'Invalid source');

      const email = String(body.email || '')
        .trim()
        .slice(0, 200);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw httpError(400, 'Valid email required');
      }

      const row = {
        source,
        name: trunc(body.name, 160),
        email,
        phone: trunc(body.phone, 40),
        intent: trunc(body.intent, 80),
        message: trunc(body.message, 5000),
        propertyId: body.propertyId ? Number(body.propertyId) || null : null,
        meta: body.meta && typeof body.meta === 'object' ? body.meta : {},
      };

      const [created] = await db
        .insert(schema.inquiries)
        .values(row)
        .returning({ id: schema.inquiries.id });
      return res.status(201).json({ id: created.id });
    }

    if (req.method === 'GET') {
      // Admin only
      await requireUser(req);
      const rows = await db
        .select()
        .from(schema.inquiries)
        .orderBy(desc(schema.inquiries.createdAt))
        .limit(200);
      return res.status(200).json(rows);
    }

    if (req.method === 'PATCH') {
      await requireUser(req);
      const body = await readBody(req);
      const id = Number(body.id);
      const status = String(body.status || '');
      if (!id || !['new', 'in_review', 'closed'].includes(status)) {
        throw httpError(400, 'id + status required');
      }
      await db.update(schema.inquiries).set({ status }).where(eq(schema.inquiries.id, id));
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    sendError(res, e);
  }
}

function trunc(v, n) {
  if (v == null) return null;
  return String(v).slice(0, n);
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}
