import { db } from '../../db/index.js';
import { desc } from 'drizzle-orm';
import { sendError, httpError, requireUser } from './auth.js';

export function makeListHandler(table, { requireAuth = false, orderBy } = {}) {
  return async function handler(req, res) {
    try {
      if (!db) throw httpError(503, 'Database is not configured');
      if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
      }
      if (requireAuth) await requireUser(req);
      const rows = await db
        .select()
        .from(table)
        .orderBy(orderBy || desc(table.createdAt))
        .limit(500);
      return res.status(200).json(rows);
    } catch (e) {
      sendError(res, e);
    }
  };
}
