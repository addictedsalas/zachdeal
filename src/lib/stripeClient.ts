import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export { stripePromise };

// For local development, we'll create prices dynamically
// In production, these would be actual Stripe price IDs
export const PLAN_CONFIGS = {
  BASIC: {
    name: 'Basic Plan',
    price: 2997, // $29.97 in cents
    interval: 'month' as const,
    features: ['Basic workout plans', 'Nutrition guidance', 'Progress tracking'],
  },
  PREMIUM: {
    name: 'Premium Plan', 
    price: 4997, // $49.97 in cents
    interval: 'month' as const,
    features: ['Everything in Basic', 'Custom meal plans', 'Weekly check-ins', 'Priority support'],
  },
  ELITE: {
    name: 'Elite Plan',
    price: 9997, // $99.97 in cents  
    interval: 'month' as const,
    features: ['Everything in Premium', '1-on-1 coaching calls', 'Custom workout design', 'Supplement recommendations'],
  },
} as const;

export type PlanType = keyof typeof PLAN_CONFIGS;
