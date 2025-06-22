# Fitness Web App Architecture

## Overview
Hybrid Shopify CMS + Stripe-Billing Fitness Web App that sells digital fitness plans and delivers an in-app PWA experience with workout tracking, meal logging, and health integration.

## Tech Stack

### Frontend
- **Next.js 14 App Router**: React framework with server-side rendering
- **Tailwind CSS**: Utility-first CSS framework
- **React Context**: State management for auth and app state
- **PWA (next-pwa)**: Progressive Web App capabilities
- **TypeScript**: Type safety and developer experience

### Backend & Services
- **Supabase**: 
  - PostgreSQL database with Row Level Security (RLS)
  - Authentication (magic links)
  - Edge Functions for serverless compute
  - Real-time subscriptions
- **Stripe Billing**: Subscription management, trials, dunning
- **Shopify Storefront API**: Product catalog (read-only)

### Health & Fitness Integration
- **Apple WorkoutKit**: iOS 17+ workout scheduling and HR monitoring
- **Android Health Connect**: Android 14+ planned exercise API
- **Service Worker**: Local notifications and offline caching

### Deployment
- **Vercel**: Web app hosting and serverless functions
- **Supabase**: Database and edge functions hosting

## Data Architecture

### Database Schema (Supabase)
```sql
-- User profiles with Stripe integration
profiles (
  id uuid PK,
  email text,
  stripe_customer_id text,
  stripe_status text, -- 'active', 'trialing', 'past_due', 'canceled'
  goals jsonb,
  equipment jsonb,
  xp int default 0
)

-- Workout templates
templates (
  id uuid PK,
  name text,
  content jsonb
)

-- Generated workout instances
workout_instances (
  id uuid PK,
  user_id uuid FK->profiles.id,
  day date,
  content jsonb, -- exercises, reps, weight
  status text -- 'planned','active','done'
)

-- Workout performance data
set_results (
  id uuid PK,
  workout_id uuid FK->workout_instances.id,
  exercise text,
  set_index int,
  reps int,
  weight numeric
)

-- Nutrition tracking
meal_log (
  id uuid PK,
  user_id uuid FK->profiles.id,
  datetime timestamptz,
  kcal int,
  protein int,
  carbs int,
  fat int
)
```

### Row Level Security (RLS)
All user data is protected by RLS policies that check:
1. User authentication (`auth.uid()`)
2. Active subscription status (`stripe_status = 'active'`)

## Application Flow

### Purchase & Onboarding
1. User browses Shopify catalog pages
2. "Get Plan" CTA redirects to `/plans/[slug]`
3. Stripe Checkout creates subscription
4. Webhook updates `profiles.stripe_status`
5. User redirected to `/onboarding` wizard
6. 3-step wizard: Goals → Equipment → Health Sync
7. `generateWeek()` Edge Function creates initial workout plan

### Daily Experience
1. `/dashboard` shows card stack (Workout expanded, Meals/Sleep collapsed)
2. Workout card launches `/workout/[id]` player
3. Timer, set tracking, native watch session scheduling
4. Completion writes `set_results`, updates XP
5. Meals card allows macro logging
6. Progress page shows trends and achievements

### Subscription Management
- Stripe Customer Portal iframe in `/settings`
- Automatic access control via RLS policies
- Dunning handled by Stripe webhooks

## API Endpoints

### Stripe Integration
- `POST /api/stripe/webhook` - Handle subscription events
- `GET /api/stripe/portal` - Customer portal session

### Workout System
- `POST /api/generate/week` - Generate weekly workout plan
- `PATCH /api/workout/:id/complete` - Mark workout complete
- `GET /api/user/today` - Today's dashboard data

### Health Integration
- `POST /api/health/workout-session` - Schedule native workout
- `POST /api/health/sync` - Sync health data

## Security Considerations

### Data Privacy
- Health data encrypted at rest in Supabase
- HIPAA-adjacent compliance
- No health data in client-side storage

### Authentication
- Supabase magic link authentication
- JWT tokens in HttpOnly cookies
- Session management via Supabase Auth

### Payment Security
- Stripe handles all payment processing
- Webhook signature verification
- No sensitive payment data stored

## Performance Requirements

### Lighthouse Scores
- PWA Score: ≥90
- Performance Score: ≥90
- Accessibility Score: ≥90

### User Experience
- Dashboard FCP: ≤300ms
- Workout generation: ≤3 seconds
- Health sync: ≤5 seconds
- Offline workout caching via IndexedDB

## Deployment Strategy

### Environments
- **Development**: Local Next.js + Supabase local
- **Staging**: Vercel preview + Supabase staging
- **Production**: Vercel + Supabase production

### CI/CD Pipeline
1. GitHub Actions for linting and type checking
2. Vercel automatic deployments
3. Supabase migrations via CLI
4. Stripe webhook endpoint updates

## Monitoring & Analytics

### Error Tracking
- Vercel Analytics for performance
- Supabase logs for database issues
- Stripe Dashboard for payment issues

### User Analytics
- Workout completion rates
- Subscription churn analysis
- Feature usage tracking (privacy-compliant)

## Future Considerations

### Scalability
- Supabase can handle 100k+ users
- Vercel Edge Functions for global performance
- CDN for static assets

### Feature Expansion
- Social features (workout sharing)
- Advanced analytics and insights
- Wearable device integrations
- Nutrition API integrations
