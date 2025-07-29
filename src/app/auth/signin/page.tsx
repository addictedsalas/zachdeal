'use client';

import { useState } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signIn } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await signIn(email);
      setMessage('Check your email for a magic link to sign in!');
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bbd-charcoal flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-bbd-black/50 backdrop-blur-sm rounded-2xl p-8 border border-bbd-orange/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-bbd-ivory mb-2 font-bebas">
              Welcome Back
            </h1>
            <p className="text-bbd-ivory/70">
              Sign in to access your fitness journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-bbd-ivory mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-bbd-charcoal border border-bbd-orange/30 rounded-lg 
                         text-bbd-ivory placeholder-bbd-ivory/50 focus:outline-none focus:border-bbd-orange 
                         focus:ring-2 focus:ring-bbd-orange/20 transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-bbd-orange to-bbd-gold hover:from-bbd-gold 
                       hover:to-bbd-orange text-bbd-black font-bold py-3 px-6 rounded-lg 
                       transform hover:scale-105 transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Magic Link...
                </span>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message.includes('Check your email') 
                ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-bbd-ivory/60 text-sm">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => router.push('/plans')}
                className="text-bbd-orange hover:text-bbd-gold transition-colors duration-200"
              >
                Choose a plan to get started
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
