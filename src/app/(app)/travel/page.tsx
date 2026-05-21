import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import TravelForm from './TravelForm'
import type { TravelInfo } from '@/types/database'

export default async function TravelPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: travel } = await supabase
    .from('travel_info')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div>
      <TopBar title="Travel & Logistics" />
      <TravelForm userId={user.id} existing={travel as TravelInfo | null} />
    </div>
  )
}
