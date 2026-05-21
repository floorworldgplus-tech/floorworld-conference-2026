import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import { Users, Building2, Stamp, HelpCircle, MessageSquare, Megaphone } from 'lucide-react'

export default async function AdminPage() {
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

  const profile = profileData as { role: string } | null
  if (!profile || !['admin', 'nso_staff'].includes(profile.role)) {
    redirect('/home')
  }

  const [
    { count: delegateCount },
    { count: supplierProfileCount },
    { count: stampCount },
    { count: openHelpCount },
    { count: feedbackCount },
    { count: announcementCount },
    { data: recentHelp },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'delegate').eq('is_active', true),
    supabase.from('suppliers').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('passport_stamps').select('*', { count: 'exact', head: true }),
    supabase.from('help_requests').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabase.from('feedback').select('*', { count: 'exact', head: true }),
    supabase.from('announcements').select('*', { count: 'exact', head: true }),
    supabase
      .from('help_requests')
      .select('id, subject, status, created_at')
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const stats = [
    { label: 'Registered Delegates', value: delegateCount ?? 0, icon: Users, colour: 'bg-blue-50 text-brand-blue' },
    { label: 'Active Suppliers', value: supplierProfileCount ?? 0, icon: Building2, colour: 'bg-yellow-50 text-brand-yellow' },
    { label: 'Passport Stamps', value: stampCount ?? 0, icon: Stamp, colour: 'bg-green-50 text-brand-green' },
    { label: 'Open Help Requests', value: openHelpCount ?? 0, icon: HelpCircle, colour: 'bg-red-50 text-brand-red' },
    { label: 'Feedback Submitted', value: feedbackCount ?? 0, icon: MessageSquare, colour: 'bg-purple-50 text-purple-600' },
    { label: 'Announcements', value: announcementCount ?? 0, icon: Megaphone, colour: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <div>
      <TopBar title="Admin Dashboard" />

      <div className="px-4 py-4 space-y-5">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value, icon: Icon, colour }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${colour.split(' ')[0]} flex items-center justify-center mb-2`}>
                <Icon size={20} className={colour.split(' ')[1]} />
              </div>
              <p className="text-2xl font-black text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Open help requests */}
        <section>
          <h2 className="text-sm font-bold text-gray-700 mb-2.5 flex items-center gap-2">
            Open Help Requests
            {(openHelpCount ?? 0) > 0 && (
              <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {openHelpCount}
              </span>
            )}
          </h2>

          {(!recentHelp || recentHelp.length === 0) ? (
            <p className="text-sm text-gray-500 py-4 text-center">No open requests.</p>
          ) : (
            <div className="space-y-2">
              {recentHelp.map((req) => (
                <div key={req.id} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{req.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                      {req.status}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(req.created_at).toLocaleString('en-AU', {
                        timeZone: 'Asia/Kuala_Lumpur',
                        day: 'numeric', month: 'short',
                        hour: 'numeric', minute: '2-digit', hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="text-xs text-gray-400 text-center pb-2">
          Full admin tools will be added in the next build phase.
        </p>
      </div>
    </div>
  )
}
