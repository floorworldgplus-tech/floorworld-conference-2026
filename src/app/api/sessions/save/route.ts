import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { sessionId, action } = await req.json() as { sessionId: string; action: 'save' | 'unsave' }
  if (!sessionId || !action) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  if (action === 'save') {
    await supabase.from('user_sessions').upsert({ user_id: user.id, session_id: sessionId }, { onConflict: 'user_id,session_id' })
  } else {
    await supabase.from('user_sessions').delete().eq('user_id', user.id).eq('session_id', sessionId)
  }

  return NextResponse.json({ ok: true })
}
