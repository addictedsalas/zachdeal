export default function SupplementsBenefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Enhanced Performance',
      description: 'Boost your workout intensity and achieve better results with scientifically-formulated supplements.',
      stats: '87% improvement in workout performance'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Faster Recovery',
      description: 'Reduce muscle soreness and recover faster between training sessions with our recovery formulas.',
      stats: '65% faster recovery time'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3" />
        </svg>
      ),
      title: 'Muscle Growth',
      description: 'Support lean muscle development with premium protein powders and muscle-building nutrients.',
      stats: '43% increase in lean mass'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Overall Health',
      description: 'Support your immune system, energy levels, and overall wellness with our vitamin and mineral blends.',
      stats: '92% report better energy'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-bbd-charcoal/20 via-bbd-black to-bbd-charcoal/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl text-bbd-ivory mb-4">
            WHY CHOOSE <span className="text-bbd-orange">OUR SUPPLEMENTS</span>
          </h2>
          <p className="text-xl text-bbd-ivory/80 max-w-3xl mx-auto">
            Backed by science, trusted by athletes, and designed to help you reach your peak potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-bbd-charcoal/40 to-bbd-black/60 rounded-2xl p-8 border border-bbd-charcoal/30 hover:border-bbd-orange/40 transition-all duration-300 hover:scale-105 text-center"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-bbd-orange/5 to-bbd-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-bbd-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 text-bbd-orange group-hover:bg-bbd-orange/30 transition-colors">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="font-bebas text-2xl text-bbd-ivory mb-4 group-hover:text-bbd-orange transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-bbd-ivory/70 text-sm mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Stats */}
                <div className="bg-bbd-orange/10 border border-bbd-orange/20 rounded-lg p-3">
                  <span className="text-bbd-orange font-bold text-sm">
                    {benefit.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-bbd-charcoal/30 rounded-full px-8 py-4 border border-bbd-charcoal/50">
            <div className="flex items-center text-bbd-ivory/70">
              <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Third-Party Tested</span>
            </div>
            <div className="flex items-center text-bbd-ivory/70">
              <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">No Artificial Fillers</span>
            </div>
            <div className="flex items-center text-bbd-ivory/70">
              <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Made in USA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
