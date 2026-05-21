'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save } from 'lucide-react'
import type { TravelInfo } from '@/types/database'

interface Props {
  userId: string
  existing: TravelInfo | null
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
      />
    </div>
  )
}

export default function TravelForm({ userId, existing }: Props) {
  const e = existing
  const [form, setForm] = useState({
    arrival_date:             e?.arrival_date ?? '',
    arrival_time:             e?.arrival_time ?? '',
    arrival_flight:           e?.arrival_flight ?? '',
    departure_date:           e?.departure_date ?? '',
    departure_time:           e?.departure_time ?? '',
    departure_flight:         e?.departure_flight ?? '',
    hotel_name:               e?.hotel_name ?? '',
    room_number:              e?.room_number ?? '',
    check_in:                 e?.check_in ?? '',
    check_out:                e?.check_out ?? '',
    dietary_requirements:     e?.dietary_requirements ?? '',
    special_requirements:     e?.special_requirements ?? '',
    emergency_contact_name:   e?.emergency_contact_name ?? '',
    emergency_contact_phone:  e?.emergency_contact_phone ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }))

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const payload = {
      user_id: userId,
      ...Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v || null])
      ),
    }

    const { error } = existing
      ? await supabase.from('travel_info').update(payload).eq('user_id', userId)
      : await supabase.from('travel_info').insert(payload)

    setSaving(false)
    if (error) {
      setError('Failed to save. Please try again.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Venue card */}
      <div className="bg-brand-blue text-white rounded-2xl p-4">
        <p className="text-xs font-semibold text-blue-100 uppercase tracking-wide mb-1">Conference Venue</p>
        <p className="font-bold text-lg">TBC — Kuala Lumpur</p>
        <p className="text-blue-100 text-sm mt-0.5">August 16–21, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Arrival</h2>
        <Field label="Arrival Date" id="arrival_date" type="date" value={form.arrival_date} onChange={set('arrival_date')} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Flight Number" id="arrival_flight" value={form.arrival_flight} onChange={set('arrival_flight')} placeholder="e.g. MH123" />
          <Field label="Arrival Time" id="arrival_time" type="time" value={form.arrival_time} onChange={set('arrival_time')} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Departure</h2>
        <Field label="Departure Date" id="departure_date" type="date" value={form.departure_date} onChange={set('departure_date')} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Flight Number" id="departure_flight" value={form.departure_flight} onChange={set('departure_flight')} placeholder="e.g. MH456" />
          <Field label="Departure Time" id="departure_time" type="time" value={form.departure_time} onChange={set('departure_time')} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Accommodation</h2>
        <Field label="Hotel Name" id="hotel_name" value={form.hotel_name} onChange={set('hotel_name')} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Check-in" id="check_in" type="date" value={form.check_in} onChange={set('check_in')} />
          <Field label="Check-out" id="check_out" type="date" value={form.check_out} onChange={set('check_out')} />
        </div>
        <Field label="Room Number (if known)" id="room_number" value={form.room_number} onChange={set('room_number')} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Preferences & Emergency</h2>
        <Field label="Dietary Requirements" id="dietary" value={form.dietary_requirements} onChange={set('dietary_requirements')} placeholder="e.g. vegetarian, nut allergy" />
        <Field label="Special Requirements" id="special" value={form.special_requirements} onChange={set('special_requirements')} placeholder="Any accessibility or other needs" />
        <Field label="Emergency Contact Name" id="ec_name" value={form.emergency_contact_name} onChange={set('emergency_contact_name')} />
        <Field label="Emergency Contact Phone" id="ec_phone" type="tel" value={form.emergency_contact_phone} onChange={set('emergency_contact_phone')} />
      </section>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-brand-blue text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] transition-transform"
      >
        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {saved ? 'Saved!' : 'Save Travel Info'}
      </button>
    </div>
  )
}
