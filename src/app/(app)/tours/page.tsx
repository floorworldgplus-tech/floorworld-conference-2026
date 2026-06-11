import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import Image from 'next/image'
import { CheckCircle, Users, DollarSign, Star } from 'lucide-react'

const INCLUSIVE = [
  {
    date: 'Monday 17 August',
    title: 'City Tour including Lunch',
    description:
      "Explore all that KL has to offer -- visits to Batu Caves and Selangor, plus photo stops at the National Monument and King's Palace.",
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80',
    imageAlt: 'Kuala Lumpur city',
  },
  {
    date: 'Wednesday 19 August',
    title: 'VIP Petronas Towers Visit',
    description:
      'Just a short walk to the Towers -- your exclusive tour includes entry to Level 42 and the Observation Deck on Level 86.',
    image: 'https://images.unsplash.com/photo-1567639386337-3c5e2e5e3e13?w=800&q=80',
    imageAlt: 'Petronas Twin Towers',
  },
]

const OPTIONAL = [
  {
    title: 'Cooking Class',
    date: 'Thursday 20 August',
    description:
      'Under the guidance of expert local chefs, learn to prepare authentic Malaysian dishes using fresh local ingredients. Discover the secrets of Malaysian cuisine and bring home recipes that will impress family and friends. Includes lunch.',
    min: 25,
    max: 35,
    cost: 'AUD $260 per adult',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    imageAlt: 'Malaysian cooking class',
    note: '',
  },
  {
    title: 'Vespa Tour of Kuala Lumpur',
    date: 'Thursday 20 August',
    description:
      "A 2.5-hour ride through the bustling streets of KL on a Vespa. Gain a unique insight into the city from a local's perspective and experience the highlights and hidden gems of KL in an exciting and informative way.",
    min: 15,
    max: 30,
    cost: 'AUD $240 per adult',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    imageAlt: 'Vespa scooter tour',
    note: '',
  },
  {
    title: 'Shopping Tour',
    date: 'Thursday 20 August',
    description:
      'Browse for souvenirs and high-quality Malaysian goods on a morning private shopping tour. Visit the bustling markets and bazaars of Chinatown, stroll past street vendors at Central Market, and explore a large shopping mall.',
    min: 15,
    max: 30,
    cost: 'AUD $48 per adult / AUD $24 per child',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    imageAlt: 'KL shopping markets',
    note: '',
  },
  {
    title: 'Bukit Jalil Golf & Country Resort',
    date: 'Thursday 20 August',
    description:
      'An 18-hole, par-72 layout designed by renowned architect Max Wexler. Set in a lush tropical setting across 165 acres of greenery. An official handicap card or National Handicapping System number is required (Men: 24 and below, Ladies: 36 and below).',
    min: 10,
    max: 20,
    cost: 'AUD $165 per adult',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    imageAlt: 'Golf course',
    note: 'Handicap card required',
  },
]

export default async function ToursPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBar title="Tours" />

      <div className="px-4 py-4 space-y-5 pb-8">

        {/* Inclusive Tours */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle size={12} className="text-white" />
            </div>
            <h2 className="font-black text-gray-900 text-base">Inclusive Tours</h2>
          </div>
          <p className="text-xs text-gray-500 mb-3 ml-7">
            Included in the package for members, partners, sponsors and additional paying delegates.
          </p>

          <div className="space-y-3">
            {INCLUSIVE.map((tour) => (
              <div key={tour.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative w-full h-36">
                  <Image src={tour.image} alt={tour.imageAlt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold bg-brand-green text-white px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Included
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 px-4 pb-3">
                    <p className="text-[10px] font-semibold text-white/70 mb-0.5">{tour.date}</p>
                    <p className="text-sm font-black text-white leading-snug">{tour.title}</p>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-gray-600 leading-relaxed">{tour.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Optional Tours */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
              <Star size={11} className="text-white" />
            </div>
            <h2 className="font-black text-gray-900 text-base">Optional Tours</h2>
          </div>
          <p className="text-xs text-gray-500 mb-3 ml-7">
            Thursday 20 August -- booked and paid during registration. Minimum numbers apply.
          </p>

          <div className="space-y-3">
            {OPTIONAL.map((tour) => (
              <div key={tour.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative w-full h-36">
                  <Image src={tour.image} alt={tour.imageAlt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 px-4 pb-3">
                    <p className="text-sm font-black text-white leading-snug">{tour.title}</p>
                  </div>
                </div>
                <div className="px-4 py-3.5 space-y-3">
                  <p className="text-xs text-gray-600 leading-relaxed">{tour.description}</p>

                  {tour.note ? (
                    <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-amber-700">{tour.note}</p>
                    </div>
                  ) : null}

                  <div className="flex items-center gap-4 pt-1 border-t border-gray-50">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{tour.min}-{tour.max} people</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={12} className="text-brand-green" />
                      <span className="text-xs font-semibold text-gray-700">{tour.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
