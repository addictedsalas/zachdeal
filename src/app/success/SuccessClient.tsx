'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Optional: Fetch session details to show customer info
      fetch(`/api/stripe/session-details?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.customer_email) {
            setCustomerEmail(data.customer_email);
          }
        })
        .catch(err => console.log('Could not fetch session details:', err));
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-bbd-charcoal flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-bbd-orange to-bbd-gold rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-bbd-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-bbd-ivory mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-bbd-ivory/80 mb-6">
          Welcome to Built By Deal! Your subscription has been activated.
          {customerEmail && (
            <>
              <br />
              <span className="text-bbd-orange font-medium">
                Confirmation sent to: {customerEmail}
              </span>
            </>
          )}
        </p>

        {/* Trial Info */}
        <div className="bg-bbd-charcoal/50 border border-bbd-orange/20 rounded-lg p-4 mb-6">
          <h3 className="text-bbd-gold font-semibold mb-2">Your 7-Day Free Trial</h3>
          <p className="text-bbd-ivory/70 text-sm">
            You won&apos;t be charged until your trial ends. Cancel anytime before then at no cost.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full bg-gradient-to-r from-bbd-orange to-bbd-gold text-bbd-black font-bold py-3 px-6 rounded-lg hover:from-bbd-gold hover:to-bbd-orange transition-all duration-300 transform hover:scale-105"
          >
            Start Your Fitness Journey
          </Link>
          
          <Link
            href="/"
            className="block w-full border border-bbd-ivory/20 text-bbd-ivory font-medium py-3 px-6 rounded-lg hover:bg-bbd-ivory/10 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Session ID for debugging */}
        {sessionId && (
          <p className="text-bbd-ivory/40 text-xs mt-6">
            Session: {sessionId.slice(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}