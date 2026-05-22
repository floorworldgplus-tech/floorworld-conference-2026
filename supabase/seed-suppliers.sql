-- ============================================================
-- Floorworld Conference 2026 — Confirmed Supplier Passport List
-- Run this in Supabase SQL Editor
-- Clears test suppliers and loads all 21 confirmed expo suppliers
-- Each passport_code is the unique value printed on booth QR codes
-- ============================================================

DELETE FROM passport_stamps;
DELETE FROM suppliers;

INSERT INTO suppliers (name, tier, passport_code, is_active, sort_order) VALUES

-- ── Major Events Partners ────────────────────────────────
('Dunlop Flooring',         'Major Events Partner', 'FW26-DUNLOP',    true, 10),
('Premium',                 'Major Events Partner', 'FW26-PREMIUM',   true, 20),
('Godfrey Hirst & Feltex',  'Major Events Partner', 'FW26-GHFELTEX',  true, 30),
('AST',                     'Major Events Partner', 'FW26-AST',       true, 40),
('Armstrong',               'Major Events Partner', 'FW26-ARMSTRONG', true, 50),

-- ── Platinum Sponsors ────────────────────────────────────
('Beaulieu',                'Platinum Sponsor', 'FW26-BEAULIEU',   true, 60),
('Clever Choice',           'Platinum Sponsor', 'FW26-CLEVER',     true, 70),
('EC',                      'Platinum Sponsor', 'FW26-EC',         true, 80),
('Polyflor',                'Platinum Sponsor', 'FW26-POLYFLOR',   true, 90),
('Signature',               'Platinum Sponsor', 'FW26-SIGNATURE',  true, 100),
('Tarkett',                 'Platinum Sponsor', 'FW26-TARKETT',    true, 110),
('Quest',                   'Platinum Sponsor', 'FW26-QUEST',      true, 120),
('NFD',                     'Platinum Sponsor', 'FW26-NFD',        true, 130),

-- ── Gold Sponsors ────────────────────────────────────────
('Capture',                 'Gold Sponsor', 'FW26-CAPTURE',    true, 140),
('Karndean',                'Gold Sponsor', 'FW26-KARNDEAN',   true, 150),
('MJS',                     'Gold Sponsor', 'FW26-MJS',        true, 160),
('Victoria Carpets',        'Gold Sponsor', 'FW26-VICTORIA',   true, 170),
('Pegulan',                 'Gold Sponsor', 'FW26-PEGULAN',    true, 180),

-- ── Partners ─────────────────────────────────────────────
('Access',                  'Partner', 'FW26-ACCESS',     true, 190),
('VIF',                     'Partner', 'FW26-VIF',        true, 200),
('Interface',               'Partner', 'FW26-INTERFACE',  true, 210);
