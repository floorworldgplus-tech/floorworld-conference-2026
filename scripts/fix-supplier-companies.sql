-- ============================================================
-- Floorworld Conference 2026 -- Fix supplier company names + add positions
-- 1. Deactivate Capture from suppliers table
-- 2. Update profiles.company to match suppliers.name exactly
-- 3. Update profiles.bio with position/title from registration data
-- ============================================================

-- STEP 1: Deactivate Capture (not attending)
UPDATE suppliers SET is_active = false WHERE name = 'Capture';

-- STEP 2: Normalise profiles.company to match suppliers.name

UPDATE profiles SET company = 'Access' WHERE company = 'Access International Distributors';
UPDATE profiles SET company = 'AST' WHERE company = 'Australian Select Timbers';
UPDATE profiles SET company = 'Beaulieu' WHERE company = 'Beaulieu Australia';
UPDATE profiles SET company = 'Capture' WHERE company = 'Capture Sales';
UPDATE profiles SET company = 'EC' WHERE company = 'EC Carpets';
UPDATE profiles SET company = 'Godfrey Hirst & Feltex' WHERE company = 'Godfrey Hirst';
UPDATE profiles SET company = 'Karndean' WHERE company = 'Karndean Designflooring';
UPDATE profiles SET company = 'MJS' WHERE company = 'Mjs Floorcoverings';
UPDATE profiles SET company = 'NFD' WHERE company = 'Nfd';
UPDATE profiles SET company = 'Polyflor' WHERE company = 'Polyflor Australia';
UPDATE profiles SET company = 'Quest' WHERE company = 'Quest Carpets';
UPDATE profiles SET company = 'Signature' WHERE company = 'Signature Floors';
UPDATE profiles SET company = 'Tarkett' WHERE company = 'Tarkett Australia';
UPDATE profiles SET company = 'VIF' WHERE company = 'Victorian Independent Flooring Pty Ltd';

-- STEP 3: Set bio = position/title for all supplier-role profiles

UPDATE profiles SET bio = 'Managing Director' WHERE email = 'adrian@vif.net.au';
UPDATE profiles SET bio = 'VIC Sales State Manager' WHERE email = 'alex.greer@eccarpets.com.au';
UPDATE profiles SET bio = 'Managing Director' WHERE email = 'alex@asttimbers.com.au';
UPDATE profiles SET bio = 'State Manager VIC / TAS' WHERE email = 'ameagher@polyflor.com.au';
UPDATE profiles SET bio = 'CEO' WHERE email = 'andrew.marth@accessintdist.com.au';
UPDATE profiles SET bio = 'Head Of Sales' WHERE email = 'andy.raisen@karndean.com.au';
UPDATE profiles SET bio = 'National Sales Manager' WHERE email = 'anthony@asttimbers.com.au';
UPDATE profiles SET bio = 'National Sales Manager' WHERE email = 'aspence@dunlopflooring.com.au';
UPDATE profiles SET bio = 'Director' WHERE email = 'callum@nfd.com.au';
UPDATE profiles SET bio = 'State Sales Manager' WHERE email = 'cameron.bath@signaturefloors.com.au';
UPDATE profiles SET bio = 'Sales Representative' WHERE email = 'cboehm@dunlopflooring.com.au';
UPDATE profiles SET bio = 'State Sales Manager - QLD' WHERE email = 'corey.george@beaulieu.com.au';
UPDATE profiles SET bio = 'State Sales Manager - VIC/TAS' WHERE email = 'david.goodbody@beaulieu.com.au';
UPDATE profiles SET bio = 'General Manager' WHERE email = 'gilad@capturesales.com.au';
UPDATE profiles SET bio = 'Account Manager' WHERE email = 'james.brown@questcarpet.com.au';
UPDATE profiles SET bio = 'Commercial Sales Director' WHERE email = 'john.whitford@tarkett.com';
UPDATE profiles SET bio = 'Chief Brand & Product Officer' WHERE email = 'juan.briceno@eccarpets.com.au';
UPDATE profiles SET bio = 'National Key Account Manager' WHERE email = 'lauren@nfd.com.au';
UPDATE profiles SET bio = 'National Sales Manager' WHERE email = 'luke.sturgess@mjsfc.com.au';
UPDATE profiles SET bio = 'National Sales Manager - Hard Flooring' WHERE email = 'matthew.devereaux@godfreyhirst.com';
UPDATE profiles SET bio = 'Area Accounts Manager' WHERE email = 'mbutler@asttimbers.com.au';
UPDATE profiles SET bio = 'General Manager' WHERE email = 'michael@cleverchoice.com.au';
UPDATE profiles SET bio = 'Commercial Team Leader' WHERE email = 'mikayla@cleverchoice.com.au';
UPDATE profiles SET bio = 'State Sales Manager' WHERE email = 'neilhume@pegulan.com.au';
UPDATE profiles SET bio = 'State Sales Manager' WHERE email = 'patrick.fagan@signaturefloors.com.au';
UPDATE profiles SET bio = 'National Strategic Manager' WHERE email = 'richie.hinds@godfreyhirst.com';
UPDATE profiles SET bio = 'Partner' WHERE email = 'sales.qld@cleverchoice.com.au';
UPDATE profiles SET bio = 'National Sales Manager' WHERE email = 'scott.bain@tarkett.com';
UPDATE profiles SET bio = 'Managing Director' WHERE email = 'sforde@dunlopflooring.com.au';
UPDATE profiles SET bio = 'General Manager' WHERE email = 'sligertwood@polyflor.com.au';
UPDATE profiles SET bio = 'State Manager' WHERE email = 'soraya.sparrow@interface.com';
UPDATE profiles SET bio = 'CEO' WHERE email = 'stuart.budge@questcarpet.com.au';
UPDATE profiles SET bio = 'State Sales Manager' WHERE email = 'tsherer@asttimbers.com.au';
