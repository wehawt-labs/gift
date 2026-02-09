---
trigger: glob
globs: "**/*.tsx", "**/*.css", "**/components/**"
---

# Design System: Nostalgic Warmth

## 1. Core Philosophy

A warm, sentimental aesthetic combining vintage warmth with modern clean lines.
Focus on emotional connection and trust.

## 2. Color Palette

### CSS Variables (for globals.css)

```css
:root {
  /* Brand Colors (HSL for Tailwind) */
  --color-terracotta: 15 68% 63%;       /* #E07A5F - Primary */
  --color-cream: 43 50% 94%;            /* #F7F3E8 - Background */
  --color-sage: 153 28% 61%;            /* #81B29A - Success/Accent */
  --color-deep-blue-grey: 235 21% 30%;  /* #3D405B - Text */

  /* Semantic Mapping */
  --primary: var(--color-terracotta);
  --primary-foreground: 0 0% 100%;
  --background: var(--color-cream);
  --foreground: var(--color-deep-blue-grey);
  --accent: var(--color-sage);
  --card: 0 0% 100%;
  --card-foreground: var(--color-deep-blue-grey);
}
```

### Usage Guidelines

| Color | Hex | Use For |
|-------|-----|---------|
| Terracotta | `#E07A5F` | Primary buttons, CTAs, active states |
| Cream | `#F7F3E8` | Page backgrounds, hero sections |
| Sage Green | `#81B29A` | Success badges, "Completed" status |
| Deep Blue-Grey | `#3D405B` | All text (**NEVER use pure black**) |
| White | `#FFFFFF` | Cards, modals (with soft shadow) |

## 3. Typography

### Font Stack (Google Fonts)

```typescript
// app/layout.tsx
import { Fraunces, Inter } from 'next/font/google';

const heading = Fraunces({ subsets: ['latin'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
```

| Element | Font | Class | Weight |
|---------|------|-------|--------|
| Headings | Fraunces | `font-heading` | 600-700 |
| Body | Inter | `font-body` | 400 |

## 4. Component Styles

### Border Radius

| Element | Class |
|---------|-------|
| Buttons | `rounded-full` (Pill) |
| Cards/Modals | `rounded-2xl` |
| Inputs | `rounded-xl` |

### Shadows

```css
/* Primary button glow */
.btn-primary {
  @apply shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30;
}

/* Card elevation */
.card {
  @apply shadow-md shadow-black/5;
}
```

## 5. Layout Principles

- **Spacing:** Generous whitespace (`py-16`, `gap-8`, `space-y-6`)
- **Max Width:** `max-w-7xl mx-auto` for content
- **Sections:** Alternate between cream and white backgrounds
- **Glassmorphism:** Minimal - prefer solid warm colors

## 6. Animation Guidelines (Framer Motion)

```typescript
// Page/section transitions
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// Wizard step transitions
const slideVariants = {
  enter: { x: 50, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
};
```
