'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useWorkout } from '@/contexts/WorkoutContext'
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Dumbbell,
  Flame
} from 'lucide-react'

interface WorkoutActionItemProps {
  userProfile?: {
    id: string
    name: string
    email: string
    selected_workout_plan: string
  }
  onStartWorkout?: () => void
}

export default function WorkoutActionItem({ onStartWorkout }: WorkoutActionItemProps) {
  const { todaysWorkout, getTodaysWorkoutStatus, toggleWorkoutCompletion } = useWorkout()
  
  const isWorkoutCompleted = getTodaysWorkoutStatus()

  const handleCompleteWorkout = () => {
    if (todaysWorkout) {
      toggleWorkoutCompletion(todaysWorkout.id)
    }
    if (onStartWorkout) {
      onStartWorkout()
    }
  }

  if (isWorkoutCompleted) {
    return (
      <Card className="bg-gradient-to-r from-[#FFC842] to-[#EE7F0E] border-[#FFC842]/30 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#000000]/20 rounded-full flex items-center justify-center">
                <CheckCircle className="text-[#000000] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#000000] font-bold text-lg">Workout Complete!</h3>
                <p className="text-[#000000]/70 text-sm">Great job finishing today&apos;s workout</p>
              </div>
            </div>
            <Button 
              onClick={handleCompleteWorkout}
              variant="outline" 
              className="bg-[#000000]/10 border-[#000000]/20 text-[#000000] hover:bg-[#000000]/20"
            >
              Mark Incomplete
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!todaysWorkout) {
    return (
      <Card className="bg-[#1A1B18]/50 border-[#EFEAE0]/10 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#EFEAE0]/10 rounded-full flex items-center justify-center">
                <Clock className="text-[#EFEAE0]/50 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#EFEAE0] font-bold text-lg">No Workout Scheduled</h3>
                <p className="text-[#EFEAE0]/70 text-sm">Rest day - take time to recover</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-[#EE7F0E] to-[#FFC842] border-[#EE7F0E]/30 mb-8 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Side - Workout Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#000000]/20 rounded-full flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-[#000000]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#000000] font-['Bebas_Neue'] mb-1">
                TODAY&apos;S WORKOUT
              </h2>
              <p className="text-[#000000]/80 font-semibold mb-2">{todaysWorkout.workout.name}</p>
              
              {/* Workout Details */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#000000]/70">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{todaysWorkout.workout.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{todaysWorkout.workout.exercises.length} exercises</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4" />
                  <span>{todaysWorkout.workout.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Action & Schedule */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
            {/* Schedule Info */}
            <div className="text-center lg:text-right">
              <div className="text-sm text-[#000000]/70 mb-1">Today&apos;s Focus</div>
              <div className="text-lg font-bold text-[#000000] font-['Bebas_Neue']">
                {todaysWorkout.workout.muscleGroups.join(' + ')}
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleCompleteWorkout}
              size="lg"
              className="bg-[#000000] hover:bg-[#1A1B18] text-[#EE7F0E] font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Complete Workout
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-[#000000]/20">
          <div className="flex items-center justify-between text-sm text-[#000000]/70 mb-2">
            <span>Today&apos;s Progress</span>
            <span>Ready to start</span>
          </div>
          <div className="w-full bg-[#000000]/20 rounded-full h-2">
            <div className="bg-[#000000]/40 h-2 rounded-full w-0 transition-all duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
