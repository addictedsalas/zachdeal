'use client'

import { ReactNode, useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Home, 
  Settings, 
  User,
  LogOut,
  ChevronDown,
  Calendar,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: ReactNode
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export default function DashboardLayout({ children, activeTab = 'overview', setActiveTab }: DashboardLayoutProps) {
  const { signOut, profile, user } = useAuth()
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'plan', label: 'My Plan', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    console.log('Dashboard sign out initiated')
    try {
      await signOut()
      console.log('Dashboard sign out completed')
    } catch (error) {
      console.error('Dashboard sign out error:', error)
    }
    setIsProfileOpen(false)
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Get current page title
  const getPageTitle = () => {
    const path = pathname.split('/').pop()
    switch (path) {
      case 'dashboard': return 'Dashboard'
      case 'workouts': return 'Workouts'
      case 'nutrition': return 'Nutrition'
      case 'ai-coach': return 'AI Coach'
      case 'metrics': return 'Metrics'
      case 'profile': return 'Profile'
      case 'settings': return 'Settings'
      default: return 'Dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-bbd-charcoal flex">
      {/* Sidebar - Simplified */}
      <div className="w-20 bg-black/20 border-r border-bbd-ivory/10 flex flex-col items-center py-6">
        {/* Built By Deal Logo */}
        <div className="mb-8">
          <Link href="/" className="block">
            <div className="w-12 h-12 bg-gradient-to-r from-bbd-orange to-bbd-gold rounded-xl flex items-center justify-center shadow-lg shadow-bbd-orange/25 hover:shadow-bbd-orange/40 transition-all duration-300">
              <span className="text-black font-bold text-lg font-bebas">BD</span>
            </div>
          </Link>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                  ${isActive 
                    ? 'bg-bbd-orange text-bbd-charcoal shadow-lg' 
                    : 'text-bbd-ivory/60 hover:text-bbd-orange hover:bg-bbd-orange/10'
                  }
                `}
                title={item.label}
                onClick={() => setActiveTab && setActiveTab(item.id)}
              >
                <Icon size={20} />
              </button>
            )
          })}
        </nav>

        {/* Bottom spacing - no profile menu here anymore */}
        <div className="h-4"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-black/10 border-b border-bbd-ivory/10 px-6 py-4 flex items-center justify-between">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-bold text-bbd-ivory font-bebas tracking-wide">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-bbd-ivory/60">
              Welcome back, {displayName.split(' ')[0]}
            </p>
          </div>

          {/* Account Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 bg-black/20 hover:bg-black/30 rounded-lg px-3 py-2 transition-all duration-200 border border-bbd-ivory/10 hover:border-bbd-orange/30"
            >
              {/* Profile Picture */}
              <div className="w-8 h-8 bg-gradient-to-r from-bbd-orange to-bbd-gold rounded-full flex items-center justify-center text-black font-bold text-sm">
                {initials}
              </div>
              
              {/* Name and Status */}
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-bbd-ivory">{displayName}</p>
                <p className="text-xs text-green-400">Pro Member</p>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown 
                size={16} 
                className={`text-bbd-ivory/60 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-[#1A1B18] border border-bbd-orange/20 rounded-lg shadow-xl z-50">
                {/* User Info Header */}
                <div className="p-4 border-b border-bbd-orange/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-bbd-orange to-bbd-gold rounded-full flex items-center justify-center text-black font-bold">
                      {initials}
                    </div>
                    <div>
                      <p className="font-medium text-bbd-ivory">{displayName}</p>
                      <p className="text-sm text-bbd-ivory/60">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        Pro Member
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-bbd-ivory hover:bg-bbd-orange/10 hover:text-bbd-orange transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={18} />
                    <div>
                      <p className="font-medium">My Profile</p>
                      <p className="text-xs text-bbd-ivory/60">View and edit profile</p>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    className="flex items-center space-x-3 px-4 py-3 text-bbd-ivory hover:bg-bbd-orange/10 hover:text-bbd-orange transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings size={18} />
                    <div>
                      <p className="font-medium">Account Settings</p>
                      <p className="text-xs text-bbd-ivory/60">Preferences and billing</p>
                    </div>
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center space-x-3 px-4 py-3 text-bbd-ivory hover:bg-bbd-orange/10 hover:text-bbd-orange transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Home size={18} />
                    <div>
                      <p className="font-medium">Back to Website</p>
                      <p className="text-xs text-bbd-ivory/60">Return to main site</p>
                    </div>
                  </Link>
                </div>

                {/* Sign Out */}
                <div className="border-t border-bbd-orange/20 py-2">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 px-4 py-3 text-bbd-ivory hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left"
                  >
                    <LogOut size={18} />
                    <div>
                      <p className="font-medium">Sign Out</p>
                      <p className="text-xs text-bbd-ivory/60">End your session</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto dashboard-content">
          {children}
        </main>
      </div>
    </div>
  )
}
