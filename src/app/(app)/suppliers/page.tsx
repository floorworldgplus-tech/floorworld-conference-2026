import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import { Globe, Mail, Phone } from 'lucide-react'
import type { Supplier } from '@/types/database'

export const revalidate = 300 // cache for 5 minutes

const TIER_COLOURS: Record<string, string> = {
  gold:     'bg-yellow-50 border-yellow-200',
  silver:   'bg-gray-50 border-gray-200',
  bronze:   'bg-orange-50 border-orange-200',
  standard: 'bg-white border-gray-100',
}

const TIER_BADGE: Record<string, string> = {
  gold:     'bg-yellow-100 text-yellow-800',
  silver:   'bg-gray-100 text-gray-700',
  bronze:   'bg-orange-100 text-orange-700',
  standard: 'bg-blue-50 text-blue-700',
}

export default async function SuppliersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: suppliers } = await supabase
    .from('suppliers')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  return (
    <div>
      <TopBar title="Supplier Directory" />

      <div className="px-4 py-4 space-y-3">
        {(suppliers ?? []).map((s: Supplier) => (
          <div
            key={s.id}
            className={`rounded-2xl p-4 shadow-sm border ${TIER_COLOURS[s.tier] ?? TIER_COLOURS.standard}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-bold text-gray-900">{s.name}</p>
                {s.category && (
                  <p className="text-xs text-gray-500 mt-0.5">{s.category}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${TIER_BADGE[s.tier] ?? TIER_BADGE.standard}`}>
                  {s.tier}
                </span>
                {s.booth_number && (
                  <span className="text-[10px] text-gray-400 font-medium">Booth {s.booth_number}</span>
                )}
              </div>
            </div>

            {s.description && (
              <p className="text-xs text-gray-600 mb-3 line-clamp-3">{s.description}</p>
            )}

            <div className="space-y-1">
              {s.contact_name && (
                <p className="text-xs text-gray-700 font-medium">{s.contact_name}</p>
              )}
              {s.contact_email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={12} className="text-gray-400 flex-shrink-0" />
                  <a href={`mailto:${s.contact_email}`} className="text-xs text-brand-blue truncate">
                    {s.contact_email}
                  </a>
                </div>
              )}
              {s.contact_phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-gray-400 flex-shrink-0" />
                  <a href={`tel:${s.contact_phone}`} className="text-xs text-brand-blue">
                    {s.contact_phone}
                  </a>
                </div>
              )}
              {s.website && (
                <div className="flex items-center gap-1.5">
                  <Globe size={12} className="text-gray-400 flex-shrink-0" />
                  <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue truncate">
                    {s.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
