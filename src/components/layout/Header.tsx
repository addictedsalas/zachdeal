'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CartDrawer from '@/components/cart/CartDrawer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/programs', label: 'Programs' },
    { href: '/supplements', label: 'Supplements' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-bbd-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/zachLogo.png"
                alt="Built By Deal"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-200 hover:text-bbd-orange ${
                    pathname === link.href ? 'text-bbd-orange' : 'text-bbd-ivory'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side - Cart, Auth, and CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart Icon */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-bbd-ivory hover:text-bbd-orange transition-colors"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bbd-orange text-bbd-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Authentication Section - Always show something */}
              {user ? (
                /* User is logged in - show profile dropdown */
                <UserProfileDropdown />
              ) : (
                /* User is not logged in - show login and get started buttons */
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-bbd-ivory hover:text-bbd-orange transition-colors font-medium"
                  >
                    Login
                  </button>
                  <Link
                    href="/plans"
                    className="bg-gradient-to-r from-bbd-orange to-bbd-gold hover:from-bbd-gold hover:to-bbd-orange text-bbd-black font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Mobile Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-bbd-ivory hover:text-bbd-orange transition-colors"
                aria-label="Shopping cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bbd-orange text-bbd-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-bbd-ivory hover:text-bbd-orange transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-bbd-black/95 backdrop-blur-md shadow-lg">
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 font-medium transition-colors duration-200 hover:text-bbd-orange ${
                      pathname === link.href ? 'text-bbd-orange' : 'text-bbd-ivory'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Authentication Section */}
                <div className="border-t border-bbd-orange/20 pt-3 mt-3">
                  {user ? (
                    /* User is logged in - show profile options */
                    <UserProfileDropdown />
                  ) : (
                    /* User is not logged in - show login and get started buttons */
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setShowAuthModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 text-bbd-ivory hover:text-bbd-orange transition-colors font-medium"
                      >
                        Login
                      </button>
                      <Link
                        href="/plans"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center bg-gradient-to-r from-bbd-orange to-bbd-gold hover:from-bbd-gold hover:to-bbd-orange text-bbd-black font-bold py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
