---
trigger: manual
---

# Project Overview: GiftOfSong MVP

## 1. Product Description

GiftOfSong is a personalized song creation service where users purchase custom songs as gifts.

**Crucial Distinction:** Unlike typical AI wrappers, this service uses a "Human-in-the-Loop" workflow. The system does NOT automatically call the Suno API. Instead, it acts as a ticket/order management system where the Admin manually generates the song and uploads the result.

## 2. Core User Flows

### A. Customer Flow

1. **Landing Page:** User views samples, understands value prop ("Turn memories into melody").

2. **Order Wizard:** User fills out a multi-step form:
   - Recipient: Name, Relationship
   - Occasion: Birthday, Anniversary, etc.
   - Story/Details: The memories/prompt input
   - Vibe/Genre: User selects style
   - Payment: User pays via Lemon Squeezy (One-time payment)

3. **Order Dashboard:**
   - User lands on a "Track Order" page
   - Status: `Pending Payment` → `Song Chef Cooking` (Processing) → `Ready for Review`
   - Chat Interface: A comment section allows users to refine requests before creation or give feedback after delivery

4. **Delivery:** User listens to the song via a custom web player and can download the MP3.

### B. Admin (Fulfillment) Flow

1. **Admin Panel:** View a list of paid orders.

2. **Creation Process (Manual):**
   - Read the user's prompt
   - Go to Suno.com (external), generate the song manually to save credits and ensure quality
   - Download the MP3 from Suno

3. **Fulfillment:**
   - Upload the MP3 + Lyrics + Cover Art to the Admin Panel
   - System uploads assets to Cloudflare R2
   - Order status updates to "Completed/Review"
   - Resend triggers an email notification to the user

## 3. Monetization Strategy (MVP)

| Tier | Price | Includes |
|------|-------|----------|
| Standard | $19 | 1 Song Version |
| Premium | $29 | 2 Song Versions + Lyric Video |

**Upsell:** If user wants revisions, they can purchase "Extra Credits" via Lemon Squeezy to unlock more attempts.
