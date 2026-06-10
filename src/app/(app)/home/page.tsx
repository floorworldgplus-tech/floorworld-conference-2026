import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar, Stamp, Users, Building2, Plane, BookOpen,
  HelpCircle, Map, LayoutDashboard, Bell,
  Hotel, Utensils, CheckCircle, ChevronRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import BrandStrip from '@/components/layout/BrandStrip'
import { formatTime, formatShortDate } from '@/lib/utils'
import type { Session } from '@/types/database'

const SESSION_TYPE_COLOUR: Record<string, string> = {
  keynote:   'bg-brand-blue',
  breakout:  'bg-brand-green',
  workshop:  'bg-brand-yellow',
  social:    'bg-brand-red',
  meal:      'bg-orange-400',
  transfer:  'bg-gray-300',
  excursion: 'bg-purple-500',
  free_time: 'bg-gray-200',
}

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  const profile = profileData as import('@/types/database').Profile | null

  const now = new Date().toISOString()
  const nowDate = new Date(now)

  // Conference phase constants (all UTC; KL = UTC+8)
  const CONF_START = new Date('2026-08-15T16:00:00Z') // = Sun 16 Aug 00:00 KL (delegate arrival)
  const CONF_END   = new Date('2026-08-21T14:00:00Z') // = Fri 21 Aug 22:00 KL (departures end)

  const isPreConference    = nowDate < CONF_START
  const isPostConference   = nowDate >= CONF_END
  const isDuringConference = !isPreConference && !isPostConference

  const daysUntil = Math.ceil((CONF_START.getTime() - nowDate.getTime()) / 86400000)

  const [
    { count: stampCount },
    { count: supplierCount },
    { data: travelData },
  ] = await Promise.all([
    supabase.from('passport_stamps').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('suppliers').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('travel_info').select('check_in, check_out, dietary_requirements, special_requirements, hotel_name, arrival_flight, departure_flight').eq('user_id', user.id).single(),
  ])

  const travel = travelData as any

  function fmtDate(d: string | null): string {
    if (!d) return ''
    try { return new Date(d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }) }
    catch { return d }
  }

  function parseActivities(notes: string | null): string[] {
    if (!notes) return []
    const match = notes.match(/Optional activities:\s*([^;]+)/)
    if (!match) return []
    return match[1].split(',').map((a: string) => a.trim()).filter(Boolean)
  }

  function parseRegistrationType(notes: string | null): string | null {
    if (!notes) return null
    const match = notes.match(/Registration:\s*([^;]+)/)
    return match ? match[1].trim() : null
  }

  const activities = parseActivities(travel?.special_requirements ?? null)
  const hasPenang = travel?.special_requirements?.includes('Penang pre-conference tour: Yes')
  const registrationType = parseRegistrationType(travel?.special_requirements ?? null)

  // Phase-aware session query
  let upcomingSessions: Session[] = []
  if (isPreConference) {
    // Show delegate-facing sessions from arrival day — what to look forward to
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .gte('start_time', '2026-08-15T16:00:00Z')
      .contains('visible_to', ['delegate'])
      .order('start_time')
      .limit(3)
    upcomingSessions = (data ?? []) as Session[]
  } else if (isDuringConference) {
    // Show what's happening now + what's next
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .gte('end_time', now)
      .order('start_time')
      .limit(3)
    upcomingSessions = (data ?? []) as Session[]
  }

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'
  const isAdmin = profile?.role === 'admin' || profile?.role === 'nso_staff'
  const isDelegate = profile?.role === 'delegate'

  const quickLinks = [
    { href: '/agenda',    icon: Calendar,      label: 'Agenda',    bg: 'bg-blue-50',   fg: 'text-brand-blue'   },
    { href: '/itinerary', icon: Plane,         label: 'Itinerary', bg: 'bg-green-50',  fg: 'text-brand-green'  },
    { href: '/suppliers', icon: Building2,     label: 'Suppliers', bg: 'bg-yellow-50', fg: 'text-brand-yellow' },
    { href: '/delegates', icon: Users,         label: 'People',    bg: 'bg-orange-50', fg: 'text-brand-red'    },
    { href: '/destination', icon: BookOpen,     label: 'Travel & Stay', bg: 'bg-purple-50', fg: 'text-purple-600'   },
    { href: '/tours',     icon: Map,           label: 'Tours',     bg: 'bg-pink-50',   fg: 'text-pink-600'     },
    { href: '/help',      icon: HelpCircle,    label: 'Help',      bg: 'bg-gray-100',  fg: 'text-gray-500'     },
    ...(isAdmin
      ? [{ href: '/admin', icon: LayoutDashboard, label: 'Admin', bg: 'bg-brand-blue', fg: 'text-white' }]
      : []),
  ]

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Hero header ── */}
      <div className="bg-white">
        {/* Diagonal brand strip */}
        <BrandStrip height={8} />

        <div className="px-5 pt-5 pb-6">
          {/* Top row: text left, bell + logo right */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Floorworld
              </p>
              <p className="text-[20px] font-black text-gray-900 leading-tight">
                Conference 2026
              </p>
              <p className="text-[13px] text-gray-500 font-medium mt-1">
                Kuala Lumpur
              </p>
              <p className="text-[12px] text-gray-400 mt-0.5">
                16 – 21 August 2026
              </p>
            </div>

            {/* Bell + logo — right side */}
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
              <Link href="/notifications" className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center active:scale-95 transition-transform">
                <Bell size={18} className="text-gray-500" />
              </Link>
              <Image
                src="/conference-logo.png"
                alt="Conference 2026"
                width={160}
                height={160}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* Greeting divider */}
          <div className="border-t border-gray-100 pt-3.5">
            <p className="text-xl font-bold text-gray-900">
              Hey, {firstName} 👋
            </p>
            {profile?.company && (
              <p className="text-sm text-gray-500 mt-0.5">{profile.company}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-4 pt-4 space-y-5 pb-6">

        {/* Passport progress — delegates only */}
        {isDelegate && (
          <Link href="/passport">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-transform mt-0">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Stamp size={22} className="text-brand-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">Expo Passport</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {stampCount ?? 0} of {supplierCount ?? 0} booths visited
                </p>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-blue rounded-full transition-all"
                    style={{
                      width: supplierCount
                        ? `${Math.min(((stampCount ?? 0) / supplierCount) * 100, 100)}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>
              <p className="text-brand-blue font-bold text-base flex-shrink-0">
                {stampCount ?? 0}/{supplierCount ?? 0}
              </p>
            </div>
          </Link>
        )}

        {/* My Itinerary */}
        {travel && (
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-bold text-gray-800 text-sm">My Itinerary</h2>
              <Link href="/itinerary" className="text-xs text-brand-blue font-semibold flex items-center gap-0.5">
                Full details <ChevronRight size={12} />
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Registration type */}
              {registrationType && (
                <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-50 bg-brand-blue/[0.03]">
                  <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={14} className="text-brand-blue" />
                  </div>
                  <p className="text-xs font-semibold text-brand-blue">{registrationType}</p>
                </div>
              )}

              {/* Stay — always show if travel row exists */}
              <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-50">
                <div className="w-7 h-7 rounded-lg bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Hotel size={14} className="text-brand-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700">{travel.hotel_name || 'W Hotel Kuala Lumpur'}</p>
                  {(travel.check_in || travel.check_out) ? (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {fmtDate(travel.check_in)}{travel.check_out ? ` → ${fmtDate(travel.check_out)}` : ''}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-0.5">Dates to be confirmed</p>
                  )}
                </div>
              </div>

              {/* Flights */}
              {(travel.arrival_flight || travel.departure_flight) && (
                <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-50">
                  <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Plane size={14} className="text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {travel.arrival_flight && <p className="text-xs text-gray-700"><span className="text-gray-400">In: </span>{travel.arrival_flight}</p>}
                    {travel.departure_flight && <p className="text-xs text-gray-700 mt-0.5"><span className="text-gray-400">Out: </span>{travel.departure_flight}</p>}
                  </div>
                </div>
              )}

              {/* Dietary */}
              {travel.dietary_requirements && (
                <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-50">
                  <div className="w-7 h-7 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Utensils size={14} className="text-brand-red" />
                  </div>
                  <p className="text-xs text-brand-red font-medium flex-1 pt-1">{travel.dietary_requirements}</p>
                </div>
              )}

              {/* Optional activities */}
              {(activities.length > 0 || hasPenang) && (
                <div className="px-4 py-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Optional Activities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {hasPenang && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-1 rounded-full">
                        <CheckCircle size={10} /> Penang Tour
                      </span>
                    )}
                    {activities.map((a: string, i: number) => (
                      <span key={i} className="flex items-center gap-1 text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-1 rounded-full">
                        <CheckCircle size={10} /> {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Coming Up — phase-aware */}
        {(upcomingSessions.length > 0 || isPostConference) && (
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-bold text-gray-800 text-sm">
                {isPreConference ? 'What to Look Forward To' : isPostConference ? 'Conference Complete' : 'Coming Up'}
              </h2>
              {!isPostConference && (
                <Link href="/agenda" className="text-xs text-brand-blue font-semibold">Full agenda →</Link>
              )}
            </div>

            {/* Pre-conference countdown banner */}
            {isPreConference && daysUntil > 0 && (
              <div className="mb-3 bg-brand-blue/5 border border-brand-blue/10 rounded-2xl px-4 py-3.5 flex items-center gap-3.5">
                <div className="text-center flex-shrink-0 w-12">
                  <p className="text-[28px] font-black text-brand-blue leading-none">{daysUntil}</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">days to go</p>
                </div>
                <div className="w-px self-stretch bg-brand-blue/15 flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-gray-800">Getting ready for KL</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    Kuala Lumpur · 16 – 21 August 2026
                  </p>
                </div>
              </div>
            )}

            {/* Post-conference card */}
            {isPostConference && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <p className="font-bold text-gray-900 text-sm">Thank You for Being Part of It</p>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed max-w-[220px] mx-auto">
                  Growing Stronger Together — Kuala Lumpur 2026
                </p>
              </div>
            )}

            {/* Session cards */}
            {upcomingSessions.length > 0 && (
              <div className="space-y-2">
                {upcomingSessions.map((s) => {
                  const isNow = isDuringConference &&
                    nowDate >= new Date(s.start_time) &&
                    nowDate <= new Date(s.end_time)
                  return (
                    <Link href="/agenda" key={s.id}>
                      <div className={`bg-white rounded-xl px-4 py-3.5 shadow-sm border flex items-start gap-3 active:scale-[0.98] transition-transform ${isNow ? 'border-brand-blue' : 'border-gray-100'}`}>
                        <div className={`mt-1 w-1 self-stretch min-h-[1.75rem] rounded-full flex-shrink-0 ${SESSION_TYPE_COLOUR[s.session_type] ?? 'bg-gray-200'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {isNow && (
                              <span className="text-[9px] font-bold bg-brand-blue text-white px-1.5 py-0.5 rounded uppercase tracking-wide flex-shrink-0">
                                Now
                              </span>
                            )}
                            <p className="font-semibold text-gray-900 text-sm leading-snug">{s.title}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {isPreConference
                              ? `${formatShortDate(s.start_time)} · ${formatTime(s.start_time)}`
                              : formatTime(s.start_time)}
                            {s.location ? ` · ${s.location}` : ''}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        )}

        {/* Quick access */}
        <section>
          <h2 className="font-bold text-gray-800 text-sm mb-2.5">Quick Access</h2>
          <div className="grid grid-cols-4 gap-1">
            {quickLinks.map(({ href, icon: Icon, label, bg, fg }) => (
              <Link key={href} href={href}>
                <div className="flex flex-col items-center gap-1.5 py-3 active:scale-95 transition-transform">
                  <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shadow-sm`}>
                    <Icon size={22} className={fg} />
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium text-center leading-tight">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
