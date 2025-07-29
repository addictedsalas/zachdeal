# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.3 e-commerce/fitness platform that integrates:
- **Shopify** for product management (supplements)
- **Stripe** for payment processing
- **Supabase** for authentication and user data
- **TypeScript** with strict mode enabled

## Development Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build production bundle
npm run start    # Start production server
```

## Architecture

### App Structure (Next.js App Router)
- `/src/app/` - Pages and API routes
  - `/api/stripe/` - Checkout sessions and webhooks
  - `/auth/` - Authentication pages with Supabase
  - `/dashboard/` - User dashboard with workout plans
  - `/supplements/`, `/programs/`, `/plans/` - Product pages

### Key Contexts
- `AuthContext` - Supabase authentication state
- `CartContext` - Shopping cart management
- `WorkoutContext` - User workout plan state
- `SessionContext` - User session data

### Component Organization
Components are feature-based in `/src/components/`:
- `auth/` - Authentication forms and modals
- `cart/` - Shopping cart drawer
- `dashboard/` - Dashboard views and metrics
- `supplements/`, `programs/` - Product displays
- `ui/` - Reusable UI components using class-variance-authority

### Styling
- Tailwind CSS with custom color scheme:
  - `bbd-black`, `bbd-charcoal`, `bbd-ivory`, `bbd-orange`, `bbd-gold`
- Custom fonts: Bebas Neue (display), Inter (body)

## Environment Configuration

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`, `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

## Key Integration Points

### Shopify
- GraphQL API for products via `@shopify/storefront-api-client`
- Product fetching in `/src/lib/shopify.ts`

### Stripe
- Checkout sessions created at `/api/stripe/create-checkout-session`
- Webhook handling at `/api/stripe/webhook`

### Supabase
- Client initialized in `/src/lib/supabaseClient.ts`
- Auth callbacks handled at `/auth/callback`
- User profiles and workout data stored in Supabase

## Testing

No test framework is currently configured. Consider adding Jest or Vitest for unit tests and Playwright for E2E testing.

## TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Target: ES2017 with ESNext module resolution