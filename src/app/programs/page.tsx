import { getCollectionProducts, formatPrice, type Product } from '@/lib/shopify';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramCard from '@/components/programs/ProgramCard';
import ProgramsCTA from '@/components/programs/ProgramsCTA';
import CheckoutButton from '@/components/stripe/CheckoutButton';
import { PLAN_CONFIGS } from '@/lib/stripeClient';
import Link from 'next/link';

export default async function ProgramsPage() {
  // Fetch all programs from Shopify
  const allPrograms: Product[] = await getCollectionProducts('programs', 50);
  
  // Filter for static programs (downloadable PDFs)
  const staticPrograms = allPrograms.filter(product => {
    const text = (product.title + ' ' + product.description).toLowerCase();
    return text.includes('pdf') || text.includes('download') || text.includes('static') || 
           (!text.includes('personalized') && !text.includes('custom') && !text.includes('subscription') && !text.includes('coaching'));
  });

  return (
    <div className="min-h-screen bg-bbd-black">
      {/* Hero Section */}
      <section id="hero">
        <ProgramsHero />
      </section>

      {/* Personalized Training Plans */}
      <section id="personalized-programs" className="py-20 bg-gradient-to-br from-bbd-orange/10 to-bbd-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl text-bbd-ivory mb-4">
              PERSONALIZED <span className="text-bbd-orange">TRAINING</span>
            </h2>
            <p className="text-xl text-bbd-ivory/80 max-w-3xl mx-auto mb-8">
              Get custom workout plans, track your progress, and access our full dashboard with meal logging, workout player, and advanced analytics.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-bbd-ivory/70 mb-12">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom Training Plans
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Progress Tracking Dashboard
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Meal Logging & Nutrition
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Interactive Workout Player
              </div>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {/* Basic Plan */}
            <div className="bg-bbd-charcoal/50 border border-bbd-ivory/10 rounded-xl p-8 hover:border-bbd-orange/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-bbd-ivory mb-2">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-bbd-orange">${(PLAN_CONFIGS.BASIC.price / 100).toFixed(0)}</span>
                <span className="text-bbd-ivory/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {PLAN_CONFIGS.BASIC.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-bbd-ivory/80">
                    <svg className="w-5 h-5 text-bbd-orange mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="bg-bbd-charcoal/50 border-2 border-bbd-gold rounded-xl p-8 relative transform scale-105 hover:scale-110 transition-all duration-300">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-bbd-ivory mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-bbd-gold">${(PLAN_CONFIGS.PREMIUM.price / 100).toFixed(0)}</span>
                <span className="text-bbd-ivory/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {PLAN_CONFIGS.PREMIUM.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-bbd-ivory/80">
                    <svg className="w-5 h-5 text-bbd-gold mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="bg-bbd-charcoal/50 border border-bbd-ivory/10 rounded-xl p-8 hover:border-bbd-orange/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-bbd-ivory mb-2">Elite</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-bbd-orange">${(PLAN_CONFIGS.ELITE.price / 100).toFixed(0)}</span>
                <span className="text-bbd-ivory/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {PLAN_CONFIGS.ELITE.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-bbd-ivory/80">
                    <svg className="w-5 h-5 text-bbd-orange mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
            <p className="text-bbd-ivory/60 mb-4">✓ Cancel anytime ✓ No setup fees</p>
            <p className="text-sm text-bbd-ivory/40 mb-6">
              Secure payment processing by Stripe.
            </p>
            <Link 
              href="/plans"
              className="inline-flex items-center px-6 py-3 bg-bbd-orange text-bbd-black font-bold rounded-md hover:bg-bbd-gold transition-all duration-200"
            >
              VIEW ALL PLAN DETAILS
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Static Programs */}
      <section id="static-programs" className="py-20 bg-bbd-charcoal/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl text-bbd-ivory mb-4">
              DOWNLOADABLE <span className="text-bbd-orange">PROGRAMS</span>
            </h2>
            <p className="text-xl text-bbd-ivory/80 max-w-3xl mx-auto mb-8">
              Ready-to-use PDF workout programs you can download instantly and follow at your own pace.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-bbd-ivory/70">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Instant PDF Download
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                One-Time Purchase
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Proven Programs
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No Subscription Required
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticPrograms.map((product) => (
              <ProgramCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {staticPrograms.length >= 9 && (
            <div className="text-center mt-12">
              <button className="inline-flex items-center px-8 py-4 bg-bbd-orange text-bbd-black font-bold text-lg rounded-md hover:bg-bbd-gold transition-all duration-200 transform hover:scale-105">
                LOAD MORE PROGRAMS
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section id="cta">
        <ProgramsCTA />
      </section>
    </div>
  );
}
