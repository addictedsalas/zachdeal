-- Create test user with active subscription for dashboard testing
-- This user will have full access to the dashboard without needing to pay

-- Insert test user profile with active subscription
INSERT INTO profiles (
  id,
  email,
  full_name,
  stripe_status,
  stripe_customer_id,
  goals,
  equipment,
  created_at,
  updated_at
) VALUES (
  'test-user-123-456-789',
  'testuser@buildbydeal.com',
  'Test User',
  'active',
  'cus_test_subscription',
  'Build muscle and lose fat',
  'Full gym access',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  stripe_status = 'active',
  stripe_customer_id = 'cus_test_subscription',
  goals = 'Build muscle and lose fat',
  equipment = 'Full gym access',
  updated_at = NOW();

-- Note: This creates a profile entry, but you'll still need to create the actual Supabase auth user
-- through the signup process or Supabase dashboard for this to work properly.

-- Instructions:
-- 1. Run this SQL in your Supabase SQL editor
-- 2. Create a user account with email 'testuser@buildbydeal.com' through normal signup
-- 3. The profile will be automatically linked and have active subscription status
