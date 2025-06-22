-- Safe migration that handles existing objects
-- Add onboarding fields to profiles table (only if they don't exist)
DO $$
BEGIN
    -- Add age column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'age') THEN
        ALTER TABLE profiles ADD COLUMN age INTEGER CHECK (age >= 13 AND age <= 100);
    END IF;
    
    -- Add weight column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'weight') THEN
        ALTER TABLE profiles ADD COLUMN weight INTEGER CHECK (weight >= 50 AND weight <= 500);
    END IF;
    
    -- Add gender column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'gender') THEN
        ALTER TABLE profiles ADD COLUMN gender TEXT CHECK (gender IN ('male', 'female', 'other'));
    END IF;
    
    -- Add food_allergies column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'food_allergies') THEN
        ALTER TABLE profiles ADD COLUMN food_allergies TEXT[];
    END IF;
    
    -- Add fitness_objectives column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'fitness_objectives') THEN
        ALTER TABLE profiles ADD COLUMN fitness_objectives TEXT[];
    END IF;
    
    -- Add onboarding_completed column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'onboarding_completed') THEN
        ALTER TABLE profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;
    END IF;
    
    -- Add selected_workout_plan column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'selected_workout_plan') THEN
        ALTER TABLE profiles ADD COLUMN selected_workout_plan TEXT;
    END IF;
    
    -- Add fitness_level column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'fitness_level') THEN
        ALTER TABLE profiles ADD COLUMN fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced'));
    END IF;
    
    -- Add fitness_goals column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'fitness_goals') THEN
        ALTER TABLE profiles ADD COLUMN fitness_goals TEXT[];
    END IF;
    
    -- Add workout_frequency column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'workout_frequency') THEN
        ALTER TABLE profiles ADD COLUMN workout_frequency INTEGER DEFAULT 3;
    END IF;
    
    -- Add preferred_workout_days column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'preferred_workout_days') THEN
        ALTER TABLE profiles ADD COLUMN preferred_workout_days TEXT[];
    END IF;
END $$;
