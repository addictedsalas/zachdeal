'use client'

import { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, profile, signOut, hasActiveSubscription } = useAuth()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    console.log('=== SIGN OUT DEBUG START ===')
    console.log('Sign out button clicked')
    console.log('Current user:', user?.id, user?.email)
    console.log('Current profile:', profile?.id)
    
    try {
      console.log('Calling signOut function...')
      const result = await signOut()
      console.log('Sign out result:', result)
      
      if (result.error) {
        console.error('Sign out error:', result.error)
        alert('Sign out failed: ' + result.error.message)
      } else {
        console.log('Sign out successful, should redirect to home')
      }
    } catch (error) {
      console.error('Sign out catch error:', error)
      alert('Unexpected error during sign out: ' + error)
    }
    
    console.log('=== SIGN OUT DEBUG END ===')
    setIsOpen(false)
  }

  if (!user) return null

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User'
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-[#EFEAE0] hover:text-[#EE7F0E] transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-[#EE7F0E] to-[#FFC842] rounded-full flex items-center justify-center text-black font-bold text-sm">
          {initials}
        </div>
        <span className="hidden md:block font-medium">{displayName}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1A1B18] border border-[#EE7F0E]/20 rounded-lg shadow-xl z-50">
          {/* User Info */}
          <div className="p-4 border-b border-[#EE7F0E]/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#EE7F0E] to-[#FFC842] rounded-full flex items-center justify-center text-black font-bold">
                {initials}
              </div>
              <div>
                <p className="font-medium text-[#EFEAE0]">{displayName}</p>
                <p className="text-sm text-[#EFEAE0]/60">{user.email}</p>
                {hasActiveSubscription && (
                  <span className="inline-block mt-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Pro Member
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-2 text-[#EFEAE0] hover:bg-[#EE7F0E]/10 hover:text-[#EE7F0E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center space-x-3 px-4 py-2 text-[#EFEAE0] hover:bg-[#EE7F0E]/10 hover:text-[#EE7F0E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} />
              <span>Settings</span>
            </Link>

            <Link
              href="/billing"
              className="flex items-center space-x-3 px-4 py-2 text-[#EFEAE0] hover:bg-[#EE7F0E]/10 hover:text-[#EE7F0E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard size={16} />
              <span>Billing</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-[#EE7F0E]/20 py-2">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-2 text-[#EFEAE0] hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
