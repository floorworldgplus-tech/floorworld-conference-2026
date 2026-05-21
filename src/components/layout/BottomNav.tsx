'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Stamp, Users, Grid3X3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/types/database'

const navItems = [
  { href: '/home',      icon: Home,     label: 'Home'     },
  { href: '/agenda',    icon: Calendar, label: 'Agenda'   },
  { href: '/passport',  icon: Stamp,    label: 'Passport' },
  { href: '/delegates', icon: Users,    label: 'People'   },
  { href: '/more',      icon: Grid3X3,  label: 'More'     },
]

export default function BottomNav({ role }: { role: UserRole }) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-50">
      <div className="flex items-stretch" style={{ height: '3.75rem' }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            pathname === href ||
            (href !== '/home' && pathname.startsWith(href + '/'))

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative',
                isActive ? 'text-brand-blue' : 'text-gray-400'
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-blue rounded-full" />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.25 : 1.75} />
              <span className={cn('text-[10px]', isActive ? 'font-bold' : 'font-medium')}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
