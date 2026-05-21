-- ============================================================
-- Floorworld Conference 2026 — Real Agenda Seed
-- Run this in Supabase SQL Editor to replace test data
-- All times stored as UTC (KL is UTC+8, so subtract 8h)
-- ============================================================

DELETE FROM sessions;
-- user_sessions and passport_stamps cascade automatically

INSERT INTO sessions (
  title, description, start_time, end_time, location,
  session_type, speaker_name, speaker_bio,
  sort_order, visible_to, is_optional
) VALUES

-- ──────────────────────────────────────────────────────────
-- SATURDAY 15 AUGUST — NSO & Event Team Arrival (staff only)
-- ──────────────────────────────────────────────────────────
(
  'NSO Team Arrival & Setup',
  'Floorworld NSO team and CIS Events arrive in Kuala Lumpur for conference setup and final preparations including supplier coordination, registration setup and venue walkthroughs.',
  '2026-08-15 00:00:00+00', '2026-08-15 14:00:00+00',
  'W Hotel Kuala Lumpur',
  'transfer', NULL, NULL, 10,
  ARRAY['nso_staff','admin']::user_role[], FALSE
),

-- ──────────────────────────────────────────────────────────
-- SUNDAY 16 AUGUST — Delegate Arrival Day
-- ──────────────────────────────────────────────────────────
(
  'Delegate Arrivals & Check-In',
  'Arrival day for delegates, suppliers and guests. Airport transfers and hotel check-in assistance available throughout the day. Registration desk open with welcome packs available for collection.',
  '2026-08-16 00:00:00+00', '2026-08-16 14:00:00+00',
  'W Hotel Kuala Lumpur',
  'transfer', NULL, NULL, 20,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),

-- ──────────────────────────────────────────────────────────
-- MONDAY 17 AUGUST — Cultural Experience & Welcome Event
-- ──────────────────────────────────────────────────────────
(
  'Kuala Lumpur Cultural Tour',
  'Experience some of Kuala Lumpur''s most iconic cultural attractions. Visits include Batu Caves, Royal Selangor Visitor Centre, King''s Palace and the National Monument. Transport included. Comfortable footwear recommended. Water provided.',
  '2026-08-17 01:00:00+00', '2026-08-17 04:00:00+00',
  'Batu Caves, Royal Selangor Visitor Centre, KL City',
  'excursion', NULL, NULL, 30,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Networking Lunch at Bijan',
  'Relaxed networking lunch with delegates, suppliers and the NSO team. Sponsored by Dunlop.',
  '2026-08-17 04:00:00+00', '2026-08-17 06:00:00+00',
  'Bijan Bar & Restaurant',
  'social', NULL, NULL, 40,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Welcome Event at Wet Deck',
  'Official welcome evening featuring networking, entertainment, cocktails and dinner overlooking the Kuala Lumpur skyline. Buffet dinner with DJ entertainment and rooftop networking. Sponsored by Premium Floors. Smart casual dress code.',
  '2026-08-17 10:00:00+00', '2026-08-17 15:00:00+00',
  'Wet Deck, W Hotel Kuala Lumpur',
  'meal', NULL, NULL, 50,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),

-- ──────────────────────────────────────────────────────────
-- TUESDAY 18 AUGUST — Conference Day 1 & Supplier Expo
-- ──────────────────────────────────────────────────────────
(
  'CEO Business Update & Marketing Overview',
  'Industry updates, Floorworld strategic direction and marketing initiatives. Topics include Website, CRM, Intranet, Paw Perfect, Healthy Haven and Luxury Lifestyle category strategy.',
  '2026-08-18 00:30:00+00', '2026-08-18 01:30:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'keynote', NULL, NULL, 60,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Member Spotlight — Toowoomba Floorworld',
  'Insights into the store''s journey, relocation and Store of the Year success.',
  '2026-08-18 01:30:00+00', '2026-08-18 02:00:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'keynote', NULL, NULL, 70,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Board Update',
  'Update from the Floorworld Board Chairperson.',
  '2026-08-18 02:00:00+00', '2026-08-18 02:20:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'keynote', NULL, NULL, 80,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Morning Tea & Networking',
  NULL,
  '2026-08-18 02:20:00+00', '2026-08-18 02:50:00+00',
  'W Hotel Kuala Lumpur — Ballroom Foyer',
  'social', NULL, NULL, 90,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Keynote — Candice Harvey',
  '"Get Ahead Now" — a powerful leadership and business growth session designed to give Floorworld franchisees practical tools to lead with confidence, build high-performance teams and drive sustainable growth.',
  '2026-08-18 02:50:00+00', '2026-08-18 04:30:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'workshop',
  'Candice Harvey',
  'Leadership strategist and business performance coach. Candice works with business leaders across Australia to build high-performance teams and drive growth. Her "Get Ahead Now" program equips franchise owners with practical tools to lead with confidence and clarity.',
  100,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Supplier Innovation Sessions',
  'Latest product innovations and supplier presentations from Interface, AST and Premium Floors.',
  '2026-08-18 04:30:00+00', '2026-08-18 05:15:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'keynote', NULL, NULL, 110,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Lunch',
  NULL,
  '2026-08-18 05:15:00+00', '2026-08-18 06:00:00+00',
  'W Hotel Kuala Lumpur',
  'meal', NULL, NULL, 120,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Floorworld Supplier Expo',
  'Interactive supplier expo featuring demonstrations, networking lounges and showcases. Complete your Expo Passport by visiting booths to collect stamps — prizes for top collectors!',
  '2026-08-18 06:00:00+00', '2026-08-18 09:30:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'breakout', NULL, NULL, 130,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Happy Hour Networking',
  'Relaxed end-of-expo networking with games, prizes and supplier activations.',
  '2026-08-18 08:30:00+00', '2026-08-18 09:30:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'social', NULL, NULL, 140,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Free Evening — Explore Kuala Lumpur',
  'Free time to explore Kuala Lumpur at your leisure. Your concierge team can assist with restaurant recommendations and transport bookings.',
  '2026-08-18 09:30:00+00', '2026-08-18 15:00:00+00',
  'Kuala Lumpur',
  'free_time', NULL, NULL, 150,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], TRUE
),

