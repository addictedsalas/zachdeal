'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import SocialBar from './SocialBar'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if current page is a dashboard page or onboarding page
  const isDashboardPage = pathname?.startsWith('/dashboard')
  const isOnboardingPage = pathname === '/onboarding'
  
  if (isDashboardPage || isOnboardingPage) {
    // Dashboard and onboarding pages: no header, footer, or social bar
    return <>{children}</>
  }
  
  // Regular pages: include header, footer, and social bar
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <SocialBar />
    </>
  )
}
