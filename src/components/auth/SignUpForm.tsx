'use client'

import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface SignUpFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const { error } = await signUp(formData.email, formData.password, formData.fullName)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Don't auto-close, show success message
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h3 className="text-green-400 font-medium mb-2">Check Your Email</h3>
          <p className="text-[#EFEAE0]/80 text-sm">
            We&apos;ve sent you a confirmation link at <strong>{formData.email}</strong>. 
            Click the link to verify your account and complete your registration.
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
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#EFEAE0] mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#1A1B18] border border-[#EE7F0E]/20 rounded-lg text-[#EFEAE0] placeholder-[#EFEAE0]/40 focus:outline-none focus:border-[#EE7F0E] focus:ring-1 focus:ring-[#EE7F0E] transition-colors"
          placeholder="Enter your full name"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#EFEAE0] mb-2">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
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
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 bg-[#1A1B18] border border-[#EE7F0E]/20 rounded-lg text-[#EFEAE0] placeholder-[#EFEAE0]/40 focus:outline-none focus:border-[#EE7F0E] focus:ring-1 focus:ring-[#EE7F0E] transition-colors"
            placeholder="Create a password"
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#EFEAE0] mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 bg-[#1A1B18] border border-[#EE7F0E]/20 rounded-lg text-[#EFEAE0] placeholder-[#EFEAE0]/40 focus:outline-none focus:border-[#EE7F0E] focus:ring-1 focus:ring-[#EE7F0E] transition-colors"
            placeholder="Confirm your password"
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EFEAE0]/60 hover:text-[#EFEAE0] transition-colors"
            disabled={loading}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !formData.email || !formData.password || !formData.confirmPassword}
        className="w-full bg-gradient-to-r from-[#EE7F0E] to-[#FFC842] text-black font-bold py-3 px-6 rounded-lg hover:from-[#FFC842] hover:to-[#EE7F0E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <div className="text-center">
        <p className="text-[#EFEAE0]/60 text-sm">
          Already have an account?{' '}
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
