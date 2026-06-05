import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import { User } from 'lucide-react'
import { roleLabel } from '@/lib/utils'

export const revalidate = 120 // cache for 2 minutes
import type { Profile } from '@/types/database'

type DelegateRow = {
  id: string
  full_name: string | null
  company: string | null
  state: string | null
  role: string
  photo_url: string | null
  bio: string | null
}

export default async function DelegatesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, company, state, role, photo_url, bio')
    .eq('is_active', true)
    .in('role', ['delegate', 'nso_staff'])
    .order('full_name')

  const delegateList = (profiles ?? []) as DelegateRow[]

  return (
    <div>
      <TopBar title="Delegate Directory" />

      <div className="px-4 py-4">
        <p className="text-xs text-gray-500 mb-4">{delegateList.length} attendees</p>

        <div className="space-y-2">
          {delegateList.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {p.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photo_url} alt={p.full_name ?? ''} className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-brand-blue" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{p.full_name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {[p.company, p.state].filter(Boolean).join(' · ')}
                </p>
              </div>
              <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">
                {roleLabel(p.role)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
