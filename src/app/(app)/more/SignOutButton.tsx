'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center justify-center gap-2 py-4 text-sm font-medium text-gray-500 active:text-red-600 transition-colors"
    >
      <LogOut size={16} />
      Sign out
    </button>
  )
}
