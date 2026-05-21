'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

interface QRScannerProps {
  onScan: (code: string) => void
  onClose: () => void
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<any>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true

    import('html5-qrcode').then(({ Html5Qrcode }) => {
      if (!mountedRef.current) return

      const scanner = new Html5Qrcode('qr-reader-el')
      scannerRef.current = scanner

      scanner
        .start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (decodedText: string) => {
            onScan(decodedText)
            scanner.stop().catch(() => {})
          },
          undefined
        )
        .catch(() => {
          if (mountedRef.current) {
            setError('Camera access denied. Please allow camera permissions and try again.')
          }
        })
    })

    return () => {
      mountedRef.current = false
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [onScan])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <p className="text-white font-semibold">Scan Supplier QR Code</p>
        <button onClick={onClose} className="text-white p-1">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {error ? (
          <div className="text-center px-8">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 text-white underline text-sm"
            >
              Go back
            </button>
          </div>
        ) : (
          <div className="w-full max-w-xs">
            <div id="qr-reader-el" className="w-full" />
            <p className="text-gray-400 text-xs text-center mt-4">
              Point your camera at the supplier booth QR code
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
