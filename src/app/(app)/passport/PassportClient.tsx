'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ScanLine, CheckCircle2, Circle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Supplier, PassportStamp } from '@/types/database'

const QRScanner = dynamic(() => import('@/components/features/QRScanner'), { ssr: false })

// Sponsorship category display order
const CATEGORIES = [
  'All',
  'Major Events Partner',
  'Platinum Sponsor',
  'Gold Sponsor',
  'Partner',
] as const
type Category = typeof CATEGORIES[number]

// Badge colours per sponsorship tier
const TIER_BADGE: Record<string, string> = {
  'Major Events Partner': 'bg-brand-blue text-white',
  'Platinum Sponsor':     'bg-gray-100 text-gray-700 border border-gray-200',
  'Gold Sponsor':         'bg-yellow-50 text-yellow-800 border border-yellow-200',
  'Partner':              'bg-brand-green/10 text-brand-green border border-brand-green/20',
}

// Short labels for the badge chip (fits on card)
const TIER_SHORT: Record<string, string> = {
  'Major Events Partner': 'Major Partner',
  'Platinum Sponsor':     'Platinum',
  'Gold Sponsor':         'Gold',
  'Partner':              'Partner',
}

// Section heading colour per tier
const TIER_HEADING: Record<string, string> = {
  'Major Events Partner': 'text-brand-blue',
  'Platinum Sponsor':     'text-gray-500',
  'Gold Sponsor':         'text-yellow-700',
  'Partner':              'text-brand-green',
}

interface Props {
  userId: string
  suppliers: Supplier[]
  stamps: PassportStamp[]
}

function SupplierCard({ supplier, isStamped }: { supplier: Supplier; isStamped: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl px-4 py-3.5 shadow-sm border flex items-center gap-3 transition-colors ${
        isStamped ? 'border-brand-green bg-green-50/40' : 'border-gray-100'
      }`}
    >
      {/* Visited indicator */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isStamped ? 'bg-green-100' : 'bg-gray-50'
        }`}
      >
        {isStamped
          ? <CheckCircle2 size={20} className="text-brand-green" />
          : <Circle size={20} className="text-gray-300" />}
      </div>

      {/* Name */}
      <p className={`flex-1 font-semibold text-[14px] leading-snug min-w-0 ${
        isStamped ? 'text-gray-900' : 'text-gray-700'
      }`}>
        {supplier.name}
      </p>

      {/* Tier badge */}
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
        TIER_BADGE[supplier.tier] ?? 'bg-gray-100 text-gray-600'
      }`}>
        {TIER_SHORT[supplier.tier] ?? supplier.tier}
      </span>
    </div>
  )
}

export default function PassportClient({ userId, suppliers, stamps }: Props) {
  const [stampedIds, setStampedIds] = useState<Set<string>>(
    new Set(stamps.map((s) => s.supplier_id))
  )
  const [scanning, setScanning]       = useState(false)
  const [activeFilter, setActiveFilter] = useState<Category>('All')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleScan = useCallback(
    async (code: string) => {
      setScanning(false)

      const supplier = suppliers.find((s) => s.passport_code === code)
      if (!supplier) {
        showToast('QR code not recognised. Try another booth.', 'error')
        return
      }

      if (stampedIds.has(supplier.id)) {
        showToast(`Already visited: ${supplier.name}`, 'error')
        return
      }

      const supabase = createClient()
      const { error } = await supabase
        .from('passport_stamps')
        .insert({ user_id: userId, supplier_id: supplier.id })

      if (error) {
        showToast('Could not save visit. Please try again.', 'error')
        return
      }

      setStampedIds((prev) => new Set([...prev, supplier.id]))
      showToast(`✓ ${supplier.name} stamped!`, 'success')
    },
    [suppliers, stampedIds, userId]
  )

  const stamped = stampedIds.size
  const total   = suppliers.length
  const pct     = total > 0 ? Math.round((stamped / total) * 100) : 0

  // Build grouped view for "All"
  const groupedAll: { category: string; items: Supplier[] }[] = CATEGORIES.slice(1)
    .map((cat) => ({ category: cat, items: suppliers.filter((s) => s.tier === cat) }))
    .filter((g) => g.items.length > 0)

  // Filtered view for a specific category
  const filteredList = suppliers.filter((s) => s.tier === activeFilter)

  return (
    <div className="px-4 py-4 pb-8">

      {/* Intro text */}
      <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">
        Visit each supplier booth during the Expo and scan their QR code to collect your stamp.
        Complete your passport to go in the draw to win.
      </p>

      {/* Progress card */}
      <div className="bg-brand-blue rounded-2xl p-5 text-white mb-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-blue-100 text-xs font-medium uppercase tracking-wide">Your Passport</p>
            <p className="text-3xl font-black mt-0.5">
              {stamped}
              <span className="text-lg font-semibold text-blue-200">/{total}</span>
            </p>
            <p className="text-blue-100 text-sm">booths visited</p>
          </div>
          <p className="text-4xl font-black">{pct}%</p>
        </div>
        <div className="h-2 bg-blue-400/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Scan button */}
      <button
        onClick={() => setScanning(true)}
        className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base active:scale-[0.98] transition-transform mb-2 shadow-sm"
      >
        <ScanLine size={22} />
        Scan Booth QR Code
      </button>
      <p className="text-[11px] text-gray-400 text-center mb-5">
        Scan the QR code displayed at each supplier booth
      </p>

      {/* Category filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-4" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors whitespace-nowrap ${
              activeFilter === cat
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Supplier list */}
      {activeFilter === 'All' ? (
        // Grouped by category
        <div className="space-y-6">
          {groupedAll.map(({ category, items }) => (
            <div key={category}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2.5 ${
                TIER_HEADING[category] ?? 'text-gray-400'
              }`}>
                {category}
              </p>
              <div className="space-y-2">
                {items.map((s) => (
                  <SupplierCard key={s.id} supplier={s} isStamped={stampedIds.has(s.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Single category
        <div className="space-y-2">
          {filteredList.map((s) => (
            <SupplierCard key={s.id} supplier={s} isStamped={stampedIds.has(s.id)} />
          ))}
          {filteredList.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">No suppliers in this category.</p>
          )}
        </div>
      )}

      {/* QR Scanner overlay */}
      {scanning && (
        <QRScanner onScan={handleScan} onClose={() => setScanning(false)} />
      )}

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-24 left-4 right-4 z-50 px-4 py-3 rounded-2xl text-sm font-semibold text-center shadow-lg ${
            toast.type === 'success' ? 'bg-brand-green text-white' : 'bg-brand-red text-white'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
