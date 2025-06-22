'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stripePromise } from '@/lib/stripeClient';
import { useAuth } from '@/contexts/AuthContext';

interface CheckoutButtonProps {
  planType: string;
  planName: string;
  className?: string;
}

export default function CheckoutButton({ 
  planType, 
  planName, 
  className = ""
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    // If user is not authenticated, redirect to auth page with plan info
    if (!user) {
      const params = new URLSearchParams({
        plan: planType,
        planName: planName
      });
      router.push(`/auth?${params.toString()}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
        }),
      });

      const data = await response.json();
      console.log('Checkout response:', data);

      if (!response.ok || data.error) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const { id: sessionId } = data;

      if (!sessionId) {
        throw new Error('No session ID returned from server');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`
        relative overflow-hidden group transition-all duration-300
        bg-gradient-to-r from-bbd-orange to-bbd-gold
        hover:from-bbd-gold hover:to-bbd-orange
        text-bbd-black font-bold py-4 px-8 rounded-lg
        transform hover:scale-105 hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span className="relative z-10 flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bbd-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          <>
            <span className="text-lg font-bold">
              {user ? `Get ${planName}` : `Sign Up for ${planName}`}
            </span>
            {!user && (
              <span className="text-sm opacity-80 mt-1">
                Create account & subscribe
              </span>
            )}
          </>
        )}
      </span>
      
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
    </button>
  );
}
