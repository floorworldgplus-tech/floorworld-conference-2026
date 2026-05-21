import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const KL_TZ = 'Asia/Kuala_Lumpur'

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: KL_TZ,
  })
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: KL_TZ,
  })
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: KL_TZ,
  })
}

export function formatDateKey(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: KL_TZ }) // YYYY-MM-DD
}

export function roleLabel(role: string): string {
  const map: Record<string, string> = {
    delegate: 'Member Delegate',
    supplier: 'Supplier / Sponsor',
    nso_staff: 'NSO Staff',
    admin: 'Admin',
  }
  return map[role] ?? role
}
