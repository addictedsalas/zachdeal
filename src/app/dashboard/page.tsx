'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardMetrics from '@/components/dashboard/DashboardMetrics'
import UpcomingWorkout from '@/components/dashboard/UpcomingWorkout'
import ChatAgent from '@/components/dashboard/ChatAgent'

export default function DashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-bbd-charcoal flex items-center justify-center">
        <div className="text-bbd-orange text-xl">Loading...</div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  // Check if user has active subscription
  const hasActiveSubscription = profile.stripe_status === 'active'

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-bbd-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-bbd-ivory mb-4">
            Subscription Required
          </h1>
          <p className="text-bbd-ivory/70 mb-6">
            You need an active subscription to access the dashboard.
          </p>
          <button
            onClick={() => router.push('/plans')}
            className="bg-bbd-orange text-white px-6 py-3 rounded-lg hover:bg-bbd-orange/90 transition-colors"
          >
            View Plans
          </button>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bbd-ivory mb-2">
            Hello, {profile.full_name || 'Athlete'}!
          </h1>
          <p className="text-bbd-ivory/70">
            You have 245+ AI fitness tasks.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardMetrics />
            <UpcomingWorkout />
          </div>

          {/* Right Column - Chat Agent */}
          <div className="lg:col-span-1">
            <ChatAgent />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
