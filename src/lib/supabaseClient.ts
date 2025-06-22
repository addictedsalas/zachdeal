import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types will be generated later with: supabase gen types typescript --local
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          stripe_customer_id: string | null
          stripe_status: 'active' | 'trialing' | 'past_due' | 'canceled' | null
          goals: any | null
          equipment: any | null
          xp: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          stripe_customer_id?: string | null
          stripe_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | null
          goals?: any | null
          equipment?: any | null
          xp?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          stripe_customer_id?: string | null
          stripe_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | null
          goals?: any | null
          equipment?: any | null
          xp?: number
          created_at?: string
          updated_at?: string
        }
      }
      workout_instances: {
        Row: {
          id: string
          user_id: string
          day: string
          content: any
          status: 'planned' | 'active' | 'done'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          day: string
          content: any
          status?: 'planned' | 'active' | 'done'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          day?: string
          content?: any
          status?: 'planned' | 'active' | 'done'
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          content: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          content: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          content?: any
          created_at?: string
          updated_at?: string
        }
      }
      set_results: {
        Row: {
          id: string
          workout_id: string
          exercise: string
          set_index: number
          reps: number
          weight: number
          created_at: string
        }
        Insert: {
          id?: string
          workout_id: string
          exercise: string
          set_index: number
          reps: number
          weight: number
          created_at?: string
        }
        Update: {
          id?: string
          workout_id?: string
          exercise?: string
          set_index?: number
          reps?: number
          weight?: number
          created_at?: string
        }
      }
      meal_log: {
        Row: {
          id: string
          user_id: string
          datetime: string
          kcal: number
          protein: number
          carbs: number
          fat: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          datetime: string
          kcal: number
          protein: number
          carbs: number
          fat: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          datetime?: string
          kcal?: number
          protein?: number
          carbs?: number
          fat?: number
          created_at?: string
        }
      }
    }
  }
}
