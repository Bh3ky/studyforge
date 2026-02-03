# StudyForge

![Welcome page](public/welcome.png)


StudyForge is a Next.js app that turns PDFs and handwritten notes into structured study materials. It uses Gemini for content extraction and transformation, Clerk for authentication, and Supabase for storage with Row Level Security (RLS).

## Features

- Upload PDFs or images of handwritten notes
- AI-generated study notes and infographic outlines
- Authenticated access with Clerk
- Supabase storage with RLS and 24-hour retention metadata
- Responsive, retro-styled UI

## Tech Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS + shadcn UI
- Clerk (auth)
- Supabase (Postgres + RLS)
- Gemini API (text + vision)

## Project Structure

- `app/` - routes, pages, API handlers
- `components/` - UI and feature components
- `lib/` - helpers (AI, Supabase, schemas)
- `supabase/` - SQL for schema + RLS
- `docs/` - architecture and setup notes

## Setup

### 1) Install dependencies

```
npm install
```

### 2) Environment variables

Create `.env.local` and set:

```
GEMINI_API_KEY=
GEMINI_TEXT_MODEL=gemini-flash-latest
GEMINI_VISION_MODEL=gemini-flash-latest

SUPABASE_URL=
SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up
CLERK_AFTER_SIGN_IN_URL=/dashboard
CLERK_AFTER_SIGN_UP_URL=/dashboard
```

If your Supabase project uses publishable keys, use `SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` instead of anon keys.

### 3) Supabase schema + RLS

Run the SQL in `supabase/processed_outputs.sql` using the Supabase SQL Editor. This creates the `app` schema, table, and RLS policies.

### 4) Clerk + Supabase integration

Use the official Third-Party Auth flow:

- Enable the Clerk → Supabase integration in Clerk
- Add Clerk as a Third-Party Auth provider in Supabase
- Ensure Clerk tokens include the `authenticated` role claim

See `docs/SUPABASE_SETUP.md` for step-by-step instructions.

### 5) Run locally

```
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - lint
- `npm test` - run tests

## Testing

Tests are required for new logic. Run:

```
npm test
```

## Troubleshooting

### RLS error: "new row violates row-level security policy"

- Confirm Clerk → Supabase integration is configured
- Confirm the `app` schema is exposed in Supabase API settings
- Confirm your session token includes `role: authenticated`

### Gemini model 404

Set a valid model name in `.env.local`, e.g.:

```
GEMINI_TEXT_MODEL=gemini-2.5-flash
GEMINI_VISION_MODEL=gemini-2.5-flash
```

## Roadmap

See `ROADMAP.md` and `docs/features_to_implement.md`.
