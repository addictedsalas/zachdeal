import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PLAN_CONFIGS, PlanType } from '@/lib/stripeClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable');
      return NextResponse.json(
        { error: 'Stripe configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Handle subscription plans (existing functionality)
    if (body.planType) {
      const { planType } = body;

      if (!planType || !PLAN_CONFIGS[planType as PlanType]) {
        return NextResponse.json(
          { error: 'Invalid plan type' },
          { status: 400 }
        );
      }

      const planConfig = PLAN_CONFIGS[planType as PlanType];
      console.log('Creating checkout session for plan:', planConfig);

      // Create checkout session for subscription
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: planConfig.name,
                description: `Built By Deal ${planConfig.name} - Transform your fitness journey`,
              },
              unit_amount: planConfig.price,
              recurring: {
                interval: planConfig.interval,
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/plans`,
        subscription_data: {
          metadata: {
            plan_type: planType,
          },
        },
        metadata: {
          plan_type: planType,
        },
      });

      console.log('Checkout session created successfully:', session.id);
      return NextResponse.json({ id: session.id });
    }
    
    // Handle one-time product purchases (new functionality for programs)
    if (body.productHandle) {
      const { 
        productHandle, 
        productTitle, 
        productPrice, 
        currency = 'usd', 
        quantity = 1,
        customerEmail,
        customerName,
        successUrl,
        cancelUrl
      } = body;

      if (!productHandle || !productTitle || !productPrice) {
        return NextResponse.json(
          { error: 'Missing required product information' },
          { status: 400 }
        );
      }

      console.log('Creating checkout session for product:', productTitle);

      // Create checkout session for one-time purchase
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: productTitle,
                description: `Built By Deal - ${productTitle}`,
                metadata: {
                  shopify_handle: productHandle,
                },
              },
              unit_amount: Math.round(parseFloat(productPrice) * 100), // Convert to cents
            },
            quantity: quantity,
          },
        ],
        mode: 'payment',
        success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/${productHandle}`,
        customer_email: customerEmail,
        metadata: {
          product_handle: productHandle,
          product_title: productTitle,
          customer_name: customerName || '',
          purchase_type: 'program',
        },
        automatic_tax: {
          enabled: false, // Set to true if you want to enable automatic tax calculation
        },
      });

      console.log('Product checkout session created successfully:', session.id);
      return NextResponse.json({ id: session.id });
    }

    return NextResponse.json(
      { error: 'Invalid request: must include either planType or productHandle' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
