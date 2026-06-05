import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gvwxxyyjbetzeniupnqe.supabase.co',
  'sb_publishable_iGhE3W3Ii3U4Y-ugKBV6eA_Hg1qq6zl'
)

const suppliers = [
  // Major Events Partners
  { name: 'Dunlop Flooring',        tier: 'Major Events Partner', passport_code: 'FW26-DUNLOP',    is_active: true, sort_order: 10  },
  { name: 'Premium',                tier: 'Major Events Partner', passport_code: 'FW26-PREMIUM',   is_active: true, sort_order: 20  },
  { name: 'Godfrey Hirst & Feltex', tier: 'Major Events Partner', passport_code: 'FW26-GHFELTEX',  is_active: true, sort_order: 30  },
  { name: 'AST',                    tier: 'Major Events Partner', passport_code: 'FW26-AST',        is_active: true, sort_order: 40  },
  { name: 'Armstrong',              tier: 'Major Events Partner', passport_code: 'FW26-ARMSTRONG',  is_active: true, sort_order: 50  },
  // Platinum Sponsors
  { name: 'Beaulieu',               tier: 'Platinum Sponsor',     passport_code: 'FW26-BEAULIEU',   is_active: true, sort_order: 60  },
  { name: 'Clever Choice',          tier: 'Platinum Sponsor',     passport_code: 'FW26-CLEVER',     is_active: true, sort_order: 70  },
  { name: 'EC',                     tier: 'Platinum Sponsor',     passport_code: 'FW26-EC',         is_active: true, sort_order: 80  },
  { name: 'Polyflor',               tier: 'Platinum Sponsor',     passport_code: 'FW26-POLYFLOR',   is_active: true, sort_order: 90  },
  { name: 'Signature',              tier: 'Platinum Sponsor',     passport_code: 'FW26-SIGNATURE',  is_active: true, sort_order: 100 },
  { name: 'Tarkett',                tier: 'Platinum Sponsor',     passport_code: 'FW26-TARKETT',    is_active: true, sort_order: 110 },
  { name: 'Quest',                  tier: 'Platinum Sponsor',     passport_code: 'FW26-QUEST',      is_active: true, sort_order: 120 },
  { name: 'NFD',                    tier: 'Platinum Sponsor',     passport_code: 'FW26-NFD',        is_active: true, sort_order: 130 },
  // Gold Sponsors
  { name: 'Capture',                tier: 'Gold Sponsor',         passport_code: 'FW26-CAPTURE',    is_active: true, sort_order: 140 },
  { name: 'Karndean',               tier: 'Gold Sponsor',         passport_code: 'FW26-KARNDEAN',   is_active: true, sort_order: 150 },
  { name: 'MJS',                    tier: 'Gold Sponsor',         passport_code: 'FW26-MJS',        is_active: true, sort_order: 160 },
  { name: 'Victoria Carpets',       tier: 'Gold Sponsor',         passport_code: 'FW26-VICTORIA',   is_active: true, sort_order: 170 },
  { name: 'Pegulan',                tier: 'Gold Sponsor',         passport_code: 'FW26-PEGULAN',    is_active: true, sort_order: 180 },
  // Partners
  { name: 'Access',                 tier: 'Partner',              passport_code: 'FW26-ACCESS',     is_active: true, sort_order: 190 },
  { name: 'VIF',                    tier: 'Partner',              passport_code: 'FW26-VIF',        is_active: true, sort_order: 200 },
  { name: 'Interface',              tier: 'Partner',              passport_code: 'FW26-INTERFACE',  is_active: true, sort_order: 210 },
]

async function run() {
  // Sign in as admin to get full table access
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: 'surani@floorworld.com.au',
    password: 'Conference2026!',
  })
  if (authError) { console.error('Auth failed:', authError.message); process.exit(1) }
  console.log('✓ Signed in as admin')

  // Clear existing suppliers (passport_stamps cascade automatically)
  const { error: delError } = await supabase.from('suppliers').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delError) { console.error('Delete failed:', delError.message); process.exit(1) }
  console.log('✓ Cleared existing suppliers')

  // Insert all 21 confirmed suppliers
  const { data, error: insError } = await supabase.from('suppliers').insert(suppliers).select()
  if (insError) { console.error('Insert failed:', insError.message); process.exit(1) }

  console.log(`✓ Loaded ${data.length} suppliers:`)
  data.forEach(s => console.log(`  ${s.sort_order.toString().padStart(3)}  ${s.name.padEnd(26)} [${s.tier}]  ${s.passport_code}`))
  console.log('\n✅ Done — Supplier Expo Passport is ready.')
}

run()