-- ──────────────────────────────────────────────────────────
-- WEDNESDAY 19 AUGUST — Conference Day 2
-- ──────────────────────────────────────────────────────────
(
  'BMFM Product & Installation Sessions',
  'Focused training on flooring products, installation techniques and industry best practices.',
  '2026-08-19 00:00:00+00', '2026-08-19 01:00:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'workshop', NULL, NULL, 160,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Supplier Knowledge Sessions',
  'Supplier-led sessions on product innovation and market trends featuring Armstrong, Godfrey Hirst / Feltex, Dunlop and Tarkett.',
  '2026-08-19 01:00:00+00', '2026-08-19 02:00:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'keynote', NULL, NULL, 170,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Morning Tea',
  NULL,
  '2026-08-19 02:00:00+00', '2026-08-19 02:20:00+00',
  'W Hotel Kuala Lumpur — Ballroom Foyer',
  'social', NULL, NULL, 180,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'AI Workshop with Kelly Slessor',
  'Practical AI trends, implementation strategies and real-world business applications for flooring retailers. Walk away with actionable steps to use AI in your store today.',
  '2026-08-19 02:20:00+00', '2026-08-19 03:20:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'workshop',
  'Kelly Slessor',
  'Digital retail strategist and AI specialist. Founder of Shop You, Australia''s first AI retail platform. Kelly helps businesses understand and implement AI for growth and is a sought-after keynote speaker on the future of digital commerce.',
  190,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Interactive Breakout Sessions',
  'Rotating small-group learning sessions on collaboration, AI implementation and sales psychology with Candice Harvey, Kelly Slessor and Stuart Budge.',
  '2026-08-19 03:20:00+00', '2026-08-19 04:40:00+00',
  'W Hotel Kuala Lumpur — Breakout Rooms',
  'workshop',
  'Candice Harvey, Kelly Slessor & Stuart Budge',
  'Stuart Budge is a sales psychology expert and business coach specialising in consumer behaviour and high-performance sales cultures. He helps franchise networks increase conversion and revenue through understanding the psychology behind buying decisions.',
  200,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Conference Closing Address',
  'Conference wrap-up, key takeaways and closing remarks from the CEO.',
  '2026-08-19 04:45:00+00', '2026-08-19 05:00:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'keynote', NULL, NULL, 210,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Lunch',
  NULL,
  '2026-08-19 05:00:00+00', '2026-08-19 06:00:00+00',
  'W Hotel Kuala Lumpur',
  'meal', NULL, NULL, 220,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Petronas Towers Experience',
  'Guided visit to one of Kuala Lumpur''s most iconic landmarks. Transport from the hotel included.',
  '2026-08-19 06:15:00+00', '2026-08-19 07:30:00+00',
  'Petronas Twin Towers, Kuala Lumpur',
  'excursion', NULL, NULL, 230,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),
(
  'Tamarind Springs Networking Dinner',
  'Premium dining and networking in a unique jungle setting. Entertainment included. Sponsored by AST. Smart casual / resort evening attire.',
  '2026-08-19 10:00:00+00', '2026-08-19 15:00:00+00',
  'Tamarind Springs, Kuala Lumpur',
  'meal', NULL, NULL, 240,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),

-- ──────────────────────────────────────────────────────────
-- THURSDAY 20 AUGUST — Leisure Day & Gala Awards Night
-- ──────────────────────────────────────────────────────────
(
  'Optional Leisure Day & Activities',
  'Free leisure time with optional activities available including golf, cooking class, shopping tour, Vespa tour and more. Speak to your concierge team to book.',
  '2026-08-20 00:00:00+00', '2026-08-20 09:00:00+00',
  'Kuala Lumpur',
  'free_time', NULL, NULL, 250,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], TRUE
),
(
  'Gala Dinner & Awards Night',
  'The highlight of Conference 2026 — celebrating excellence across the Floorworld network. Features awards presentations, entertainment, dinner and beverages. Formal / cocktail attire required.',
  '2026-08-20 10:00:00+00', '2026-08-20 15:00:00+00',
  'W Hotel Kuala Lumpur — Ballroom',
  'meal',
  'Candice Harvey',
  'Candice Harvey hosts the Gala Awards Night, celebrating the achievements of Floorworld network members with energy, warmth and inspiration.',
  260,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
),

-- ──────────────────────────────────────────────────────────
-- FRIDAY 21 AUGUST — Departure Day
-- ──────────────────────────────────────────────────────────
(
  'Delegate Departures',
  'Departure day for delegates, suppliers and guests. Airport transfer assistance available. Please ensure all hotel charges are settled at check-out.',
  '2026-08-21 00:00:00+00', '2026-08-21 14:00:00+00',
  'W Hotel Kuala Lumpur',
  'transfer', NULL, NULL, 270,
  ARRAY['delegate','supplier','nso_staff','admin']::user_role[], FALSE
);
