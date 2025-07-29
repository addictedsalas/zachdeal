'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/shopify';

interface AddToCartButtonProps {
  variantId: string;
  quantity: number;
  price?: {
    amount: string;
    currencyCode: string;
  };
  disabled?: boolean;
  className?: string;
  buttonText?: string;
  showPrice?: boolean;
}

export default function AddToCartButton({
  variantId,
  quantity,
  price,
  disabled = false,
  className = '',
  buttonText = 'ADD TO CART',
  showPrice = true
}: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (!variantId || disabled || isAdding) return;

    try {
      setIsAdding(true);
      await addToCart(variantId, quantity);
      
      // Show success state
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error instanceof Error ? error.message : 'Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const isDisabled = disabled || isLoading || isAdding || !variantId;

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`
        relative w-full font-bold text-lg py-4 rounded-lg transition-all duration-300 transform hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${className}
      `}
    >
      <span className={`flex items-center justify-center ${isAdding || showSuccess ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
        {buttonText}
        {showPrice && price && (
          <span className="ml-2">- {formatPrice(price.amount, price.currencyCode)}</span>
        )}
      </span>

      {/* Loading State */}
      {isAdding && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-bbd-black border-t-transparent rounded-full animate-spin"></div>
            <span>Adding...</span>
          </div>
        </div>
      )}

      {/* Success State */}
      {showSuccess && !isAdding && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-bbd-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Added to Cart!</span>
          </div>
        </div>
      )}
    </button>
  );
}