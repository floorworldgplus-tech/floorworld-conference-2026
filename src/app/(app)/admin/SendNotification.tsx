'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'

type Audience = 'all' | 'delegate' | 'supplier' | 'nso_staff'
type Destination = '/home' | '/agenda' | '/announcements' | '/passport' | '/notifications'

const AUDIENCES: { value: Audience; label: string; description: string }[] = [
  { value: 'all',       label: 'Everyone',  description: 'All delegates, suppliers & staff' },
  { value: 'delegate',  label: 'Delegates', description: 'Registered delegates only' },
  { value: 'supplier',  label: 'Suppliers', description: 'Expo suppliers only' },
  { value: 'nso_staff', label: 'Staff',     description: 'NSO staff only' },
]

const DESTINATIONS: { value: Destination; label: string }[] = [
  { value: '/home',          label: '🏠 Home' },
  { value: '/agenda',        label: '📅 Agenda' },
  { value: '/announcements', label: '📢 Announcements' },
  { value: '/passport',      label: '🎟️ Expo Passport' },
  { value: '/notifications', label: '🔔 Notifications' },
]

export default function SendNotification() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [audience, setAudience] = useState<Audience>('all')
  const [destination, setDestination] = useState<Destination>('/home')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Please fill in both the title and message.')
      return
    }
    setSending(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/push-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), audience, destination }),
      })
      const data = await res.json()
      if (data.ok) {
        setResult({ sent: data.sent, failed: data.failed })
        setTitle('')
        setBody('')
      } else {
        setError('Failed to send. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-[#0095DA] px-4 py-3 flex items-center gap-2">
        <Send size={16} className="text-white" />
        <h2 className="text-white font-semibold text-sm">Send Push Notification</h2>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* Audience */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Send to</p>
          <div className="grid grid-cols-2 gap-2">
            {AUDIENCES.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setAudience(a.value)}
                className={`text-left px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                  audience === a.value
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                <p className="font-semibold text-xs">{a.label}</p>
                <p className={`text-[10px] mt-0.5 ${audience === a.value ? 'text-blue-100' : 'text-gray-400'}`}>
                  {a.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Notification title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Lunch is now being served"
            maxLength={60}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Message
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="e.g. Head to the Grand Ballroom — food is ready!"
            rows={3}
            maxLength={150}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <p className="text-[10px] text-gray-400 text-right mt-1">{body.length}/150</p>
        </div>

        {/* Destination */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tapping opens</p>
          <div className="flex flex-wrap gap-2">
            {DESTINATIONS.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDestination(d.value)}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  destination === d.value
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
        )}

        {result && (
          <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-xl">
            <CheckCircle size={16} className="text-brand-green flex-shrink-0" />
            <p className="text-sm text-green-800">
              Sent to <strong>{result.sent}</strong> device{result.sent !== 1 ? 's' : ''}
              {result.failed > 0 && ` (${result.failed} failed)`}
            </p>
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={sending || !title.trim() || !body.trim()}
          className="w-full bg-brand-blue text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] transition-transform"
        >
          {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {sending ? 'Sending…' : 'Send Notification'}
        </button>
      </div>
    </section>
  )
}
