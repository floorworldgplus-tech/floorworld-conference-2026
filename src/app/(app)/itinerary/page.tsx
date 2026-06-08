import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import ItineraryView from './ItineraryView'

function parseActivities(notes: string | null): { name: string; status: string }[] {
  if (!notes) return []
  const match = notes.match(/Optional activities:\s*([^;]+)/)
  if (!match) return []
  return match[1].split(',').map(a => ({ name: a.trim(), status: 'Attending' })).filter(a => a.name)
}

function formatDate(d: string | null): string | null {
  if (!d) return null
  try {
    return new Date(d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return d }
}

export default async function ItineraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, company, role')
    .eq('id', user.id)
    .single()

  const { data: travel } = await supabase
    .from('travel_info')
    .select('check_in, check_out, dietary_requirements, special_requirements, hotel_name, room_number, arrival_flight, departure_flight')
    .eq('user_id', user.id)
    .single()

  const itinerary = (profile || travel) ? {
    preferred_name: null,
    full_name: profile?.full_name ?? null,
    organisation: profile?.company ?? null,
    registration_type: travel?.special_requirements?.match(/Registration:\s*([^;]+)/)?.[1]?.trim() ?? null,
    dietary_requirements: travel?.dietary_requirements ?? null,
    tshirt_size: null,
    tshirt_quantity: null,
    hotel: travel?.hotel_name ?? null,
    room_type: travel?.room_number ?? null,
    checkin_date: formatDate(travel?.check_in ?? null),
    checkout_date: formatDate(travel?.check_out ?? null),
    sharing_with: null,
    flight_preference: null,
    outbound_flight: travel?.arrival_flight ?? null,
    return_flight: travel?.departure_flight ?? null,
    transfer_arrival: null,
    transfer_departure: null,
    activities: parseActivities(travel?.special_requirements ?? null),
    program: [],
  } : null

  return (
    <div>
      <TopBar title="My Itinerary" />
      <ItineraryView itinerary={itinerary as any} />
    </div>
  )
}
