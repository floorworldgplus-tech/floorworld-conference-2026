import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BottomNav from '@/components/layout/BottomNav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profileData } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const profile = profileData as { role: import('@/types/database').UserRole } | null

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 pb-nav safe-top">{children}</main>
      <BottomNav role={profile?.role ?? 'delegate'} />
    </div>
  )
}
