import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import Image from 'next/image'
import {
  MapPin, Phone, Clock, Thermometer, Utensils, DollarSign,
  Heart, ShoppingCart, Ticket, Train, Shield, Wifi, ExternalLink,
  Plane, FileText, CreditCard, Bus, Umbrella, CheckCircle,
} from 'lucide-react'

export default async function DestinationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBar title="Travel & Stay" />

      <div className="px-4 py-4 space-y-4 pb-8">

        {/* ── Accommodation ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero image */}
          <div className="relative w-full h-44">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
              alt="W Kuala Lumpur Hotel"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 px-4 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Accommodation</p>
              <p className="text-lg font-black text-white leading-tight">The W Kuala Lumpur</p>
            </div>
          </div>

          <div className="px-4 py-4 space-y-3">
            {/* Address & phone */}
            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-brand-blue mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700">121 Jalan Ampang, Kuala Lumpur, 50450</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-brand-blue flex-shrink-0" />
              <p className="text-xs text-gray-700">+60 3 2786 8888</p>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
              The W Kuala Lumpur is a stylish and bold hotel offering luxury in the heart of the city.
              With 150 vibrant and modern rooms and suites overlooking the Kuala Lumpur skyline, the
              hotel combines sleek design with high-tech amenities, including high-speed internet and
              minibars.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              You will have the option to upgrade as well as book and pay for up to three (3) nights
              either side of the conference, should you wish to extend.
            </p>

            {/* Check-in / out / breakfast */}
            <div className="bg-gray-50 rounded-xl overflow-hidden mt-1">
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-gray-100">
                <Clock size={13} className="text-brand-blue flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Check-in</span>
                  <span className="text-xs font-semibold text-gray-800">3:00 pm</span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-gray-100">
                <Clock size={13} className="text-gray-400 flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Check-out</span>
                  <span className="text-xs font-semibold text-gray-800">12:00 pm</span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <Utensils size={13} className="text-brand-green flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center gap-2">
                  <span className="text-xs text-gray-500">Breakfast</span>
                  <span className="text-xs font-semibold text-gray-800 text-right">Flock Restaurant, from 6:30 am</span>
                </div>
              </div>
            </div>

            {/* Map link */}
            <a
              href="https://maps.google.com/?q=W+Kuala+Lumpur+Hotel,+121+Jalan+Ampang,+Kuala+Lumpur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-brand-blue text-white text-xs font-bold py-3 rounded-xl active:scale-95 transition-transform mt-1"
            >
              <MapPin size={14} />
              View Hotel Location
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* ── Flights ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Plane size={16} className="text-brand-blue" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Flights</h2>
          </div>
          <div className="px-4 py-3.5 space-y-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Airfares are not included in the conference package. You are welcome to arrange your own
              flights, or contact Dee at CIS Event Management for assistance with bookings.
            </p>
            <a
              href="mailto:dee@ciseventmanagement.com.au"
              className="flex items-center gap-2 text-xs font-semibold text-brand-blue"
            >
              <ExternalLink size={12} />
              dee@ciseventmanagement.com.au
            </a>
            <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-xl overflow-hidden mt-1">
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-brand-blue/10">
                <CheckCircle size={13} className="text-brand-blue flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Recommended arrival</span>
                  <span className="text-xs font-semibold text-gray-800">Sun 16 August</span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <CheckCircle size={13} className="text-brand-blue flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Recommended departure</span>
                  <span className="text-xs font-semibold text-gray-800">Fri 21 August</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Malaysia Digital Arrival Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-teal-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Malaysia Digital Arrival Card (MDAC)</h2>
          </div>
          <div className="px-4 py-3.5 space-y-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              All travellers entering Malaysia must complete the MDAC, hold a valid passport, and meet
              visa requirements for their nationality. The card must be submitted via the Malaysian
              Immigration website <span className="font-semibold">at least 3 days before travel</span>.
            </p>
            <a
              href="https://imigresen-online.imi.gov.my/mdac/main"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white text-xs font-bold py-3 rounded-xl active:scale-95 transition-transform"
            >
              <FileText size={14} />
              Register MDAC Online
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* ── Passport & Visa ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <CreditCard size={16} className="text-purple-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Passport & Visa</h2>
          </div>
          <div className="px-4 py-3.5 space-y-3">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Passport</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your passport must be valid for at least <span className="font-semibold">six (6) months</span> upon arrival into Malaysia.
              </p>
            </div>
            <div className="border-t border-gray-50 pt-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Visa -- Australian Citizens</p>
              <p className="text-xs text-gray-500 mb-2">No visa required, provided:</p>
              <ul className="space-y-2">
                {[
                  'Passport valid for at least 6 months on arrival',
                  'Visit is up to 3 months only',
                  'You have a confirmed return or onward international ticket',
                ].map((req) => (
                  <li key={req} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle size={12} className="text-brand-green mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Airport Transfers ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bus size={16} className="text-brand-yellow" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Airport Transfers</h2>
          </div>
          <div className="px-4 py-3.5 space-y-3">
            <div className="bg-brand-green/5 border border-brand-green/15 rounded-xl px-3 py-2.5">
              <p className="text-xs font-semibold text-brand-green mb-0.5">Group transfers included</p>
              <p className="text-xs text-gray-600">Sunday 16 August & Friday 21 August only.</p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Transfers on all other dates are at your own cost. For a private transfer quote outside
              these dates, contact Dee at CIS Event Management.
            </p>
            <a
              href="mailto:dee@ciseventmanagement.com.au"
              className="flex items-center gap-2 text-xs font-semibold text-brand-blue"
            >
              <ExternalLink size={12} />
              dee@ciseventmanagement.com.au
            </a>
            <p className="text-xs text-gray-400 italic">Group transfer details and instructions will be shared closer to the event.</p>
          </div>
        </div>

        {/* ── Travel Insurance ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Umbrella size={16} className="text-brand-red" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Travel Insurance</h2>
          </div>
          <div className="px-4 py-3.5 space-y-2.5">
            <div className="bg-brand-red/5 border border-brand-red/15 rounded-xl px-3 py-2.5">
              <p className="text-xs font-semibold text-brand-red">Highly recommended</p>
              <p className="text-xs text-gray-600 mt-0.5">Should be taken out at time of booking.</p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Travel insurance protects against cancellations, serious injury, theft of expensive
              property, and other unforeseen events. A wide variety of policies are available at many
              price points -- choose what is right for your circumstances.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Please confirm with your provider that <span className="font-semibold">Malaysia is covered</span> under your policy.
            </p>
          </div>
        </div>

        {/* ── KL Destination header ── */}
        <div className="relative rounded-2xl overflow-hidden h-32">
          <Image
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
            alt="Kuala Lumpur skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">Destination Guide</p>
            <p className="text-2xl font-black text-white">Kuala Lumpur</p>
            <p className="text-sm text-white/80">August 2026</p>
          </div>
        </div>

        {/* Weather */}
        <Section icon={Thermometer} iconBg="bg-orange-50" iconFg="text-orange-500" title="Weather in August">
          <Row label="Temperature" value="25degC - 33degC" />
          <Row label="Humidity" value="High" />
          <Row label="Rain" value="Short afternoon or evening showers possible" />
          <Note>Pack lightweight clothing, comfortable walking shoes, a small umbrella or rain jacket, and sunscreen.</Note>
        </Section>

        {/* Where to Eat */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full h-32">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
              alt="Malaysian food"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 px-4 pb-3 flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Utensils size={14} className="text-white" />
              </div>
              <h2 className="font-bold text-white text-sm">Where to Eat</h2>
            </div>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-xs text-gray-500 mb-3">KL is a food lover&apos;s paradise -- from street food to fine dining.</p>
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
                'Nasi Lemak', 'Satay', 'Roti Canai', 'Laksa',
                'Banana Leaf Rice', 'Bak Kut Teh (Non-Halal)',
                'Char Kway Teow (Halal & Non-Halal)',
              ].map((d) => (
                <span key={d} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full h-28">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="Shopping in Kuala Lumpur"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 px-4 pb-3 flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={14} className="text-white" />
              </div>
              <h2 className="font-bold text-white text-sm">Shopping in KL</h2>
            </div>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-xs text-gray-500 mb-3">KL is a top shopping destination with options for every budget.</p>
            <div className="space-y-2">
              <AreaCard name="Pavilion KL" desc="Luxury & international brands" />
              <AreaCard name="Suria KLCC" desc="Shopping beneath the Petronas Twin Towers" />
              <AreaCard name="Mid Valley Megamall" desc="One of the largest malls in Malaysia (20 min from KL City Centre)" />
              <AreaCard name="Central Market" desc="Souvenirs, handicrafts & local art" />
              <AreaCard
                name="Chinatown, Petaling Street"
                desc="Street food, bargain shopping, heritage shops & temples. Known for replica items -- purchasing counterfeit goods may be restricted in your home country."
              />
            </div>
          </div>
        </div>

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
  icon: Icon, iconBg, iconFg, title, children,
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
