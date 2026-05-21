import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title: string
  backHref?: string
  action?: React.ReactNode
  className?: string
}

export default function TopBar({ title, backHref, action, className }: TopBarProps) {
  return (
    <header
      className={cn(
        'bg-white border-b border-gray-100 px-4 flex items-center gap-2 sticky top-0 z-40 safe-top',
        className
      )}
      style={{ minHeight: '3.25rem' }}
    >
      {backHref && (
        <Link href={backHref} className="text-brand-blue -ml-1 p-1 flex-shrink-0 active:opacity-60 transition-opacity">
          <ChevronLeft size={24} />
        </Link>
      )}
      <h1 className="flex-1 font-bold text-gray-900 text-[1.05rem] truncate tracking-tight">{title}</h1>
      {action && <div className="flex-shrink-0">{action}</div>}
    </header>
  )
}
