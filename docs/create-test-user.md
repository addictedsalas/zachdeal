# Create Test User with Active Subscription

Follow these steps to create a test user with an active subscription for dashboard testing:

## Method 1: Manual Creation (Recommended)

### Step 1: Sign up normally
1. Go to `/auth` page
2. Sign up with email: `testuser@buildbydeal.com`
3. Password: `TestUser123!`
4. Complete email verification

### Step 2: Update subscription status in database
1. Go to your Supabase dashboard
2. Navigate to Table Editor → `profiles` table
3. Find the row with email `testuser@buildbydeal.com`
4. Edit the row and set:
   - `stripe_status`: `active`
   - `stripe_customer_id`: `cus_test_subscription`
   - `goals`: `Build muscle and lose fat`
   - `equipment`: `Full gym access`
5. Save changes

### Step 3: Test dashboard access
1. Log in with `testuser@buildbydeal.com` / `TestUser123!`
2. You should be redirected to `/dashboard` instead of `/plans`
3. Dashboard should load with full access (no subscription prompt)

## Method 2: SQL Script (Alternative)

If you prefer to use SQL, run this in your Supabase SQL Editor:

```sql
-- First, sign up normally with testuser@buildbydeal.com
-- Then run this SQL to update the profile:

UPDATE profiles 
SET 
  stripe_status = 'active',
  stripe_customer_id = 'cus_test_subscription',
  goals = 'Build muscle and lose fat',
  equipment = 'Full gym access',
  updated_at = NOW()
WHERE email = 'testuser@buildbydeal.com';
```

## Test Credentials
- **Email**: `testuser@buildbydeal.com`
- **Password**: `TestUser123!`
- **Subscription**: Active
- **Access**: Full dashboard access

## What to Test
- [ ] Login redirects to `/dashboard` (not `/plans`)
- [ ] No subscription prompt appears
- [ ] Dashboard loads with all features
- [ ] Navigation works properly
- [ ] Sign out works correctly
