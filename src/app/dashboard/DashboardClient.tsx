'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import TodayOverview from '@/components/dashboard/TodayOverview'
import WeeklyPlanView from '@/components/dashboard/WeeklyPlanView'
import VirtualAssistant from '@/components/dashboard/VirtualAssistant'

import { WorkoutProvider } from '@/contexts/WorkoutContext'

export default function DashboardClient() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Check for tab parameter from onboarding
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    // Redirect to onboarding if not completed
    if (!loading && user && profile && !profile.onboarding_completed) {
      router.push('/onboarding')
    }
  }, [loading, user, profile, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-orange-500 text-xl">Loading...</div>
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20">
          <div className="mb-6">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-200 mb-2 font-bebas">
              Subscription Required
            </h1>
            <p className="text-gray-200/70 mb-6">
              You need an active subscription to access your personalized fitness dashboard and workout plans.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/plans')}
                className="w-full bg-orange-500 hover:bg-orange-500/80 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Choose a Plan
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full border border-orange-500/30 text-orange-500 hover:bg-orange-500/10 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'plan':
        return (
          <WeeklyPlanView 
            selectedPlan={profile.selected_workout_plan || 'Strength Builder'}
            userProfile={{
              workout_frequency: profile.workout_frequency || 3,
              fitness_objectives: profile.fitness_objectives || []
            }}
          />
        )
      case 'overview':
      default:
        return <TodayOverview userProfile={{
          id: profile.id,
          name: profile.full_name ?? '',
          email: profile.email,
          selected_workout_plan: profile.selected_workout_plan || 'Strength Builder'
        }} />
    }
  }

  return (
    <WorkoutProvider>
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderTabContent()}
        
        {/* Virtual Assistant - Always present */}
        <VirtualAssistant userProfile={{
          full_name: profile.full_name ?? '',
          selected_workout_plan: profile.selected_workout_plan || 'Strength Builder'
        }} />
      </DashboardLayout>
    </WorkoutProvider>
  )
}