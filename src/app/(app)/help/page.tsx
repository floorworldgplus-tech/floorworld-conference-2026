'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import TopBar from '@/components/layout/TopBar'
import { Loader2, CheckCircle, Phone } from 'lucide-react'

const SUBJECTS = [
  'Transport / Transfer',
  'Accommodation',
  'Agenda / Sessions',
  'Technical issue with the app',
  'Lost item',
  'Medical',
  'Other',
]

export default function HelpPage() {
  const [subject, setSubject] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalSubject = subject === 'Other' ? customSubject : subject
    if (!finalSubject.trim() || !message.trim()) {
      setError('Please fill in both fields.')
      return
    }
    setSubmitting(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    const { error } = await supabase.from('help_requests').insert({
      user_id: user.id,
      subject: finalSubject.trim(),
      message: message.trim(),
    })

    if (!error) {
      // Fire email notification (non-blocking)
      fetch('/api/help-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: finalSubject.trim(),
          message: message.trim(),
          userName: (profile as any)?.full_name || 'A delegate',
          userEmail: user.email,
        }),
      }).catch(() => {}) // silently ignore if email fails
    }

    setSubmitting(false)
    if (error) {
      setError('Failed to send. Please try again or call the event team directly.')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div>
        <TopBar title="Help Desk" />
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <CheckCircle size={52} className="text-brand-green mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Request sent!</h2>
          <p className="text-gray-500 text-sm">The event team will respond shortly.</p>
          <button
            onClick={() => { setSubmitted(false); setSubject(''); setMessage('') }}
            className="mt-6 text-brand-blue text-sm font-medium"
          >
            Send another request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TopBar title="Help Desk" />

      <div className="px-4 py-4 space-y-4">
        {/* Emergency card */}
        <div className="bg-brand-red rounded-2xl p-4 flex items-center gap-3">
          <Phone size={22} className="text-white flex-shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">Emergency or urgent help?</p>
            <p className="text-red-100 text-xs mt-0.5">Contact the event desk directly.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Topic</p>
            <div className="space-y-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-colors ${
                    subject === s
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {subject === 'Other' && (
              <input
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder="Describe your topic"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Tell us what you need..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !subject}
            className="w-full bg-brand-blue text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] transition-transform"
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            Send Request
          </button>
        </form>
      </div>
    </div>
  )
}
