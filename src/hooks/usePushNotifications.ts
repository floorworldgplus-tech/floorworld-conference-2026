'use client'

import { useEffect, useState } from 'react'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function usePushNotifications() {
  const [needsPrompt, setNeedsPrompt] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
    if (Notification.permission === 'granted') {
      // Already granted — silently register in background
      registerSilently()
      setSubscribed(true)
    } else if (Notification.permission === 'default') {
      // Not yet asked — show the prompt banner
      setNeedsPrompt(true)
    }
    // If 'denied', do nothing
  }, [])

  const registerSilently = async () => {
    try {
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidKey) return
      const reg = await navigator.serviceWorker.register('/sw.js')
      const existing = await reg.pushManager.getSubscription()
      const subscription = existing || await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      })
      await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription }),
      })
    } catch (err) {
      console.error('Push registration error:', err)
    }
  }

  // Must be called directly from a user tap (button onClick)
  const requestPermission = async () => {
    setSubscribing(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        await registerSilently()
        setSubscribed(true)
        setNeedsPrompt(false)
      } else {
        setNeedsPrompt(false) // dismissed — hide banner
      }
    } catch (err) {
      console.error('Permission request error:', err)
    } finally {
      setSubscribing(false)
    }
  }

  return { needsPrompt, subscribing, subscribed, requestPermission }
}
