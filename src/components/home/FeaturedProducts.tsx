import Link from 'next/link';
import Image from 'next/image';
import { getProducts, formatPrice, type Product } from '@/lib/shopify';

export default async function FeaturedProducts() {
  // Fetch the first 6 products
  const products: Product[] = await getProducts(6);

  return (
    <section className="py-20 bg-bbd-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-bbd-ivory mb-4">
            FEATURED <span className="text-bbd-orange">PRODUCTS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your physique with our premium programs and supplements
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const productImage = product.featuredImage || product.images.edges[0]?.node;
            const price = product.priceRange.minVariantPrice;
            // Check if product is digital based on title or tags
            const isDigital = product.title.toLowerCase().includes('program') || 
                             product.title.toLowerCase().includes('guide') ||
                             product.title.toLowerCase().includes('ebook');

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                <div className="bg-bbd-charcoal rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-bbd-charcoal hover:border-bbd-orange/50">
                  {/* Product Image */}
                  <div className="relative h-64 bg-bbd-black/50">
                    {productImage ? (
                      <Image
                        src={productImage.url}
                        alt={productImage.altText || product.title}
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                    
                    {/* Digital Badge */}
                    {isDigital && (
                      <div className="absolute top-4 left-4 bg-bbd-orange text-bbd-black px-3 py-1 rounded-md text-sm font-semibold">
                        DIGITAL
                      </div>
                    )}

                    {/* Sold Out Badge */}
                    {!product.availableForSale && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                        SOLD OUT
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-display text-xl text-bbd-ivory mb-2 group-hover:text-bbd-orange transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-bbd-orange">
                        {formatPrice(price.amount, price.currencyCode)}
                      </span>
                      <span className="text-bbd-ivory group-hover:text-bbd-orange transition-colors">
                        <svg
                          className="w-6 h-6"
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
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-bbd-orange text-bbd-black font-bold text-lg rounded-md hover:bg-bbd-gold transition-all duration-200 transform hover:scale-105"
          >
            VIEW ALL PRODUCTS
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
