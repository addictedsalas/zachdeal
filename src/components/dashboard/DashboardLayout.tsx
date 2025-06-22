'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Activity, 
  Apple, 
  BarChart3, 
  Dumbbell, 
  Home, 
  MessageCircle, 
  Settings, 
  User,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut, profile } = useAuth()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, href: '/dashboard', label: 'Dashboard' },
    { icon: Dumbbell, href: '/dashboard/workouts', label: 'Workouts' },
    { icon: Apple, href: '/dashboard/nutrition', label: 'Nutrition' },
    { icon: MessageCircle, href: '/dashboard/ai-coach', label: 'AI Coach' },
    { icon: BarChart3, href: '/dashboard/metrics', label: 'Metrics' },
    { icon: User, href: '/dashboard/profile', label: 'Profile' },
    { icon: Settings, href: '/dashboard/settings', label: 'Settings' },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-bbd-charcoal flex">
      {/* Sidebar */}
      <div className="w-20 bg-black/20 border-r border-bbd-ivory/10 flex flex-col items-center py-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-bbd-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">BD</span>
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                  ${isActive 
                    ? 'bg-bbd-orange text-white shadow-lg shadow-bbd-orange/25' 
                    : 'text-bbd-ivory/60 hover:text-bbd-orange hover:bg-bbd-orange/10'
                  }
                `}
                title={item.label}
              >
                <Icon size={20} />
              </Link>
            )
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="space-y-4">
          {/* User Avatar */}
          <div className="w-12 h-12 rounded-xl bg-bbd-orange/20 flex items-center justify-center">
            <span className="text-bbd-orange font-semibold text-sm">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            className="w-12 h-12 rounded-xl text-bbd-ivory/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 flex items-center justify-center"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
