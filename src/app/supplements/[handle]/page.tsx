"use client";

import { useState, useEffect, use } from 'react';
import { getProductByHandle, formatPrice, type Product, type ProductVariant } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import ProductBreadcrumb from '@/components/products/ProductBreadcrumb';
import ProductImage from '@/components/products/ProductImage';
import ProductPrice from '@/components/products/ProductPrice';
import ProductQuantitySelector from '@/components/products/ProductQuantitySelector';
import ProductTrustIndicators from '@/components/products/ProductTrustIndicators';
import AddToCartButton from '@/components/products/AddToCartButton';

interface SupplementPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default function SupplementPage({ params }: SupplementPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
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
        const variant = productData.variants.edges[0]?.node;
        setSelectedVariant(variant);
        console.log('Selected variant:', variant);
        console.log('Variant available for sale:', variant?.availableForSale);
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [resolvedParams.handle]);

  // Removed handleAddToCart - now using AddToCartButton component

  if (loading) {
    return (
      <div className="min-h-screen bg-bbd-black flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-bbd-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-bbd-ivory">Loading supplement details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const productImage = product.featuredImage || product.images.edges[0]?.node;
  const price = selectedVariant?.priceV2 || product.priceRange.minVariantPrice;

  // Extract supplement type
  const getSupplementType = (title: string, description: string) => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('protein') || text.includes('whey')) return 'Protein';
    if (text.includes('pre-workout') || text.includes('energy')) return 'Pre-Workout';
    if (text.includes('creatine')) return 'Creatine';
    if (text.includes('vitamin') || text.includes('multivitamin')) return 'Vitamins';
    if (text.includes('recovery') || text.includes('bcaa')) return 'Recovery';
    if (text.includes('fat burn') || text.includes('thermogenic')) return 'Fat Burner';
    return 'Supplement';
  };

  // Extract serving info
  const getServingInfo = (description: string) => {
    const text = description.toLowerCase();
    if (text.includes('30 serving') || text.includes('30 scoop')) return '30 Servings';
    if (text.includes('60 serving') || text.includes('60 scoop')) return '60 Servings';
    if (text.includes('90 serving') || text.includes('90 scoop')) return '90 Servings';
    if (text.includes('120 serving') || text.includes('120 scoop')) return '120 Servings';
    return '30 Servings';
  };

  const supplementType = getSupplementType(product.title, product.description);
  const servingInfo = getServingInfo(product.description);

  return (
    <div className="min-h-screen bg-bbd-black pt-24">
      {/* Navigation Breadcrumb */}
      <ProductBreadcrumb productTitle={product.title} productType="supplement" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <ProductImage image={productImage} title={product.title} placeholder="supplement" />

            {/* Supplement Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-bbd-charcoal/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-bbd-orange/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-bbd-ivory">{supplementType}</p>
                <p className="text-xs text-bbd-ivory/60">Category</p>
              </div>
              <div className="bg-bbd-charcoal/30 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-bbd-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-bbd-ivory">{servingInfo}</p>
                <p className="text-xs text-bbd-ivory/60">Per Container</p>
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
              <ProductPrice price={price} rating={4.8} />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-bbd-ivory mb-4">About This Supplement</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-bbd-ivory/80 leading-relaxed">
                  {product.description || "Premium quality supplement designed to support your fitness goals and optimize your performance. Made with the highest quality ingredients."}
                </p>
              </div>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="text-xl font-bold text-bbd-ivory mb-4">Key Benefits</h3>
              <div className="space-y-3">
                {supplementType === 'Protein' && [
                  "25g of high-quality whey protein per serving",
                  "Fast-absorbing formula for post-workout recovery",
                  "Supports muscle growth and repair",
                  "Low in fat and carbohydrates",
                  "Great taste with multiple flavor options"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-bbd-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-bbd-ivory/80">{benefit}</span>
                  </div>
                ))}
                {supplementType === 'Pre-Workout' && [
                  "Explosive energy boost for intense workouts",
                  "Enhanced focus and mental clarity",
                  "Improved endurance and performance",
                  "No crash formula",
                  "Scientifically-backed ingredients"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-bbd-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-bbd-ivory/80">{benefit}</span>
                  </div>
                ))}
                {(supplementType !== 'Protein' && supplementType !== 'Pre-Workout') && [
                  "Premium quality ingredients",
                  "Third-party tested for purity",
                  "Optimal dosing for maximum effectiveness",
                  "No artificial fillers or additives",
                  "Manufactured in GMP-certified facilities"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-bbd-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-bbd-ivory/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Use */}
            <div>
              <h3 className="text-xl font-bold text-bbd-ivory mb-4">Suggested Use</h3>
              <p className="text-bbd-ivory/80">
                {supplementType === 'Protein' && "Mix 1 scoop with 8-10 oz of water or milk. Consume within 30 minutes after your workout for optimal recovery."}
                {supplementType === 'Pre-Workout' && "Mix 1 scoop with 8-10 oz of water and consume 20-30 minutes before your workout. Do not exceed 2 scoops in a 24-hour period."}
                {(supplementType !== 'Protein' && supplementType !== 'Pre-Workout') && "Follow the directions on the label or as directed by your healthcare professional."}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <ProductQuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

              <AddToCartButton
                variantId={selectedVariant?.id || ''}
                quantity={quantity}
                disabled={!selectedVariant}
                buttonText="ADD TO CART"
                showPrice={false}
                className="mb-3 bg-bbd-black border-2 border-bbd-orange text-bbd-orange hover:bg-bbd-orange hover:text-bbd-black"
              />

              <button
                onClick={() => {
                  if (!selectedVariant) return;
                  const checkoutUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${selectedVariant.id.split('/').pop()}:${quantity}`;
                  window.location.href = checkoutUrl;
                }}
                disabled={!selectedVariant}
                className="w-full bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black font-bold text-lg py-4 rounded-lg hover:shadow-2xl hover:shadow-bbd-orange/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                BUY NOW - {formatPrice(price.amount, price.currencyCode)}
              </button>

              {/* Trust Indicators */}
              <ProductTrustIndicators 
                indicators={[
                  {
                    icon: (
                      <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    ),
                    text: "Fast Shipping"
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ),
                    text: "Quality Tested"
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8 text-bbd-orange mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ),
                    text: "100% Authentic"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}