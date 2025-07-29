import Link from 'next/link';
import { type Product } from '@/lib/shopify';
import SupplementCard from './SupplementCard';

interface SupplementsCategoriesProps {
  supplementsByCategory: Record<string, Product[]>;
}

const categoryInfo = {
  protein: {
    name: 'Protein Powders',
    description: 'Build and maintain lean muscle mass',
    icon: '💪',
    color: 'from-bbd-orange to-bbd-gold'
  },
  'pre-workout': {
    name: 'Pre-Workout',
    description: 'Boost energy and focus for intense training',
    icon: '⚡',
    color: 'from-red-500 to-bbd-orange'
  },
  creatine: {
    name: 'Creatine',
    description: 'Increase strength and power output',
    icon: '🔥',
    color: 'from-bbd-gold to-yellow-400'
  },
  vitamins: {
    name: 'Vitamins & Health',
    description: 'Support overall health and wellness',
    icon: '🌟',
    color: 'from-green-500 to-bbd-gold'
  },
  recovery: {
    name: 'Recovery',
    description: 'Optimize post-workout recovery',
    icon: '🔄',
    color: 'from-blue-500 to-bbd-orange'
  },
  'fat-burners': {
    name: 'Fat Burners',
    description: 'Support weight management goals',
    icon: '🔥',
    color: 'from-purple-500 to-bbd-orange'
  }
};

export default function SupplementsCategories({ supplementsByCategory }: SupplementsCategoriesProps) {
  const categories = Object.keys(supplementsByCategory).filter(cat => 
    supplementsByCategory[cat].length > 0 && cat !== 'other'
  );

  return (
    <section id="categories" className="py-20 bg-bbd-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl text-bbd-ivory mb-4">
            SHOP BY <span className="text-bbd-orange">CATEGORY</span>
          </h2>
          <p className="text-xl text-bbd-ivory/80 max-w-3xl mx-auto">
            Find the perfect supplements for your specific fitness goals
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const info = categoryInfo[category as keyof typeof categoryInfo];
            const products = supplementsByCategory[category];
            
            return (
              <div
                key={category}
                className="group relative bg-gradient-to-br from-bbd-charcoal/40 to-bbd-black/60 rounded-2xl p-8 border border-bbd-charcoal/30 hover:border-bbd-orange/40 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info?.color || 'from-bbd-orange to-bbd-gold'} opacity-5 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-4">{info?.icon || '💊'}</div>
                  
                  {/* Category Info */}
                  <h3 className="font-bebas text-2xl text-bbd-ivory mb-2 group-hover:text-bbd-orange transition-colors">
                    {info?.name || category.toUpperCase()}
                  </h3>
                  <p className="text-bbd-ivory/70 mb-4 text-sm">
                    {info?.description || 'Premium supplements for your fitness journey'}
                  </p>
                  
                  {/* Product Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-bbd-orange font-bold">
                      {products.length} Products
                    </span>
                    <svg className="w-5 h-5 text-bbd-orange group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Products by Category */}
        {categories.slice(0, 3).map((category) => {
          const info = categoryInfo[category as keyof typeof categoryInfo];
          const products = supplementsByCategory[category].slice(0, 3);
          
          return (
            <div key={`${category}-products`} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bebas text-3xl text-bbd-ivory mb-2">
                    {info?.name || category.toUpperCase()}
                  </h3>
                  <p className="text-bbd-ivory/70">
                    {info?.description || 'Premium supplements for your fitness journey'}
                  </p>
                </div>
                <Link
                  href={`/supplements?category=${category}`}
                  className="inline-flex items-center text-bbd-orange hover:text-bbd-gold transition-colors font-semibold"
                >
                  View All
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <SupplementCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
