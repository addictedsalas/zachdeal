-- Built By Deal Fitness App Database Schema
-- Sprint 3: Database Schema & Row-Level Security

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  stripe_status TEXT DEFAULT 'inactive' CHECK (stripe_status IN ('active', 'inactive', 'canceled', 'past_due')),
  subscription_tier TEXT CHECK (subscription_tier IN ('BASIC', 'PREMIUM', 'ELITE')),
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT false,
  selected_workout_plan TEXT,
  fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
  fitness_goals TEXT[],
  workout_frequency INTEGER DEFAULT 3,
  preferred_workout_days TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workout templates (created by admin/coaches)
CREATE TABLE templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes INTEGER,
  muscle_groups TEXT[], -- Array of muscle groups
  equipment_needed TEXT[],
  exercise_data JSONB NOT NULL, -- Structured workout data
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User workout instances (when a user starts/completes a workout)
CREATE TABLE workout_instances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  template_id UUID REFERENCES templates(id) NOT NULL,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'skipped')),
  scheduled_date DATE,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  notes TEXT,
  workout_data JSONB, -- User's version of the workout (may be modified)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual set results for exercises
CREATE TABLE set_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_instance_id UUID REFERENCES workout_instances(id) ON DELETE CASCADE NOT NULL,
  exercise_name TEXT NOT NULL,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight_lbs DECIMAL(5,2),
  duration_seconds INTEGER, -- For time-based exercises
  distance_meters DECIMAL(8,2), -- For cardio
  rpe INTEGER CHECK (rpe BETWEEN 1 AND 10), -- Rate of Perceived Exertion
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meal logging instances
CREATE TABLE meal_instances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  meal_date DATE NOT NULL,
  food_items JSONB NOT NULL, -- Array of food items with nutritional data
  total_calories INTEGER,
  total_protein_g DECIMAL(6,2),
  total_carbs_g DECIMAL(6,2),
  total_fat_g DECIMAL(6,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User experience points and achievements
CREATE TABLE user_xp (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  xp_type TEXT NOT NULL CHECK (xp_type IN ('workout_completed', 'streak_milestone', 'weight_goal', 'consistency_bonus')),
  xp_amount INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  reference_id UUID, -- Can reference workout_instance, meal_instance, etc.
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

-- System events and user activity log
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX idx_profiles_stripe_status ON profiles(stripe_status);
CREATE INDEX idx_workout_instances_user_id ON workout_instances(user_id);
CREATE INDEX idx_workout_instances_template_id ON workout_instances(template_id);
CREATE INDEX idx_workout_instances_scheduled_date ON workout_instances(scheduled_date);
CREATE INDEX idx_set_results_workout_instance_id ON set_results(workout_instance_id);
CREATE INDEX idx_meal_instances_user_id ON meal_instances(user_id);
CREATE INDEX idx_meal_instances_meal_date ON meal_instances(meal_date);
CREATE INDEX idx_user_xp_user_id ON user_xp(user_id);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_created_at ON events(created_at);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workout_instances_updated_at BEFORE UPDATE ON workout_instances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meal_instances_updated_at BEFORE UPDATE ON meal_instances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
