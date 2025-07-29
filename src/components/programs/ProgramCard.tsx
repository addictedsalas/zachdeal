import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, type Product } from '@/lib/shopify';

interface ProgramCardProps {
  product: Product;
  featured?: boolean;
  priority?: boolean;
}

export default function ProgramCard({ product, featured = false, priority = false }: ProgramCardProps) {
  const productImage = product.featuredImage || product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  
  // Extract difficulty level from title or description
  const getDifficulty = (title: string, description: string) => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('beginner') || text.includes('starter')) return 'Beginner';
    if (text.includes('advanced') || text.includes('expert')) return 'Advanced';
    if (text.includes('intermediate')) return 'Intermediate';
    return 'All Levels';
  };
  
  // Extract duration from title or description
  const getDuration = (title: string, description: string) => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('4 week') || text.includes('4-week')) return '4 Weeks';
    if (text.includes('6 week') || text.includes('6-week')) return '6 Weeks';
    if (text.includes('8 week') || text.includes('8-week')) return '8 Weeks';
    if (text.includes('12 week') || text.includes('12-week')) return '12 Weeks';
    if (text.includes('16 week') || text.includes('16-week')) return '16 Weeks';
    return '12 Weeks';
  };

  const difficulty = getDifficulty(product.title, product.description);
  const duration = getDuration(product.title, product.description);

  return (
    <div className={`
      group relative bg-bbd-charcoal/50 rounded-xl overflow-hidden border transition-all duration-300 hover:scale-105
      ${featured 
        ? 'border-bbd-orange shadow-2xl shadow-bbd-orange/20' 
        : 'border-bbd-ivory/10 hover:border-bbd-orange/50'
      }
      ${priority ? 'lg:scale-110 lg:z-10' : ''}
    `}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black px-3 py-1 rounded-full text-sm font-bold">
          FEATURED
        </div>
      )}

      {/* Difficulty Badge */}
      <div className="absolute top-4 right-4 z-20 bg-bbd-black/80 text-bbd-ivory px-3 py-1 rounded-full text-xs font-medium">
        {difficulty.toUpperCase()}
      </div>

      {/* Product Image */}
      <Link href={`/programs/${product.handle}`} className="block relative h-64 overflow-hidden">
        {productImage ? (
          <Image
            src={productImage.url}
            alt={productImage.altText || product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-bbd-charcoal to-bbd-black flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-bbd-orange/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-bbd-ivory/50 text-sm">Program Image</span>
            </div>
          </div>
        )}
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-bbd-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-bbd-ivory font-bold text-lg">VIEW PROGRAM</span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bebas text-2xl text-bbd-ivory mb-2 line-clamp-2 group-hover:text-bbd-orange transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-bbd-ivory/70 mb-4 line-clamp-3 text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Program Details */}
        <div className="flex items-center gap-4 mb-4 text-xs text-bbd-ivory/60">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Digital Download
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-2xl font-bold text-bbd-orange">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {featured && (
              <div className="text-xs text-bbd-gold">
                ⭐ Most Popular
              </div>
            )}
          </div>
          
          <Link
            href={`/programs/${product.handle}`}
            className="inline-flex items-center px-4 py-2 bg-bbd-orange text-bbd-black font-bold text-sm rounded-md hover:bg-bbd-gold transition-all duration-200 transform hover:scale-105"
          >
            GET PROGRAM
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 pt-4 border-t border-bbd-ivory/10">
          <div className="flex items-center justify-between text-xs text-bbd-ivory/60">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1 text-bbd-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Instant Access
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1 text-bbd-orange" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              30-Day Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
