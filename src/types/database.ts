export type UserRole = 'delegate' | 'supplier' | 'nso_staff' | 'admin'
export type SessionType = 'keynote' | 'breakout' | 'workshop' | 'social' | 'meal' | 'transfer' | 'free_time' | 'excursion'
export type FeedbackType = 'session' | 'event_overall' | 'supplier'
export type HelpStatus = 'open' | 'in_progress' | 'resolved'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  company: string | null
  phone: string | null
  photo_url: string | null
  state: string | null
  bio: string | null
  linkedin_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  title: string
  description: string | null
  start_time: string
  end_time: string
  location: string | null
  session_type: SessionType
  speaker_name: string | null
  speaker_bio: string | null
  speaker_photo_url: string | null
  visible_to: UserRole[]
  capacity: number | null
  is_optional: boolean
  sort_order: number
  created_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_id: string
  created_at: string
}

export interface Supplier {
  id: string
  name: string
  logo_url: string | null
  description: string | null
  category: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  website: string | null
  booth_number: string | null
  passport_code: string
  tier: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface PassportStamp {
  id: string
  user_id: string
  supplier_id: string
  scanned_at: string
}

export interface Announcement {
  id: string
  title: string
  body: string
  created_by: string | null
  target_roles: UserRole[] | null
  is_pinned: boolean
  published_at: string
  expires_at: string | null
  created_at: string
}

export interface Resource {
  id: string
  title: string
  description: string | null
  file_url: string | null
  file_type: string | null
  external_url: string | null
  category: string | null
  visible_to: UserRole[] | null
  created_by: string | null
  sort_order: number
  created_at: string
}

export interface TravelInfo {
  id: string
  user_id: string
  arrival_date: string | null
  arrival_time: string | null
  arrival_flight: string | null
  departure_date: string | null
  departure_time: string | null
  departure_flight: string | null
  hotel_name: string | null
  room_number: string | null
  check_in: string | null
  check_out: string | null
  dietary_requirements: string | null
  special_requirements: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  updated_at: string
}

export interface Feedback {
  id: string
  user_id: string
  feedback_type: FeedbackType
  session_id: string | null
  supplier_id: string | null
  rating: number | null
  comments: string | null
  submitted_at: string
}

export interface HelpRequest {
  id: string
  user_id: string
  subject: string
  message: string
  status: HelpStatus
  assigned_to: string | null
  response: string | null
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      sessions: {
        Row: Session
        Insert: Omit<Session, 'id' | 'created_at'>
        Update: Partial<Omit<Session, 'id' | 'created_at'>>
      }
      user_sessions: {
        Row: UserSession
        Insert: Omit<UserSession, 'id' | 'created_at'>
        Update: never
      }
      suppliers: {
        Row: Supplier
        Insert: Omit<Supplier, 'id' | 'created_at'>
        Update: Partial<Omit<Supplier, 'id' | 'created_at'>>
      }
      passport_stamps: {
        Row: PassportStamp
        Insert: Omit<PassportStamp, 'id' | 'scanned_at'>
        Update: never
      }
      announcements: {
        Row: Announcement
        Insert: Omit<Announcement, 'id' | 'created_at'>
        Update: Partial<Omit<Announcement, 'id' | 'created_at'>>
      }
      resources: {
        Row: Resource
        Insert: Omit<Resource, 'id' | 'created_at'>
        Update: Partial<Omit<Resource, 'id' | 'created_at'>>
      }
      travel_info: {
        Row: TravelInfo
        Insert: Omit<TravelInfo, 'id' | 'updated_at'>
        Update: Partial<Omit<TravelInfo, 'id'>>
      }
      feedback: {
        Row: Feedback
        Insert: Omit<Feedback, 'id' | 'submitted_at'>
        Update: never
      }
      help_requests: {
        Row: HelpRequest
        Insert: Omit<HelpRequest, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<HelpRequest, 'id' | 'created_at'>>
      }
    }
    Enums: {
      user_role: UserRole
      session_type: SessionType
      feedback_type: FeedbackType
      help_status: HelpStatus
    }
  }
}
