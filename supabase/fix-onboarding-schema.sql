-- Fix onboarding schema - ensure all required fields exist
-- Run this in Supabase SQL Editor

-- Add all onboarding fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS selected_workout_plan TEXT,
ADD COLUMN IF NOT EXISTS fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS workout_frequency INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS preferred_workout_days TEXT[],
ADD COLUMN IF NOT EXISTS age INTEGER CHECK (age >= 13 AND age <= 100),
ADD COLUMN IF NOT EXISTS weight INTEGER CHECK (weight >= 50 AND weight <= 500),
ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other')),
ADD COLUMN IF NOT EXISTS food_allergies TEXT[],
ADD COLUMN IF NOT EXISTS fitness_objectives TEXT[];

-- Remove old fitness_goals column if it exists (replaced by fitness_objectives)
ALTER TABLE profiles DROP COLUMN IF EXISTS fitness_goals;

-- Update existing users to have default values
UPDATE profiles 
SET onboarding_completed = false 
WHERE onboarding_completed IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN profiles.onboarding_completed IS 'Tracks if user has completed initial onboarding flow';
COMMENT ON COLUMN profiles.selected_workout_plan IS 'User selected workout plan name/type';
COMMENT ON COLUMN profiles.fitness_level IS 'User self-reported fitness level';
COMMENT ON COLUMN profiles.fitness_objectives IS 'Array of user fitness objectives';
COMMENT ON COLUMN profiles.workout_frequency IS 'Preferred workouts per week';
COMMENT ON COLUMN profiles.preferred_workout_days IS 'Array of preferred workout days';
COMMENT ON COLUMN profiles.age IS 'User age in years';
COMMENT ON COLUMN profiles.weight IS 'User weight in pounds';
COMMENT ON COLUMN profiles.gender IS 'User gender identity';
COMMENT ON COLUMN profiles.food_allergies IS 'Array of user food allergies';
