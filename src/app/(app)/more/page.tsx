import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import {
  Building2, Plane, BookOpen, MessageSquare, HelpCircle,
  LayoutDashboard, Megaphone, LogOut, ChevronRight, Bell,
} from 'lucide-react'
import { roleLabel } from '@/lib/utils'
import SignOutButton from './SignOutButton'

const sections = [
  {
    title: 'Conference',
    items: [
      { href: '/notifications',  icon: Bell,           label: 'Notifications'    },
      { href: '/announcements', icon: Megaphone,      label: 'Announcements'    },
      { href: '/suppliers',     icon: Building2,      label: 'Supplier Directory'},
      { href: '/resources',     icon: BookOpen,       label: 'Resource Library'  },
    ],
  },
  {
    title: 'My Details',
    items: [
      { href: '/travel',   icon: Plane,         label: 'Travel & Logistics'},
      { href: '/feedback', icon: MessageSquare,  label: 'Submit Feedback'   },
      { href: '/help',     icon: HelpCircle,    label: 'Help Desk'         },
    ],
  },
]

export default async function MorePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profileData } = await supabase
    .from('profiles')
    .select('full_name, email, role, company')
    .eq('id', user.id)
    .single()

  type ProfileRow = { full_name: string | null; email: string | null; role: string; company: string | null }
  const profile = profileData as ProfileRow | null

  const isAdmin = profile?.role === 'admin' || profile?.role === 'nso_staff'

  return (
    <div>
      <TopBar title="More" />

      <div className="px-4 py-4 space-y-5">
        {/* Profile card */}
        <div className="bg-brand-blue rounded-2xl p-4 text-white">
          <p className="font-bold text-lg">{profile?.full_name}</p>
          <p className="text-blue-100 text-sm">{profile?.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
              {roleLabel(profile?.role ?? 'delegate')}
            </span>
            {profile?.company && (
              <span className="text-blue-100 text-xs">{profile.company}</span>
            )}
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              {section.title}
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
              {section.items.map(({ href, icon: Icon, label }) => (
                <Link key={href} href={href}>
                  <div className="flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 transition-colors">
                    <Icon size={20} className="text-brand-blue flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium text-gray-800">{label}</span>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {isAdmin && (
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Admin</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <Link href="/admin">
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <LayoutDashboard size={20} className="text-brand-blue flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-800">Admin Dashboard</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </Link>
            </div>
          </div>
        )}

        <SignOutButton />
      </div>
    </div>
  )
}
