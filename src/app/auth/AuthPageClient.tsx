'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Mail, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function AuthPageClient() {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [verificationSent, setVerificationSent] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signUp, signIn, signInWithGoogle, user, profile, loading: authLoading } = useAuth()
  
  const planType = searchParams.get('plan')
  const planName = searchParams.get('planName')

  // Check for email confirmation in URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const type = hashParams.get('type')
    
    if (type === 'signup' && accessToken) {
      console.log('Email verification detected, waiting for auth context to be ready...')
      
      // Wait for AuthContext to process the session before redirecting
      const checkAuthReady = () => {
        if (!authLoading && user) {
          console.log('Auth context ready, proceeding with post-verification flow')
          // Email was confirmed, proceed to checkout if plan was selected
          if (planType) {
            handleStripeCheckout(planType)
          } else {
            router.push('/dashboard')
          }
        } else if (!authLoading && !user) {
          console.log('Auth context ready but no user found after verification')
          // Something went wrong with verification, stay on auth page
        } else {
          // Still loading, check again in a bit
          setTimeout(checkAuthReady, 500)
        }
      }
      
      // Start checking after a small delay to allow auth context to process
      setTimeout(checkAuthReady, 1000)
    }
  }, []) // Remove dependencies to prevent re-running

  // Handle redirect after successful authentication
  useEffect(() => {
    if (user && !authLoading && !verificationSent) {
      console.log('User authenticated, checking redirect logic...')
      
      // If plan was selected, proceed to checkout
      if (planType) {
        console.log('Plan selected, proceeding to checkout:', planType)
        handleStripeCheckout(planType)
        return
      }
      
      // Check subscription status and redirect accordingly
      if (profile) {
        const hasActiveSubscription = profile.stripe_status === 'active'
        if (hasActiveSubscription) {
          console.log('User has active subscription, redirecting to dashboard')
          router.push('/dashboard')
        } else {
          console.log('User has no active subscription, redirecting to plans')
          // User is logged in but has no active subscription - redirect to plans
          router.push('/plans')
        }
      } else if (!authLoading) {
        console.log('Profile not loaded but auth not loading, redirecting to plans as fallback')
        // Profile not loaded yet, redirect to plans as fallback
        router.push('/plans')
      }
    }
  }, [user, profile, authLoading, planType, verificationSent, router])

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let result
      if (mode === 'signup') {
        result = await signUp(email, password, fullName)
        
        if (result.error) {
          throw new Error(result.error.message)
        }
        
        // Show verification message instead of proceeding immediately
        setVerificationSent(true)
        setMode('verify')
        
      } else {
        result = await signIn(email, password)
        
        if (result.error) {
          throw new Error(result.error.message)
        }

        // If plan was selected, trigger Stripe checkout directly
        if (planType) {
          await handleStripeCheckout(planType)
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleStripeCheckout = async (planType: string) => {
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

      if (!response.ok || data.error) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const { id: sessionId } = data;

      if (!sessionId) {
        throw new Error('No session ID returned from server');
      }

      const stripe = await import('@/lib/stripeClient').then(mod => mod.stripePromise);
      const stripeInstance = await stripe;
      
      if (!stripeInstance) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripeInstance.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(`Checkout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await signInWithGoogle()
      
      if (result.error) {
        throw new Error(result.error.message)
      }

      // If plan was selected, trigger Stripe checkout directly
      if (planType) {
        await handleStripeCheckout(planType)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-bbd-charcoal">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-bbd-ivory font-bebas">
                BUILT BY DEAL
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-bbd-ivory font-bebas">
              {mode === 'signup' ? 'Join Built By Deal' : mode === 'verify' ? 'Verify Your Email' : 'Welcome Back'}
            </h2>
            {planName && (
              <p className="mt-2 text-sm text-bbd-ivory/60">
                {mode === 'signup' ? 'Create your account to get' : mode === 'verify' ? 'Verify your email to continue with' : 'Sign in to continue with'} {planName}
              </p>
            )}
            <p className="mt-2 text-sm text-bbd-ivory/80">
              {mode === 'signup' 
                ? 'Start your fitness transformation today' 
                : mode === 'verify' 
                  ? 'We sent a verification email to your inbox. Please verify your email to continue.' 
                  : 'Continue your fitness journey'
              }
            </p>
          </div>

          {/* Google Sign In - Temporarily disabled until provider is configured */}
          {mode !== 'verify' && (
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-bbd-ivory/20 rounded-lg hover:bg-bbd-ivory/5 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          )}

          {/* Divider - Only show if Google is enabled */}
          {mode !== 'verify' && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-bbd-ivory/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bbd-charcoal text-bbd-ivory/60">or</span>
              </div>
            </div>
          )}

          {/* Email Form */}
          {mode !== 'verify' && (
            <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-bbd-ivory/80">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-bbd-black border border-bbd-ivory/20 rounded-lg text-bbd-ivory placeholder-bbd-ivory/40 focus:outline-none focus:ring-2 focus:ring-bbd-orange focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-bbd-ivory/80">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 bg-bbd-black border border-bbd-ivory/20 rounded-lg text-bbd-ivory placeholder-bbd-ivory/40 focus:outline-none focus:ring-2 focus:ring-bbd-orange focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-bbd-ivory/40" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-bbd-ivory/80">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 pr-10 bg-bbd-black border border-bbd-ivory/20 rounded-lg text-bbd-ivory placeholder-bbd-ivory/40 focus:outline-none focus:ring-2 focus:ring-bbd-orange focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-bbd-ivory/40 hover:text-bbd-ivory/60"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-bbd-black bg-gradient-to-r from-bbd-orange to-bbd-gold hover:from-bbd-gold hover:to-bbd-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bbd-orange transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bbd-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  mode === 'signup' ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>
          )}

          {/* Verification Message */}
          {mode === 'verify' && (
            <div className="text-center">
              <p className="text-lg text-bbd-ivory/90 mb-6">
                We sent a verification email to your inbox. Please verify your email to continue.
              </p>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-sm text-bbd-ivory/60 hover:text-bbd-orange transition-colors"
              >
                Resend Verification Email
              </button>
            </div>
          )}

          {/* Toggle Mode */}
          {mode !== 'verify' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setMode(mode === 'signup' ? 'login' : 'signup')
                  setError('')
                }}
                className="text-sm text-bbd-ivory/60 hover:text-bbd-orange transition-colors"
              >
                {mode === 'signup' 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          )}

          {/* Back to Plans */}
          <div className="mt-4 text-center">
            <Link
              href="/plans"
              className="text-sm text-bbd-ivory/40 hover:text-bbd-ivory/60 transition-colors"
            >
              ← Back to plans
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:block relative flex-1">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/signupImage.jpg')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-bbd-black/40"></div>
          
          {/* Content overlay */}
          <div className="relative z-10 flex items-center justify-center h-full px-8">
            <div className="text-center max-w-md">
              <h3 className="text-4xl font-bold text-bbd-ivory mb-4 font-bebas">
                Transform Your Body
              </h3>
              <p className="text-lg text-bbd-ivory/90 mb-6">
                Join thousands of athletes who&apos;ve achieved their fitness goals with Built By Deal&apos;s proven programs.
              </p>
              <div className="flex items-center justify-center space-x-8 text-bbd-ivory/80">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bbd-orange">10K+</div>
                  <div className="text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bbd-orange">95%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bbd-orange">24/7</div>
                  <div className="text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}