'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  Dumbbell, 
  Target, 
  Settings,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface WorkoutDay {
  day: string
  date: string
  exercises: Exercise[]
  completed: boolean
  workoutInstanceId?: string
}

interface Exercise {
  name: string
  sets: number
  reps: string
  weight?: string
  notes?: string
}

// Sample workout data - this will be replaced with real data from the database
const sampleWorkoutPlans = {
  'strength-builder': {
    name: 'Strength Builder',
    description: 'Progressive overload focused on compound movements',
    weeklySchedule: {
      'Monday': [
        { name: 'Squat', sets: 4, reps: '6-8', weight: 'Progressive' },
        { name: 'Bench Press', sets: 4, reps: '6-8', weight: 'Progressive' },
        { name: 'Bent-Over Row', sets: 3, reps: '8-10' },
        { name: 'Overhead Press', sets: 3, reps: '8-10' }
      ],
      'Wednesday': [
        { name: 'Deadlift', sets: 3, reps: '5-6', weight: 'Progressive' },
        { name: 'Pull-ups', sets: 3, reps: '6-10' },
        { name: 'Dips', sets: 3, reps: '8-12' },
        { name: 'Plank', sets: 3, reps: '30-60s' }
      ],
      'Friday': [
        { name: 'Front Squat', sets: 3, reps: '8-10' },
        { name: 'Incline Bench', sets: 3, reps: '8-10' },
        { name: 'Romanian Deadlift', sets: 3, reps: '10-12' },
        { name: 'Face Pulls', sets: 3, reps: '12-15' }
      ]
    }
  },
  'muscle-mass': {
    name: 'Muscle Mass',
    description: 'Hypertrophy training with volume progression',
    weeklySchedule: {
      'Monday': [
        { name: 'Bench Press', sets: 4, reps: '8-12' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12' },
        { name: 'Tricep Dips', sets: 3, reps: '10-15' },
        { name: 'Lateral Raises', sets: 4, reps: '12-15' }
      ],
      'Tuesday': [
        { name: 'Squat', sets: 4, reps: '10-12' },
        { name: 'Romanian Deadlift', sets: 3, reps: '12-15' },
        { name: 'Bulgarian Split Squats', sets: 3, reps: '12 each leg' },
        { name: 'Calf Raises', sets: 4, reps: '15-20' }
      ],
      'Thursday': [
        { name: 'Pull-ups', sets: 4, reps: '8-12' },
        { name: 'Barbell Rows', sets: 3, reps: '10-12' },
        { name: 'Bicep Curls', sets: 3, reps: '12-15' },
        { name: 'Hammer Curls', sets: 3, reps: '12-15' }
      ],
      'Saturday': [
        { name: 'Overhead Press', sets: 4, reps: '8-10' },
        { name: 'Arnold Press', sets: 3, reps: '10-12' },
        { name: 'Upright Rows', sets: 3, reps: '12-15' },
        { name: 'Shrugs', sets: 3, reps: '15-20' }
      ]
    }
  },
  'fat-loss': {
    name: 'Fat Loss',
    description: 'High-intensity training with strength components',
    weeklySchedule: {
      'Monday': [
        { name: 'Burpees', sets: 4, reps: '10-15' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s' },
        { name: 'Jump Squats', sets: 3, reps: '15-20' },
        { name: 'Push-ups', sets: 3, reps: '10-15' }
      ],
      'Wednesday': [
        { name: 'Kettlebell Swings', sets: 4, reps: '20-25' },
        { name: 'High Knees', sets: 3, reps: '30s' },
        { name: 'Plank Jacks', sets: 3, reps: '15-20' },
        { name: 'Russian Twists', sets: 3, reps: '20-30' }
      ],
      'Friday': [
        { name: 'Squat Thrusts', sets: 4, reps: '12-15' },
        { name: 'Jumping Lunges', sets: 3, reps: '10 each leg' },
        { name: 'Bear Crawls', sets: 3, reps: '20s' },
        { name: 'Dead Bug', sets: 3, reps: '10 each side' }
      ],
      'Sunday': [
        { name: 'Sprint Intervals', sets: 5, reps: '30s on/30s off' },
        { name: 'Box Jumps', sets: 3, reps: '10-12' },
        { name: 'Battle Ropes', sets: 3, reps: '30s' },
        { name: 'Bicycle Crunches', sets: 3, reps: '20-30' }
      ]
    }
  },
  'athletic-performance': {
    name: 'Athletic Performance',
    description: 'Sport-specific training for peak performance',
    weeklySchedule: {
      'Monday': [
        { name: 'Power Clean', sets: 5, reps: '3-5' },
        { name: 'Back Squat', sets: 4, reps: '5-6' },
        { name: 'Bench Press', sets: 4, reps: '5-6' },
        { name: 'Pull-ups', sets: 3, reps: '8-10' }
      ],
      'Tuesday': [
        { name: 'Sprint Drills', sets: 6, reps: '40m' },
        { name: 'Plyometric Jumps', sets: 4, reps: '6-8' },
        { name: 'Agility Ladder', sets: 3, reps: '30s' },
        { name: 'Core Circuit', sets: 3, reps: '45s' }
      ],
      'Thursday': [
        { name: 'Deadlift', sets: 4, reps: '3-5' },
        { name: 'Single Leg RDL', sets: 3, reps: '8 each leg' },
        { name: 'Weighted Pull-ups', sets: 3, reps: '5-8' },
        { name: 'Turkish Get-ups', sets: 3, reps: '5 each side' }
      ],
      'Friday': [
        { name: 'Medicine Ball Throws', sets: 4, reps: '8-10' },
        { name: 'Lateral Bounds', sets: 3, reps: '10 each side' },
        { name: 'Resistance Band Work', sets: 3, reps: '15-20' },
        { name: 'Stability Ball Core', sets: 3, reps: '45s' }
      ],
      'Saturday': [
        { name: 'Sport-Specific Drills', sets: 4, reps: 'Varies' },
        { name: 'Reaction Training', sets: 3, reps: '30s' },
        { name: 'Balance Challenges', sets: 3, reps: '45s' },
        { name: 'Recovery Stretching', sets: 1, reps: '10-15min' }
      ]
    }
  }
}

export default function WorkoutPlan() {
  const { user, profile } = useAuth()
  const [currentWeek, setCurrentWeek] = useState<WorkoutDay[]>([])
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set())

  // Get current week dates
  const getCurrentWeek = () => {
    const today = new Date()
    const currentDay = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - currentDay + 1)

    const week = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      week.push({
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        date: date.toISOString().split('T')[0],
        exercises: [],
        completed: false
      })
    }
    return week
  }

  // Load workout schedule based on user's selected plan
  useEffect(() => {
    if (profile?.selected_workout_plan) {
      const planData = sampleWorkoutPlans[profile.selected_workout_plan as keyof typeof sampleWorkoutPlans]
      if (planData) {
        const week = getCurrentWeek()
        const scheduleWithExercises = week.map(day => ({
          ...day,
          exercises: planData.weeklySchedule[day.day as keyof typeof planData.weeklySchedule] || []
        }))
        setCurrentWeek(scheduleWithExercises)
      }
    } else {
      setCurrentWeek(getCurrentWeek())
    }
  }, [profile?.selected_workout_plan])

  // Load completed workouts from database
  useEffect(() => {
    if (user) {
      loadCompletedWorkouts()
    }
  }, [user])

  const loadCompletedWorkouts = async () => {
    if (!user) return

    try {
      const startOfWeek = getCurrentWeek()[0].date
      const endOfWeek = getCurrentWeek()[6].date

      const { data, error } = await supabase
        .from('workout_instances')
        .select('scheduled_date, status')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .gte('scheduled_date', startOfWeek)
        .lte('scheduled_date', endOfWeek)

      if (!error && data) {
        const completed = new Set(data.map(w => w.scheduled_date).filter(date => date !== null))
        setCompletedWorkouts(completed)
      }
    } catch (error) {
      console.error('Failed to load completed workouts:', error)
    }
  }

  const getCurrentPlan = () => {
    if (!profile?.selected_workout_plan) return null
    return sampleWorkoutPlans[profile.selected_workout_plan as keyof typeof sampleWorkoutPlans]
  }

  const currentPlan = getCurrentPlan()

  if (!profile?.onboarding_completed) {
    return (
      <Card className="bg-[#000000] border-[#EFEAE0]/20">
        <CardContent className="text-center py-8">
          <Dumbbell className="w-12 h-12 text-[#EE7F0E] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#EFEAE0] mb-2">Complete Your Setup</h3>
          <p className="text-[#EFEAE0]/70 mb-4">
            Finish your onboarding to see your personalized workout plan
          </p>
          <Button 
            onClick={() => window.location.href = '/onboarding'}
            className="bg-[#EE7F0E] hover:bg-[#EE7F0E]/90 text-white"
          >
            Complete Onboarding
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Plan Header */}
      {currentPlan && (
        <Card className="bg-[#000000] border-[#EFEAE0]/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-[#EFEAE0] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#EE7F0E]" />
                  {currentPlan.name}
                </CardTitle>
                <CardDescription className="text-[#EFEAE0]/70">
                  {currentPlan.description}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/onboarding'}
                className="border-[#EFEAE0]/20 text-[#EFEAE0] hover:bg-[#EFEAE0]/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Adjust Plan
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Weekly Calendar */}
      <Card className="bg-[#000000] border-[#EFEAE0]/20">
        <CardHeader>
          <CardTitle className="text-[#EFEAE0] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#EE7F0E]" />
            This Week&apos;s Workouts
          </CardTitle>
          <CardDescription className="text-[#EFEAE0]/70">
            Check off workouts as you complete them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentWeek.map((day) => {
              const isCompleted = completedWorkouts.has(day.date)
              const hasWorkout = day.exercises.length > 0
              const isToday = day.date === new Date().toISOString().split('T')[0]

              return (
                <Card 
                  key={day.date}
                  className={`border-2 transition-all ${
                    isCompleted 
                      ? 'border-[#FFC842] bg-[#FFC842]/10' 
                      : hasWorkout 
                        ? 'border-[#EE7F0E]/30 bg-[#EE7F0E]/5 hover:border-[#EE7F0E]/50' 
                        : 'border-[#EFEAE0]/10 bg-[#EFEAE0]/5'
                  } ${isToday ? 'ring-2 ring-[#EE7F0E]/50' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-[#EFEAE0]">{day.day}</h4>
                        <p className="text-sm text-[#EFEAE0]/70">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        {isToday && (
                          <Badge className="bg-[#EE7F0E] text-white text-xs mt-1">
                            Today
                          </Badge>
                        )}
                      </div>
                      {hasWorkout && (
                        <button
                          disabled={isCompleted}
                          className={`transition-all ${
                            isCompleted 
                              ? 'text-[#FFC842] cursor-default' 
                              : 'text-[#EFEAE0]/50 hover:text-[#EE7F0E] cursor-pointer'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </button>
                      )}
                    </div>

                    {hasWorkout ? (
                      <div className="space-y-2">
                        {day.exercises.slice(0, 3).map((exercise, idx) => (
                          <div key={idx} className="text-sm">
                            <div className="text-[#EFEAE0] font-medium">{exercise.name}</div>
                            <div className="text-[#EFEAE0]/70">
                              {exercise.sets} sets × {exercise.reps}
                            </div>
                          </div>
                        ))}
                        {day.exercises.length > 3 && (
                          <div className="text-xs text-[#EFEAE0]/50">
                            +{day.exercises.length - 3} more exercises
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="text-[#EFEAE0]/50 text-sm">Rest Day</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
