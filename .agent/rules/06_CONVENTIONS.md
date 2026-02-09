---
trigger: glob
globs: "**/*.ts", "**/*.tsx"
---

# Coding Conventions

## 1. Biome.json Configuration

```json
{
  "css": {
    "formatter": { "enabled": true },
    "linter": { "enabled": true }
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "trailingCommas": "all",
      "semicolons": "always"
    }
  },
  "linter": {
    "rules": {
      "correctness": {
        "useExhaustiveDependencies": "error",
        "useHookAtTopLevel": "error"
      },
      "style": {
        "useImportType": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn",
        "noArrayIndexKey": "warn"
      }
    }
  },
  "organizeImports": { "enabled": true },
  "nursery": {
    "useSortedClasses": {
      "level": "warn",
      "options": {
        "attributes": ["className", "class"],
        "functions": ["clsx", "cn"]
      }
    }
  }
}
```

## 2. Development Principles

### Server-First Architecture

- Prioritize **React Server Components** (RSC)
- Use `"use client"` only for:
  - Framer Motion animations
  - Audio Player (Wavesurfer.js)
  - Forms with react-hook-form
  - Interactive UI (dropdowns, modals)

### Data Integrity

- **Drizzle schemas** are the source of truth
- Use **Zod** for runtime validation in Server Actions
- Never trust client-side data

### Audio Handling

- Use **Wavesurfer.js** for client-side visualization
- Handle large MP3 files via **R2 presigned URLs**
- Stream audio, don't load entire files

## 3. Import Organization

```typescript
// 1. External packages
import { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Type imports
import type { Order } from '@/types';

// 3. Internal modules
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
```
