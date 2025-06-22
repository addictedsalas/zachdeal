'use client'

import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToSignUp: () => void
  onSwitchToReset: () => void
}

export default function LoginForm({ onSuccess, onSwitchToSignUp, onSwitchToReset }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#EFEAE0] mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-[#1A1B18] border border-[#EE7F0E]/20 rounded-lg text-[#EFEAE0] placeholder-[#EFEAE0]/40 focus:outline-none focus:border-[#EE7F0E] focus:ring-1 focus:ring-[#EE7F0E] transition-colors"
            placeholder="Enter your password"
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EFEAE0]/60 hover:text-[#EFEAE0] transition-colors"
            disabled={loading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onSwitchToReset}
          className="text-sm text-[#EE7F0E] hover:text-[#FFC842] transition-colors"
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !email || !password}
        className="w-full bg-gradient-to-r from-[#EE7F0E] to-[#FFC842] text-black font-bold py-3 px-6 rounded-lg hover:from-[#FFC842] hover:to-[#EE7F0E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="text-center">
        <p className="text-[#EFEAE0]/60 text-sm">
          New to Built By Deal?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-[#EE7F0E] hover:text-[#FFC842] font-medium transition-colors"
            disabled={loading}
          >
            Create an account
          </button>
        </p>
      </div>
    </form>
  )
}
