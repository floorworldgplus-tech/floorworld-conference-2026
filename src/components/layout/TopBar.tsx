import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import BrandStrip from './BrandStrip'

interface TopBarProps {
  title: string
  backHref?: string
  action?: React.ReactNode
  className?: string
}

export default function TopBar({ title, backHref, action, className }: TopBarProps) {
  return (
    <header className={cn('bg-white border-b border-gray-100 sticky top-0 z-40 safe-top', className)}>
      {/* Thin diagonal brand strip on every screen */}
      <BrandStrip height={3} />

      <div className="px-3 flex items-center gap-2" style={{ minHeight: '3.25rem' }}>
        {/* Conference logo — always visible in top-left */}
        <Link href="/home" className="flex-shrink-0 active:opacity-70 transition-opacity">
          <Image
            src="/conference-logo.png"
            alt="Floorworld Conference 2026"
            width={36}
            height={36}
            className="rounded-lg"
          />
        </Link>

        {backHref && (
          <Link href={backHref} className="text-brand-blue p-1 flex-shrink-0 active:opacity-60 transition-opacity">
            <ChevronLeft size={24} />
          </Link>
        )}
        <h1 className="flex-1 font-bold text-gray-900 text-[1.05rem] truncate tracking-tight">{title}</h1>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </header>
  )
}
