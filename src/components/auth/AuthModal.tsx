'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import ResetPasswordForm from './ResetPasswordForm'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess?: () => void
  initialMode?: 'login' | 'signup' | 'reset'
  title?: string
  subtitle?: string
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onAuthSuccess,
  initialMode = 'login',
  title,
  subtitle
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(initialMode)
  const { loading } = useAuth()

  if (!isOpen) return null

  const handleSuccess = () => {
    onClose()
    onAuthSuccess?.()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-[#1A1B18] border border-[#EE7F0E]/20 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EE7F0E]/20">
          <h2 className="text-2xl font-bold text-[#EFEAE0] font-['Bebas_Neue']">
            {title || (
              mode === 'login' && 'Welcome Back'
              || mode === 'signup' && 'Join Built By Deal'
              || mode === 'reset' && 'Reset Password'
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-[#EFEAE0]/60 hover:text-[#EFEAE0] transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {subtitle && (
            <p className="text-sm text-[#EFEAE0]/60 mb-4">{subtitle}</p>
          )}
          {mode === 'login' && (
            <LoginForm 
              onSuccess={handleSuccess}
              onSwitchToSignUp={() => setMode('signup')}
              onSwitchToReset={() => setMode('reset')}
            />
          )}
          
          {mode === 'signup' && (
            <SignUpForm 
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setMode('login')}
            />
          )}
          
          {mode === 'reset' && (
            <ResetPasswordForm 
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setMode('login')}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="text-center text-sm text-[#EFEAE0]/60">
            {mode === 'login' && (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-[#EE7F0E] hover:text-[#FFC842] font-medium transition-colors"
                  disabled={loading}
                >
                  Sign up
                </button>
              </>
            )}
            
            {mode === 'signup' && (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#EE7F0E] hover:text-[#FFC842] font-medium transition-colors"
                  disabled={loading}
                >
                  Sign in
                </button>
              </>
            )}
            
            {mode === 'reset' && (
              <>
                Remember your password?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#EE7F0E] hover:text-[#FFC842] font-medium transition-colors"
                  disabled={loading}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
