import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import AgendaClient from '@/components/features/AgendaClient'
import type { Session } from '@/types/database'

export const revalidate = 300 // cache for 5 minutes

type UserSessionRow = { session_id: string }

export default async function AgendaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: sessions }, { data: mySessionRows }] = await Promise.all([
    supabase.from('sessions').select('*').order('start_time').order('sort_order'),
    supabase.from('user_sessions').select('session_id').eq('user_id', user.id),
  ])

  const savedIds = new Set(
    ((mySessionRows ?? []) as UserSessionRow[]).map((r) => r.session_id)
  )

  return (
    <div>
      <TopBar title="Conference Agenda" />
      <AgendaClient
        sessions={(sessions ?? []) as Session[]}
        savedIds={savedIds}
      />
    </div>
  )
}
