import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import PassportClient from './PassportClient'
import type { Supplier, PassportStamp } from '@/types/database'

export default async function PassportPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: suppliers }, { data: stamps }] = await Promise.all([
    supabase.from('suppliers').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('passport_stamps').select('*').eq('user_id', user.id),
  ])

  return (
    <div>
      <TopBar title="Expo Passport" />
      <PassportClient
        userId={user.id}
        suppliers={(suppliers ?? []) as Supplier[]}
        stamps={(stamps ?? []) as PassportStamp[]}
      />
    </div>
  )
}
