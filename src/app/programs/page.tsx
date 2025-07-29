import { getCollectionProducts, type Product } from '@/lib/shopify';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramCard from '@/components/programs/ProgramCard';
import ProgramsCTA from '@/components/programs/ProgramsCTA';

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
