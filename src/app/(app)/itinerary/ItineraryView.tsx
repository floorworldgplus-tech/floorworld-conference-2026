'use client'

import { Plane, Hotel, Bus, FileText, Download, User, Shirt, Utensils, CheckCircle, XCircle } from 'lucide-react'

type Activity = { name: string; status: string }
type ProgramRow = { date: string; time: string; session: string; venue: string; isHeader: boolean }

type Itinerary = {
  preferred_name: string | null
  full_name: string | null
  organisation: string | null
  registration_type: string | null
  dietary_requirements: string | null
  tshirt_size: string | null
  tshirt_quantity: string | null
  hotel: string | null
  room_type: string | null
  checkin_date: string | null
  checkout_date: string | null
  sharing_with: string | null
  flight_preference: string | null
  outbound_flight: string | null
  return_flight: string | null
  transfer_arrival: string | null
  transfer_departure: string | null
  activities: Activity[]
  program: ProgramRow[]
}

function Section({ colour, icon, title, children }: {
  colour: string; icon: React.ReactNode; title: string; children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className={`${colour} px-4 py-2.5 flex items-center gap-2`}>
        {icon}
        <span className="text-white font-semibold text-sm">{title}</span>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string | null }) {
  if (!value || value === 'TBC — to be provided' || value === '0') return null
  return (
    <div className="flex gap-3 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400 w-32 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-gray-800 flex-1">{value}</span>
    </div>
  )
}

function isAttending(status: string) {
  const s = status.toLowerCase()
  return s === 'attending' || s === 'registered'
}

export default function ItineraryView({ itinerary }: { itinerary: Itinerary | null }) {
  if (!itinerary) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
        <FileText size={48} className="text-gray-200 mb-4" />
        <p className="text-gray-600 font-semibold">No itinerary uploaded yet</p>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">Your personal travel details will appear here once the event team has uploaded them. Check back closer to the conference.</p>
      </div>
    )
  }

  const name = itinerary.preferred_name || itinerary.full_name || ''

  return (
    <div>
      <style>{`@media print { .no-print { display: none !important; } }`}</style>

      <div className="px-4 py-4 space-y-4">

        {/* Download */}
        <button
          onClick={() => window.print()}
          className="no-print w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold text-sm py-3 rounded-2xl"
        >
          <Download size={16} />
          Download / Print
        </button>

        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0095DA] to-[#0070a8] rounded-2xl px-4 py-5">
          <p className="text-blue-200 text-xs font-medium tracking-wide uppercase">Personal Itinerary</p>
          <p className="text-white font-black text-2xl mt-1">{name}</p>
          {itinerary.organisation && (
            <p className="text-blue-100 text-sm mt-0.5">{itinerary.organisation}</p>
          )}
          <p className="text-blue-200 text-xs mt-2">Floorworld Conference 2026 · W Hotel Kuala Lumpur · 16–21 August</p>
        </div>

        {/* Personal Details */}
        <Section colour="bg-[#0095DA]" icon={<User size={15} className="text-white" />} title="Registration Details">
          <div>
            <Row label="Full Name" value={itinerary.full_name} />
            <Row label="Organisation" value={itinerary.organisation} />
            <Row label="Registration" value={itinerary.registration_type} />
            {itinerary.dietary_requirements && (
              <div className="flex gap-3 py-1.5 border-b border-gray-50">
                <span className="text-xs text-gray-400 w-32 flex-shrink-0 pt-0.5 flex items-center gap-1">
                  <Utensils size={11} /> Dietary
                </span>
                <span className="text-sm text-brand-red font-medium flex-1">{itinerary.dietary_requirements}</span>
              </div>
            )}
            <div className="flex gap-3 py-1.5">
              <span className="text-xs text-gray-400 w-32 flex-shrink-0 pt-0.5 flex items-center gap-1">
                <Shirt size={11} /> T-Shirt
              </span>
              <span className="text-sm text-gray-800 flex-1">
                {[itinerary.tshirt_size, itinerary.tshirt_quantity ? `×${itinerary.tshirt_quantity}` : null].filter(Boolean).join(' ')}
              </span>
            </div>
          </div>
        </Section>

        {/* Accommodation */}
        {(itinerary.hotel || itinerary.checkin_date) && (
          <Section colour="bg-[#F5A623]" icon={<Hotel size={15} className="text-white" />} title="Accommodation">
            <div>
              <Row label="Hotel" value={itinerary.hotel} />
              <Row label="Room Type" value={itinerary.room_type} />
              <Row label="Check-In" value={itinerary.checkin_date} />
              <Row label="Check-Out" value={itinerary.checkout_date} />
              <Row label="Sharing With" value={typeof itinerary.sharing_with === 'string' && itinerary.sharing_with !== '0' ? itinerary.sharing_with : null} />
            </div>
          </Section>
        )}

        {/* Flights */}
        {(itinerary.outbound_flight || itinerary.return_flight || itinerary.flight_preference) && (
          <Section colour="bg-[#0095DA]" icon={<Plane size={15} className="text-white" />} title="Flights & Transfers">
            <div>
              <Row label="Preference" value={itinerary.flight_preference} />
              <Row label="Outbound" value={itinerary.outbound_flight} />
              <Row label="Return" value={itinerary.return_flight} />
              <Row label="Arrival Transfer" value={itinerary.transfer_arrival} />
              <Row label="Departure Transfer" value={itinerary.transfer_departure} />
            </div>
          </Section>
        )}

        {/* Optional Activities */}
        {itinerary.activities && itinerary.activities.length > 0 && (
          <Section colour="bg-[#E84730]" icon={<CheckCircle size={15} className="text-white" />} title="Optional Activities">
            <div className="space-y-2">
              {itinerary.activities.map((a, i) => {
                const attending = isAttending(a.status)
                return (
                  <div key={i} className={`flex items-start gap-3 px-3 py-2.5 rounded-xl ${attending ? 'bg-green-50' : 'bg-gray-50'}`}>
                    {attending
                      ? <CheckCircle size={16} className="text-brand-green flex-shrink-0 mt-0.5" />
                      : <XCircle size={16} className="text-gray-300 flex-shrink-0 mt-0.5" />
                    }
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold ${attending ? 'text-green-800' : 'text-gray-400'}`}>
                        {a.name.split('(')[0].trim()}
                      </p>
                      {a.name.includes('(') && (
                        <p className="text-[10px] text-gray-400">{a.name.match(/\(([^)]+)\)/)?.[1]}</p>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${attending ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {a.status}
                    </span>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

        {/* Conference Program */}
        {itinerary.program && itinerary.program.length > 0 && (
          <Section colour="bg-[#5DB13C]" icon={<FileText size={15} className="text-white" />} title="Conference Program">
            <div className="space-y-1">
              {itinerary.program.map((row, i) => {
                if (row.isHeader) {
                  return (
                    <div key={i} className="pt-3 pb-1 first:pt-0">
                      <p className="text-xs font-black text-brand-blue uppercase tracking-wide">{row.date}</p>
                    </div>
                  )
                }
                return (
                  <div key={i} className="flex gap-2 py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-[10px] text-gray-400 w-20 flex-shrink-0 pt-0.5 leading-tight">{row.time || row.date}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-tight">{row.session}</p>
                      {row.venue && (
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{row.venue}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

        <p className="text-[10px] text-gray-400 text-center pb-2 px-4 leading-relaxed">
          All times, activities and sessions are subject to change. Final details to be confirmed closer to the event.
        </p>

      </div>
    </div>
  )
}
