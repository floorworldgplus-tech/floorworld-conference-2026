'use client'

import { useState, useEffect } from 'react'
import {
  ChevronDown, ChevronUp, MapPin, Bookmark, BookmarkCheck,
  Clock, Zap, ExternalLink, User, Calendar,
} from 'lucide-react'
import type { Session } from '@/types/database'

const TYPE_CONFIG: Record<string, { label: string; colour: string }> = {
  keynote:   { label: 'Conference',        colour: 'bg-brand-blue text-white'    },
  breakout:  { label: 'Workshop',          colour: 'bg-brand-green text-white'   },
  workshop:  { label: 'Workshop',          colour: 'bg-brand-green text-white'   },
  social:    { label: 'Networking',        colour: 'bg-brand-red text-white'     },
  meal:      { label: 'Dinner',            colour: 'bg-orange-500 text-white'    },
  transfer:  { label: 'Transfer',          colour: 'bg-gray-400 text-white'      },
  excursion: { label: 'Tour',              colour: 'bg-purple-500 text-white'    },
  free_time: { label: 'Optional Activity', colour: 'bg-gray-200 text-gray-600'  },
}

// Known KL venue links — falls back to a Google Maps search
const VENUE_LINKS: Record<string, { maps: string; website?: string }> = {
  'W Hotel':         { maps: 'https://maps.google.com/?q=W+Hotel+Kuala+Lumpur', website: 'https://www.marriott.com/hotels/travel/kulwh-w-kuala-lumpur/' },
  'Wet Deck':        { maps: 'https://maps.google.com/?q=Wet+Deck+W+Hotel+Kuala+Lumpur' },
  'Tamarind Springs':{ maps: 'https://maps.google.com/?q=Tamarind+Springs+Kuala+Lumpur', website: 'https://www.tamarindrestaurants.com/' },
  'Petronas':        { maps: 'https://maps.google.com/?q=Petronas+Twin+Towers+Kuala+Lumpur', website: 'https://www.petronastwintowers.com.my/' },
  'Bijan':           { maps: 'https://maps.google.com/?q=Bijan+Restaurant+Kuala+Lumpur', website: 'https://bijanrestaurant.com/' },
  'Batu Caves':      { maps: 'https://maps.google.com/?q=Batu+Caves+Malaysia', website: 'https://batucaves.com/' },
}

function getVenueLink(location: string): { maps: string; website?: string } | null {
  for (const [key, info] of Object.entries(VENUE_LINKS)) {
    if (location.toLowerCase().includes(key.toLowerCase())) return info
  }
  if (location.length < 4) return null
  return { maps: `https://maps.google.com/?q=${encodeURIComponent(location + ' Kuala Lumpur')}` }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-AU', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function formatDayLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    timeZone: 'Asia/Kuala_Lumpur',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function formatDateKey(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
}

