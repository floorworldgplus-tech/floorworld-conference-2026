import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:surani@floorworld.com.au',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Only admins can send
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, body, audience } = await req.json()
    // audience: 'all' | 'delegate' | 'supplier' | 'nso_staff'

    let query = supabase.from('push_subscriptions').select('subscription_json, role')
    if (audience !== 'all') {
      query = query.eq('role', audience)
    }
    const { data: subs } = await query

    if (!subs || subs.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 })
    }

    const payload = JSON.stringify({ title, body })
    let sent = 0
    let failed = 0

    await Promise.allSettled(
      subs.map(async (sub) => {
        try {
          const subscription = JSON.parse(sub.subscription_json)
          await webpush.sendNotification(subscription, payload)
          sent++
        } catch {
          failed++
        }
      })
    )

    return NextResponse.json({ ok: true, sent, failed })
  } catch (err) {
    console.error('Push send error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
