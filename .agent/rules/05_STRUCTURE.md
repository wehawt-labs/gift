---
trigger: manual
---

# Project Folder Structure

## Directory Tree

```
src/
├── app/
│   ├── (auth)/              # Auth routes group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected user routes
│   │   └── orders/
│   │       ├── page.tsx     # Order list
│   │       └── [id]/
│   │           └── page.tsx # Order detail + chat
│   ├── admin/               # Admin panel (protected)
│   │   ├── orders/
│   │   └── upload/
│   ├── order/               # Public order wizard
│   │   └── new/
│   ├── api/
│   │   └── webhooks/
│   │       └── lemonsqueezy/
│   ├── layout.tsx
│   ├── page.tsx             # Landing page
│   └── globals.css
├── components/
│   ├── ui/                  # shadcn components
│   ├── forms/               # Order wizard forms
│   ├── audio/               # Music player
│   └── layout/              # Header, Footer, etc.
├── lib/
│   ├── db/
│   │   ├── schema.ts        # Drizzle schema
│   │   ├── index.ts         # DB connection
│   │   └── queries.ts       # Reusable queries
│   ├── auth.ts              # BetterAuth config
│   ├── r2.ts                # Cloudflare R2 helpers
│   ├── email.ts             # Resend helpers
│   └── utils.ts             # cn(), helpers
├── actions/                 # Server Actions
│   ├── order.ts
│   ├── song.ts
│   └── message.ts
└── types/
    └── index.ts             # Shared TypeScript types
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `OrderWizard.tsx` |
| Utilities | camelCase | `formatPrice.ts` |
| Server Actions | camelCase + verb | `createOrder.ts` |
| DB Schema | snake_case (SQL) | `order_messages` |
| Routes | kebab-case | `/order/new` |
| CSS Variables | kebab-case | `--color-terracotta` |
