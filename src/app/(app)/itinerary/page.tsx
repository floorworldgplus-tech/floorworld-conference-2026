import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import ItineraryView from './ItineraryView'

export default async function ItineraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('itineraries')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div>
      <TopBar title="My Itinerary" />
      <ItineraryView itinerary={data as any} />
    </div>
  )
}
