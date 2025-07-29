import { Suspense } from 'react'
import AuthPageClient from './AuthPageClient'

// Loading fallback component
function AuthPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bbd-charcoal">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-bbd-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-bbd-ivory">Loading...</p>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <AuthPageClient />
    </Suspense>
  )
}