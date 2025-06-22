"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, formatPrice, type Product } from '@/lib/shopify';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getProductByHandle(resolvedParams.handle);
        if (!productData) {
          notFound();
        }
        setProduct(productData);
        setSelectedVariant(productData.variants.edges[0]?.node);
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [resolvedParams.handle]);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    
    // Redirect to Shopify checkout
    const checkoutUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${selectedVariant.id.split('/').pop()}:${quantity}`;
    window.location.href = checkoutUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bbd-black flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-bbd-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-bbd-ivory">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const productImage = product.featuredImage || product.images.edges[0]?.node;
  const price = selectedVariant?.priceV2 || product.priceRange.minVariantPrice;

  // Extract program details
  const getDifficulty = (title: string, description: string) => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('beginner') || text.includes('starter')) return 'Beginner';
    if (text.includes('advanced') || text.includes('expert')) return 'Advanced';
    if (text.includes('intermediate')) return 'Intermediate';
    return 'All Levels';
  };

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
    <div className="min-h-screen bg-bbd-black pt-24">
      {/* Navigation Breadcrumb */}
      <div className="bg-bbd-charcoal/20 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-bbd-ivory/60 hover:text-bbd-orange transition-colors">
              Home
            </Link>
            <span className="text-bbd-ivory/40">/</span>
            <Link href="/programs" className="text-bbd-ivory/60 hover:text-bbd-orange transition-colors">
              Programs
            </Link>
            <span className="text-bbd-ivory/40">/</span>
            <span className="text-bbd-ivory">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-bbd-charcoal/20">
              {productImage ? (
                <Image
                  src={productImage.url}
                  alt={productImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-24 h-24 text-bbd-ivory/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-bbd-ivory/40">Program Image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Program Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-bbd-charcoal/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-bbd-orange/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-bbd-ivory">{difficulty}</p>
                <p className="text-xs text-bbd-ivory/60">Difficulty</p>
              </div>
              <div className="bg-bbd-charcoal/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-bbd-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-bbd-ivory">{duration}</p>
                <p className="text-xs text-bbd-ivory/60">Duration</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className="font-bebas text-4xl lg:text-5xl text-bbd-ivory mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-bbd-orange">
                  {formatPrice(price.amount, price.currencyCode)}
                </span>
                <div className="flex items-center space-x-1">
                  <div className="flex text-bbd-gold">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-bbd-ivory/60">(4.9)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-bbd-ivory mb-4">About This Program</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-bbd-ivory/80 leading-relaxed">
                  {product.description || "Transform your body with this comprehensive fitness program designed by Built By Deal. Get ready to push your limits and achieve results you never thought possible."}
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="text-xl font-bold text-bbd-ivory mb-4">What's Included</h3>
              <div className="space-y-3">
                {[
                  "Complete workout program with detailed instructions",
                  "Nutrition guidelines and meal planning",
                  "Progress tracking templates",
                  "Video demonstrations for all exercises",
                  "24/7 community support access",
                  "30-day money-back guarantee"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-bbd-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-bbd-ivory/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-bbd-ivory mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-bbd-charcoal/50 border border-bbd-ivory/20 rounded-md flex items-center justify-center text-bbd-ivory hover:bg-bbd-orange hover:text-bbd-black transition-all"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-bbd-ivory font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-bbd-charcoal/50 border border-bbd-ivory/20 rounded-md flex items-center justify-center text-bbd-ivory hover:bg-bbd-orange hover:text-bbd-black transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="w-full bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black font-bold text-lg py-4 rounded-lg hover:shadow-2xl hover:shadow-bbd-orange/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                GET PROGRAM NOW - {formatPrice(price.amount, price.currencyCode)}
              </button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-bbd-ivory/10">
                <div className="text-center">
                  <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-bbd-ivory/60">Instant Access</p>
                </div>
                <div className="text-center">
                  <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-bbd-ivory/60">30-Day Guarantee</p>
                </div>
                <div className="text-center">
                  <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-bbd-ivory/60">Secure Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
