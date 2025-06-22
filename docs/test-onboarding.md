# Testing Onboarding Flow

## Prerequisites

1. **Run Database Migration**
   ```bash
   # If using Supabase CLI (recommended)
   supabase db push

   # Or manually run the SQL in Supabase dashboard
   # Copy contents of: supabase/migrations/20250622141400_add_onboarding_workout_tracking.sql
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Onboarding**
   - Navigate to: `http://localhost:3000/onboarding`
   - Or complete signup flow and it will redirect to onboarding

## Testing Steps

### Step 1: Basic Info
- Enter age (13-100)
- Enter weight (50-500 lbs)
- Select gender (male/female/other)
- Click "Next"

### Step 2: Food Allergies
- Select any applicable allergies
- Can select multiple or "None"
- Click "Next"

### Step 3: Fitness Objectives
- Select one or more fitness goals
- Must select at least one to proceed
- Click "Next"

### Step 4: Experience & Frequency
- Choose fitness level (beginner/intermediate/advanced)
- Select workout frequency (3-6 times per week)
- Click "Next"

### Step 5: Plan Recommendation
- System automatically recommends a plan based on your selections
- Plan recommendation logic:
  - **Strength Builder**: For muscle building and strength goals
  - **Lean Physique**: For fat loss and toning goals
  - **Athletic Performance**: For performance and endurance goals
- Click "Complete Setup"

## Expected Behavior

1. **Successful Save**: Redirects to `/dashboard`
2. **Error**: Check browser console for detailed error logs
3. **Database**: Profile should be updated with onboarding data

## Debugging

If onboarding fails to save:

1. **Check Console Logs**: Look for detailed error messages
2. **Verify Database Schema**: Ensure migration ran successfully
3. **Check Supabase Dashboard**: Verify new columns exist in profiles table
4. **Test Database Connection**: Ensure Supabase client is working

## Database Schema Verification

The following columns should exist in the `profiles` table:
- `age` (integer, 13-100)
- `weight` (integer, 50-500)
- `gender` (text, male/female/other)
- `food_allergies` (text array)
- `fitness_objectives` (text array)
- `fitness_level` (text, beginner/intermediate/advanced)
- `workout_frequency` (integer, 3-6)
- `selected_workout_plan` (text)
- `onboarding_completed` (boolean)

## Common Issues

1. **Migration Not Run**: Columns don't exist in database
2. **RLS Policies**: User might not have permission to update profile
3. **Type Mismatches**: Data types don't match schema expectations
4. **Network Issues**: Supabase connection problems
