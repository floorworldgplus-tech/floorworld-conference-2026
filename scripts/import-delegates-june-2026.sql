-- ============================================================
-- Floorworld Conference 2026 -- Itinerary + dietary + room update
-- Upserts travel_info for all 74 registered accounts
-- Includes: hotel_name, room_number (type), check-in/out, dietary,
--           optional tours, sharing info
-- Paste into Supabase SQL Editor and Run All
-- ============================================================

-- Helen Alavanja
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House Twin Room incl 2 x breakfast', '2026-08-15', '2026-08-21', 'Seafood Allergy', 'Registration: Floorworld Member; Sharing with: Holly Athanasopoulos (Daughter)'
  FROM profiles p WHERE p.email = 'helen@floorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Nikki Argianas
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Half day Shopping Tour (Optional); Registration: Sponsor accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'accounts@vif.net.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Mikayla Atkinson
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Exclusive Cooking Class  (Optional), Exclusive Vespa Tour (Optional), Half day Shopping Tour (Optional); Registration: Sponsor accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'mikayla@cleverchoice.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Scott Bain
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Platinum Sponsor'
  FROM profiles p WHERE p.email = 'scott.bain@tarkett.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Gil Baker
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Gold Sponsor'
  FROM profiles p WHERE p.email = 'gilad@capturesales.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Diane Bartel
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-24', '', 'Optional activities: Half day Shopping Tour (Optional); Registration: Floorworld Member; Sharing with: Raymond Bartel'
  FROM profiles p WHERE p.email = 'diane@northlakesfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Cameron Bath
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional)'
  FROM profiles p WHERE p.email = 'cameron.bath@signaturefloors.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Martel Beaumont
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Exclusive Vespa Tour (Optional); Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'martel@devonportfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Richard Beaumont
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Exclusive Vespa Tour (Optional); Registration: Floorworld Member; Sharing with: Martel Beaumont'
  FROM profiles p WHERE p.email = 'richard@devonportfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Paul BEVAN
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', 'Seafood Allergy', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Floorworld additional delegate'
  FROM profiles p WHERE p.email = 'paul.b@floorworldsa.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Jodie Bigger
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'benchmarkfloorings@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Cameron Boehm
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', 'Coeliac, Nut Allergy', 'Registration: Major Sponsor'
  FROM profiles p WHERE p.email = 'cboehm@dunlopflooring.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- DEAN BONUTTO
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'dean.b@floorworldsa.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Juan Briceno
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Platinum Sponsor; Sharing with: Wife'
  FROM profiles p WHERE p.email = 'juan.briceno@eccarpets.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Archie Brophy
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'jason@innercityfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- James Brown
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Platinum Sponsor'
  FROM profiles p WHERE p.email = 'james.brown@questcarpet.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Stuart Budge
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Platinum Sponsor'
  FROM profiles p WHERE p.email = 'stuart.budge@questcarpet.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Matt Butler
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Sponsor/Partner - Additional delegate'
  FROM profiles p WHERE p.email = 'mbutler@asttimbers.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Wendy Byrnes
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Half day Shopping Tour (Optional); Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'accounts@fennellsfloorcoverings.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Heidi Cassidy
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Half day Shopping Tour (Optional); Registration: Floorworld Member; Sharing with: Rodney Cassidy'
  FROM profiles p WHERE p.email = 'accounts@bendigofloorworld.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Rodney Cassidy
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Half day Shopping Tour (Optional); Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'commercial@bendigofloorworld.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Mark Coetzee
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'mark@floorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Belinda Conway
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Registration: Floorworld accompanying person/spouse/partner - Not attending activities'
  FROM profiles p WHERE p.email = 'deanconway72@icloud.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Simone@narrewarrenfloorworld.com Courmadias
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Registration: Child up to 12 years old - Not attending activities'
  FROM profiles p WHERE p.email = 'simone@narrewarrenfloorworld.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Michael Courmadias
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Child up to 12 years old - Not attending activities'
  FROM profiles p WHERE p.email = 'michael@narrewarrenfloorworld.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Matt Devereaux
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House Twin Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Major Sponsor'
  FROM profiles p WHERE p.email = 'matthew.devereaux@godfreyhirst.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Callum Driscoll
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House Twin Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Platinum Sponsor - Included'
  FROM profiles p WHERE p.email = 'callum@nfd.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Patrick Fagan
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Exclusive Vespa Tour (Optional); Registration: Platinum Sponsor'
  FROM profiles p WHERE p.email = 'patrick.fagan@signaturefloors.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Darren Ferne
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Exclusive Cooking Class  (Optional); Registration: Floorworld accompanying person/spouse/partner - Not attending activities'
  FROM profiles p WHERE p.email = 'accounts@cqfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Matthew Findlay
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House Twin Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'matt@frankstonfloorworld.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Sean Forde
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Major Sponsor - Included'
  FROM profiles p WHERE p.email = 'sforde@dunlopflooring.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Corey George
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Platinum Sponsor - Included'
  FROM profiles p WHERE p.email = 'corey.george@beaulieu.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Adrian Giffard
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House Twin Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'adrian@giffards.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Alex Gong
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Major Sponsor - Included'
  FROM profiles p WHERE p.email = 'alex@asttimbers.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- David Goodbody
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Platinum Sponsor'
  FROM profiles p WHERE p.email = 'david.goodbody@beaulieu.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Alex Greer
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Platinum Sponsor - Included'
  FROM profiles p WHERE p.email = 'alex.greer@eccarpets.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Lana Groves
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-13', '2026-08-21', '', 'Optional activities: Exclusive Cooking Class  (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'ben@cqfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Matthew Hadden
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'sales@baysidefloorworld.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Candice Harvey
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-17', '2026-08-21', 'Vegan', ''
  FROM profiles p WHERE p.email = 'info@candiceharvey.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Greg Harvey
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Exclusive Cooking Class  (Optional), Exclusive Vespa Tour (Optional), Half day Shopping Tour (Optional); Registration: Platinum Sponsor - Included; Sharing with: Alissa Ratjens'
  FROM profiles p WHERE p.email = 'sales.qld@cleverchoice.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Richie Hinds
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House Twin Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Major Sponsor - Included'
  FROM profiles p WHERE p.email = 'richie.hinds@godfreyhirst.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Wayne Hoppen
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-13', '2026-08-21', '', 'Optional activities: Exclusive Cooking Class  (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'wayne@hoppens.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Neil Hume
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Gold Sponsor'
  FROM profiles p WHERE p.email = 'neilhume@pegulan.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Adrian Jackson
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Marvellous Suite incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional), Half day Shopping Tour (Optional); Registration: Partner; Sharing with: Nikki Argianas & Alexandra Jackson'
  FROM profiles p WHERE p.email = 'adrian@vif.net.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- NADINE JEFFCOAT
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-22', '', 'Optional activities: Exclusive Vespa Tour (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'nowra@floorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Jamie Keyzer
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-15', '2026-08-21', 'Gluten Free', 'Optional activities: Half day Shopping Tour (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'jamie@floorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- robert levin
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-13', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'robert@innercityfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Stephanie Ligertwood
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-22', 'Other: Strawberry anaphylaxis', 'Registration: Platinum Sponsor'
  FROM profiles p WHERE p.email = 'sligertwood@polyflor.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Dan Manshanden
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Exclusive Vespa Tour (Optional); Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'daniel@launcestonfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Sophie Manshanden
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Exclusive Vespa Tour (Optional); Registration: Floorworld Member; Sharing with: Daniel Manshanden'
  FROM profiles p WHERE p.email = 'sophie@launcestonfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Andrew Marth
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Exclusive Vespa Tour (Optional), Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Partner'
  FROM profiles p WHERE p.email = 'andrew.marth@accessintdist.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Adam McAuliffe
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'adam@floorcam.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Alicia Meagher
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-22', '', ''
  FROM profiles p WHERE p.email = 'ameagher@polyflor.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Rochelle Morris
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Exclusive Cooking Class  (Optional); Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'smbm.consulting@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Dee Nicholas
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', ''
  FROM profiles p WHERE p.email = 'dee@ciseventmanagement.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Ava Parsons (5yo Child)
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, 'Other: Anaphylactic to Egg', 'Optional activities: Half day Shopping Tour (Optional); Registration: Child up to 12 years old - attending all activities'
  FROM profiles p WHERE p.email = 'melissa@kingaroyfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Daniel Parsons
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Optional activities: Half day Shopping Tour (Optional); Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'daniel@kingaroyfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Andy Raisen
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Gold Sponsor'
  FROM profiles p WHERE p.email = 'andy.raisen@karndean.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Michael Roberts
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Exclusive Cooking Class  (Optional), Exclusive Vespa Tour (Optional), Half day Shopping Tour (Optional); Registration: Platinum Sponsor; Sharing with: Mikayla Atkinson'
  FROM profiles p WHERE p.email = 'michael@cleverchoice.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Surani Sahabandu
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-15', '2026-08-21', '', 'Optional activities: Exclusive Cooking Class  (Optional), Half day Shopping Tour (Optional); Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'surani@floorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Toby Sherer
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Major Sponsor - Included'
  FROM profiles p WHERE p.email = 'tsherer@asttimbers.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Kelly Louise Kehinde Slessor
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-17', '2026-08-21', '', 'Optional activities: Half day Shopping Tour (Optional)'
  FROM profiles p WHERE p.email = 'kelly@kellyslessor.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Richard Smith
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'wodonga@floorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Soraya Sparrow
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Partner'
  FROM profiles p WHERE p.email = 'soraya.sparrow@interface.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Andrew Spence
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Major Sponsor'
  FROM profiles p WHERE p.email = 'aspence@dunlopflooring.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- John Staunton
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Floorworld additional delegate'
  FROM profiles p WHERE p.email = 'john@frankstonfloorworld.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Luke Sturgess
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Optional activities: Golf at Bukit Jalil Golf & Country Resort (Optional); Registration: Gold Sponsor'
  FROM profiles p WHERE p.email = 'luke.sturgess@mjsfc.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Brett Talbot
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 1 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Floorworld Member'
  FROM profiles p WHERE p.email = 'brett@floorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Lauren Thomas
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Platinum Sponsor'
  FROM profiles p WHERE p.email = 'lauren@nfd.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Lynda Thornton
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'mark@cpfloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Josh WEST
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, '', '', NULL, NULL, '', 'Registration: Floorworld accompanying person/spouse/partner - Attending all activities'
  FROM profiles p WHERE p.email = 'josh@toowoombafloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- KATIE WEST
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House Twin Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Floorworld Member; Sharing with: JOSHUA WEST'
  FROM profiles p WHERE p.email = 'katie@toowoombafloorworld.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- John Whitford
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Platinum Sponsor - Included'
  FROM profiles p WHERE p.email = 'john.whitford@tarkett.com'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;

-- Anthony Zandona
INSERT INTO travel_info (user_id, hotel_name, room_number, check_in, check_out, dietary_requirements, special_requirements)
  SELECT p.id, 'W Kuala Lumpur', 'Run of House King Room incl 2 x breakfast', '2026-08-16', '2026-08-21', '', 'Registration: Major Sponsor'
  FROM profiles p WHERE p.email = 'anthony@asttimbers.com.au'
ON CONFLICT (user_id) DO UPDATE SET
  hotel_name=EXCLUDED.hotel_name,
  room_number=EXCLUDED.room_number,
  check_in=EXCLUDED.check_in,
  check_out=EXCLUDED.check_out,
  dietary_requirements=EXCLUDED.dietary_requirements,
  special_requirements=EXCLUDED.special_requirements;
