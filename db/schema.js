import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  jsonb,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const propertyStatus = pgEnum('property_status', ['draft', 'For Sale', 'For Rent', 'Sold']);
export const inquiryStatus = pgEnum('inquiry_status', ['new', 'in_review', 'closed']);
export const inquirySource = pgEnum('inquiry_source', ['contact', 'sell', 'viewing', 'newsletter']);

export const agents = pgTable('agents', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  name: varchar('name', { length: 120 }).notNull(),
  title: varchar('title', { length: 160 }).notNull(),
  image: text('image'),
  bio: text('bio'),
  phone: varchar('phone', { length: 40 }),
  email: varchar('email', { length: 160 }),
  langs: jsonb('langs').$type().default([]),
  listings: integer('listings').default(0),
  sold: integer('sold').default(0),
  rating: integer('rating').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 160 }).notNull().unique(),
  title: varchar('title', { length: 200 }).notNull(),
  price: integer('price').notNull(),
  rent: boolean('rent').default(false),
  location: varchar('location', { length: 200 }),
  type: varchar('type', { length: 80 }),
  status: propertyStatus('status').default('draft'),
  beds: integer('beds').default(0),
  baths: integer('baths').default(0),
  area: integer('area').default(0),
  lotSize: integer('lot_size').default(0),
  image: text('image'),
  gallery: jsonb('gallery').$type().default([]),
  description: text('description'),
  amenities: jsonb('amenities').$type().default([]),
  yearBuilt: integer('year_built'),
  agentId: integer('agent_id').references(() => agents.id, { onDelete: 'set null' }),
  tag: varchar('tag', { length: 40 }),
  lat: varchar('lat', { length: 40 }),
  lng: varchar('lng', { length: 40 }),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  title: varchar('title', { length: 240 }).notNull(),
  excerpt: text('excerpt'),
  body: text('body'),
  category: varchar('category', { length: 80 }),
  read: varchar('read', { length: 20 }),
  image: text('image'),
  author: varchar('author', { length: 120 }),
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  source: inquirySource('source').notNull(),
  status: inquiryStatus('status').default('new'),
  name: varchar('name', { length: 160 }),
  email: varchar('email', { length: 200 }),
  phone: varchar('phone', { length: 40 }),
  intent: varchar('intent', { length: 80 }),
  message: text('message'),
  propertyId: integer('property_id').references(() => properties.id, { onDelete: 'set null' }),
  meta: jsonb('meta').$type().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
