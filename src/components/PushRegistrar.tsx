'use client'

import { usePushNotifications } from '@/hooks/usePushNotifications'
import { Bell, Loader2, X } from 'lucide-react'
import { useState } from 'react'

export default function PushRegistrar() {
  const { needsPrompt, subscribing, subscribed, requestPermission } = usePushNotifications()
  const [dismissed, setDismissed] = useState(false)

  if (!needsPrompt || dismissed || subscribed) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 bg-[#0095DA] rounded-2xl shadow-xl px-4 py-3.5 flex items-center gap-3">
      <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <Bell size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm leading-tight">Enable notifications</p>
        <p className="text-blue-100 text-xs mt-0.5 leading-tight">Get event alerts and reminders</p>
      </div>
      <button
        onClick={requestPermission}
        disabled={subscribing}
        className="bg-white text-[#0095DA] font-bold text-xs px-3 py-2 rounded-xl flex-shrink-0 flex items-center gap-1 active:scale-95 transition-transform"
      >
        {subscribing ? <Loader2 size={12} className="animate-spin" /> : 'Allow'}
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="text-blue-200 flex-shrink-0 p-1"
      >
        <X size={16} />
      </button>
    </div>
  )
}
