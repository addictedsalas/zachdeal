'use client'

import { Activity, Droplets, Flame, TrendingUp } from 'lucide-react'

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Steps */}
      <div className="bg-black/20 rounded-2xl p-6 border border-bbd-ivory/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-bbd-ivory/70 text-sm font-medium">Steps</h3>
          <Activity className="text-bbd-orange" size={20} />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-bbd-ivory">9,158</div>
          <div className="text-bbd-ivory/50 text-sm">total</div>
        </div>
        {/* Mini Chart */}
        <div className="mt-4 flex items-end space-x-1 h-12">
          {[40, 60, 30, 80, 50, 90, 70, 85, 45, 95, 60, 75].map((height, i) => (
            <div
              key={i}
              className="bg-bbd-orange/60 rounded-sm flex-1"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Hydration */}
      <div className="bg-black/20 rounded-2xl p-6 border border-bbd-ivory/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-bbd-ivory/70 text-sm font-medium">Hydration</h3>
          <Droplets className="text-blue-400" size={20} />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-bbd-ivory">1,187</div>
          <div className="text-bbd-ivory/50 text-sm">ml</div>
        </div>
        {/* Mini Chart */}
        <div className="mt-4 flex items-end space-x-1 h-12">
          {[30, 45, 60, 40, 70, 55, 80, 65, 90, 50, 75, 85].map((height, i) => (
            <div
              key={i}
              className="bg-blue-400/60 rounded-sm flex-1"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Calories */}
      <div className="bg-black/20 rounded-2xl p-6 border border-bbd-ivory/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-bbd-ivory/70 text-sm font-medium">AI Calorie Intake</h3>
          <Flame className="text-red-400" size={20} />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-bbd-ivory">2,551</div>
          <div className="text-bbd-ivory/50 text-sm">kcal</div>
        </div>
        {/* Circular Progress */}
        <div className="mt-4 flex items-center justify-center">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-bbd-ivory/20"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${75 * 1.76} 176`}
                className="text-bbd-orange"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-bbd-ivory">75%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sandow Score */}
      <div className="bg-black/20 rounded-2xl p-6 border border-bbd-ivory/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-bbd-ivory/70 text-sm font-medium">Sandow Score</h3>
          <TrendingUp className="text-green-400" size={20} />
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-bbd-ivory">87.51</div>
          <div className="text-bbd-ivory/50 text-sm">pts</div>
        </div>
        {/* Trend Chart */}
        <div className="mt-4 h-12 flex items-end">
          <svg className="w-full h-full" viewBox="0 0 100 40">
            <path
              d="M0,35 Q10,30 20,25 T40,20 T60,15 T80,10 L100,8"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-bbd-orange"
            />
            <path
              d="M0,35 Q10,30 20,25 T40,20 T60,15 T80,10 L100,8 L100,40 L0,40 Z"
              fill="url(#gradient)"
              className="text-bbd-orange"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
