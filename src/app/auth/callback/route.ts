import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription);
    return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(error)}`, request.url));
  }

  if (code) {
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Auth callback error:', exchangeError);
        return NextResponse.redirect(new URL('/auth?error=callback_error', request.url));
      }

      console.log('Session exchange successful:', data.session?.user?.id);
      
      // Check if user has an existing profile and subscription
      if (data.session?.user?.id) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_status')
            .eq('id', data.session.user.id)
            .single();

          // Redirect based on subscription status
          if (profile?.stripe_status === 'active') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
          } else {
            // No active subscription, redirect to plans
            return NextResponse.redirect(new URL('/plans', request.url));
          }
        } catch (profileError) {
          console.error('Error checking profile:', profileError);
          // If profile check fails, redirect to plans as fallback
          return NextResponse.redirect(new URL('/plans', request.url));
        }
      }
    } catch (error) {
      console.error('Unexpected error in auth callback:', error);
      return NextResponse.redirect(new URL('/auth?error=unexpected_error', request.url));
    }
  }

  // No code parameter, redirect to auth page
  return NextResponse.redirect(new URL('/auth', request.url));
}
