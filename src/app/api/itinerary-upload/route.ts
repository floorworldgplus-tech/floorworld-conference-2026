import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as XLSX from 'xlsx'

function cellStr(v: any): string {
  if (v === null || v === undefined) return ''
  return String(v).trim()
}

// Find the row index where col0 contains the given label
function findRow(rows: any[][], label: string): number {
  for (let i = 0; i < rows.length; i++) {
    if (cellStr(rows[i]?.[0]).includes(label)) return i
  }
  return -1
}

// Get value (col1) at the row where col0 contains label
function getVal(rows: any[][], label: string): string {
  const i = findRow(rows, label)
  return i >= 0 ? cellStr(rows[i]?.[1]) : ''
}

function parseSheet(rows: any[][]): Record<string, any> | null {
  const email = getVal(rows, 'Email Address')
  if (!email || !email.includes('@')) return null

  // Optional activities section
  const actStart = findRow(rows, 'OPTIONAL ACTIVITIES')
  const activities: { name: string; status: string }[] = []
  if (actStart >= 0) {
    for (let i = actStart + 1; i < rows.length; i++) {
      const col0 = cellStr(rows[i]?.[0])
      const col1 = cellStr(rows[i]?.[1])
      if (!col0) break // blank row = end of section
      if (col0.includes('CONFERENCE')) break
      activities.push({ name: col0.replace(/\n/g, ' '), status: col1 })
    }
  }

  // Conference program section
  const progStart = findRow(rows, 'CONFERENCE PROGRAM')
  const program: { date: string; time: string; session: string; venue: string; isHeader: boolean }[] = []
  if (progStart >= 0) {
    for (let i = progStart + 2; i < rows.length; i++) { // +2 to skip header row
      const row = rows[i]
      if (!row) continue
      const col0 = cellStr(row[0])
      const col1 = cellStr(row[1])
      const col2 = cellStr(row[2])
      const col3 = cellStr(row[3])
      if (!col0 && !col1 && !col2) continue
      if (col0.startsWith('All times')) continue
      const isHeader = !!col0 && !col1 && !col2
      program.push({ date: col0, time: col1, session: col2, venue: col3, isHeader })
    }
  }

  return {
    email:               email.toLowerCase(),
    preferred_name:      getVal(rows, 'Preferred Name'),
    full_name:           getVal(rows, 'Full Name'),
    organisation:        getVal(rows, 'Organisation'),
    registration_type:   getVal(rows, 'Registration Type'),
    dietary_requirements: getVal(rows, 'Dietary Requirements'),
    tshirt_size:         getVal(rows, 'T-Shirt Size'),
    tshirt_quantity:     getVal(rows, 'T-Shirt Quantity'),
    hotel:               getVal(rows, 'Hotel'),
    room_type:           getVal(rows, 'Room Type'),
    checkin_date:        getVal(rows, 'Check-In Date'),
    checkout_date:       getVal(rows, 'Check-Out Date'),
    sharing_with:        getVal(rows, 'Sharing With'),
    flight_preference:   getVal(rows, 'Flight Preference'),
    outbound_flight:     getVal(rows, 'Outbound Flight'),
    return_flight:       getVal(rows, 'Return Flight'),
    transfer_arrival:    getVal(rows, 'Airport Transfer (Arrival)'),
    transfer_departure:  getVal(rows, 'Airport Transfer (Departure)'),
    activities,
    program,
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if ((profile as any)?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const wb = XLSX.read(buffer, { type: 'buffer' })

    let imported = 0
    let skipped = 0
    const errors: string[] = []

    for (const sheetName of wb.SheetNames) {
      try {
        const ws = wb.Sheets[sheetName]
        const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null })
        const data = parseSheet(rows)
        if (!data) { skipped++; continue }

        // Match to user account by email
        const { data: matchedProfile } = await supabase
          .from('profiles')
          .select('id')
          .ilike('email', data.email)
          .single()

        const { error } = await supabase
          .from('itineraries')
          .upsert(
            { ...data, user_id: matchedProfile?.id ?? null, updated_at: new Date().toISOString() },
            { onConflict: 'email' }
          )

        if (error) {
          errors.push(`${sheetName}: ${error.message}`)
        } else {
          imported++
        }
      } catch (e: any) {
        errors.push(`${sheetName}: ${e.message}`)
        skipped++
      }
    }

    return NextResponse.json({ ok: true, imported, skipped, errors })
  } catch (err: any) {
    console.error('Itinerary upload error:', err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
