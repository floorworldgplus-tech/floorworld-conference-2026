import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import {
  Thermometer, ShoppingBag, Utensils, DollarSign, Heart,
  ShoppingCart, Ticket, Train, Shield, Wifi,
} from 'lucide-react'

export default async function DestinationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBar title="Travel & Stay" />

      <div className="px-4 py-4 space-y-4 pb-8">

        {/* Destination header */}
        <div className="bg-brand-blue rounded-2xl px-5 py-4 text-white">
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Destination</p>
          <p className="text-2xl font-black">Kuala Lumpur</p>
          <p className="text-sm opacity-80 mt-0.5">August 2026</p>
        </div>

        {/* Weather */}
        <Section icon={Thermometer} iconBg="bg-orange-50" iconFg="text-orange-500" title="Weather in August">
          <Row label="Temperature" value="25°C – 33°C" />
          <Row label="Humidity" value="High" />
          <Row label="Rain" value="Short afternoon or evening showers possible" />
          <Note>Pack lightweight clothing, comfortable walking shoes, a small umbrella or rain jacket, and sunscreen.</Note>
        </Section>

        {/* Where to Eat */}
        <Section icon={Utensils} iconBg="bg-red-50" iconFg="text-brand-red" title="Where to Eat">
          <p className="text-xs text-gray-500 mb-3">KL is a food lover&apos;s paradise — from street food to fine dining.</p>
          <SubHeading>Popular Dining Areas</SubHeading>
          <div className="space-y-2 mb-4">
            <AreaCard name="Bukit Bintang / KLCC" desc="Trendy restaurants, cafés & bars, international cuisine, skyline views" />
            <AreaCard name="Chinatown (Petaling St) & Alor Street" desc="Chinese cuisines, authentic local flavours & street foods" />
            <AreaCard name="Brickfields / Little India" desc="Indian cuisines" />
            <AreaCard name="Kampung Baru" desc="Malay cuisines" />
          </div>
          <SubHeading>Must-Try Local Dishes</SubHeading>
          <div className="flex flex-wrap gap-2">
            {[
              'Nasi Lemak',
              'Satay',
              'Roti Canai',
              'Laksa',
              'Banana Leaf Rice',
              'Bak Kut Teh (Non-Halal)',
              'Char Kway Teow (Halal & Non-Halal)',
            ].map((d) => (
              <span key={d} className="text-[11px] bg-white border border-gray-100 text-gray-700 px-2.5 py-1 rounded-full shadow-sm">
                {d}
              </span>
            ))}
          </div>
        </Section>

        {/* Money */}
        <Section icon={DollarSign} iconBg="bg-green-50" iconFg="text-brand-green" title="Money & Currency">
          <Row label="Currency" value="Malaysian Ringgit (MYR)" />
          <Row label="Exchange rate" value="~USD 1.00 = RM 4.00" />
          <Note>Credit cards are widely accepted in hotels, malls and restaurants. Cash is useful for taxis, street food and small shops.</Note>
          <Note>Licensed money changers in shopping malls usually offer better rates than airports or hotels.</Note>
        </Section>

        {/* Cultural tips */}
        <Section icon={Heart} iconBg="bg-pink-50" iconFg="text-pink-500" title="Local Etiquette & Cultural Tips">
          <p className="text-xs text-gray-500 mb-3">Malaysia is multicultural and welcoming.</p>
          <ul className="space-y-2">
            {[
              'Dress modestly when visiting mosques or temples',
              'Remove shoes before entering homes or places of worship (mosques & Indian temples)',
              'Use your right hand when giving or receiving items',
              'Keep public displays of affection minimal',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </Section>

        {/* Shopping */}
        <Section icon={ShoppingCart} iconBg="bg-purple-50" iconFg="text-purple-600" title="Shopping in Kuala Lumpur">
          <p className="text-xs text-gray-500 mb-3">KL is a top shopping destination with options for every budget.</p>
          <div className="space-y-2">
            <AreaCard name="Pavilion KL" desc="Luxury & international brands" />
            <AreaCard name="Suria KLCC" desc="Shopping beneath the Petronas Twin Towers" />
            <AreaCard name="Mid Valley Megamall" desc="One of the largest malls in Malaysia (20 min from KL City Centre)" />
            <AreaCard name="Central Market" desc="Souvenirs, handicrafts & local art" />
            <AreaCard
              name="Chinatown, Petaling Street"
              desc="Street food, bargain shopping, heritage shops & temples. Known for replica items — purchasing counterfeit goods may be restricted in your home country."
            />
          </div>
        </Section>

        {/* Discounts */}
        <Section icon={Ticket} iconBg="bg-yellow-50" iconFg="text-brand-yellow" title="Tourist Discounts & Tax Refunds">
          <Row label="Tax Refunds" value="None" />
          <Row label="Tourist Discounts" value="None" />
          <Note>Major malls often have discounts, especially during festive seasons.</Note>
        </Section>

        {/* Getting around */}
        <Section icon={Train} iconBg="bg-blue-50" iconFg="text-brand-blue" title="Getting Around KL">
          <p className="text-xs text-gray-500 mb-3">KL is easy to navigate with multiple transport options.</p>
          <Row label="E-hailing" value="Grab (most popular & reliable)" />
          <Row label="Public transport" value="LRT, MRT, Monorail & KTM trains" />
          <Row label="Taxis" value="Use metered taxis or e-hailing apps" />
          <Row label="Walking" value="Easy around KLCC & Bukit Bintang (covered walkways available)" />
        </Section>

        {/* Safety */}
        <Section icon={Shield} iconBg="bg-gray-100" iconFg="text-gray-600" title="Safety & Transport Guide">
          <p className="text-xs text-gray-500 mb-3">KL is generally safe for visitors.</p>
          <ul className="space-y-2 mb-3">
            {[
              'Keep valuables secure in crowded areas',
              'Use hotel safes for passports and important items',
              'Avoid unlicensed taxis',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
          <Row label="Emergency number" value="999" />
          <Note>E-hailing apps are safe and recommended for late-night travel.</Note>
        </Section>

        {/* Useful tips */}
        <Section icon={Wifi} iconBg="bg-teal-50" iconFg="text-teal-600" title="Useful Local Tips">
          <Row label="SIM / eSIM" value="Available at the airport and malls" />
          <Row label="Plug type" value="Type G (same as UK)" />
          <Row label="Language" value="English is widely spoken" />
          <Row label="Wi-Fi" value="Available in most hotels, cafés and malls" />
        </Section>

      </div>
    </div>
  )
}

function Section({
  icon: Icon,
  iconBg,
  iconFg,
  title,
  children,
}: {
  icon: React.ElementType
  iconBg: string
  iconFg: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
        <div className={`w-8 h-8 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon size={16} className={iconFg} />
        </div>
        <h2 className="font-bold text-gray-900 text-sm">{title}</h2>
      </div>
      <div className="px-4 py-3.5">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-3 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-xs font-medium text-gray-800 text-right">{value}</span>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-500 mt-2 leading-relaxed">{children}</p>
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{children}</p>
  )
}

function AreaCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-gray-50 rounded-xl px-3 py-2.5">
      <p className="text-xs font-semibold text-gray-800">{name}</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
    </div>
  )
}
