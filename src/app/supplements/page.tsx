import { getCollectionProducts, type Product } from '@/lib/shopify';
import SupplementsHero from '@/components/supplements/SupplementsHero';
import SupplementCard from '@/components/supplements/SupplementCard';
import SupplementsBenefits from '@/components/supplements/SupplementsBenefits';
import SupplementsCTA from '@/components/supplements/SupplementsCTA';

export default async function SupplementsPage() {
  // Fetch supplements from Shopify
  const supplements: Product[] = await getCollectionProducts('supplements', 10);

  return (
    <div className="min-h-screen bg-bbd-black">
      {/* Hero Section */}
      <section id="hero">
        <SupplementsHero />
      </section>
      
      {/* Benefits Section */}
      <section id="benefits">
        <SupplementsBenefits />
      </section>

      {/* All Supplements - Simplified */}
      <section id="supplements" className="py-20 bg-bbd-charcoal/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl text-bbd-ivory mb-4">
              PREMIUM <span className="text-bbd-orange">SUPPLEMENTS</span>
            </h2>
            <p className="text-xl text-bbd-ivory/80 max-w-3xl mx-auto">
              Our complete collection of high-quality supplements designed to maximize your performance and results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {supplements.map((product) => (
              <SupplementCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>

          {/* Empty State */}
          {supplements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-bbd-ivory/60 text-lg">
                Supplements coming soon! Check back for our premium supplement collection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section id="cta">
        <SupplementsCTA />
      </section>
    </div>
  );
}
