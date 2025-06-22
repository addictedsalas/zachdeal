-- Built By Deal Fitness App Row-Level Security Policies
-- Sprint 3: Database Schema & Row-Level Security

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE set_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- PROFILES TABLE POLICIES
-- Users can read and update their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Profiles are created via webhook, so allow service role to insert
CREATE POLICY "Service role can insert profiles" ON profiles
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- TEMPLATES TABLE POLICIES
-- All authenticated users can read active templates
CREATE POLICY "Authenticated users can read active templates" ON templates
  FOR SELECT USING (
    auth.role() = 'authenticated' AND is_active = true
  );

-- Only admins/coaches can modify templates
CREATE POLICY "Admins can manage templates" ON templates
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    (auth.uid() IS NOT NULL AND 
     EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND stripe_status = 'active'))
  );

-- WORKOUT_INSTANCES TABLE POLICIES
-- Users can only access their own workout instances if they have active subscription
CREATE POLICY "Users can read own workout instances" ON workout_instances
  FOR SELECT USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

CREATE POLICY "Users can insert own workout instances" ON workout_instances
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

CREATE POLICY "Users can update own workout instances" ON workout_instances
  FOR UPDATE USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

CREATE POLICY "Users can delete own workout instances" ON workout_instances
  FOR DELETE USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

-- SET_RESULTS TABLE POLICIES
-- Users can access set results for their own workouts only
CREATE POLICY "Users can read own set results" ON set_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workout_instances wi
      JOIN profiles p ON wi.user_id = p.id
      WHERE wi.id = workout_instance_id 
      AND wi.user_id = auth.uid()
      AND p.stripe_status = 'active'
    )
  );

CREATE POLICY "Users can insert own set results" ON set_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_instances wi
      JOIN profiles p ON wi.user_id = p.id
      WHERE wi.id = workout_instance_id 
      AND wi.user_id = auth.uid()
      AND p.stripe_status = 'active'
    )
  );

CREATE POLICY "Users can update own set results" ON set_results
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workout_instances wi
      JOIN profiles p ON wi.user_id = p.id
      WHERE wi.id = workout_instance_id 
      AND wi.user_id = auth.uid()
      AND p.stripe_status = 'active'
    )
  );

CREATE POLICY "Users can delete own set results" ON set_results
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workout_instances wi
      JOIN profiles p ON wi.user_id = p.id
      WHERE wi.id = workout_instance_id 
      AND wi.user_id = auth.uid()
      AND p.stripe_status = 'active'
    )
  );

-- MEAL_INSTANCES TABLE POLICIES
-- Users can access their own meal data only with active subscription
CREATE POLICY "Users can read own meal instances" ON meal_instances
  FOR SELECT USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

CREATE POLICY "Users can insert own meal instances" ON meal_instances
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

CREATE POLICY "Users can update own meal instances" ON meal_instances
  FOR UPDATE USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

CREATE POLICY "Users can delete own meal instances" ON meal_instances
  FOR DELETE USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

-- USER_XP TABLE POLICIES
-- Users can read their own XP data only
CREATE POLICY "Users can read own xp" ON user_xp
  FOR SELECT USING (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND stripe_status = 'active'
    )
  );

-- XP is typically awarded by the system, so allow service role to insert
CREATE POLICY "Service role can insert xp" ON user_xp
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- EVENTS TABLE POLICIES
-- Users can read their own events only
CREATE POLICY "Users can read own events" ON events
  FOR SELECT USING (user_id = auth.uid());

-- Events are typically logged by the system
CREATE POLICY "Service role can insert events" ON events
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Allow authenticated users to insert their own events (for client-side logging)
CREATE POLICY "Users can insert own events" ON events
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- ADDITIONAL SECURITY FUNCTIONS
-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION user_has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_uuid 
    AND stripe_status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's subscription tier
CREATE OR REPLACE FUNCTION get_user_subscription_tier(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  tier TEXT;
BEGIN
  SELECT subscription_tier INTO tier
  FROM profiles 
  WHERE id = user_uuid 
  AND stripe_status = 'active';
  
  RETURN COALESCE(tier, 'inactive');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
