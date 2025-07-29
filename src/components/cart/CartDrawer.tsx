'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeFromCart, isLoading } = useCart();

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-bbd-charcoal shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-bbd-black/20">
                      <Dialog.Title className="font-display text-2xl text-bbd-ivory">
                        YOUR CART
                      </Dialog.Title>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-bbd-ivory transition-colors"
                        onClick={closeCart}
                      >
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      {!cart || cart.lines.edges.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-400 mb-4">Your cart is empty</p>
                          <button
                            onClick={closeCart}
                            className="text-bbd-orange hover:text-bbd-gold transition-colors font-medium"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      ) : (
                        <ul className="space-y-6">
                          {cart.lines.edges.map(({ node: item }) => (
                            <li key={item.id} className="flex gap-4">
                              {/* Product Image */}
                              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-bbd-black/20">
                                {item.merchandise.product.featuredImage ? (
                                  <Image
                                    src={item.merchandise.product.featuredImage.url}
                                    alt={item.merchandise.product.featuredImage.altText || item.merchandise.title}
                                    fill
                                    className="object-cover object-center"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full">
                                    <span className="text-gray-500">No image</span>
                                  </div>
                                )}
                              </div>

                              {/* Product Details */}
                              <div className="flex flex-1 flex-col">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="text-sm font-medium text-bbd-ivory">
                                      <Link
                                        href={`/products/${item.merchandise.product.handle}`}
                                        onClick={closeCart}
                                        className="hover:text-bbd-orange transition-colors"
                                      >
                                        {item.merchandise.product.title}
                                      </Link>
                                    </h3>
                                    {item.merchandise.title !== 'Default Title' && (
                                      <p className="mt-1 text-sm text-gray-400">
                                        {item.merchandise.title}
                                      </p>
                                    )}
                                  </div>
                                  <p className="text-sm font-medium text-bbd-ivory">
                                    {formatPrice(
                                      item.merchandise.priceV2.amount,
                                      item.merchandise.priceV2.currencyCode
                                    )}
                                  </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="mt-4 flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      disabled={isLoading || item.quantity <= 1}
                                      className="p-1 rounded-md bg-bbd-black/20 hover:bg-bbd-black/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M20 12H4"
                                        />
                                      </svg>
                                    </button>
                                    <span className="text-sm font-medium text-bbd-ivory w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      disabled={isLoading}
                                      className="p-1 rounded-md bg-bbd-black/20 hover:bg-bbd-black/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 4v16m8-8H4"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    disabled={isLoading}
                                    className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                  >
                                    <span className="sr-only">Remove</span>
                                    <svg
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {cart && cart.lines.edges.length > 0 && (
                      <div className="border-t border-bbd-black/20 px-6 py-6">
                        <div className="flex justify-between text-base font-medium text-bbd-ivory mb-6">
                          <p>Subtotal</p>
                          <p>
                            {cart.cost?.subtotalAmount ? 
                              formatPrice(
                                cart.cost.subtotalAmount.amount,
                                cart.cost.subtotalAmount.currencyCode
                              ) : 
                              formatPrice(
                                cart.cost?.totalAmount?.amount || '0',
                                cart.cost?.totalAmount?.currencyCode || 'USD'
                              )
                            }
                          </p>
                        </div>
                        <p className="text-sm text-gray-400 mb-6">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <button
                          onClick={handleCheckout}
                          disabled={isLoading}
                          className="w-full bg-bbd-orange text-bbd-black font-semibold py-3 px-6 rounded-md hover:bg-bbd-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          CHECKOUT
                        </button>
                        <button
                          onClick={closeCart}
                          className="w-full mt-3 text-center text-sm text-gray-400 hover:text-bbd-ivory transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
