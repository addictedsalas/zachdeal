'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WorkoutCard {
  id: string
  day: string
  date: string
  workout: {
    name: string
    duration: string
    exercises: string[]
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    muscleGroups: string[]
    completed: boolean
  }
}

interface MealPlan {
  breakfast: { name: string; calories: number; protein: string }
  lunch: { name: string; calories: number; protein: string }
  dinner: { name: string; calories: number; protein: string }
  snacks: { name: string; calories: number }[]
}

interface WorkoutContextType {
  completedWorkouts: Set<string>
  workoutCards: WorkoutCard[]
  todaysMeals: MealPlan
  todaysWorkout: WorkoutCard | null
  toggleWorkoutCompletion: (workoutId: string) => void
  isWorkoutCompleted: (workoutId: string) => boolean
  getTodaysWorkoutStatus: () => boolean
  getWorkoutByDate: (date: string) => WorkoutCard | null
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

// Workout templates that will be assigned to dates
const workoutTemplates = [
  {
    name: 'Upper Body Power',
    duration: '45 min',
    exercises: ['Bench Press 4x8', 'Pull-ups 3x10', 'Shoulder Press 3x12', 'Rows 3x10'],
    difficulty: 'Intermediate' as const,
    muscleGroups: ['Chest', 'Back', 'Shoulders']
  },
  {
    name: 'Lower Body Strength',
    duration: '50 min',
    exercises: ['Squats 4x10', 'Deadlifts 3x8', 'Lunges 3x12', 'Calf Raises 4x15'],
    difficulty: 'Advanced' as const,
    muscleGroups: ['Quads', 'Glutes', 'Hamstrings']
  },
  {
    name: 'Core & Cardio',
    duration: '35 min',
    exercises: ['Planks 3x60s', 'Russian Twists 3x20', 'Mountain Climbers 3x30', 'Burpees 3x10'],
    difficulty: 'Beginner' as const,
    muscleGroups: ['Core', 'Cardio']
  },
  {
    name: 'Push Day',
    duration: '40 min',
    exercises: ['Overhead Press 4x8', 'Dips 3x12', 'Push-ups 3x15', 'Tricep Extensions 3x12'],
    difficulty: 'Intermediate' as const,
    muscleGroups: ['Chest', 'Shoulders', 'Triceps']
  },
  {
    name: 'Pull Day',
    duration: '45 min',
    exercises: ['Pull-ups 4x8', 'Barbell Rows 3x10', 'Lat Pulldowns 3x12', 'Bicep Curls 3x12'],
    difficulty: 'Advanced' as const,
    muscleGroups: ['Back', 'Biceps']
  },
  {
    name: 'Full Body HIIT',
    duration: '30 min',
    exercises: ['Burpees 4x10', 'Jump Squats 4x15', 'Push-ups 4x12', 'High Knees 4x30s'],
    difficulty: 'Intermediate' as const,
    muscleGroups: ['Full Body', 'Cardio']
  },
  {
    name: 'Rest Day',
    duration: '20 min',
    exercises: ['Light Stretching', 'Foam Rolling', 'Meditation'],
    difficulty: 'Beginner' as const,
    muscleGroups: ['Recovery']
  }
]

// Generate workout cards for the current week starting from today
const generateWeeklyWorkouts = (): WorkoutCard[] => {
  const today = new Date()
  const workouts: WorkoutCard[] = []
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  for (let i = 0; i < 7; i++) {
    const workoutDate = new Date(today)
    workoutDate.setDate(today.getDate() + i)
    
    const dateString = workoutDate.toISOString().split('T')[0]
    const dayName = dayNames[workoutDate.getDay()]
    
    // Use modulo to cycle through workout templates, skip rest day on weekends for most
    const templateIndex = workoutDate.getDay() === 0 || workoutDate.getDay() === 6 
      ? 6 // Rest day for weekends
      : i % 5 // Cycle through first 5 workouts for weekdays
    
    const template = workoutTemplates[templateIndex]
    
    workouts.push({
      id: `workout-${dateString}`,
      day: dayName,
      date: dateString,
      workout: {
        ...template,
        completed: false
      }
    })
  }
  
  return workouts
}

// Sample meal plan data
const sampleMealPlan: MealPlan = {
  breakfast: { name: 'Protein Oatmeal with Berries', calories: 420, protein: '25g' },
  lunch: { name: 'Grilled Chicken Caesar Salad', calories: 580, protein: '45g' },
  dinner: { name: 'Salmon with Sweet Potato & Broccoli', calories: 650, protein: '40g' },
  snacks: [
    { name: 'Greek Yogurt with Almonds', calories: 180 },
    { name: 'Protein Shake', calories: 250 }
  ]
}

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set())
  const [workoutCards, setWorkoutCards] = useState<WorkoutCard[]>(() => generateWeeklyWorkouts())

  // Get today's workout
  const todaysWorkout = workoutCards.find(card => {
    const today = new Date().toISOString().split('T')[0]
    return card.date === today
  }) || null

  // Load completed workouts from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedWorkouts')
      if (saved) {
        try {
          const workoutIds = JSON.parse(saved)
          setCompletedWorkouts(new Set(workoutIds))
        } catch (error) {
          console.error('Error loading completed workouts:', error)
        }
      }
    }
  }, [])

  // Save completed workouts to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedWorkouts', JSON.stringify([...completedWorkouts]))
    }
  }, [completedWorkouts])

  const toggleWorkoutCompletion = (workoutId: string) => {
    setCompletedWorkouts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(workoutId)) {
        newSet.delete(workoutId)
      } else {
        newSet.add(workoutId)
      }
      return newSet
    })
    setWorkoutCards(prev => prev.map(card => card.id === workoutId ? { ...card, workout: { ...card.workout, completed: !card.workout.completed } } : card))
  }

  const isWorkoutCompleted = (workoutId: string) => {
    return completedWorkouts.has(workoutId)
  }

  const getTodaysWorkoutStatus = () => {
    // For today's workout, we'll use a specific ID format
    const today = new Date().toISOString().split('T')[0]
    const todaysWorkoutId = `workout-${today}`
    return completedWorkouts.has(todaysWorkoutId)
  }

  const getWorkoutByDate = (date: string) => {
    return workoutCards.find(card => card.date === date) || null
  }

  return (
    <WorkoutContext.Provider value={{
      completedWorkouts,
      workoutCards,
      todaysMeals: sampleMealPlan,
      todaysWorkout,
      toggleWorkoutCompletion,
      isWorkoutCompleted,
      getTodaysWorkoutStatus,
      getWorkoutByDate
    }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider')
  }
  return context
}
