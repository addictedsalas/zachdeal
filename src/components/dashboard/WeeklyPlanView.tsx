'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useWorkout } from '@/contexts/WorkoutContext'
import { ChevronLeft, ChevronRight, Clock, Dumbbell, Utensils, Coffee, Sun, Moon } from 'lucide-react'


interface WeeklyPlanViewProps {
  selectedPlan: string
  userProfile: {
    workout_frequency: number
    fitness_objectives: string[]
  }
}

export default function WeeklyPlanView({ selectedPlan, userProfile }: WeeklyPlanViewProps) {
  const [showCongrats, setShowCongrats] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  const { workoutCards, todaysMeals, toggleWorkoutCompletion } = useWorkout()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const handleWorkoutComplete = (workoutId: string) => {
    toggleWorkoutCompletion(workoutId)
    setShowCongrats(true)
    setTimeout(() => setShowCongrats(false), 3000)
  }

  const goToPrevious = () => {
    setCurrentCardIndex(prev => Math.max(prev - 1, 0))
  }

  const goToNext = () => {
    setCurrentCardIndex(prev => Math.min(prev + 1, workoutCards.length - getCardsPerView()))
  }

  const getCardsPerView = () => {
    if (windowWidth < 768) {
      return 1
    } else {
      return 3
    }
  }

  const getCardWidth = () => {
    if (windowWidth < 768) {
      return 'w-full'
    } else {
      return 'w-1/3'
    }
  }

  const maxIndex = workoutCards.length - getCardsPerView()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediate': return 'bg-[#EE7F0E]/20 text-[#EE7F0E] border-[#EE7F0E]/30'
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="space-y-12 p-6">
      {/* Plan Overview Header */}
      <div className="bg-gradient-to-r from-[#1A1B18] to-[#000000] rounded-xl p-8 border border-[#EFEAE0]/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-[#EFEAE0] font-['Bebas_Neue'] mb-2">YOUR WORKOUT PLAN</h2>
            <p className="text-[#EFEAE0]/70 text-lg">{selectedPlan || 'Custom Fitness Plan'}</p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#EE7F0E]">{userProfile?.workout_frequency || 3}</div>
              <div className="text-sm text-[#EFEAE0]/60 mt-1">Days/Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFC842]">{workoutCards.filter(card => card.workout.completed).length}</div>
              <div className="text-sm text-[#EFEAE0]/60 mt-1">Completed</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {userProfile?.fitness_objectives?.map((objective: string, index: number) => (
            <Badge key={index} className="bg-[#EE7F0E]/20 text-[#EE7F0E] border-[#EE7F0E]/30 px-3 py-1">
              {objective}
            </Badge>
          ))}
        </div>
      </div>

      {/* Workout Cards Carousel */}
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <h3 className="text-2xl font-bold text-[#EFEAE0] font-['Bebas_Neue']">THIS WEEK&apos;S WORKOUTS</h3>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            disabled={currentCardIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#EE7F0E] hover:bg-[#FFC842] disabled:bg-[#EFEAE0]/20 disabled:cursor-not-allowed text-[#000000] disabled:text-[#EFEAE0]/50 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            disabled={currentCardIndex >= maxIndex}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#EE7F0E] hover:bg-[#FFC842] disabled:bg-[#EFEAE0]/20 disabled:cursor-not-allowed text-[#000000] disabled:text-[#EFEAE0]/50 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden rounded-xl mx-12">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentCardIndex * (100 / getCardsPerView())}%)` 
              }}
            >
              {workoutCards.map((card) => {
                const isCompleted = card.workout.completed
                return (
                  <div key={card.id} className={`flex-shrink-0 px-2 lg:px-4 ${getCardWidth()}`}>
                    <div className={`
                      group relative bg-[#1A1B18]/50 rounded-xl overflow-hidden border transition-all duration-300 hover:scale-105 min-h-[320px]
                      ${isCompleted 
                        ? 'border-[#FFC842] shadow-lg shadow-[#FFC842]/20' 
                        : 'border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50'
                      }
                    `}>
                      {/* Completed Badge */}
                      {isCompleted && (
                        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#FFC842] to-[#EE7F0E] text-[#000000] px-3 py-1 rounded-full text-sm font-bold">
                          COMPLETED
                        </div>
                      )}

                      <CardHeader className="pb-4 pt-6 px-4 lg:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-[#EFEAE0] text-lg lg:text-xl mb-1">{card.day}</CardTitle>
                            <p className="text-[#EFEAE0]/60 text-sm">{card.date}</p>
                          </div>
                          <Badge className={getDifficultyColor(card.workout.difficulty)}>
                            {card.workout.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4 lg:space-y-6 px-4 lg:px-6 pb-6">
                        <div>
                          <h4 className="font-semibold text-[#EFEAE0] mb-3 text-lg">{card.workout.name}</h4>
                          <div className="flex items-center space-x-4 lg:space-x-6 text-sm text-[#EFEAE0]/70">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{card.workout.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Dumbbell className="w-4 h-4" />
                              <span>{card.workout.exercises.length} exercises</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-sm font-medium text-[#EFEAE0]">Muscle Groups:</h5>
                          <div className="flex flex-wrap gap-2">
                            {card.workout.muscleGroups.map((group, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-[#EE7F0E]/30 text-[#EE7F0E]">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={() => handleWorkoutComplete(card.id)}
                          disabled={isCompleted}
                          className={`w-full py-3 transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-[#FFC842]/20 text-[#FFC842] border border-[#FFC842]/30 cursor-not-allowed' 
                              : 'bg-[#EE7F0E] hover:bg-[#FFC842] text-[#000000] hover:scale-105'
                          }`}
                        >
                          {isCompleted ? 'Workout Complete!' : 'Mark Complete'}
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Nutrition */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[#EFEAE0] font-['Bebas_Neue'] mb-6">Today&apos;s Nutrition</h3>
        
        {/* Main Meals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Breakfast */}
          <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50 transition-colors">
            <CardHeader className="pb-4 pt-6">
              <div className="flex items-center space-x-3">
                <Coffee className="w-6 h-6 text-[#EE7F0E]" />
                <CardTitle className="text-[#EFEAE0] text-xl">Breakfast</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <h4 className="font-medium text-[#EFEAE0] mb-3 text-lg">{todaysMeals.breakfast.name}</h4>
              <div className="flex justify-between text-sm text-[#EFEAE0]/70">
                <span>{todaysMeals.breakfast.calories} cal</span>
                <span>{todaysMeals.breakfast.protein} protein</span>
              </div>
            </CardContent>
          </Card>

          {/* Lunch */}
          <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50 transition-colors">
            <CardHeader className="pb-4 pt-6">
              <div className="flex items-center space-x-3">
                <Sun className="w-6 h-6 text-[#EE7F0E]" />
                <CardTitle className="text-[#EFEAE0] text-xl">Lunch</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <h4 className="font-medium text-[#EFEAE0] mb-3 text-lg">{todaysMeals.lunch.name}</h4>
              <div className="flex justify-between text-sm text-[#EFEAE0]/70">
                <span>{todaysMeals.lunch.calories} cal</span>
                <span>{todaysMeals.lunch.protein} protein</span>
              </div>
            </CardContent>
          </Card>

          {/* Dinner */}
          <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10 hover:border-[#EE7F0E]/50 transition-colors">
            <CardHeader className="pb-4 pt-6">
              <div className="flex items-center space-x-3">
                <Moon className="w-6 h-6 text-[#EFEAE0]" />
                <CardTitle className="text-[#EFEAE0] text-xl">Dinner</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <h4 className="font-medium text-[#EFEAE0] mb-3 text-lg">{todaysMeals.dinner.name}</h4>
              <div className="flex justify-between text-sm text-[#EFEAE0]/70">
                <span>{todaysMeals.dinner.calories} cal</span>
                <span>{todaysMeals.dinner.protein} protein</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Snacks */}
        <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10">
          <CardHeader className="pb-4 pt-6">
            <div className="flex items-center space-x-3">
              <Utensils className="w-6 h-6 text-[#EE7F0E]" />
              <CardTitle className="text-[#EFEAE0] text-xl">Snacks</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysMeals.snacks.map((snack: { name: string; calories: number }, index: number) => (
                <div key={index} className="flex justify-between items-center p-4 bg-[#000000]/30 rounded-lg">
                  <span className="text-[#EFEAE0] font-medium">{snack.name}</span>
                  <span className="text-[#EFEAE0]/70 text-sm">{snack.calories} cal</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1A1B18] border border-[#EE7F0E] rounded-xl p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-[#EFEAE0] mb-2">Workout Complete!</h3>
            <p className="text-[#EFEAE0]/70 mb-4">Great job finishing your workout. Keep up the momentum!</p>
            <Button 
              onClick={() => setShowCongrats(false)}
              className="bg-[#EE7F0E] hover:bg-[#FFC842] text-[#000000]"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
