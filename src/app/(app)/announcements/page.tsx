import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import { Pin } from 'lucide-react'
import type { Announcement } from '@/types/database'

export default async function AnnouncementsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const now = new Date().toISOString()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false })

  return (
    <div>
      <TopBar title="Announcements" />

      <div className="px-4 py-4 space-y-3">
        {(announcements ?? []).length === 0 && (
          <p className="text-center text-gray-500 py-12 text-sm">No announcements yet.</p>
        )}

        {(announcements ?? []).map((a: Announcement) => (
          <div
            key={a.id}
            className={`bg-white rounded-2xl p-4 shadow-sm border ${
              a.is_pinned ? 'border-brand-yellow' : 'border-gray-100'
            }`}
          >
            {a.is_pinned && (
              <div className="flex items-center gap-1.5 mb-2">
                <Pin size={12} className="text-brand-yellow" />
                <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wide">
                  Pinned
                </span>
              </div>
            )}
            <p className="font-semibold text-gray-900 text-sm leading-snug">{a.title}</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{a.body}</p>
            <p className="text-[10px] text-gray-400 mt-3">
              {new Date(a.published_at).toLocaleString('en-AU', {
                timeZone: 'Asia/Kuala_Lumpur',
                day: 'numeric',
                month: 'short',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
