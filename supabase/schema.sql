-- ============================================================
-- Floorworld Conference 2026 — Supabase Schema
-- Run this in your Supabase project: SQL Editor > New Query
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('delegate', 'supplier', 'nso_staff', 'admin');
CREATE TYPE session_type AS ENUM ('keynote', 'breakout', 'workshop', 'social', 'meal', 'transfer', 'free_time', 'excursion');
CREATE TYPE feedback_type AS ENUM ('session', 'event_overall', 'supplier');
CREATE TYPE help_status AS ENUM ('open', 'in_progress', 'resolved');

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles (extends auth.users — one row per user)
CREATE TABLE profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email         TEXT NOT NULL,
  full_name     TEXT NOT NULL DEFAULT '',
  role          user_role NOT NULL DEFAULT 'delegate',
  company       TEXT,
  phone         TEXT,
  photo_url     TEXT,
  state         TEXT,        -- AU state/territory for delegates
  bio           TEXT,
  linkedin_url  TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Agenda sessions
CREATE TABLE sessions (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title             TEXT NOT NULL,
  description       TEXT,
  start_time        TIMESTAMPTZ NOT NULL,
  end_time          TIMESTAMPTZ NOT NULL,
  location          TEXT,
  session_type      session_type NOT NULL DEFAULT 'keynote',
  speaker_name      TEXT,
  speaker_bio       TEXT,
  speaker_photo_url TEXT,
  visible_to        user_role[] NOT NULL DEFAULT ARRAY['delegate','supplier','nso_staff','admin']::user_role[],
  capacity          INTEGER,
  is_optional       BOOLEAN NOT NULL DEFAULT false,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Personalised agenda (delegates bookmark optional sessions)
CREATE TABLE user_sessions (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, session_id)
);

-- Suppliers / sponsor expo booths
CREATE TABLE suppliers (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name          TEXT NOT NULL,
  logo_url      TEXT,
  description   TEXT,
  category      TEXT,
  contact_name  TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website       TEXT,
  booth_number  TEXT,
  passport_code TEXT NOT NULL UNIQUE,  -- QR code value delegates scan
  tier          TEXT NOT NULL DEFAULT 'standard',  -- gold, silver, bronze, standard
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Expo passport stamps (delegate scans supplier booth)
CREATE TABLE passport_stamps (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  scanned_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, supplier_id)
);

