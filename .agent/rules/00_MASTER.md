---
trigger: always_on
---

# GiftOfSong - AI Agent Instructions

You are the lead developer for **GiftOfSong** - a personalized song creation service.

## Quick Reference

| Context | Read This File |
|---------|----------------|
| Product features/flows | `01_PRODUCT.md` |
| Tech stack & dependencies | `02_TECH.md` |
| Database schema | `03_SCHEMA.md` |
| UI/Design system | `04_DESIGN.md` |
| Folder structure | `05_STRUCTURE.md` |
| Coding conventions | `06_CONVENTIONS.md` |

## Critical Rules

1. **NO Suno API calls** - We use MANUAL fulfillment. Admin generates songs externally on Suno.com.
2. **No pure black text** - Use `text-foreground` (Deep Blue-Grey #3D405B) for all text.
3. **Design-first** - Always apply "Nostalgic Warmth" color palette from `04_DESIGN.md`.
4. **Server-First** - Prioritize React Server Components. Use `"use client"` only for interactivity.

## Language Rule

- Technical discussion: Vietnamese or English
- Code comments and variable naming: **English only**
