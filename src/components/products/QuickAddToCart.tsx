'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface QuickAddToCartProps {
  variantId: string;
  className?: string;
}

export default function QuickAddToCart({ variantId, className = '' }: QuickAddToCartProps) {
  const { addToCart, isLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if used in a Link
    e.stopPropagation();
    
    if (!variantId || isAdding) return;

    try {
      setIsAdding(true);
      await addToCart(variantId, 1); // Quick add always adds 1 item
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleQuickAdd}
      disabled={isLoading || isAdding || !variantId}
      className={`
        group relative p-2 bg-bbd-black/80 backdrop-blur-sm rounded-full 
        hover:bg-bbd-orange transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label="Quick add to cart"
    >
      {isAdding ? (
        <div className="w-5 h-5 border-2 border-bbd-ivory group-hover:border-bbd-black border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <svg 
          className="w-5 h-5 text-bbd-ivory group-hover:text-bbd-black transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
      )}
    </button>
  );
}