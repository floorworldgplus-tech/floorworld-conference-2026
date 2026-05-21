'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import BrandStrip from '@/components/layout/BrandStrip'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Incorrect email or password. Contact the event team if you need help.')
      setLoading(false)
      return
    }

    router.push('/home')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Diagonal brand strip (top) ── */}
      <BrandStrip height={10} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">

        {/* ── Conference logo ── */}
        <div className="mb-7 text-center">
          <Image
            src="/conference-logo.png"
            alt="Floorworld Conference 2026 — Growing Stronger Together"
            width={240}
            height={240}
            className="mx-auto drop-shadow-sm"
            priority
          />
        </div>

        {/* ── Sign-in card ── */}
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-md p-7">

          <p className="text-[13px] font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Delegate sign in
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue bg-gray-50 transition-colors placeholder:text-gray-300"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue bg-gray-50 pr-12 transition-colors placeholder:text-gray-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 p-1 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100 leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-all mt-2 shadow-sm"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center max-w-xs leading-relaxed">
          Your login details were sent by the event team.{' '}
          Need help?{' '}
          <a href="mailto:events@floorworld.com.au" className="text-brand-blue">
            events@floorworld.com.au
          </a>
        </p>
      </div>

      {/* ── Diagonal brand strip (bottom, reversed) ── */}
      <div className="w-full overflow-hidden flex-shrink-0" style={{ height: 10 }}>
        <svg viewBox="0 0 400 10" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
          <polygon points="0,0 120,0 138,10 0,10"   fill="#F5A623" />
          <polygon points="110,0 220,0 238,10 92,10"  fill="#5DB13C" />
          <polygon points="210,0 320,0 338,10 192,10" fill="#E84730" />
          <polygon points="310,0 400,0 400,10 292,10" fill="#0095DA" />
        </svg>
      </div>

    </div>
  )
}
