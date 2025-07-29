'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useWorkout } from '@/contexts/WorkoutContext'
import WorkoutActionItem from './WorkoutActionItem'
import { 
  Activity, 
  Droplets, 
  Flame, 
  TrendingUp, 
  Target, 
  Dumbbell, 
  Coffee,
  Sun,
  Moon,
  CheckCircle,
  Calendar,
} from 'lucide-react'

export interface TodayOverviewProps {
  userProfile: {
    id: string
    name: string
    email: string
    selected_workout_plan: string
  }
}

export default function TodayOverview({ userProfile }: TodayOverviewProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const { getTodaysWorkoutStatus, toggleWorkoutCompletion, todaysWorkout } = useWorkout()

  const handleTaskComplete = (taskId: string) => {
    if (taskId === 'workout') {
      // Use today's workout ID to sync with plan page
      if (todaysWorkout) {
        toggleWorkoutCompletion(todaysWorkout.id)
      }
    } else {
      setCompletedTasks(prev => new Set([...prev, taskId]))
    }
  }

  // Today's date
  const today = new Date()
  const todayFormatted = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const isWorkoutCompleted = getTodaysWorkoutStatus()

  // Sample today's meals
  const todaysMeals = {
    breakfast: { name: 'Protein Oatmeal with Berries', calories: 420, completed: completedTasks.has('breakfast') },
    lunch: { name: 'Grilled Chicken Caesar Salad', calories: 580, completed: completedTasks.has('lunch') },
    dinner: { name: 'Salmon with Sweet Potato & Broccoli', calories: 650, completed: completedTasks.has('dinner') }
  }

  // Quick stats for today
  const todayStats = {
    steps: 9158,
    stepsGoal: 10000,
    water: 1187,
    waterGoal: 2000,
    calories: 2551,
    caloriesGoal: 2800,
    workoutCompleted: isWorkoutCompleted
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Workout Action Item - Prominent CTA */}
      <WorkoutActionItem 
        userProfile={userProfile}
        onStartWorkout={() => handleTaskComplete('workout')}
      />

      {/* Today's Header */}
      <div className="bg-gradient-to-r from-[#1A1B18] to-[#000000] rounded-xl p-6 lg:p-8 border border-[#EFEAE0]/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#EFEAE0] font-['Bebas_Neue'] mb-2">TODAY&apos;S OVERVIEW</h1>
            <p className="text-[#EFEAE0]/70 text-base lg:text-lg">{todayFormatted}</p>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-2xl lg:text-3xl font-bold text-[#EE7F0E]">
              {Object.values(todaysMeals).filter(meal => meal.completed).length + (todayStats.workoutCompleted ? 1 : 0)}
            </div>
            <div className="text-sm text-[#EFEAE0]/60 mt-1">Tasks Complete</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge className="bg-[#EE7F0E]/20 text-[#EE7F0E] border-[#EE7F0E]/30 px-3 py-1">
            {userProfile?.selected_workout_plan || 'Strength Builder'}
          </Badge>
          <Badge className="bg-[#FFC842]/20 text-[#FFC842] border-[#FFC842]/30 px-3 py-1">
            Day {Math.floor(Math.random() * 30) + 1} of Program
          </Badge>
        </div>
      </div>

      {/* Today's Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Steps */}
        <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50 transition-colors">
          <CardHeader className="pb-2 lg:pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#EFEAE0]/70 text-xs lg:text-sm font-medium">Steps Today</h3>
              <Activity className="text-[#EE7F0E]" size={16} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg lg:text-2xl font-bold text-[#EFEAE0] mb-1">{todayStats.steps.toLocaleString()}</div>
            <div className="text-[#EFEAE0]/50 text-xs lg:text-sm mb-2 lg:mb-3">of {todayStats.stepsGoal.toLocaleString()}</div>
            <div className="w-full bg-[#000000]/30 rounded-full h-1.5 lg:h-2">
              <div 
                className="bg-[#EE7F0E] h-1.5 lg:h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((todayStats.steps / todayStats.stepsGoal) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Water */}
        <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50 transition-colors">
          <CardHeader className="pb-2 lg:pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#EFEAE0]/70 text-xs lg:text-sm font-medium">Hydration</h3>
              <Droplets className="text-blue-400" size={16} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg lg:text-2xl font-bold text-[#EFEAE0] mb-1">{todayStats.water}</div>
            <div className="text-[#EFEAE0]/50 text-xs lg:text-sm mb-2 lg:mb-3">of {todayStats.waterGoal} ml</div>
            <div className="w-full bg-[#000000]/30 rounded-full h-1.5 lg:h-2">
              <div 
                className="bg-blue-400 h-1.5 lg:h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((todayStats.water / todayStats.waterGoal) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Calories */}
        <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50 transition-colors">
          <CardHeader className="pb-2 lg:pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#EFEAE0]/70 text-xs lg:text-sm font-medium">Calories</h3>
              <Flame className="text-red-400" size={16} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg lg:text-2xl font-bold text-[#EFEAE0] mb-1">{todayStats.calories.toLocaleString()}</div>
            <div className="text-[#EFEAE0]/50 text-xs lg:text-sm mb-2 lg:mb-3">of {todayStats.caloriesGoal.toLocaleString()}</div>
            <div className="w-full bg-[#000000]/30 rounded-full h-1.5 lg:h-2">
              <div 
                className="bg-red-400 h-1.5 lg:h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((todayStats.calories / todayStats.caloriesGoal) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Workout Status */}
        <Card className={`border transition-colors ${
          todayStats.workoutCompleted 
            ? 'bg-[#FFC842]/10 border-[#FFC842]/30' 
            : 'bg-[#1A1B18]/50 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50'
        }`}>
          <CardHeader className="pb-2 lg:pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#EFEAE0]/70 text-xs lg:text-sm font-medium">Workout</h3>
              {todayStats.workoutCompleted ? (
                <CheckCircle className="text-[#FFC842]" size={16} />
              ) : (
                <Dumbbell className="text-[#EE7F0E]" size={16} />
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`text-lg lg:text-2xl font-bold mb-1 ${
              todayStats.workoutCompleted ? 'text-[#FFC842]' : 'text-[#EFEAE0]'
            }`}>
              {todayStats.workoutCompleted ? 'Complete!' : 'Pending'}
            </div>
            <div className="text-[#EFEAE0]/50 text-xs lg:text-sm">
              {todayStats.workoutCompleted ? 'Great job today!' : (todaysWorkout ? `${todaysWorkout.workout.name} • ${todaysWorkout.workout.duration}` : 'No workout scheduled')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Today's Meals */}
        <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#EFEAE0] text-lg lg:text-xl font-['Bebas_Neue']">TODAY&apos;S MEALS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Breakfast */}
            <div className={`p-3 lg:p-4 rounded-lg border transition-colors ${
              todaysMeals.breakfast.completed 
                ? 'bg-[#FFC842]/10 border-[#FFC842]/30' 
                : 'bg-[#000000]/30 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Coffee className={`w-4 lg:w-5 h-4 lg:h-5 ${
                    todaysMeals.breakfast.completed ? 'text-[#FFC842]' : 'text-[#EE7F0E]'
                  }`} />
                  <span className="font-medium text-[#EFEAE0] text-sm lg:text-base">Breakfast</span>
                  {todaysMeals.breakfast.completed && (
                    <CheckCircle className="w-4 h-4 text-[#FFC842]" />
                  )}
                </div>
                <span className="text-[#EFEAE0]/70 text-xs lg:text-sm">{todaysMeals.breakfast.calories} cal</span>
              </div>
              <p className="text-[#EFEAE0]/80 text-xs lg:text-sm mb-3">{todaysMeals.breakfast.name}</p>
              {!todaysMeals.breakfast.completed && (
                <Button 
                  onClick={() => handleTaskComplete('breakfast')}
                  size="sm"
                  className="bg-[#EE7F0E] hover:bg-[#FFC842] text-[#000000] text-xs"
                >
                  Mark Complete
                </Button>
              )}
            </div>

            {/* Lunch */}
            <div className={`p-3 lg:p-4 rounded-lg border transition-colors ${
              todaysMeals.lunch.completed 
                ? 'bg-[#FFC842]/10 border-[#FFC842]/30' 
                : 'bg-[#000000]/30 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Sun className={`w-4 lg:w-5 h-4 lg:h-5 ${
                    todaysMeals.lunch.completed ? 'text-[#FFC842]' : 'text-[#EE7F0E]'
                  }`} />
                  <span className="font-medium text-[#EFEAE0] text-sm lg:text-base">Lunch</span>
                  {todaysMeals.lunch.completed && (
                    <CheckCircle className="w-4 h-4 text-[#FFC842]" />
                  )}
                </div>
                <span className="text-[#EFEAE0]/70 text-xs lg:text-sm">{todaysMeals.lunch.calories} cal</span>
              </div>
              <p className="text-[#EFEAE0]/80 text-xs lg:text-sm mb-3">{todaysMeals.lunch.name}</p>
              {!todaysMeals.lunch.completed && (
                <Button 
                  onClick={() => handleTaskComplete('lunch')}
                  size="sm"
                  className="bg-[#EE7F0E] hover:bg-[#FFC842] text-[#000000] text-xs"
                >
                  Mark Complete
                </Button>
              )}
            </div>

            {/* Dinner */}
            <div className={`p-3 lg:p-4 rounded-lg border transition-colors ${
              todaysMeals.dinner.completed 
                ? 'bg-[#FFC842]/10 border-[#FFC842]/30' 
                : 'bg-[#000000]/30 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/30'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Moon className={`w-4 lg:w-5 h-4 lg:h-5 ${
                    todaysMeals.dinner.completed ? 'text-[#FFC842]' : 'text-[#EE7F0E]'
                  }`} />
                  <span className="font-medium text-[#EFEAE0] text-sm lg:text-base">Dinner</span>
                  {todaysMeals.dinner.completed && (
                    <CheckCircle className="w-4 h-4 text-[#FFC842]" />
                  )}
                </div>
                <span className="text-[#EFEAE0]/70 text-xs lg:text-sm">{todaysMeals.dinner.calories} cal</span>
              </div>
              <p className="text-[#EFEAE0]/80 text-xs lg:text-sm mb-3">{todaysMeals.dinner.name}</p>
              {!todaysMeals.dinner.completed && (
                <Button 
                  onClick={() => handleTaskComplete('dinner')}
                  size="sm"
                  className="bg-[#EE7F0E] hover:bg-[#FFC842] text-[#000000] text-xs"
                >
                  Mark Complete
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Tips */}
        <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#EFEAE0] text-lg lg:text-xl font-['Bebas_Neue']">QUICK ACTIONS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button 
                className="w-full bg-[#000000]/30 hover:bg-[#EE7F0E]/20 text-[#EFEAE0] border border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50 justify-start"
                variant="outline"
              >
                <Calendar className="w-4 h-4 mr-3" />
                View Weekly Plan
              </Button>
              
              <Button 
                className="w-full bg-[#000000]/30 hover:bg-[#EE7F0E]/20 text-[#EFEAE0] border border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50 justify-start"
                variant="outline"
              >
                <Target className="w-4 h-4 mr-3" />
                Track Progress
              </Button>
              
              <Button 
                className="w-full bg-[#000000]/30 hover:bg-[#EE7F0E]/20 text-[#EFEAE0] border border-[#EFEAE0]/20 hover:border-[#EE7F0E]/50 justify-start"
                variant="outline"
              >
                <TrendingUp className="w-4 h-4 mr-3" />
                View Analytics
              </Button>
            </div>

            {/* Daily Tip */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#EE7F0E]/10 to-[#FFC842]/10 border border-[#EE7F0E]/20 rounded-lg">
              <h4 className="text-[#EE7F0E] font-semibold text-sm mb-2">💡 Today&apos;s Tip</h4>
              <p className="text-[#EFEAE0]/80 text-xs lg:text-sm">
                Stay hydrated! Aim to drink water consistently throughout the day rather than waiting until you feel thirsty.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
