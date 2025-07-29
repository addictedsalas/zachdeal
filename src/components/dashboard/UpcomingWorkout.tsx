'use client'

import { ArrowRight, Play } from 'lucide-react'

export default function UpcomingWorkout() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-lg" />
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Play className="text-white" size={16} />
            <span className="text-white/80 text-sm font-medium">Upcoming Exercise</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Kickboxing</h3>
          
          <p className="text-white/80 text-sm mb-4">
            High-intensity cardio workout combining martial arts techniques
          </p>
          
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2 text-sm font-medium">
            Start Workout
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="ml-6">
          <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center">
              <Play className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
