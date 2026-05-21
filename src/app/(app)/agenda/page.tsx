import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import { formatDate, formatTime, formatDateKey } from '@/lib/utils'
import type { Session } from '@/types/database'

const TYPE_BADGE: Record<string, { label: string; colour: string }> = {
  keynote:   { label: 'Keynote',   colour: 'bg-brand-blue text-white'   },
  breakout:  { label: 'Breakout',  colour: 'bg-brand-green text-white'  },
  workshop:  { label: 'Workshop',  colour: 'bg-brand-yellow text-white' },
  social:    { label: 'Social',    colour: 'bg-brand-red text-white'    },
  meal:      { label: 'Meal',      colour: 'bg-orange-400 text-white'   },
  transfer:  { label: 'Transfer',  colour: 'bg-gray-400 text-white'     },
  excursion: { label: 'Excursion', colour: 'bg-purple-500 text-white'   },
  free_time: { label: 'Free time', colour: 'bg-gray-200 text-gray-600'  },
}

export default async function AgendaPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: sessions }, { data: mySessionRows }] = await Promise.all([
    supabase.from('sessions').select('*').order('start_time').order('sort_order'),
    supabase.from('user_sessions').select('session_id').eq('user_id', user.id),
  ])

  const mySavedIds = new Set((mySessionRows ?? []).map((r) => r.session_id))

  // Group by day (KL time)
  const grouped: Record<string, Session[]> = {}
  for (const s of sessions ?? []) {
    const key = formatDateKey(s.start_time)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(s as Session)
  }
  const days = Object.keys(grouped).sort()

  return (
    <div>
      <TopBar title="Conference Agenda" />

      <div className="px-4 py-4 space-y-6">
        {days.length === 0 && (
          <p className="text-center text-gray-500 py-12 text-sm">
            The agenda will be published soon.
          </p>
        )}

        {days.map((day) => (
          <section key={day}>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              {formatDate(grouped[day][0].start_time)}
            </h2>

            <div className="space-y-2">
              {grouped[day].map((session) => {
                const badge = TYPE_BADGE[session.session_type]
                const isSaved = mySavedIds.has(session.id)

                return (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          {badge && (
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.colour}`}
                            >
                              {badge.label}
                            </span>
                          )}
                          {isSaved && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                              ✓ Saved
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900 text-sm leading-snug">
                          {session.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(session.start_time)} – {formatTime(session.end_time)}
                          {session.location ? ` · ${session.location}` : ''}
                        </p>
                        {session.speaker_name && (
                          <p className="text-xs text-brand-blue mt-1 font-medium">
                            {session.speaker_name}
                          </p>
                        )}
                        {session.description && (
                          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
                            {session.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
