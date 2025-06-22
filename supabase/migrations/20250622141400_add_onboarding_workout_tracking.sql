-- Add onboarding fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS selected_workout_plan TEXT,
ADD COLUMN IF NOT EXISTS fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
ADD COLUMN IF NOT EXISTS fitness_goals TEXT[],
ADD COLUMN IF NOT EXISTS workout_frequency INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS preferred_workout_days TEXT[],
ADD COLUMN IF NOT EXISTS age INTEGER CHECK (age >= 13 AND age <= 100),
ADD COLUMN IF NOT EXISTS weight INTEGER CHECK (weight >= 50 AND weight <= 500),
ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other')),
ADD COLUMN IF NOT EXISTS food_allergies TEXT[],
ADD COLUMN IF NOT EXISTS fitness_objectives TEXT[];

-- Create workout templates table (for admin-created workout plans)
CREATE TABLE IF NOT EXISTS templates (
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

-- Create workout instances table (user workout sessions)
CREATE TABLE IF NOT EXISTS workout_instances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  template_id UUID REFERENCES templates(id),
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

-- Add RLS policies for templates
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Templates are viewable by authenticated users" ON templates
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Templates are insertable by authenticated users" ON templates
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Templates are updatable by creator" ON templates
  FOR UPDATE USING (auth.uid() = created_by);

-- Add RLS policies for workout_instances
ALTER TABLE workout_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own workout instances" ON workout_instances
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout instances" ON workout_instances
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout instances" ON workout_instances
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout instances" ON workout_instances
  FOR DELETE USING (auth.uid() = user_id);

-- Add updated_at trigger for templates
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add updated_at trigger for workout_instances
CREATE TRIGGER update_workout_instances_updated_at
  BEFORE UPDATE ON workout_instances
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
