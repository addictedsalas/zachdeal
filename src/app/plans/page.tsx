'use client';

import CheckoutButton from '@/components/stripe/CheckoutButton';
import { PLAN_CONFIGS } from '@/lib/stripeClient';

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-bbd-black">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/plansHero.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-bbd-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10 h-screen flex items-center justify-center px-4 overflow-visible">
          <div className="max-w-7xl mx-auto w-full overflow-visible">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-bold text-bbd-ivory mb-4 font-bebas">
                Choose Your Plan
              </h1>
              <p className="text-xl md:text-2xl text-bbd-ivory/90 max-w-3xl mx-auto leading-relaxed">
                Transform your fitness journey with Built By Deal&apos;s proven programs.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8 overflow-visible relative">
              {/* Basic Plan */}
              <div className="bg-bbd-charcoal/80 backdrop-blur-sm border border-bbd-ivory/20 rounded-xl p-6 hover:border-bbd-orange/50 hover:bg-bbd-charcoal/90 transition-all duration-300 transform hover:scale-105 hover:z-20 relative hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-bbd-ivory mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-bbd-orange">${(PLAN_CONFIGS.BASIC.price / 100).toFixed(0)}</span>
                  <span className="text-bbd-ivory/60">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {PLAN_CONFIGS.BASIC.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-bbd-ivory/80 text-sm">
                      <svg className="w-4 h-4 text-bbd-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <CheckoutButton 
                  planType="BASIC"
                  planName="Basic Plan"
                  className="w-full"
                />
              </div>

              {/* Premium Plan */}
              <div className="bg-bbd-charcoal/80 backdrop-blur-sm border-2 border-bbd-gold rounded-xl p-6 relative transform scale-105 hover:scale-110 transition-all duration-300 hover:bg-bbd-charcoal/90 hover:z-20 relative hover:shadow-2xl">
                {/* Popular Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-bbd-ivory mb-2">Premium</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-bbd-gold">${(PLAN_CONFIGS.PREMIUM.price / 100).toFixed(0)}</span>
                  <span className="text-bbd-ivory/60">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {PLAN_CONFIGS.PREMIUM.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-bbd-ivory/80 text-sm">
                      <svg className="w-4 h-4 text-bbd-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <CheckoutButton 
                  planType="PREMIUM"
                  planName="Premium Plan"
                  className="w-full"
                />
              </div>

              {/* Elite Plan */}
              <div className="bg-bbd-charcoal/80 backdrop-blur-sm border border-bbd-ivory/20 rounded-xl p-6 hover:border-bbd-orange/50 hover:bg-bbd-charcoal/90 transition-all duration-300 transform hover:scale-105 hover:z-20 relative hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-bbd-ivory mb-2">Elite</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-bbd-orange">${(PLAN_CONFIGS.ELITE.price / 100).toFixed(0)}</span>
                  <span className="text-bbd-ivory/60">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {PLAN_CONFIGS.ELITE.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-bbd-ivory/80 text-sm">
                      <svg className="w-4 h-4 text-bbd-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <CheckoutButton 
                  planType="ELITE"
                  planName="Elite Plan"
                  className="w-full"
                />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center">
              <p className="text-bbd-ivory/80 mb-2 text-lg">✓ Cancel anytime ✓ No setup fees</p>
              <p className="text-bbd-ivory/60">
                Secure payment processing by Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
