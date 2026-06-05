import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as XLSX from 'xlsx'

function cellVal(row: any[], col: number): string {
  const v = row?.[col]
  if (v === null || v === undefined) return ''
  return String(v).trim()
}

function parseSheet(rows: any[][]): Record<string, any> | null {
  // rows[7][1] = Email Address
  const email = cellVal(rows[7], 1)
  if (!email || !email.includes('@')) return null

  // Personal
  const preferred_name    = cellVal(rows[3], 1)
  const full_name         = cellVal(rows[4], 1)
  const organisation      = cellVal(rows[5], 1)
  const registration_type = cellVal(rows[6], 1)
  const dietary           = cellVal(rows[8], 1)
  const tshirt_size       = cellVal(rows[9], 1)
  const tshirt_quantity   = cellVal(rows[10], 1)

  // Accommodation
  const hotel         = cellVal(rows[13], 1)
  const room_type     = cellVal(rows[14], 1)
  const checkin_date  = cellVal(rows[15], 1)
  const checkout_date = cellVal(rows[16], 1)
  const sharing_with  = cellVal(rows[17], 1)

  // Flights
  const flight_preference    = cellVal(rows[20], 1)
  const outbound_flight      = cellVal(rows[21], 1)
  const return_flight        = cellVal(rows[22], 1)
  const transfer_arrival     = cellVal(rows[23], 1)
  const transfer_departure   = cellVal(rows[24], 1)

  // Optional activities (rows 27–31)
  const activityRows = [27, 28, 29, 30, 31]
  const activities = activityRows.map(i => ({
    name: cellVal(rows[i], 0).replace(/\n/g, ' '),
    status: cellVal(rows[i], 1),
  })).filter(a => a.name)

  // Conference program (rows 35 onwards, row 34 is header)
  const program: any[] = []
  for (let i = 35; i < rows.length; i++) {
    const row = rows[i]
    if (!row) continue
    const col0 = cellVal(row, 0)
    const col1 = cellVal(row, 1)
    const col2 = cellVal(row, 2)
    const col3 = cellVal(row, 3)
    if (!col0 && !col1 && !col2) continue
    if (col0.startsWith('All times')) continue // footer
    // Day header rows have content in col0 but empty col1
    const isHeader = col0 && !col1 && !col2
    program.push({ date: col0, time: col1, session: col2, venue: col3, isHeader })
  }

  return {
    email: email.toLowerCase(),
    preferred_name, full_name, organisation, registration_type,
    dietary_requirements: dietary,
    tshirt_size, tshirt_quantity,
    hotel, room_type, checkin_date, checkout_date, sharing_with,
    flight_preference, outbound_flight, return_flight,
    transfer_arrival, transfer_departure,
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

        // Try to find matching user by email
        const { data: matchedProfile } = await supabase
          .from('profiles')
          .select('id')
          .ilike('email', data.email)
          .single()

        const upsertData = {
          ...data,
          user_id: matchedProfile?.id ?? null,
          updated_at: new Date().toISOString(),
        }

        const { error } = await supabase
          .from('itineraries')
          .upsert(upsertData, { onConflict: 'email' })

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
