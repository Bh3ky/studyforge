# Roadmap

This roadmap tracks what has been implemented and what is planned next. Dates are intentionally omitted to keep the list
flexible for a learning project.

## Implemented

- Next.js App Router UI for landing page, dashboard, and processing flow.
- File upload UI with drag-and-drop and size/type validation (PDF and image).
- Processing API routes:
  - PDF: extract text and generate infographic JSON via Gemini.
  - Image: generate structured notes via Gemini vision.
- Strict JSON validation with Zod schemas for model outputs.
- Supabase storage for processed outputs with 24-hour expiration metadata.
- Clerk auth middleware protecting `/dashboard`, `/process`, and processing APIs.
- Sign-in and sign-up routes with Clerk components.
- Supabase custom schema + RLS policies for per-user access.
- Unit tests for PDF extraction, model JSON parsing, and auth guard logic.

## Short-Term (Next)

- Add user profile table synced with Clerk user IDs.
- Add cleanup job to purge expired `processed_outputs`.

## Mid-Term

- Export/download pipeline (PDF, PNG).
- Basic usage limits or rate limiting.
- Optional caching for repeated processing on identical inputs.
- Public share links for generated outputs.

## Later

- Paywall experiments (Clerk Billing or Stripe).
- Batch processing UI.
- Collaborative notes and sharing.
- Advanced infographic templates.
