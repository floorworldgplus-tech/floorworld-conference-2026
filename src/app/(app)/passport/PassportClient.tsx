'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ScanLine, CheckCircle2, Circle, Building2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Supplier, PassportStamp } from '@/types/database'

const QRScanner = dynamic(() => import('@/components/features/QRScanner'), { ssr: false })

const TIER_BADGE: Record<string, string> = {
  gold:     'bg-yellow-100 text-yellow-800 border-yellow-200',
  silver:   'bg-gray-100 text-gray-700 border-gray-200',
  bronze:   'bg-orange-100 text-orange-700 border-orange-200',
  standard: 'bg-blue-50 text-blue-700 border-blue-100',
}

interface Props {
  userId: string
  suppliers: Supplier[]
  stamps: PassportStamp[]
}

export default function PassportClient({ userId, suppliers, stamps }: Props) {
  const [stampedIds, setStampedIds] = useState<Set<string>>(
    new Set(stamps.map((s) => s.supplier_id))
  )
  const [scanning, setScanning] = useState(false)
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
        showToast(`Already stamped: ${supplier.name}`, 'error')
        return
      }

      const supabase = createClient()
      const { error } = await supabase
        .from('passport_stamps')
        .insert({ user_id: userId, supplier_id: supplier.id })

      if (error) {
        showToast('Failed to save stamp. Please try again.', 'error')
        return
      }

      setStampedIds((prev) => new Set([...prev, supplier.id]))
      showToast(`✓ ${supplier.name} stamped!`, 'success')
    },
    [suppliers, stampedIds, userId]
  )

  const stamped = stampedIds.size
  const total = suppliers.length
  const pct = total > 0 ? Math.round((stamped / total) * 100) : 0

  return (
    <div className="px-4 py-4">
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
          <div className="text-right">
            <p className="text-4xl font-black">{pct}%</p>
          </div>
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
        className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base active:scale-[0.98] transition-transform mb-5"
      >
        <ScanLine size={22} />
        Scan Supplier QR Code
      </button>

      {/* Booth grid */}
      <h2 className="text-sm font-semibold text-gray-700 mb-3">Supplier Booths</h2>
      <div className="space-y-2">
        {suppliers.map((supplier) => {
          const isStamped = stampedIds.has(supplier.id)
          return (
            <div
              key={supplier.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border transition-colors ${
                isStamped ? 'border-brand-green' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isStamped ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  {isStamped ? (
                    <CheckCircle2 size={22} className="text-brand-green" />
                  ) : (
                    <Circle size={22} className="text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isStamped ? 'text-gray-900' : 'text-gray-500'}`}>
                    {supplier.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    {supplier.booth_number && (
                      <span className="text-[10px] text-gray-400">Booth {supplier.booth_number}</span>
                    )}
                    {supplier.category && (
                      <span className="text-[10px] text-gray-400">· {supplier.category}</span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${
                    TIER_BADGE[supplier.tier] ?? TIER_BADGE.standard
                  }`}
                >
                  {supplier.tier}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* QR Scanner overlay */}
      {scanning && (
        <QRScanner onScan={handleScan} onClose={() => setScanning(false)} />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-24 left-4 right-4 z-50 px-4 py-3 rounded-2xl text-sm font-medium text-center shadow-lg transition-all ${
            toast.type === 'success'
              ? 'bg-brand-green text-white'
              : 'bg-brand-red text-white'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
