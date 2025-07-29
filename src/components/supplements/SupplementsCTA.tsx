import Link from 'next/link';

export default function SupplementsCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-bbd-charcoal via-bbd-black to-bbd-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23EE7F0E' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Content */}
          <div className="mb-12">
            <h2 className="font-bebas text-5xl lg:text-6xl text-bbd-ivory mb-6">
              READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-bbd-orange to-bbd-gold">TRANSFORM</span> YOUR RESULTS?
            </h2>
            <p className="text-xl text-bbd-ivory/80 mb-8 max-w-3xl mx-auto">
              Join thousands of athletes who trust Built By Deal supplements to fuel their success. 
              Get premium quality, proven results, and unmatched support on your fitness journey.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bebas text-bbd-orange mb-2">50K+</div>
              <div className="text-bbd-ivory/70">Satisfied Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bebas text-bbd-gold mb-2">4.9★</div>
              <div className="text-bbd-ivory/70">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bebas text-bbd-orange mb-2">100%</div>
              <div className="text-bbd-ivory/70">Money-Back Guarantee</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="#featured"
              className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black font-bold text-xl rounded-lg hover:shadow-2xl hover:shadow-bbd-orange/25 transition-all duration-300 transform hover:scale-105 min-w-[300px] justify-center"
            >
              SHOP NOW & SAVE 25%
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
            </Link>
            
            <Link
              href="/contact"
              className="group inline-flex items-center px-12 py-5 bg-transparent border-2 border-bbd-ivory text-bbd-ivory font-bold text-xl rounded-lg hover:bg-bbd-ivory hover:text-bbd-black transition-all duration-300 transform hover:scale-105 min-w-[300px] justify-center"
            >
              GET EXPERT ADVICE
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>

          {/* Guarantee Section */}
          <div className="bg-gradient-to-r from-bbd-charcoal/40 to-bbd-black/40 rounded-2xl p-8 border border-bbd-charcoal/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-bbd-orange/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-bbd-ivory text-lg mb-1">30-Day Money-Back Guarantee</h3>
                  <p className="text-bbd-ivory/70 text-sm">Not satisfied? Get a full refund, no questions asked.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-bbd-ivory/60 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free Shipping $75+
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  24/7 Support
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-bbd-ivory/60 text-sm mb-4">Trusted by professional athletes and fitness enthusiasts worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {/* Placeholder for brand logos or testimonials */}
              <div className="text-bbd-ivory/40 text-xs">★★★★★ &quot;Best supplements I&apos;ve ever used&quot; - Mike T.</div>
              <div className="text-bbd-ivory/40 text-xs">★★★★★ &quot;Amazing results in just 4 weeks&quot; - Sarah L.</div>
              <div className="text-bbd-ivory/40 text-xs">★★★★★ &quot;Quality you can trust&quot; - David R.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
