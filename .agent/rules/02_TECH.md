---
trigger: manual
---

# Technology Stack & Architecture

## 1. Frontend

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + BaseUI (complex primitives) |
| Icons | Lucide React |
| Animations | Framer Motion |
| Forms | react-hook-form + zod |

## 2. Backend & Database

| Category | Technology |
|----------|------------|
| Server | Next.js Server Actions |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Auth | BetterAuth (Email/Password + Google OAuth) |
| Roles | `admin` \| `user` |

## 3. External Services

| Service | Provider | Purpose |
|---------|----------|---------|
| Payments | Lemon Squeezy | Merchant of Record, Webhooks |
| Storage | Cloudflare R2 | MP3s, Cover Art (Presigned URLs) |
| Email | Resend | React Email templates |

## 4. Required Dependencies

```bash
# Core
pnpm add drizzle-orm @neondatabase/serverless
pnpm add better-auth
pnpm add zod react-hook-form @hookform/resolvers
pnpm add framer-motion
pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
pnpm add resend @react-email/components
pnpm add wavesurfer.js

# Dev
pnpm add -D drizzle-kit
```

## 5. Audio Player

Use **Wavesurfer.js** for waveform visualization and playback.
