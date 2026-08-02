import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

// BetterAuth tables
export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  role: text('role').default('user')
})

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => users.id)
})

export const accounts = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull()
})

export const verifications = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt')
})

export const orderStatusEnum = pgEnum('order_status', [
  'pending_payment',
  'paid',
  'in_progress',
  'review',
  'revision_requested',
  'completed'
])

export const orderTierEnum = pgEnum('order_tier', ['standard', 'premium'])

export const orders = pgTable('order', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  lemonSqueezyOrderId: varchar('lemonSqueezyOrderId', { length: 255 }).unique(),
  tier: orderTierEnum('tier').notNull(),
  status: orderStatusEnum('status').notNull().default('pending_payment'),
  recipientName: varchar('recipientName', { length: 255 }).notNull(),
  recipientRelationship: varchar('recipientRelationship', {
    length: 255
  }).notNull(),
  occasion: varchar('occasion', { length: 255 }).notNull(),
  storyPrompt: text('storyPrompt').notNull(),
  genre: varchar('genre', { length: 255 }).notNull(),
  vibe: varchar('vibe', { length: 255 }).notNull(),
  amountPaid: integer('amountPaid'), // In cents
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})

export const songs = pgTable('song', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('orderId')
    .notNull()
    .references(() => orders.id),
  title: varchar('title', { length: 255 }).notNull(),
  audioUrl: text('audioUrl').notNull(),
  coverArtUrl: text('coverArtUrl'),
  lyrics: text('lyrics'),
  version: integer('version').notNull().default(1),
  isSelected: boolean('isSelected').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const orderMessages = pgTable('order_message', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('orderId')
    .notNull()
    .references(() => orders.id),
  senderId: text('senderId')
    .notNull()
    .references(() => users.id),
  content: text('content').notNull(),
  isRead: boolean('isRead').notNull().default(false),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

// ─── Purchase (Lemon Squeezy payment tracking) ──────────────

export const purchaseStatusEnum = pgEnum('purchase_status', ['pending', 'paid', 'refunded', 'failed'])

export const purchases = pgTable('purchase', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  orderId: uuid('orderId').references(() => orders.id),
  lsOrderId: varchar('lsOrderId', { length: 255 }).unique(),
  variantId: varchar('variantId', { length: 255 }).notNull(),
  status: purchaseStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})

// ─── Promotions / Ads (Dynamic Campaign Ads) ────────────────

export const promotions = pgTable('promotion', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  badgeText: text('badgeText').notNull(),
  ctaNote: text('ctaNote').notNull(),
  ctaSubtext: text('ctaSubtext'),
  summaryLabel: varchar('summaryLabel', { length: 255 }).notNull().default('Special Price'),
  startDate: timestamp('startDate'),
  endDate: timestamp('endDate'),
  isActive: boolean('isActive').notNull().default(true),
  priority: integer('priority').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})

