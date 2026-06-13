-- ============================================================
-- Create 4 missing accounts + full itinerary data
-- Pat Urquhart, Ryan Smith (Smith's Floorworld Ringwood - Member/delegate)
-- Brendan Fall, Matthew Taylor (Victoria Carpets - Supplier)
-- ============================================================

-- ============================================================
-- STEP 1: Create auth accounts
-- ============================================================

-- Pat Urquhart <pat@smithsfloors.com.au>
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, confirmation_token,
  email_change, email_change_token_new, recovery_token
)
SELECT
  '849778b3-0fd6-4085-948c-cd8b0adc0c86', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'pat@smithsfloors.com.au',
  crypt('KL26PaUrq!', gen_salt('bf')), NOW(),
  NOW(), NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Pat Urquhart","company":"Smith''s Floorworld Ringwood"}'::jsonb,
  false, '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'pat@smithsfloors.com.au');

-- Ryan Smith <ryansmith@smithsfloors.com.au>
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, confirmation_token,
  email_change, email_change_token_new, recovery_token
)
SELECT
  'cd46190e-d100-4186-bc08-fa9e379c19a8', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'ryansmith@smithsfloors.com.au',
  crypt('KL26RySmi!', gen_salt('bf')), NOW(),
  NOW(), NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Ryan Smith","company":"Smith''s Floorworld Ringwood"}'::jsonb,
  false, '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'ryansmith@smithsfloors.com.au');

-- Brendan Fall <fallb@victoriacarpets.com.au>
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, confirmation_token,
  email_change, email_change_token_new, recovery_token
)
SELECT
  '3d5593ca-5af0-4182-a0d2-c871ae788162', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'fallb@victoriacarpets.com.au',
  crypt('KL26BrFal!', gen_salt('bf')), NOW(),
  NOW(), NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Brendan Fall","company":"Victoria Carpets"}'::jsonb,
  false, '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'fallb@victoriacarpets.com.au');

-- Matthew Taylor <taylorm@victoriacarpets.com.au>
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, confirmation_token,
  email_change, email_change_token_new, recovery_token
)
SELECT
  '8dd02395-f8bf-4b96-9093-5989fa46273d', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'taylorm@victoriacarpets.com.au',
  crypt('KL26MaTay!', gen_salt('bf')), NOW(),
  NOW(), NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Matthew Taylor","company":"Victoria Carpets"}'::jsonb,
  false, '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'taylorm@victoriacarpets.com.au');

-- ============================================================
-- STEP 2: Create profiles
-- ============================================================

-- Pat Urquhart
INSERT INTO profiles (id, email, full_name, role, company, bio, hotel_name, check_in, check_out, is_active)
SELECT au.id, au.email, 'Pat Urquhart', 'delegate', 'Smith''s Floorworld Ringwood', 'Manager',
  'W Kuala Lumpur', '2026-08-16', '2026-08-21', true
FROM auth.users au WHERE au.email = 'pat@smithsfloors.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;

-- Ryan Smith
INSERT INTO profiles (id, email, full_name, role, company, bio, hotel_name, check_in, check_out, is_active)
SELECT au.id, au.email, 'Ryan Smith', 'delegate', 'Smith''s Floorworld Ringwood', '',
  'W Kuala Lumpur', '2026-08-15', '2026-08-21', true
FROM auth.users au WHERE au.email = 'ryansmith@smithsfloors.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;

-- Brendan Fall
INSERT INTO profiles (id, email, full_name, role, company, bio, hotel_name, check_in, check_out, is_active)
SELECT au.id, au.email, 'Brendan Fall', 'supplier', 'Victoria Carpets', '',
  'W Kuala Lumpur', '2026-08-16', '2026-08-21', true
FROM auth.users au WHERE au.email = 'fallb@victoriacarpets.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;

-- Matthew Taylor
INSERT INTO profiles (id, email, full_name, role, company, bio, hotel_name, check_in, check_out, is_active)
SELECT au.id, au.email, 'Matthew Taylor', 'supplier', 'Victoria Carpets', 'Victorian State Manager',
  'W Kuala Lumpur', '2026-08-16', '2026-08-21', true
FROM auth.users au WHERE au.email = 'taylorm@victoriacarpets.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;

-- ============================================================
-- STEP 3: Upsert travel_info
-- ============================================================

-- Pat Urquhart: W KL King Room, 16-21 Aug, Golf + Penang pre-tour
INSERT INTO travel_info (user_id, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '2026-08-16', '2026-08-21', NULL,
    'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional) (Adult); Penang pre conference tour (Attending); Registration: Floorworld Member; Hotel: W Kuala Lumpur; Room: Run of House King Room incl 1 x breakfast'
  FROM profiles p WHERE p.email = 'pat@smithsfloors.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  check_in=EXCLUDED.check_in, check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Ryan Smith: W KL King Room, 15-21 Aug, Golf
INSERT INTO travel_info (user_id, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '2026-08-15', '2026-08-21', NULL,
    'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional) (Adult); Registration: Floorworld Member; Hotel: W Kuala Lumpur; Room: Run of House King Room incl 1 x breakfast'
  FROM profiles p WHERE p.email = 'ryansmith@smithsfloors.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  check_in=EXCLUDED.check_in, check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Brendan Fall: W KL King Room, 16-21 Aug, no optional activities
INSERT INTO travel_info (user_id, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '2026-08-16', '2026-08-21', NULL,
    'Registration: Sponsor/Partner - Additional delegate; Hotel: W Kuala Lumpur; Room: Run of House King Room incl 1 x breakfast'
  FROM profiles p WHERE p.email = 'fallb@victoriacarpets.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  check_in=EXCLUDED.check_in, check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Matthew Taylor: W KL King Room, 16-21 Aug, no optional activities
INSERT INTO travel_info (user_id, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '2026-08-16', '2026-08-21', NULL,
    'Registration: Gold Sponsor; Hotel: W Kuala Lumpur; Room: Run of House King Room incl 1 x breakfast'
  FROM profiles p WHERE p.email = 'taylorm@victoriacarpets.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  check_in=EXCLUDED.check_in, check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;
