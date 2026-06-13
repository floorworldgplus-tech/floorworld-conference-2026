-- ============================================================
-- Create 4 missing accounts: Pat Urquhart, Ryan Smith, Brendan Fall, Matthew Taylor
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

INSERT INTO profiles (id, email, full_name, role, company, bio, is_active)
SELECT au.id, au.email, 'Pat Urquhart', 'delegate', 'Smith''''s Floorworld Ringwood', 'Manager', true
FROM auth.users au WHERE au.email = 'pat@smithsfloors.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;

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

INSERT INTO profiles (id, email, full_name, role, company, bio, is_active)
SELECT au.id, au.email, 'Ryan Smith', 'delegate', 'Smith''''s Floorworld Ringwood', '', true
FROM auth.users au WHERE au.email = 'ryansmith@smithsfloors.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;

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

INSERT INTO profiles (id, email, full_name, role, company, bio, is_active)
SELECT au.id, au.email, 'Brendan Fall', 'supplier', 'Victoria Carpets', '', true
FROM auth.users au WHERE au.email = 'fallb@victoriacarpets.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;

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

INSERT INTO profiles (id, email, full_name, role, company, bio, is_active)
SELECT au.id, au.email, 'Matthew Taylor', 'supplier', 'Victoria Carpets', 'Victorian State Manager', true
FROM auth.users au WHERE au.email = 'taylorm@victoriacarpets.com.au'
  AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = au.id)
ON CONFLICT DO NOTHING;
