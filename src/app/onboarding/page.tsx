'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Target, Dumbbell, Clock, User, AlertTriangle } from 'lucide-react'

interface OnboardingData {
  age: number | null
  weight: number | null
  gender: 'male' | 'female' | 'other'
  food_allergies: string[]
  fitness_objectives: string[]
  fitness_level: 'beginner' | 'intermediate' | 'advanced'
  workout_frequency: number
  selected_workout_plan: string
}

const fitnessObjectives = [
  'Build Muscle Mass',
  'Lose Weight/Fat Loss',
  'Increase Strength',
  'Improve Endurance',
  'Get Toned/Definition',
  'General Fitness',
  'Athletic Performance',
  'Rehabilitation/Recovery'
]

const commonAllergies = [
  'Dairy/Lactose',
  'Gluten/Wheat',
  'Nuts/Tree Nuts',
  'Shellfish',
  'Eggs',
  'Soy',
  'Fish',
  'None'
]

const workoutPlans = [
  {
    id: 'strength-builder',
    name: 'Strength Builder',
    description: 'Perfect for building raw strength and power with compound movements',
    objectives: ['Build Muscle Mass', 'Increase Strength'],
    level: ['beginner', 'intermediate', 'advanced']
  },
  {
    id: 'lean-physique',
    name: 'Lean Physique',
    description: 'Ideal for fat loss while maintaining muscle with high-intensity training',
    objectives: ['Lose Weight/Fat Loss', 'Get Toned/Definition'],
    level: ['beginner', 'intermediate', 'advanced']
  },
  {
    id: 'athletic-performance',
    name: 'Athletic Performance',
    description: 'Designed for peak performance and functional fitness',
    objectives: ['Athletic Performance', 'Improve Endurance', 'General Fitness'],
    level: ['intermediate', 'advanced']
  }
]

