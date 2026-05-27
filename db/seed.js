// Seed Neon DB from the legacy hardcoded data in data.jsx.
// Usage: DATABASE_URL=postgres://... node db/seed.js
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Set DATABASE_URL first.');
    process.exit(1);
  }
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  // Extract the data arrays by importing the legacy file via a regex; we can't
  // execute data.jsx directly because it uses window.*. Read it as text.
  const src = readFileSync(resolve(__dirname, '../data.jsx'), 'utf8');
  // Extract IMG object first so subsequent arrays referencing it get real URLs
  const imgMatch = src.match(/const IMG = (\{[\s\S]*?\n\};)/);
  if (!imgMatch) throw new Error('IMG block not found');
  // eslint-disable-next-line no-new-func
  const IMG = new Function('return ' + imgMatch[1].replace(/;$/, ''))();

  const grab = (name) => {
    const re = new RegExp('const ' + name + ' = (\\[[\\s\\S]*?\\n\\];)');
    const m = src.match(re);
    if (!m) throw new Error('Could not find ' + name);
    // eslint-disable-next-line no-new-func
    return new Function('IMG', 'return ' + m[1].replace(/;$/, ''))(IMG);
  };
  const agentsData = grab('AGENTS');
  const propsData = grab('PROPERTIES');
  const postsData = grab('BLOG_POSTS');

  console.log(
    `Seeding ${agentsData.length} agents, ${propsData.length} properties, ${postsData.length} posts.`
  );

  // Insert agents (capture id mapping)
  const agentIdByLegacy = {};
  for (const a of agentsData) {
    const [row] = await db
      .insert(schema.agents)
      .values({
        slug: slugify(a.name),
        name: a.name,
        title: a.title,
        image: typeof a.image === 'string' ? a.image : null,
        bio: a.bio,
        phone: a.phone,
        email: a.email,
        langs: a.langs || [],
        listings: a.listings || 0,
        sold: a.sold || 0,
        rating: Math.round((a.rating || 0) * 10),
      })
      .onConflictDoNothing()
      .returning({ id: schema.agents.id, slug: schema.agents.slug });
    if (row) agentIdByLegacy[a.id] = row.id;
  }

  for (const p of propsData) {
    await db
      .insert(schema.properties)
      .values({
        slug: slugify(p.title),
        title: p.title,
        price: p.price,
        rent: !!p.rent,
        location: p.location,
        type: p.type,
        status: p.status === 'For Rent' ? 'For Rent' : 'For Sale',
        beds: p.beds,
        baths: p.baths,
        area: p.area,
        lotSize: Math.round((p.lotSize || 0) * 100),
        image: typeof p.image === 'string' ? p.image : null,
        gallery: (p.gallery || []).filter((x) => typeof x === 'string'),
        description: p.description,
        amenities: p.amenities || [],
        yearBuilt: p.yearBuilt,
        agentId: agentIdByLegacy[p.agentId] || null,
        tag: p.tag || null,
        lat: p.lat || null,
        lng: p.lng || null,
        featured: p.tag === 'Featured',
      })
      .onConflictDoNothing();
  }

  for (const b of postsData) {
    await db
      .insert(schema.posts)
      .values({
        slug: slugify(b.title),
        title: b.title,
        excerpt: b.excerpt,
        body: b.excerpt,
        category: b.category,
        read: b.read,
        image: typeof b.image === 'string' ? b.image : null,
        author: b.author,
        published: true,
        publishedAt: new Date(b.date),
      })
      .onConflictDoNothing();
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
