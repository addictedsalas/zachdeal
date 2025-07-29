'use client'

import { useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface ResetPasswordFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function ResetPasswordForm({ onSwitchToLogin }: ResetPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await resetPassword(email)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <Mail className="text-green-400" size={32} />
          </div>
          <h3 className="text-green-400 font-medium mb-2">Reset Link Sent</h3>
          <p className="text-[#EFEAE0]/80 text-sm">
            We&apos;ve sent a password reset link to <strong>{email}</strong>. 
            Check your email and follow the instructions to reset your password.
          </p>
        </div>
        
        <button
          onClick={onSwitchToLogin}
          className="w-full bg-gradient-to-r from-[#EE7F0E] to-[#FFC842] text-black font-bold py-3 px-6 rounded-lg hover:from-[#FFC842] hover:to-[#EE7F0E] transition-all duration-300"
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-[#EFEAE0]/80 text-sm">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#EFEAE0] mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-[#1A1B18] border border-[#EE7F0E]/20 rounded-lg text-[#EFEAE0] placeholder-[#EFEAE0]/40 focus:outline-none focus:border-[#EE7F0E] focus:ring-1 focus:ring-[#EE7F0E] transition-colors"
          placeholder="Enter your email"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !email}
        className="w-full bg-gradient-to-r from-[#EE7F0E] to-[#FFC842] text-black font-bold py-3 px-6 rounded-lg hover:from-[#FFC842] hover:to-[#EE7F0E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Sending Reset Link...
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <div className="text-center">
        <p className="text-[#EFEAE0]/60 text-sm">
          Remember your password?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#EE7F0E] hover:text-[#FFC842] font-medium transition-colors"
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  )
}
