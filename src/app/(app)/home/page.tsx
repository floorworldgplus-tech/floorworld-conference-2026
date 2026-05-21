import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar, Stamp, Users, Building2, Plane, BookOpen,
  HelpCircle, MessageSquare, LayoutDashboard, Megaphone,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import BrandStrip from '@/components/layout/BrandStrip'
import { formatTime } from '@/lib/utils'
import type { Session, Announcement } from '@/types/database'

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

  const [
    { data: upcomingSessions },
    { data: announcements },
    { count: stampCount },
    { count: supplierCount },
  ] = await Promise.all([
    supabase.from('sessions').select('*').gte('end_time', now).order('start_time').limit(3),
    supabase
      .from('announcements')
      .select('*')
      .or('expires_at.is.null,expires_at.gt.' + now)
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(3),
    supabase.from('passport_stamps').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('suppliers').select('*', { count: 'exact', head: true }).eq('is_active', true),
  ])

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'
  const isAdmin = profile?.role === 'admin' || profile?.role === 'nso_staff'
  const isDelegate = profile?.role === 'delegate'

  const quickLinks = [
    { href: '/agenda',    icon: Calendar,      label: 'Agenda',    bg: 'bg-blue-50',   fg: 'text-brand-blue'   },
    { href: '/travel',    icon: Plane,         label: 'Travel',    bg: 'bg-green-50',  fg: 'text-brand-green'  },
    { href: '/suppliers', icon: Building2,     label: 'Suppliers', bg: 'bg-yellow-50', fg: 'text-brand-yellow' },
    { href: '/delegates', icon: Users,         label: 'People',    bg: 'bg-orange-50', fg: 'text-brand-red'    },
    { href: '/resources', icon: BookOpen,      label: 'Resources', bg: 'bg-purple-50', fg: 'text-purple-600'   },
    { href: '/feedback',  icon: MessageSquare, label: 'Feedback',  bg: 'bg-pink-50',   fg: 'text-pink-600'     },
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
          {/* Top row: text left, logo right */}
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

            {/* Conference logo — right side, 2× size */}
            <div className="flex-shrink-0">
              <Image
                src="/conference-logo.png"
                alt="Conference 2026"
                width={176}
                height={176}
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

        {/* Upcoming sessions */}
        {upcomingSessions && upcomingSessions.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-bold text-gray-800 text-sm">Coming Up</h2>
              <Link href="/agenda" className="text-xs text-brand-blue font-semibold">Full agenda →</Link>
            </div>
            <div className="space-y-2">
              {(upcomingSessions as Session[]).map((s) => (
                <div key={s.id} className="bg-white rounded-xl px-4 py-3.5 shadow-sm border border-gray-100 flex items-start gap-3">
                  <div className={`mt-1 w-1 self-stretch min-h-[1.75rem] rounded-full flex-shrink-0 ${SESSION_TYPE_COLOUR[s.session_type] ?? 'bg-gray-200'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-snug">{s.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatTime(s.start_time)}{s.location ? ` · ${s.location}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Announcements */}
        {announcements && announcements.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-bold text-gray-800 text-sm">Announcements</h2>
              <Link href="/announcements" className="text-xs text-brand-blue font-semibold">See all →</Link>
            </div>
            <div className="space-y-2">
              {(announcements as Announcement[]).map((a) => (
                <div
                  key={a.id}
                  className={`bg-white rounded-xl px-4 py-3.5 shadow-sm border ${a.is_pinned ? 'border-brand-yellow/50' : 'border-gray-100'}`}
                >
                  <div className="flex items-start gap-2">
                    {a.is_pinned && (
                      <span className="mt-0.5 text-[9px] bg-brand-yellow text-white font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 uppercase tracking-wide">
                        Pinned
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-snug">{a.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{a.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
