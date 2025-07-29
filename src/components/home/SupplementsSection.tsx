'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCollectionProducts, formatPrice, type Product } from '@/lib/shopify';

export default function SupplementsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getCollectionProducts('supplements', 12);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching supplements:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 3 >= products.length ? 0 : prevIndex + 3
        );
        setIsTransitioning(false);
      }, 50);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex - 3 < 0 ? Math.max(0, products.length - 3) : prevIndex - 3
        );
        setIsTransitioning(false);
      }, 50);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-bbd-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">Loading supplements...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-bbd-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-bbd-ivory mb-4">
            PREMIUM <span className="text-bbd-orange">SUPPLEMENTS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Science-backed supplements to fuel your transformation and optimize performance
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Products Container with Transition */}
          <div 
            className={`flex transition-transform duration-500 ease-in-out ${isTransitioning ? '' : ''}`}
            style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}
          >
            {products.map((product) => {
              const productImage = product.featuredImage || product.images.edges[0]?.node;
              const price = product.priceRange.minVariantPrice;
              const isOutOfStock = !product.availableForSale;

              return (
                <div
                  key={product.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-bbd-charcoal/50 rounded-lg overflow-hidden border border-gray-800 hover:border-bbd-orange transition-all duration-300">
                    {/* Product Image */}
                    <Link href={`/supplements/${product.handle}`} className="block relative h-64 overflow-hidden">
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
                      {/* Out of Stock Badge */}
                      {isOutOfStock && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          SOLD OUT
                        </div>
                      )}
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
                          href={`/supplements/${product.handle}`}
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
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {products.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-bbd-orange hover:bg-bbd-gold text-bbd-black p-3 rounded-full transition-all duration-200 shadow-lg z-10"
                aria-label="Previous products"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-bbd-orange hover:bg-bbd-gold text-bbd-black p-3 rounded-full transition-all duration-200 shadow-lg z-10"
                aria-label="Next products"
              >
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Carousel Indicators */}
        {products.length > 3 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-bbd-orange w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/supplements"
            className="inline-flex items-center px-8 py-4 bg-bbd-orange text-bbd-black font-bold text-lg rounded-md hover:bg-bbd-gold transition-all duration-200 transform hover:scale-105"
          >
            VIEW ALL SUPPLEMENTS
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
