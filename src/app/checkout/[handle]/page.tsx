"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, formatPrice, type Product } from '@/lib/shopify';
import { loadStripe } from '@stripe/stripe-js';
import { notFound } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getProductByHandle(resolvedParams.handle);
        if (!productData) {
          notFound();
        }
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [resolvedParams.handle]);

  const handleCheckout = async () => {
    if (!product || !customerInfo.email) return;
    
    setProcessing(true);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productHandle: product.handle,
          productTitle: product.title,
          productPrice: product.priceRange.minVariantPrice.amount,
          currency: product.priceRange.minVariantPrice.currencyCode,
          quantity,
          customerEmail: customerInfo.email,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout/${product.handle}`,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your checkout. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bbd-black flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-bbd-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-bbd-ivory">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const productImage = product.featuredImage || product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const subtotal = parseFloat(price.amount) * quantity;
  const total = subtotal; // Add tax calculation if needed

  return (
    <div className="min-h-screen bg-bbd-black">
      {/* Header */}
      <div className="bg-bbd-charcoal/20 py-4 border-b border-bbd-ivory/10 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/programs" className="flex items-center text-bbd-ivory hover:text-bbd-orange transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Programs
            </Link>
            <h1 className="font-bebas text-2xl text-bbd-ivory">SECURE CHECKOUT</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Customer Information Form */}
            <div className="space-y-8">
              <div>
                <h2 className="font-bebas text-3xl text-bbd-ivory mb-6">CUSTOMER INFORMATION</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-bbd-ivory mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-bbd-charcoal/30 border border-bbd-ivory/20 rounded-lg text-bbd-ivory placeholder-bbd-ivory/40 focus:border-bbd-orange focus:outline-none focus:ring-2 focus:ring-bbd-orange/20"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-bbd-ivory mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-4 py-3 bg-bbd-charcoal/30 border border-bbd-ivory/20 rounded-lg text-bbd-ivory placeholder-bbd-ivory/40 focus:border-bbd-orange focus:outline-none focus:ring-2 focus:ring-bbd-orange/20"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-bbd-ivory mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-4 py-3 bg-bbd-charcoal/30 border border-bbd-ivory/20 rounded-lg text-bbd-ivory placeholder-bbd-ivory/40 focus:border-bbd-orange focus:outline-none focus:ring-2 focus:ring-bbd-orange/20"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Trust */}
              <div className="bg-bbd-charcoal/20 rounded-xl p-6 border border-bbd-ivory/10">
                <h3 className="font-bold text-bbd-ivory mb-4 flex items-center">
                  <svg className="w-5 h-5 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure & Protected
                </h3>
                <div className="space-y-3 text-sm text-bbd-ivory/70">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    SSL encrypted checkout
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    30-day money-back guarantee
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-bbd-orange mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Instant digital delivery
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              <div>
                <h2 className="font-bebas text-3xl text-bbd-ivory mb-6">ORDER SUMMARY</h2>
                
                <div className="bg-bbd-charcoal/20 rounded-xl p-6 border border-bbd-ivory/10">
                  {/* Product Details */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-bbd-charcoal/30 flex-shrink-0">
                      {productImage ? (
                        <Image
                          src={productImage.url}
                          alt={productImage.altText || product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-bbd-ivory/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-bbd-ivory text-lg leading-tight">{product.title}</h3>
                      <p className="text-bbd-ivory/60 text-sm mt-1">Digital Program</p>
                      <p className="text-bbd-orange font-bold text-lg mt-2">
                        {formatPrice(price.amount, price.currencyCode)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
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

                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-6 border-t border-bbd-ivory/10">
                    <div className="flex justify-between text-bbd-ivory/70">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal.toString(), price.currencyCode)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-bbd-ivory pt-3 border-t border-bbd-ivory/10">
                      <span>Total</span>
                      <span className="text-bbd-orange">{formatPrice(total.toString(), price.currencyCode)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={processing || !customerInfo.email || !customerInfo.firstName || !customerInfo.lastName}
                className="w-full bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black font-bold text-xl py-4 rounded-lg hover:shadow-2xl hover:shadow-bbd-orange/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-bbd-black border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    COMPLETE PURCHASE - {formatPrice(total.toString(), price.currencyCode)}
                  </>
                )}
              </button>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-sm text-bbd-ivory/60 mb-4">Secure payment powered by Stripe</p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-800">VISA</span>
                  </div>
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-800">MC</span>
                  </div>
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-800">AMEX</span>
                  </div>
                  <div className="bg-white rounded px-2 py-1">
                    <span className="text-xs font-bold text-gray-800">DISC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
