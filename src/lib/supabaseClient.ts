import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

// Export the Database type for use in other files
export type { Database }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Create a service role client for server-side operations
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Helper functions for common database operations
export const dbHelpers = {
  // Get user profile with subscription status
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  },

  // Check if user has active subscription
  async hasActiveSubscription(userId: string) {
    const { data } = await supabase
      .rpc('user_has_active_subscription', { user_uuid: userId })
    
    return data === true
  },

  // Get user's subscription tier
  async getUserSubscriptionTier(userId: string) {
    const { data } = await supabase
      .rpc('get_user_subscription_tier', { user_uuid: userId })
    
    return data || 'inactive'
  },

  // Get active workout templates
  async getActiveTemplates() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get user's workout instances
  async getUserWorkouts(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('workout_instances')
      .select(`
        *,
        templates (
          title,
          description,
          difficulty_level,
          duration_minutes
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    return { data, error }
  },

  // Create workout instance
  async createWorkoutInstance(workoutData: {
    user_id: string
    template_id: string
    scheduled_date?: string
    workout_data?: {
      exercises: {
        name: string
        sets: number
        reps: number
        weight_lbs?: number
        duration_seconds?: number
        distance_meters?: number
        rpe?: number
        notes?: string
      }[]
    }
  }) {
    const { data, error } = await supabase
      .from('workout_instances')
      .insert(workoutData)
      .select()
      .single()
    
    return { data, error }
  },

  // Log set result
  async logSetResult(setData: {
    workout_instance_id: string
    exercise_name: string
    set_number: number
    reps?: number
    weight_lbs?: number
    duration_seconds?: number
    distance_meters?: number
    rpe?: number
    notes?: string
  }) {
    const { data, error } = await supabase
      .from('set_results')
      .insert(setData)
      .select()
      .single()
    
    return { data, error }
  },

  // Get user's meal instances for a date range
  async getUserMeals(userId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('meal_instances')
      .select('*')
      .eq('user_id', userId)
      .gte('meal_date', startDate)
      .lte('meal_date', endDate)
      .order('meal_date', { ascending: false })
    
    return { data, error }
  },

  // Log meal instance
  async logMeal(mealData: {
    user_id: string
    meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
    meal_date: string
    food_items: { name: string; calories: number; protein_g: number; carbs_g: number; fat_g: number }[]
    total_calories?: number
    total_protein_g?: number
    total_carbs_g?: number
    total_fat_g?: number
    notes?: string
  }) {
    const { data, error } = await supabase
      .from('meal_instances')
      .insert(mealData)
      .select()
      .single()
    
    return { data, error }
  },

  // Award XP to user
  async awardXP(xpData: {
    user_id: string
    xp_type: 'workout_completed' | 'streak_milestone' | 'weight_goal' | 'consistency_bonus'
    xp_amount: number
    description?: string
    reference_id?: string
  }) {
    const { data, error } = await supabase
      .from('user_xp')
      .insert(xpData)
      .select()
      .single()
    
    return { data, error }
  },

  // Get user's total XP
  async getUserTotalXP(userId: string) {
    const { data, error } = await supabase
      .from('user_xp')
      .select('xp_amount')
      .eq('user_id', userId)
    
    if (error) return { total: 0, error }
    
    const total = data?.reduce((sum, record) => sum + record.xp_amount, 0) || 0
    return { total, error: null }
  },

  // Log system event
  async logEvent(eventData: {
    user_id?: string
    event_type: string
    ip_address?: string
    user_agent?: string
  }) {
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single()
    
    return { data, error }
  }
}
