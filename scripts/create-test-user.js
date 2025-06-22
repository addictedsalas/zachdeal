// Script to create a test user with active subscription
// Run with: node scripts/create-test-user.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // You'll need to add this to .env.local

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  try {
    console.log('Creating test user with active subscription...')
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'testuser@buildbydeal.com',
      password: 'TestUser123!',
      email_confirm: true,
      user_metadata: {
        full_name: 'Test User'
      }
    })

    if (authError) {
      console.error('Error creating auth user:', authError)
      return
    }

    console.log('Auth user created:', authData.user.id)

    // Update profile with active subscription
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: 'testuser@buildbydeal.com',
        full_name: 'Test User',
        stripe_status: 'active',
        stripe_customer_id: 'cus_test_subscription',
        goals: 'Build muscle and lose fat',
        equipment: 'Full gym access',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()

    if (profileError) {
      console.error('Error creating profile:', profileError)
      return
    }

    console.log('Profile created with active subscription:', profileData)
    console.log('\n✅ Test user created successfully!')
    console.log('📧 Email: testuser@buildbydeal.com')
    console.log('🔑 Password: TestUser123!')
    console.log('💳 Subscription: Active')
    console.log('\nYou can now log in with these credentials to test the dashboard!')

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

createTestUser()
