-- Add onboarding and workout plan fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS selected_workout_plan TEXT,
ADD COLUMN IF NOT EXISTS fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS fitness_goals TEXT[],
ADD COLUMN IF NOT EXISTS workout_frequency INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS preferred_workout_days TEXT[];

-- Update existing users to have default values
UPDATE profiles 
SET onboarding_completed = false 
WHERE onboarding_completed IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN profiles.onboarding_completed IS 'Tracks if user has completed initial onboarding flow';
COMMENT ON COLUMN profiles.selected_workout_plan IS 'User selected workout plan name/type';
COMMENT ON COLUMN profiles.fitness_level IS 'User self-reported fitness level';
COMMENT ON COLUMN profiles.fitness_goals IS 'Array of user fitness goals';
COMMENT ON COLUMN profiles.workout_frequency IS 'Preferred workouts per week';
COMMENT ON COLUMN profiles.preferred_workout_days IS 'Array of preferred workout days';
