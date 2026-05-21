'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
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
      {/* Top colour bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Brand wordmark */}
        <div className="mb-10 text-center">
          <div className="text-4xl font-black leading-tight tracking-tight mb-3">
            <div className="text-brand-blue">GROWING</div>
            <div className="text-brand-red">STRONGER</div>
            <div className="text-brand-green">TOGETHER</div>
          </div>
          <div className="mt-3 space-y-0.5">
            <p className="text-base font-bold text-gray-800">floorworld</p>
            <p className="text-sm text-gray-500">Conference 2026 · Kuala Lumpur</p>
            <p className="text-xs text-gray-400 font-medium">August 16–21</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-2xl border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue text-white font-semibold py-4 rounded-2xl text-base flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] transition-transform mt-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Sign in
          </button>
        </form>

        <p className="mt-10 text-xs text-gray-400 text-center max-w-xs">
          Your login was sent by the event team. Contact{' '}
          <span className="text-brand-blue">events@floorworld.com.au</span>{' '}
          if you need assistance.
        </p>
      </div>

      {/* Bottom colour bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand-yellow via-brand-red to-brand-blue" />
    </div>
  )
}
