import { Suspense } from 'react'
import SuccessClient from './SuccessClient'

// Loading fallback component
function SuccessFallback() {
  return (
    <div className="min-h-screen bg-bbd-charcoal flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-bbd-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-bbd-ivory">Processing your payment...</p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessClient />
    </Suspense>
  )
}