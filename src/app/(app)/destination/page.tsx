import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import Image from 'next/image'
import {
  MapPin, Phone, Clock, Thermometer, Utensils, DollarSign,
  Heart, ShoppingCart, Train, Shield, Wifi, ExternalLink,
  Plane, FileText, CreditCard, Bus, Umbrella, CheckCircle, Ticket,
} from 'lucide-react'

export default async function DestinationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBar title="Travel &amp; Stay" />
      <div className="px-4 py-4 space-y-4 pb-8">

        {/* Hotel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full h-44">
            <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" alt="W Kuala Lumpur" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 px-4 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Accommodation</p>
              <p className="text-lg font-black text-white leading-tight">The W Kuala Lumpur</p>
            </div>
          </div>
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-brand-blue mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700">121 Jalan Ampang, Kuala Lumpur, 50450</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-brand-blue flex-shrink-0" />
              <p className="text-xs text-gray-700">+60 3 2786 8888</p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
              The W Kuala Lumpur is a stylish and bold hotel offering luxury in the heart of the city.
              With 150 vibrant and modern rooms and suites overlooking the KL skyline, the hotel combines
              sleek design with high-tech amenities including high-speed internet and minibars.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              You will have the option to upgrade as well as book and pay for up to three (3) nights
              either side of the conference, should you wish to extend.
            </p>
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-gray-100">
                <Clock size={13} className="text-brand-blue flex-shrink-0" />
                <span className="text-xs text-gray-500 flex-1">Check-in</span>
                <span className="text-xs font-semibold text-gray-800">3:00 pm</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-gray-100">
                <Clock size={13} className="text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-500 flex-1">Check-out</span>
                <span className="text-xs font-semibold text-gray-800">12:00 pm</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <Utensils size={13} className="text-brand-green flex-shrink-0" />
                <span className="text-xs text-gray-500 flex-1">Breakfast</span>
                <span className="text-xs font-semibold text-gray-800">Flock Restaurant, from 6:30 am</span>
              </div>
            </div>
            <a href="https://maps.google.com/?q=W+Kuala+Lumpur+Hotel,+121+Jalan+Ampang,+Kuala+Lumpur" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-brand-blue text-white text-xs font-bold py-3 rounded-xl active:scale-95 transition-transform">
              <MapPin size={14} />
              View Hotel Location
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Flights */}
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
            <a href="mailto:dee@ciseventmanagement.com.au" className="flex items-center gap-2 text-xs font-semibold text-brand-blue">
              <ExternalLink size={12} />
              dee@ciseventmanagement.com.au
            </a>
            <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-3 py-2.5 border-b border-brand-blue/10">
                <CheckCircle size={13} className="text-brand-blue flex-shrink-0" />
                <span className="text-xs text-gray-500 flex-1">Recommended arrival</span>
                <span className="text-xs font-semibold text-gray-800">Sun 16 August</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <CheckCircle size={13} className="text-brand-blue flex-shrink-0" />
                <span className="text-xs text-gray-500 flex-1">Recommended departure</span>
                <span className="text-xs font-semibold text-gray-800">Fri 21 August</span>
              </div>
            </div>
          </div>
        </div>

        {/* MDAC */}
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
              visa requirements for their nationality. Must be submitted at least 3 days before travel.
            </p>
            <a href="https://imigresen-online.imi.gov.my/mdac/main" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white text-xs font-bold py-3 rounded-xl active:scale-95 transition-transform">
              <FileText size={14} />
              Register MDAC Online
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Passport & Visa */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <CreditCard size={16} className="text-purple-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Passport &amp; Visa</h2>
          </div>
          <div className="px-4 py-3.5 space-y-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Your passport must be valid for at least <span className="font-semibold">six (6) months</span> upon arrival into Malaysia.
            </p>
            <div className="border-t border-gray-50 pt-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Visa - Australian Citizens</p>
              <p className="text-xs text-gray-500 mb-2">No visa required, provided:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs text-gray-700"><CheckCircle size={12} className="text-brand-green mt-0.5 flex-shrink-0" />Passport valid for at least 6 months on arrival</li>
                <li className="flex items-start gap-2 text-xs text-gray-700"><CheckCircle size={12} className="text-brand-green mt-0.5 flex-shrink-0" />Visit is up to 3 months only</li>
                <li className="flex items-start gap-2 text-xs text-gray-700"><CheckCircle size={12} className="text-brand-green mt-0.5 flex-shrink-0" />You have a confirmed return or onward international ticket</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Airport Transfers */}
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
              <p className="text-xs text-gray-600">Sunday 16 August &amp; Friday 21 August only.</p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Transfers on all other dates are at your own cost. For a private transfer quote, contact Dee at CIS Event Management.</p>
            <a href="mailto:dee@ciseventmanagement.com.au" className="flex items-center gap-2 text-xs font-semibold text-brand-blue">
              <ExternalLink size={12} />
              dee@ciseventmanagement.com.au
            </a>
            <p className="text-xs text-gray-400 italic">Group transfer details and instructions will be shared closer to the event.</p>
          </div>
        </div>

        {/* Travel Insurance */}
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
              Travel insurance protects against cancellations, serious injury, theft and other unforeseen
              events. Please confirm with your provider that Malaysia is covered under your policy.
            </p>
          </div>
        </div>

        {/* KL header */}
        <div className="relative rounded-2xl overflow-hidden h-32">
          <Image src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80" alt="Kuala Lumpur skyline" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">Destination Guide</p>
            <p className="text-2xl font-black text-white">Kuala Lumpur</p>
            <p className="text-sm text-white/80">August 2026</p>
          </div>
        </div>

        {/* Weather */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Thermometer size={16} className="text-orange-500" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Weather in August</h2>
          </div>
          <div className="px-4 py-3.5 space-y-1.5">
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Temperature</span><span className="text-xs font-medium text-gray-800">25-33 degrees C</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Humidity</span><span className="text-xs font-medium text-gray-800">High</span></div>
            <div className="flex justify-between py-1.5"><span className="text-xs text-gray-500">Rain</span><span className="text-xs font-medium text-gray-800 text-right max-w-[60%]">Short afternoon showers possible</span></div>
            <p className="text-xs text-gray-500 mt-2">Pack lightweight clothing, comfortable walking shoes, a small umbrella or rain jacket, and sunscreen.</p>
          </div>
        </div>

        {/* Where to Eat */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full h-32">
            <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Malaysian food" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 px-4 pb-3 flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Utensils size={14} className="text-white" />
              </div>
              <h2 className="font-bold text-white text-sm">Where to Eat</h2>
            </div>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-xs text-gray-500 mb-3">KL is a food lover&#39;s paradise - from street food to fine dining.</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Popular Dining Areas</p>
            <div className="space-y-2 mb-4">
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Bukit Bintang / KLCC</p><p className="text-xs text-gray-500 mt-0.5">Trendy restaurants, cafes &amp; bars, international cuisine, skyline views</p></div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Chinatown (Petaling St) &amp; Alor Street</p><p className="text-xs text-gray-500 mt-0.5">Chinese cuisines, authentic local flavours &amp; street foods</p></div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Brickfields / Little India</p><p className="text-xs text-gray-500 mt-0.5">Indian cuisines</p></div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Kampung Baru</p><p className="text-xs text-gray-500 mt-0.5">Malay cuisines</p></div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Must-Try Local Dishes</p>
            <div className="flex flex-wrap gap-2">
              {['Nasi Lemak','Satay','Roti Canai','Laksa','Banana Leaf Rice','Bak Kut Teh (Non-Halal)','Char Kway Teow (Halal &amp; Non-Halal)'].map((d) => (
                <span key={d} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Money */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <DollarSign size={16} className="text-brand-green" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Money &amp; Currency</h2>
          </div>
          <div className="px-4 py-3.5 space-y-1.5">
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Currency</span><span className="text-xs font-medium text-gray-800">Malaysian Ringgit (MYR)</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Exchange rate</span><span className="text-xs font-medium text-gray-800">~USD 1.00 = RM 4.00</span></div>
            <p className="text-xs text-gray-500 mt-2">Credit cards widely accepted. Cash useful for taxis, street food and small shops.</p>
            <p className="text-xs text-gray-500">Licensed money changers in malls usually offer better rates than airports or hotels.</p>
          </div>
        </div>

        {/* Cultural Tips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart size={16} className="text-pink-500" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Local Etiquette &amp; Cultural Tips</h2>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-xs text-gray-500 mb-3">Malaysia is multicultural and welcoming.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-gray-700"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />Dress modestly when visiting mosques or temples</li>
              <li className="flex items-start gap-2 text-xs text-gray-700"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />Remove shoes before entering homes or places of worship</li>
              <li className="flex items-start gap-2 text-xs text-gray-700"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />Use your right hand when giving or receiving items</li>
              <li className="flex items-start gap-2 text-xs text-gray-700"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />Keep public displays of affection minimal</li>
            </ul>
          </div>
        </div>

        {/* Shopping */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full h-28">
            <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Shopping in KL" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 px-4 pb-3 flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={14} className="text-white" />
              </div>
              <h2 className="font-bold text-white text-sm">Shopping in KL</h2>
            </div>
          </div>
          <div className="px-4 py-3.5">
            <div className="space-y-2">
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Pavilion KL</p><p className="text-xs text-gray-500 mt-0.5">Luxury &amp; international brands</p></div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Suria KLCC</p><p className="text-xs text-gray-500 mt-0.5">Shopping beneath the Petronas Twin Towers</p></div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Mid Valley Megamall</p><p className="text-xs text-gray-500 mt-0.5">One of the largest malls in Malaysia (20 min from KL City Centre)</p></div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Central Market</p><p className="text-xs text-gray-500 mt-0.5">Souvenirs, handicrafts &amp; local art</p></div>
              <div className="bg-gray-50 rounded-xl px-3 py-2.5"><p className="text-xs font-semibold text-gray-800">Chinatown, Petaling Street</p><p className="text-xs text-gray-500 mt-0.5">Street food, bargain shopping &amp; heritage shops. Known for replica items - check import rules for your home country.</p></div>
            </div>
          </div>
        </div>

        {/* Discounts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Ticket size={16} className="text-brand-yellow" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Tourist Discounts &amp; Tax Refunds</h2>
          </div>
          <div className="px-4 py-3.5 space-y-1.5">
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Tax Refunds</span><span className="text-xs font-medium text-gray-800">None</span></div>
            <div className="flex justify-between py-1.5"><span className="text-xs text-gray-500">Tourist Discounts</span><span className="text-xs font-medium text-gray-800">None</span></div>
            <p className="text-xs text-gray-500 mt-2">Major malls often have discounts, especially during festive seasons.</p>
          </div>
        </div>

        {/* Getting Around */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Train size={16} className="text-brand-blue" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Getting Around KL</h2>
          </div>
          <div className="px-4 py-3.5 space-y-1.5">
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">E-hailing</span><span className="text-xs font-medium text-gray-800 text-right max-w-[60%]">Grab (most popular &amp; reliable)</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Public transport</span><span className="text-xs font-medium text-gray-800 text-right max-w-[60%]">LRT, MRT, Monorail &amp; KTM trains</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Taxis</span><span className="text-xs font-medium text-gray-800 text-right max-w-[60%]">Use metered taxis or e-hailing apps</span></div>
            <div className="flex justify-between py-1.5"><span className="text-xs text-gray-500">Walking</span><span className="text-xs font-medium text-gray-800 text-right max-w-[60%]">Easy around KLCC &amp; Bukit Bintang</span></div>
          </div>
        </div>

        {/* Safety */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-gray-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Safety &amp; Transport Guide</h2>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-xs text-gray-500 mb-3">KL is generally safe for visitors.</p>
            <ul className="space-y-2 mb-3">
              <li className="flex items-start gap-2 text-xs text-gray-700"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />Keep valuables secure in crowded areas</li>
              <li className="flex items-start gap-2 text-xs text-gray-700"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />Use hotel safes for passports and important items</li>
              <li className="flex items-start gap-2 text-xs text-gray-700"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />Avoid unlicensed taxis</li>
            </ul>
            <div className="flex justify-between py-1.5 border-t border-gray-50"><span className="text-xs text-gray-500">Emergency number</span><span className="text-xs font-medium text-gray-800">999</span></div>
            <p className="text-xs text-gray-500 mt-2">E-hailing apps are safe and recommended for late-night travel.</p>
          </div>
        </div>

        {/* Useful Tips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
            <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Wifi size={16} className="text-teal-600" />
            </div>
            <h2 className="font-bold text-gray-900 text-sm">Useful Local Tips</h2>
          </div>
          <div className="px-4 py-3.5 space-y-1.5">
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">SIM / eSIM</span><span className="text-xs font-medium text-gray-800 text-right max-w-[60%]">Available at airport and malls</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Plug type</span><span className="text-xs font-medium text-gray-800">Type G (same as UK)</span></div>
            <div className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-xs text-gray-500">Language</span><span className="text-xs font-medium text-gray-800">English widely spoken</span></div>
            <div className="flex justify-between py-1.5"><span className="text-xs text-gray-500">Wi-Fi</span><span className="text-xs font-medium text-gray-800 text-right max-w-[60%]">Available in hotels, cafes and malls</span></div>
          </div>
        </div>

      </div>
    </div>
  )
}
