'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import TopBar from '@/components/layout/TopBar'
import { Star, Loader2, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type FeedbackType = 'event_overall' | 'session' | 'supplier'

export default function FeedbackPage() {
  const [type, setType] = useState<FeedbackType>('event_overall')
  const [rating, setRating] = useState(0)
  const [comments, setComments] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a rating.')
      return
    }
    setSubmitting(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('feedback').insert({
      user_id: user.id,
      feedback_type: type,
      rating,
      comments: comments.trim() || null,
    })

    setSubmitting(false)
    if (error) {
      setError('Failed to submit. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div>
        <TopBar title="Feedback" />
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <CheckCircle size={52} className="text-brand-green mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h2>
          <p className="text-gray-500 text-sm">Your feedback helps us improve every year.</p>
          <button
            onClick={() => { setSubmitted(false); setRating(0); setComments('') }}
            className="mt-6 text-brand-blue text-sm font-medium"
          >
            Submit another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TopBar title="Feedback" />

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-6">
        {/* Type selector */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">What are you rating?</p>
          <div className="flex gap-2">
            {([
              ['event_overall', 'Overall Event'],
              ['session', 'A Session'],
              ['supplier', 'A Supplier'],
            ] as [FeedbackType, string][]).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setType(val)}
                className={cn(
                  'flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-colors',
                  type === val
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-gray-600 border-gray-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Star rating */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Your rating</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className="p-1 active:scale-125 transition-transform"
              >
                <Star
                  size={36}
                  className={n <= rating ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-200'}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            {rating === 0 ? 'Tap to rate' : ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][rating]}
          </p>
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
            Comments <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            placeholder="What stood out? What could be improved?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-blue text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] transition-transform"
        >
          {submitting && <Loader2 size={18} className="animate-spin" />}
          Submit Feedback
        </button>
      </form>
    </div>
  )
}
