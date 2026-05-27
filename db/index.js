import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn('[db] DATABASE_URL is not set — API routes will fail until it is configured');
}

const sql = url ? neon(url) : null;
export const db = sql ? drizzle(sql, { schema }) : null;
export { schema };
