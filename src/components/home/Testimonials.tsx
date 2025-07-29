'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mike Johnson",
      role: "Lost 45 lbs",
      content: "Zach's program completely transformed my physique. The combination of training and nutrition guidance is unmatched. I've never felt stronger or more confident.",
      rating: 5,
      image: "/images/testimonial-1.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Gained 15 lbs of muscle",
      content: "As a woman, I was hesitant about weight training. Zach's approach made it accessible and enjoyable. The results speak for themselves!",
      rating: 5,
      image: "/images/testimonial-2.jpg",
    },
    {
      name: "David Chen",
      role: "Competition Ready",
      content: "From beginner to competition stage in 12 months. Zach's expertise and support system made the impossible possible.",
      rating: 5,
      image: "/images/testimonial-3.jpg",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/section-banner.jpg"
          alt="Testimonials background"
          fill
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-bbd-ivory mb-4">
            WHAT OUR MEMBERS ARE <span className="text-bbd-orange">SAYING</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real results from real people who committed to the process
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-bbd-black/70 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-bbd-orange/50 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-bbd-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-bbd-orange/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-bbd-orange font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-bbd-ivory">{testimonial.name}</p>
                  <p className="text-sm text-bbd-orange">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-xl text-gray-300 mb-6">
            Ready to write your own success story?
          </p>
          <Link
            href="/programs"
            className="inline-block px-8 py-4 bg-bbd-orange text-bbd-ivory font-bold text-lg rounded-md hover:bg-bbd-orange/90 transition-all duration-200 transform hover:scale-105"
          >
            START YOUR TRANSFORMATION →
          </Link>
        </div>
      </div>
    </section>
  );
}
