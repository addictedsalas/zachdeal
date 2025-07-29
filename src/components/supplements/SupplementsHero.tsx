"use client";


export default function SupplementsHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-bbd-black via-bbd-charcoal/80 to-bbd-black overflow-hidden pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-bbd-orange/20 rotate-45"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-bbd-gold/10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-bbd-orange/30 transform rotate-12"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-bbd-orange/5 via-transparent to-bbd-gold/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-bbd-orange/20 border border-bbd-orange/30 rounded-full text-bbd-orange text-sm font-bold mb-8">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          PREMIUM QUALITY GUARANTEED
        </div>

        {/* Main Heading */}
        <h1 className="font-bebas text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-bbd-ivory mb-6 leading-none">
          FUEL YOUR
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bbd-orange to-bbd-gold">
            PERFORMANCE
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-bbd-ivory/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          Premium supplements designed to maximize your results. From protein powders to pre-workouts, 
          <span className="text-bbd-gold font-semibold"> Built By Deal</span> has everything you need to reach your peak performance.
        </p>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-bbd-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-bbd-ivory mb-2">Lab Tested</h3>
            <p className="text-bbd-ivory/70 text-sm">Third-party tested for purity and potency</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-bbd-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-bbd-ivory mb-2">Fast Shipping</h3>
            <p className="text-bbd-ivory/70 text-sm">Free shipping on orders over $75</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-bbd-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-bbd-ivory mb-2">Best Value</h3>
            <p className="text-bbd-ivory/70 text-sm">Competitive pricing with bulk discounts</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => document.getElementById('supplements')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black font-bold text-xl rounded-lg hover:shadow-2xl hover:shadow-bbd-orange/25 transition-all duration-300 transform hover:scale-105 min-w-[280px] justify-center"
          >
            SHOP SUPPLEMENTS
            <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
          </button>
          
          <button
            onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center px-10 py-5 bg-transparent border-2 border-bbd-ivory text-bbd-ivory font-bold text-xl rounded-lg hover:bg-bbd-ivory hover:text-bbd-black transition-all duration-300 transform hover:scale-105 min-w-[280px] justify-center"
          >
            LEARN MORE
            <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-bbd-ivory/60 text-sm mb-12">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            FDA Approved Facility
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            GMP Certified
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            30-Day Money Back
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Shipping $75+
          </div>
        </div>

        {/* Scroll Indicator - Bottom Right */}
        <button
          onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 right-8 w-12 h-12 bg-bbd-orange/20 border-2 border-bbd-orange/50 rounded-full flex items-center justify-center hover:bg-bbd-orange/30 transition-all duration-300 animate-bounce group"
        >
          <svg className="w-6 h-6 text-bbd-orange group-hover:text-bbd-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
