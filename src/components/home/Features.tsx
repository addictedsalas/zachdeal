import Image from 'next/image';

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'SCIENCE-BACKED PROGRAMS',
      description: 'Every program is built on proven training methodologies and nutritional science for guaranteed results.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'PERSONALIZED APPROACH',
      description: 'Customizable programs that adapt to your fitness level, goals, and lifestyle for optimal progression.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'COMMUNITY SUPPORT',
      description: 'Join a thriving community of like-minded individuals on the same journey to greatness.',
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/section-banner-2.jpg"
          alt="Features background"
          fill
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-bbd-ivory mb-4">
            WHY CHOOSE <span className="text-bbd-orange">BUILT BY DEAL</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the elite who demand more from their training and nutrition
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-bbd-black/60 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-bbd-orange/50 transition-all duration-300 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-bbd-orange/10 text-bbd-orange rounded-full mb-6 group-hover:bg-bbd-orange group-hover:text-bbd-black transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-display text-2xl text-bbd-ivory mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-600/50">
          <div className="text-center">
            <div className="font-display text-5xl text-bbd-orange mb-2">10K+</div>
            <p className="text-gray-300 uppercase tracking-wider text-sm">Clients Transformed</p>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl text-bbd-orange mb-2">95%</div>
            <p className="text-gray-300 uppercase tracking-wider text-sm">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl text-bbd-orange mb-2">50+</div>
            <p className="text-gray-300 uppercase tracking-wider text-sm">Digital Programs</p>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl text-bbd-orange mb-2">4.9</div>
            <p className="text-gray-300 uppercase tracking-wider text-sm">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