-- Announcements (push to all or specific roles)
CREATE TABLE announcements (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT NOT NULL,
  body         TEXT NOT NULL,
  created_by   UUID REFERENCES profiles(id) ON DELETE SET NULL,
  target_roles user_role[],   -- NULL = visible to all roles
  is_pinned    BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Resource library (PDFs, links, images)
CREATE TABLE resources (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  file_url     TEXT,
  file_type    TEXT,          -- pdf, image, link, video
  external_url TEXT,
  category     TEXT,
  visible_to   user_role[],   -- NULL = visible to all roles
  created_by   UUID REFERENCES profiles(id) ON DELETE SET NULL,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Travel & logistics per attendee
CREATE TABLE travel_info (
  id                       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id                  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  arrival_date             DATE,
  arrival_time             TIME,
  arrival_flight           TEXT,
  departure_date           DATE,
  departure_time           TIME,
  departure_flight         TEXT,
  hotel_name               TEXT,
  room_number              TEXT,
  check_in                 DATE,
  check_out                DATE,
  dietary_requirements     TEXT,
  special_requirements     TEXT,
  emergency_contact_name   TEXT,
  emergency_contact_phone  TEXT,
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Session / event / supplier feedback
CREATE TABLE feedback (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feedback_type feedback_type NOT NULL,
  session_id    UUID REFERENCES sessions(id) ON DELETE SET NULL,
  supplier_id   UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  rating        INTEGER CHECK (rating >= 1 AND rating <= 5),
  comments      TEXT,
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Help desk requests
CREATE TABLE help_requests (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      help_status NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  response    TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_sessions_start_time        ON sessions(start_time);
CREATE INDEX idx_sessions_visible_to        ON sessions USING GIN(visible_to);
CREATE INDEX idx_announcements_published    ON announcements(published_at DESC);
CREATE INDEX idx_announcements_target_roles ON announcements USING GIN(target_roles);
CREATE INDEX idx_passport_stamps_user       ON passport_stamps(user_id);
CREATE INDEX idx_help_requests_status       ON help_requests(status);
CREATE INDEX idx_resources_visible_to       ON resources USING GIN(visible_to);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER travel_info_updated_at
  BEFORE UPDATE ON travel_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER help_requests_updated_at
  BEFORE UPDATE ON help_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile row when a user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'delegate')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Helper: get the role of the currently authenticated user
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS user_role LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE passport_stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources      ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_info    ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback       ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_requests  ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "view_active_profiles" ON profiles
  FOR SELECT USING (is_active = true AND auth.uid() IS NOT NULL);

CREATE POLICY "update_own_profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "admin_manage_profiles" ON profiles
  FOR ALL USING (get_my_role() IN ('admin', 'nso_staff'));

-- Sessions
CREATE POLICY "view_sessions" ON sessions
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND
    get_my_role() = ANY(visible_to)
  );

CREATE POLICY "admin_manage_sessions" ON sessions
  FOR ALL USING (get_my_role() IN ('admin', 'nso_staff'));

-- User sessions (personalised agenda)
CREATE POLICY "manage_own_agenda" ON user_sessions
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "admin_view_all_agendas" ON user_sessions
  FOR SELECT USING (get_my_role() IN ('admin', 'nso_staff'));

-- Suppliers
CREATE POLICY "view_active_suppliers" ON suppliers
  FOR SELECT USING (is_active = true AND auth.uid() IS NOT NULL);

CREATE POLICY "admin_manage_suppliers" ON suppliers
  FOR ALL USING (get_my_role() IN ('admin', 'nso_staff'));

-- Passport stamps
CREATE POLICY "view_own_stamps" ON passport_stamps
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "insert_own_stamp" ON passport_stamps
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_view_all_stamps" ON passport_stamps
  FOR SELECT USING (get_my_role() IN ('admin', 'nso_staff'));

-- Announcements
CREATE POLICY "view_announcements" ON announcements
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND
    (target_roles IS NULL OR get_my_role() = ANY(target_roles)) AND
    (expires_at IS NULL OR expires_at > NOW())
  );

CREATE POLICY "admin_manage_announcements" ON announcements
  FOR ALL USING (get_my_role() IN ('admin', 'nso_staff'));

-- Resources
CREATE POLICY "view_resources" ON resources
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND
    (visible_to IS NULL OR get_my_role() = ANY(visible_to))
  );

CREATE POLICY "admin_manage_resources" ON resources
  FOR ALL USING (get_my_role() IN ('admin', 'nso_staff'));

-- Travel info
CREATE POLICY "manage_own_travel" ON travel_info
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "admin_view_all_travel" ON travel_info
  FOR SELECT USING (get_my_role() IN ('admin', 'nso_staff'));

-- Feedback
CREATE POLICY "submit_own_feedback" ON feedback
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "view_own_feedback" ON feedback
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "admin_view_all_feedback" ON feedback
  FOR SELECT USING (get_my_role() IN ('admin', 'nso_staff'));

-- Help requests
CREATE POLICY "manage_own_help_requests" ON help_requests
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "staff_manage_all_help_requests" ON help_requests
  FOR ALL USING (get_my_role() IN ('admin', 'nso_staff'));

-- ============================================================
-- SEED DATA (sample — remove or adjust before production)
-- ============================================================

-- Sample sessions for August 16–21, 2026 (times in UTC+8 / KL time stored as UTC)
-- KL is UTC+8, so 09:00 KL = 01:00 UTC

INSERT INTO sessions (title, description, start_time, end_time, location, session_type, sort_order) VALUES
  ('Registration & Welcome',          'Delegate check-in, name badges, welcome pack collection.',
   '2026-08-16 01:00:00+00', '2026-08-16 03:00:00+00', 'Hotel Lobby',          'transfer',   10),
  ('Welcome Dinner & Networking',     'Informal welcome dinner for all delegates and suppliers.',
   '2026-08-16 11:00:00+00', '2026-08-16 14:00:00+00', 'Grand Ballroom',       'social',     20),
  ('Opening Keynote',                 'Growing Stronger Together — the road ahead for Floorworld.',
   '2026-08-17 01:00:00+00', '2026-08-17 02:30:00+00', 'Main Conference Room', 'keynote',    30),
  ('Supplier Expo Opens',             'Visit supplier booths, collect your passport stamps.',
   '2026-08-17 03:00:00+00', '2026-08-17 06:00:00+00', 'Expo Hall',            'social',     40),
  ('Breakout: Marketing & Growth',    'State-by-state marketing performance and 2027 strategy.',
   '2026-08-18 01:00:00+00', '2026-08-18 02:30:00+00', 'Room A',               'breakout',   50),
  ('Breakout: Operations Excellence', 'Workforce, supply chain, and installation best practices.',
   '2026-08-18 01:00:00+00', '2026-08-18 02:30:00+00', 'Room B',               'breakout',   60),
  ('Gala Dinner & Awards Night',      'Celebrate your network. Formal dinner and franchise awards.',
   '2026-08-19 10:30:00+00', '2026-08-20 00:00:00+00', 'Grand Ballroom',       'social',     70),
  ('City Tour — Kuala Lumpur',        'Optional guided city tour. Petronas Towers and city highlights.',
   '2026-08-20 01:00:00+00', '2026-08-20 07:00:00+00', 'Hotel Lobby Departure','excursion',  80),
  ('Closing Session & Wrap-up',       'Reflections, key decisions, and the journey home.',
   '2026-08-21 01:00:00+00', '2026-08-21 03:00:00+00', 'Main Conference Room', 'keynote',    90);

-- Sample suppliers
INSERT INTO suppliers (name, description, category, booth_number, passport_code, tier, sort_order) VALUES
  ('Godfrey Hirst', 'Australia''s leading carpet and flooring manufacturer.', 'Carpet', 'A1', 'GH-2026-EXPO', 'gold', 10),
  ('Dunlop Flooring', 'Premium underlay and flooring solutions.', 'Underlay', 'A2', 'DF-2026-EXPO', 'gold', 20),
  ('Quick-Step', 'Engineered and laminate flooring, industry-leading warranties.', 'Timber & Laminate', 'B1', 'QS-2026-EXPO', 'silver', 30),
  ('Karndean', 'Luxury vinyl tile and plank flooring.', 'Vinyl', 'B2', 'KD-2026-EXPO', 'silver', 40),
  ('Boral Timber', 'Sustainable hardwood and engineered timber flooring.', 'Timber & Laminate', 'C1', 'BT-2026-EXPO', 'bronze', 50),
  ('Interface', 'Commercial carpet tile solutions.', 'Commercial', 'C2', 'IF-2026-EXPO', 'bronze', 60);

-- Push notification subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
  role        TEXT NOT NULL DEFAULT 'delegate',
  endpoint    TEXT NOT NULL,
  subscription_json TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own subscription" ON push_subscriptions
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins read all subscriptions" ON push_subscriptions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Notification centre log
CREATE TABLE IF NOT EXISTS push_notifications_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  audience    TEXT NOT NULL DEFAULT 'all',
  destination TEXT NOT NULL DEFAULT '/home',
  sent_count  INT NOT NULL DEFAULT 0,
  sent_by     UUID REFERENCES auth.users ON DELETE SET NULL,
  sent_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE push_notifications_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All logged-in users can read notification log" ON push_notifications_log
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can insert notification log" ON push_notifications_log
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Personal itineraries (one per delegate, matched by email)
CREATE TABLE IF NOT EXISTS itineraries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES auth.users ON DELETE SET NULL,
  email               TEXT NOT NULL UNIQUE,
  preferred_name      TEXT,
  full_name           TEXT,
  organisation        TEXT,
  registration_type   TEXT,
  dietary_requirements TEXT,
  tshirt_size         TEXT,
  tshirt_quantity     TEXT,
  hotel               TEXT,
  room_type           TEXT,
  checkin_date        TEXT,
  checkout_date       TEXT,
  sharing_with        TEXT,
  flight_preference   TEXT,
  outbound_flight     TEXT,
  return_flight       TEXT,
  transfer_arrival    TEXT,
  transfer_departure  TEXT,
  activities          JSONB,
  program             JSONB,
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own itinerary" ON itineraries
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all itineraries" ON itineraries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
