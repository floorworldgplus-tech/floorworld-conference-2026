'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top brand bar */}
      <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">

        {/* Conference logo */}
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/conference-logo.png"
            alt="Floorworld Conference 2026"
            width={230}
            height={230}
            className="mx-auto"
            priority
          />
        </div>

        {/* Login card */}
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Sign in to your account</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-gray-50 transition-colors placeholder:text-gray-300"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1.5">
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
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue bg-gray-50 pr-12 transition-colors placeholder:text-gray-300"
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
              className="w-full bg-brand-blue text-white font-semibold py-4 rounded-xl text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-all mt-1 shadow-sm"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center max-w-xs leading-relaxed">
          Your login details were sent by the event team.
          <br />
          Need help?{' '}
          <a href="mailto:events@floorworld.com.au" className="text-brand-blue underline-offset-2 hover:underline">
            events@floorworld.com.au
          </a>
        </p>
      </div>

      {/* Bottom brand bar */}
      <div className="h-1 bg-gradient-to-r from-brand-yellow via-brand-red to-brand-blue" />
    </div>
  )
}
