'use client'

import { useState, useRef } from 'react'
import TopBar from '@/components/layout/TopBar'
import { Upload, CheckCircle, AlertCircle, FileSpreadsheet, Loader2 } from 'lucide-react'

export default function UploadItinerariesPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ imported: number; skipped: number; errors: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/itinerary-upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.ok) {
        setResult(data)
        setFile(null)
        if (inputRef.current) inputRef.current.value = ''
      } else {
        setError(data.error || 'Upload failed.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <TopBar title="Upload Itineraries" />
      <div className="px-4 py-4 space-y-4">

        <div className="bg-blue-50 rounded-2xl px-4 py-3.5 space-y-1">
          <p className="text-sm font-semibold text-brand-blue">How it works</p>
          <p className="text-xs text-blue-700 leading-relaxed">
            Upload the <strong>Conference 2026 Personal Itineraries.xlsx</strong> file. Each sheet is matched to a delegate by their email address and saved to their account. You can re-upload at any time to update details.
          </p>
        </div>

        {/* File picker */}
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl px-6 py-8 flex flex-col items-center gap-3 cursor-pointer active:bg-gray-50 transition-colors"
        >
          <FileSpreadsheet size={36} className="text-gray-300" />
          {file ? (
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">Tap to select file</p>
              <p className="text-xs text-gray-400 mt-0.5">.xlsx files only</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 px-4 py-3 rounded-2xl">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-50 rounded-2xl px-4 py-4 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-brand-green" />
              <p className="text-sm font-semibold text-green-800">Upload complete</p>
            </div>
            <p className="text-sm text-green-700">
              <strong>{result.imported}</strong> itineraries imported
              {result.skipped > 0 && `, ${result.skipped} skipped`}
            </p>
            {result.errors.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-red-600 mb-1">Errors:</p>
                {result.errors.map((e, i) => (
                  <p key={i} className="text-xs text-red-600">{e}</p>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-brand-blue text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform"
        >
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {uploading ? 'Uploading…' : 'Upload Itineraries'}
        </button>

      </div>
    </div>
  )
}
