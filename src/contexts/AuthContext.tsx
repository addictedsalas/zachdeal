'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase, Database } from '@/lib/supabaseClient'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: unknown }>
  hasActiveSubscription: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Circuit breaker to prevent infinite profile creation attempts
  const profileCreationAttempts = useRef<Map<string, number>>(new Map())
  const profileFetchInProgress = useRef<Map<string, boolean>>(new Map())
  const maxProfileCreationAttempts = 3
  
  // Debouncing refs
  const profileFetchTimeout = useRef<NodeJS.Timeout | null>(null)
  const authStateChangeTimeout = useRef<NodeJS.Timeout | null>(null)

  // Check if user has active subscription
  const hasActiveSubscription = profile?.stripe_status === 'active'

  // Debounced profile fetch to prevent rapid successive calls
  const debouncedFetchProfile = (userId: string, delay: number = 500) => {
    if (profileFetchTimeout.current) {
      clearTimeout(profileFetchTimeout.current)
    }
    
    profileFetchTimeout.current = setTimeout(() => {
      fetchProfile(userId)
    }, delay)
  }

  useEffect(() => {
    console.log('AuthContext useEffect - Starting initialization')
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting initial session:', error)
          setLoading(false)
          return
        }
        
        console.log('Initial session:', session)
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          console.log('User found in session, fetching profile...')
          await fetchProfile(session.user.id)
        } else {
          console.log('No user in session')
          setLoading(false)
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes with debouncing
    console.log('Setting up auth state change listener...')
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change event:', event, 'Session:', session)
        
        // Clear any pending auth state change timeout
        if (authStateChangeTimeout.current) {
          clearTimeout(authStateChangeTimeout.current)
        }
        
        // Debounce auth state changes to prevent rapid successive calls
        authStateChangeTimeout.current = setTimeout(async () => {
          setSession(session)
          setUser(session?.user ?? null)
          
          if (session?.user) {
            console.log('User found in auth change, fetching profile...')
            // Use debounced fetch for auth state changes
            debouncedFetchProfile(session.user.id, 1000)
          } else {
            console.log('No user in auth change, clearing profile')
            setProfile(null)
            setLoading(false)
            // Clear circuit breaker state when user logs out
            profileCreationAttempts.current.clear()
            profileFetchInProgress.current.clear()
          }
        }, 300) // 300ms debounce for auth state changes
      }
    )

    return () => {
      console.log('Cleaning up auth subscription and timeouts')
      subscription.unsubscribe()
      
      // Clean up timeouts
      if (profileFetchTimeout.current) {
        clearTimeout(profileFetchTimeout.current)
      }
      if (authStateChangeTimeout.current) {
        clearTimeout(authStateChangeTimeout.current)
      }
    }
  }, []) // No dependencies to prevent multiple listeners

  const fetchProfile = async (userId: string) => {
    // Prevent concurrent profile fetches for the same user
    if (profileFetchInProgress.current.get(userId)) {
      console.log('Profile fetch already in progress for user:', userId)
      return
    }
    
    profileFetchInProgress.current.set(userId, true)
    
    try {
      console.log('Fetching profile for user:', userId)
      console.log('Supabase client status:', supabase ? 'initialized' : 'not initialized')
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      console.log('Profile fetch result:', { data, error })

      if (error) {
        console.error('Error fetching profile:', error)
        console.log('Error code:', error.code)
        console.log('Error message:', error.message)
        
        // If profile doesn't exist, create one (with circuit breaker)
        if (error.code === 'PGRST116') {
          const attempts = profileCreationAttempts.current.get(userId) || 0
          
          if (attempts < maxProfileCreationAttempts) {
            console.log(`Profile not found, creating new profile... (attempt ${attempts + 1}/${maxProfileCreationAttempts})`)
            profileCreationAttempts.current.set(userId, attempts + 1)
            await createProfile(userId)
          } else {
            console.error(`Max profile creation attempts (${maxProfileCreationAttempts}) reached for user:`, userId)
            setProfile(null)
            setLoading(false)
          }
          return
        }
        
        // For other errors, set profile to null but don't block loading
        console.log('Setting profile to null due to error')
        setProfile(null)
        setLoading(false)
        return
      }

      console.log('Profile fetched successfully:', data)
      setProfile(data)
      setLoading(false)
      
      // Reset circuit breaker on successful fetch
      profileCreationAttempts.current.delete(userId)
      
    } catch (error) {
      console.error('Catch block - Error fetching profile:', error)
      setProfile(null)
      setLoading(false)
    } finally {
      profileFetchInProgress.current.set(userId, false)
    }
  }

  const createProfile = async (userId: string) => {
    try {
      console.log('Creating profile for user:', userId)
      
      // Add a small delay to ensure auth state is stable
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const { data: userData, error: userError } = await supabase.auth.getUser()
      
      if (userError || !userData.user || !userData.user.email) {
        console.error('No user data or email available for profile creation:', userError)
        setLoading(false)
        return
      }
      
      console.log('User data for profile creation:', userData.user)

      const profileData = {
        id: userId,
        email: userData.user.email,
        full_name: userData.user.user_metadata?.full_name || '',
        stripe_status: 'inactive' as const,
        stripe_customer_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('Inserting profile with data:', profileData)

      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        console.log('Create profile error code:', error.code)
        console.log('Create profile error message:', error.message)
        
        // If profile already exists (race condition), try to fetch it
        if (error.code === '23505') { // Unique constraint violation
          console.log('Profile already exists, fetching existing profile...')
          setTimeout(() => fetchProfile(userId), 1000) // Delayed retry
          return
        }
        
        setProfile(null)
        setLoading(false)
        return
      }

      console.log('Profile created successfully:', data)
      setProfile(data)
      setLoading(false)
      
      // Reset circuit breaker on successful creation
      profileCreationAttempts.current.delete(userId)
      
    } catch (error) {
      console.error('Catch block - Error creating profile:', error)
      setProfile(null)
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) return { error }

      // Profile will be created via database trigger or webhook
      return { error: null }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })

      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      console.log('AuthContext signOut called')
      const { error } = await supabase.auth.signOut()
      
      if (!error) {
        console.log('Sign out successful, clearing state...')
        setUser(null)
        setProfile(null)
        setSession(null)
        setLoading(false)
        
        // Redirect to home page after successful sign out
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
      } else {
        console.error('Sign out failed:', error)
      }
      
      return { error }
    } catch (error) {
      console.error('AuthContext signOut catch error:', error)
      return { error: error as AuthError }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) {
        console.error('updateProfile: No user logged in')
        return { error: 'No user logged in' }
      }

      console.log('updateProfile: Attempting to update profile for user:', user.id)
      console.log('updateProfile: Updates to apply:', updates)

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()

      console.log('updateProfile: Supabase response data:', data)
      console.log('updateProfile: Supabase response error:', error)

      if (!error) {
        console.log('updateProfile: Successfully updated profile')
        setProfile((prev: Profile | null) => prev ? { ...prev, ...updates } : null)
      } else {
        console.error('updateProfile: Database error:', error)
      }

      return { error }
    } catch (error) {
      console.error('updateProfile: Catch block error:', error)
      return { error }
    }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    hasActiveSubscription,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