function SessionCard({
  session,
  isSaved,
  now,
  onToggleSave,
}: {
  session: Session
  isSaved: boolean
  now: Date
  onToggleSave: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const start = new Date(session.start_time)
  const end = new Date(session.end_time)
  const isNow = now >= start && now <= end
  const minutesUntil = (start.getTime() - now.getTime()) / 60000
  const startingSoon = minutesUntil > 0 && minutesUntil <= 30

  const config = TYPE_CONFIG[session.session_type] ?? { label: session.session_type, colour: 'bg-gray-200 text-gray-600' }
  const venue = session.location ? getVenueLink(session.location) : null
  const hasMoreDetail = !!(session.description || session.speaker_bio)

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${isNow ? 'border-brand-blue' : 'border-gray-100'}`}>

      {/* Status banner */}
      {isNow && (
        <div className="bg-brand-blue px-4 py-1.5 flex items-center gap-1.5">
          <Zap size={12} className="text-white" />
          <span className="text-white text-[11px] font-bold uppercase tracking-wider">Happening Now</span>
        </div>
      )}
      {startingSoon && !isNow && (
        <div className="bg-brand-yellow px-4 py-1.5 flex items-center gap-1.5">
          <Clock size={12} className="text-white" />
          <span className="text-white text-[11px] font-bold uppercase tracking-wider">
            Starting in {Math.round(minutesUntil)} min
          </span>
        </div>
      )}

      <div className="p-4">
        {/* Type badge + save button */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${config.colour}`}>
            {config.label}
          </span>
          <button
            onClick={() => onToggleSave(session.id)}
            className="flex-shrink-0 p-1 -mr-1 -mt-1 active:scale-90 transition-transform"
            aria-label={isSaved ? 'Remove from my agenda' : 'Add to my agenda'}
          >
            {isSaved
              ? <BookmarkCheck size={18} className="text-brand-blue" />
              : <Bookmark size={18} className="text-gray-300" />}
          </button>
        </div>

        {/* Title */}
        <p className="font-bold text-gray-900 text-[15px] leading-snug">{session.title}</p>

        {/* Time */}
        <div className="flex items-center gap-1 mt-1.5">
          <Clock size={12} className="text-gray-400 flex-shrink-0" />
          <p className="text-xs text-gray-500 font-medium">
            {formatTime(session.start_time)} – {formatTime(session.end_time)}
          </p>
        </div>

        {/* Location with map link */}
        {session.location && venue && (
          <a
            href={venue.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1 text-brand-blue text-xs font-medium active:opacity-70"
          >
            <MapPin size={12} className="flex-shrink-0" />
            <span className="truncate">{session.location}</span>
            <ExternalLink size={10} className="flex-shrink-0 opacity-60 ml-0.5" />
          </a>
        )}
        {session.location && !venue && (
          <div className="mt-1 flex items-center gap-1">
            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-500">{session.location}</p>
          </div>
        )}

        {/* Speaker */}
        {session.speaker_name && (
          <div className="flex items-center gap-1 mt-1.5">
            <User size={12} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs font-medium text-gray-700">{session.speaker_name}</p>
          </div>
        )}

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-3 space-y-2">
            {session.description && (
              <p className="text-sm text-gray-600 leading-relaxed">{session.description}</p>
            )}
            {session.speaker_bio && (
              <div className="bg-gray-50 rounded-xl p-3 mt-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">About the speaker</p>
                <p className="text-xs text-gray-600 leading-relaxed">{session.speaker_bio}</p>
              </div>
            )}
            {venue?.website && (
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1 text-xs text-brand-blue font-medium bg-brand-blue/5 px-3 py-1.5 rounded-lg active:opacity-70"
              >
                <ExternalLink size={12} />
                Visit venue website
              </a>
            )}
          </div>
        )}

        {/* Expand / collapse */}
        {hasMoreDetail && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-xs text-brand-blue font-semibold active:opacity-70"
          >
            {expanded ? <><ChevronUp size={14} /> Less detail</> : <><ChevronDown size={14} /> More detail</>}
          </button>
        )}
      </div>
    </div>
  )
}

function DayTab({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
        isActive ? 'bg-brand-blue text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200'
      }`}
    >
      {label}
    </button>
  )
}

export default function AgendaClient({
  sessions,
  savedIds,
}: {
  sessions: Session[]
  savedIds: Set<string>
}) {
  const [now, setNow] = useState(new Date())
  const [saved, setSaved] = useState<Set<string>>(savedIds)
  const [activeDay, setActiveDay] = useState<string | null>(null)

  // Tick every minute to update "Happening Now" / "Starting Soon"
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Group sessions by day
  const grouped: Record<string, Session[]> = {}
  for (const s of sessions) {
    const key = formatDateKey(s.start_time)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(s)
  }
  const days = Object.keys(grouped).sort()

  // Default to first day (or the current day if within the conference)
  const currentActiveDay = activeDay ?? days[0] ?? null

  const toggleSave = async (sessionId: string) => {
    const isCurrentlySaved = saved.has(sessionId)
    // Optimistic update
    setSaved((prev) => {
      const next = new Set(prev)
      isCurrentlySaved ? next.delete(sessionId) : next.add(sessionId)
      return next
    })
    try {
      await fetch('/api/sessions/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, action: isCurrentlySaved ? 'unsave' : 'save' }),
      })
    } catch {
      // Revert on error
      setSaved((prev) => {
        const next = new Set(prev)
        isCurrentlySaved ? next.add(sessionId) : next.delete(sessionId)
        return next
      })
    }
  }

  if (days.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <Calendar size={40} className="text-gray-200 mb-3" />
        <p className="text-gray-500 text-sm font-medium">The agenda will be published soon.</p>
        <p className="text-gray-400 text-xs mt-1">Check back closer to the conference.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Day tabs */}
      <div className="px-4 pt-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {days.map((day) => {
          const label = new Date(day + 'T12:00:00+08:00').toLocaleDateString('en-AU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })
          return (
            <DayTab
              key={day}
              label={label}
              isActive={day === currentActiveDay}
              onClick={() => setActiveDay(day)}
            />
          )
        })}
      </div>

      {/* Sessions for active day */}
      {currentActiveDay && grouped[currentActiveDay] && (
        <div className="px-4 pb-6">
          {/* Day header */}
          <div className="mb-4">
            <h2 className="text-[17px] font-bold text-gray-900">
              {formatDayLabel(grouped[currentActiveDay][0].start_time)}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {grouped[currentActiveDay].length} session{grouped[currentActiveDay].length !== 1 ? 's' : ''} scheduled
            </p>
          </div>

          <div className="space-y-3">
            {grouped[currentActiveDay].map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                isSaved={saved.has(session.id)}
                now={now}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
