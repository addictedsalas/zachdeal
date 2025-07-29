import Link from 'next/link';
import Image from 'next/image';
import { getCollectionProducts, formatPrice, type Product } from '@/lib/shopify';

export default async function ProgramsSection() {
  // Fetch products from the 'programs' collection
  const products: Product[] = await getCollectionProducts('programs', 6);

  return (
    <section className="py-20 bg-bbd-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-bbd-ivory mb-4">
            TRANSFORMATION <span className="text-bbd-orange">PROGRAMS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Expertly designed digital programs to help you achieve your fitness goals
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const productImage = product.featuredImage || product.images.edges[0]?.node;
            const price = product.priceRange.minVariantPrice;

            return (
              <div
                key={product.id}
                className="bg-bbd-charcoal/50 rounded-lg overflow-hidden border border-gray-800 hover:border-bbd-orange transition-all duration-300"
              >
                {/* Product Image */}
                <Link href={`/programs/${product.handle}`} className="block relative h-64 overflow-hidden">
                  {productImage ? (
                    <Image
                      src={productImage.url}
                      alt={productImage.altText || product.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-600">No image</span>
                    </div>
                  )}
                  {/* Digital Badge */}
                  <div className="absolute top-4 left-4 bg-bbd-orange text-bbd-black px-3 py-1 rounded-full text-sm font-bold">
                    DIGITAL
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-display text-2xl text-bbd-ivory mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-bbd-orange">
                      {formatPrice(price.amount, price.currencyCode)}
                    </span>
                    <Link
                      href={`/programs/${product.handle}`}
                      className="inline-flex items-center text-bbd-ivory hover:text-bbd-orange transition-colors"
                    >
                      View Details
                      <svg
                        className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/programs"
            className="inline-flex items-center px-8 py-4 bg-bbd-orange text-bbd-black font-bold text-lg rounded-md hover:bg-bbd-gold transition-all duration-200 transform hover:scale-105"
          >
            VIEW ALL PROGRAMS
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
