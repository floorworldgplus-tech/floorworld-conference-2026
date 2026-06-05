import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import { Bell, BellOff } from 'lucide-react'

export const revalidate = 30 // cache for 30 seconds

type NotifRow = {
  id: string
  title: string
  body: string
  audience: string
  destination: string
  sent_at: string
}

const AUDIENCE_LABELS: Record<string, string> = {
  all: 'Everyone',
  delegate: 'Delegates',
  supplier: 'Suppliers',
  nso_staff: 'Staff',
}

export default async function NotificationsPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('push_notifications_log')
    .select('id, title, body, audience, destination, sent_at')
    .order('sent_at', { ascending: false })
    .limit(50)

  const notifications = (data ?? []) as NotifRow[]

  return (
    <div>
      <TopBar title="Notifications" />

      <div className="px-4 py-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BellOff size={40} className="text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm">No notifications sent yet.</p>
            <p className="text-gray-400 text-xs mt-1">Check back during the conference.</p>
          </div>
        ) : (
          notifications.map((n) => {
            const date = new Date(n.sent_at)
            const timeStr = date.toLocaleString('en-AU', {
              timeZone: 'Asia/Kuala_Lumpur',
              day: 'numeric', month: 'short',
              hour: 'numeric', minute: '2-digit', hour12: true,
            })
            return (
              <div key={n.id} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell size={17} className="text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{n.title}</p>
                    <p className="text-gray-600 text-sm mt-0.5 leading-snug">{n.body}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-gray-400">{timeStr} KL</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-[10px] text-gray-400">
                        {AUDIENCE_LABELS[n.audience] ?? n.audience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
