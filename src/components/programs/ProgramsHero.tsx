"use client";


export default function ProgramsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/programsHero.jpg')`
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bbd-black/80 via-bbd-black/70 to-bbd-charcoal/60" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EE7F0E' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Heading */}
        <h1 className="font-bebas text-6xl sm:text-7xl lg:text-8xl text-bbd-ivory mb-6 leading-none drop-shadow-2xl">
          TRANSFORMATION
          <br />
          <span className="text-bbd-orange">PROGRAMS</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-bbd-ivory/95 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
          Unlock your potential with <span className="text-bbd-gold font-semibold">Built By Deal&apos;s</span> proven digital programs. 
          From beginner-friendly routines to advanced transformation protocols, find the perfect program to achieve your goals.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-bbd-orange mb-2 drop-shadow-lg">50+</div>
            <div className="text-sm sm:text-base text-bbd-ivory/80">Programs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-bbd-gold mb-2 drop-shadow-lg">10K+</div>
            <div className="text-sm sm:text-base text-bbd-ivory/80">Transformations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-bbd-orange mb-2 drop-shadow-lg">4.9★</div>
            <div className="text-sm sm:text-base text-bbd-ivory/80">Average Rating</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* <Link
            href="/plans"
            className="inline-flex items-center px-8 py-4 bg-bbd-orange text-bbd-black font-bold text-lg rounded-md hover:bg-bbd-gold transition-all duration-200 transform hover:scale-105 min-w-[220px] justify-center drop-shadow-lg"
          >
            PERSONALIZED TRAINING
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link> */}
          
          <button
            onClick={() => document.getElementById('static-programs')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-bbd-ivory text-bbd-ivory font-bold text-lg rounded-md hover:bg-bbd-ivory hover:text-bbd-black transition-all duration-200 transform hover:scale-105 min-w-[220px] justify-center drop-shadow-lg"
          >
            DOWNLOAD PROGRAMS
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-bbd-ivory/60">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Instant Download
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            30-Day Guarantee
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Expert Support
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