export default function OnboardingPage() {
  const { user, profile, updateProfile, loading } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    age: null,
    weight: null,
    gender: 'male',
    food_allergies: [],
    fitness_objectives: [],
    fitness_level: 'beginner',
    workout_frequency: 3,
    selected_workout_plan: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  // Pre-populate with existing data if user is re-doing onboarding
  useEffect(() => {
    if (profile) {
      setOnboardingData(prev => ({
        ...prev,
        age: profile.age || null,
        weight: profile.weight || null,
        gender: (profile.gender as 'male' | 'female' | 'other') || 'male',
        food_allergies: profile.food_allergies || [],
        fitness_objectives: profile.fitness_objectives || [],
        fitness_level: (profile.fitness_level as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
        workout_frequency: profile.workout_frequency || 3,
        selected_workout_plan: profile.selected_workout_plan || ''
      }))
    }
  }, [profile])

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleComplete = async () => {
    if (!user) return

    setIsSubmitting(true)
    try {
      console.log('Submitting onboarding data:', onboardingData)
      
      const updateData = {
        age: onboardingData.age,
        weight: onboardingData.weight,
        gender: onboardingData.gender,
        food_allergies: onboardingData.food_allergies,
        fitness_objectives: onboardingData.fitness_objectives,
        fitness_level: onboardingData.fitness_level,
        workout_frequency: onboardingData.workout_frequency,
        selected_workout_plan: onboardingData.selected_workout_plan,
        onboarding_completed: true
      }

      const { error } = await updateProfile(updateData)

      if (error) {
        console.error('Failed to update profile:', error)
        alert('Failed to save onboarding data. Please try again.')
      } else {
        console.log('Onboarding completed successfully')
        router.push('/dashboard?tab=plan')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleAllergy = (allergy: string) => {
    setOnboardingData(prev => ({
      ...prev,
      food_allergies: prev.food_allergies.includes(allergy)
        ? prev.food_allergies.filter(a => a !== allergy)
        : [...prev.food_allergies, allergy]
    }))
  }

  const toggleObjective = (objective: string) => {
    setOnboardingData(prev => ({
      ...prev,
      fitness_objectives: prev.fitness_objectives.includes(objective)
        ? prev.fitness_objectives.filter(o => o !== objective)
        : [...prev.fitness_objectives, objective]
    }))
  }

  const getRecommendedPlan = () => {
    const userObjectives = onboardingData.fitness_objectives
    
    // Find the plan that matches the most objectives
    let bestMatch = workoutPlans[0]
    let maxMatches = 0
    
    for (const plan of workoutPlans) {
      const matches = plan.objectives.filter(obj => 
        userObjectives.some(userObj => userObj.includes(obj) || obj.includes(userObj))
      ).length
      
      if (matches > maxMatches && plan.level.includes(onboardingData.fitness_level)) {
        maxMatches = matches
        bestMatch = plan
      }
    }
    
    return bestMatch
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#1A1B18] flex items-center justify-center">
        <div className="text-[#EFEAE0]">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat relative" 
      style={{ backgroundImage: 'url(/onboardingBG.jpeg)' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Onboarding Modal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#000000]/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#EFEAE0]/20 w-full max-w-2xl p-8 relative">
          {/* Close Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="absolute top-6 right-6 text-[#EFEAE0]/60 hover:text-[#EFEAE0] transition-colors p-2 z-20"
            aria-label="Exit onboarding"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header and Segmented Progress Bar */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#EFEAE0] font-['Bebas_Neue'] mb-6 text-center">BUILD YOUR PLAN</h1>
            
            {/* Segmented Progress Bar */}
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    stepNumber <= step 
                      ? 'bg-[#EE7F0E]' 
                      : 'bg-[#1A1B18]/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Step Labels */}
            <div className="flex justify-between text-xs text-[#EFEAE0]/60 px-1">
              <span className={step >= 1 ? 'text-[#EE7F0E]' : ''}>Basic Info</span>
              <span className={step >= 2 ? 'text-[#EE7F0E]' : ''}>Allergies</span>
              <span className={step >= 3 ? 'text-[#EE7F0E]' : ''}>Goals</span>
              <span className={step >= 4 ? 'text-[#EE7F0E]' : ''}>Experience</span>
              <span className={step >= 5 ? 'text-[#EE7F0E]' : ''}>Plan</span>
            </div>
          </div>

          <CardContent className="px-8 pb-8">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-12 h-12 text-[#EE7F0E] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#EFEAE0] mb-2">Tell us about yourself</h3>
                  <p className="text-[#EFEAE0]/70">This helps us personalize your experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#EFEAE0] font-semibold mb-2">Age</label>
                    <input
                      type="number"
                      min="13"
                      max="100"
                      value={onboardingData.age || ''}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, age: parseInt(e.target.value) || null }))}
                      className="w-full p-3 rounded-lg bg-[#1A1B18] border border-[#EFEAE0]/20 text-[#EFEAE0] focus:border-[#EE7F0E] focus:outline-none"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EFEAE0] font-semibold mb-2">Weight (lbs)</label>
                    <input
                      type="number"
                      min="50"
                      max="500"
                      value={onboardingData.weight || ''}
                      onChange={(e) => setOnboardingData(prev => ({ ...prev, weight: parseInt(e.target.value) || null }))}
                      className="w-full p-3 rounded-lg bg-[#1A1B18] border border-[#EFEAE0]/20 text-[#EFEAE0] focus:border-[#EE7F0E] focus:outline-none"
                      placeholder="Enter your weight"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#EFEAE0] font-semibold mb-3">Gender</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['male', 'female', 'other'] as const).map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setOnboardingData(prev => ({ ...prev, gender }))}
                        className={`p-3 rounded-lg border-2 text-center transition-all capitalize ${
                          onboardingData.gender === gender
                            ? 'border-[#EE7F0E] bg-[#EE7F0E]/10 text-[#EE7F0E]'
                            : 'border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50 text-[#EFEAE0]'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleNext}
                    disabled={!onboardingData.age || !onboardingData.weight}
                    className="bg-[#EE7F0E] hover:bg-[#EE7F0E]/90 text-white disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Food Allergies */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AlertTriangle className="w-12 h-12 text-[#EE7F0E] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#EFEAE0] mb-2">Food allergies & restrictions</h3>
                  <p className="text-[#EFEAE0]/70">Help us recommend safe nutrition options</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {commonAllergies.map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        onboardingData.food_allergies.includes(allergy)
                          ? 'border-[#EE7F0E] bg-[#EE7F0E]/10 text-[#EE7F0E]'
                          : 'border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50 text-[#EFEAE0]'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    onClick={handleBack}
                    variant="outline"
                    className="border-[#EFEAE0]/20 text-[#EFEAE0] hover:bg-[#EFEAE0]/10"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    className="bg-[#EE7F0E] hover:bg-[#EE7F0E]/90 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Fitness Objectives */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Target className="w-12 h-12 text-[#EE7F0E] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#EFEAE0] mb-2">What are your fitness goals?</h3>
                  <p className="text-[#EFEAE0]/70">Select all that apply - we&apos;ll prioritize these in your plan</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fitnessObjectives.map((objective) => (
                    <button
                      key={objective}
                      onClick={() => toggleObjective(objective)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        onboardingData.fitness_objectives.includes(objective)
                          ? 'border-[#EE7F0E] bg-[#EE7F0E]/10 text-[#EE7F0E]'
                          : 'border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50 text-[#EFEAE0]'
                      }`}
                    >
                      {objective}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    onClick={handleBack}
                    variant="outline"
                    className="border-[#EFEAE0]/20 text-[#EFEAE0] hover:bg-[#EFEAE0]/10"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={onboardingData.fitness_objectives.length === 0}
                    className="bg-[#EE7F0E] hover:bg-[#EE7F0E]/90 text-white disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Experience Level & Frequency */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Dumbbell className="w-12 h-12 text-[#EE7F0E] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#EFEAE0] mb-2">Your fitness experience</h3>
                  <p className="text-[#EFEAE0]/70">Help us match the right intensity for you</p>
                </div>

                <div>
                  <label className="block text-[#EFEAE0] font-semibold mb-3">Experience Level</label>
                  <div className="space-y-3">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setOnboardingData(prev => ({ ...prev, fitness_level: level }))}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          onboardingData.fitness_level === level
                            ? 'border-[#EE7F0E] bg-[#EE7F0E]/10'
                            : 'border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50'
                        }`}
                      >
                        <div className="font-semibold capitalize text-[#EFEAE0]">{level}</div>
                        <div className="text-sm text-[#EFEAE0]/70 mt-1">
                          {level === 'beginner' && 'New to working out or getting back into it'}
                          {level === 'intermediate' && 'Regular gym-goer with 6+ months experience'}
                          {level === 'advanced' && 'Experienced lifter with 2+ years of training'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#EFEAE0] font-semibold mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Workouts per week
                  </label>
                  <div className="flex gap-3">
                    {[3, 4, 5, 6].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setOnboardingData(prev => ({ ...prev, workout_frequency: freq }))}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all text-center ${
                          onboardingData.workout_frequency === freq
                            ? 'border-[#EE7F0E] bg-[#EE7F0E]/10 text-[#EE7F0E]'
                            : 'border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50 text-[#EFEAE0]'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    onClick={handleBack}
                    variant="outline"
                    className="border-[#EFEAE0]/20 text-[#EFEAE0] hover:bg-[#EFEAE0]/10"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    className="bg-[#EE7F0E] hover:bg-[#EE7F0E]/90 text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Plan Recommendation */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="w-12 h-12 text-[#EE7F0E] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#EFEAE0] mb-2">Your recommended plan</h3>
                  <p className="text-[#EFEAE0]/70">Based on your goals and experience level</p>
                </div>

                {(() => {
                  const recommendedPlan = getRecommendedPlan()
                  if (!onboardingData.selected_workout_plan) {
                    setOnboardingData(prev => ({ ...prev, selected_workout_plan: recommendedPlan.id }))
                  }
                  
                  return (
                    <div className="space-y-4">
                      <div className="p-6 rounded-lg border-2 border-[#EE7F0E] bg-[#EE7F0E]/10">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-xl font-semibold text-[#EFEAE0]">{recommendedPlan.name}</h4>
                          <Badge className="bg-[#FFC842] text-[#1A1B18]">Recommended</Badge>
                        </div>
                        <p className="text-[#EFEAE0]/80 mb-4">{recommendedPlan.description}</p>
                        <div className="text-sm text-[#EFEAE0]/60">
                          Perfect match for: {recommendedPlan.objectives.join(', ')}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-[#EFEAE0]/70 text-sm mb-4">
                          You can always adjust your plan later in your dashboard settings
                        </p>
                      </div>
                    </div>
                  )
                })()}

                <div className="flex justify-between pt-4">
                  <Button 
                    onClick={handleBack}
                    variant="outline"
                    className="border-[#EFEAE0]/20 text-[#EFEAE0] hover:bg-[#EFEAE0]/10"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleComplete}
                    disabled={isSubmitting}
                    className="bg-[#EE7F0E] hover:bg-[#EE7F0E]/90 text-white disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Complete Setup'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  )
}
