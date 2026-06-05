import Image from 'next/image'
import BrandStrip from '@/components/layout/BrandStrip'

export const metadata = {
  title: 'Install the App — Floorworld Conference 2026',
}

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BrandStrip height={10} />

      {/* Header */}
      <div className="flex flex-col items-center pt-8 pb-4 px-6">
        <Image
          src="/conference-logo.png"
          alt="Floorworld Conference 2026"
          width={120}
          height={120}
          className="mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 text-center">Add the App to Your Home Screen</h1>
        <p className="text-gray-500 text-center mt-2 text-sm max-w-xs">
          No app store needed. Follow the steps below for your phone type.
        </p>
      </div>

      <div className="flex-1 px-5 pb-10 max-w-lg mx-auto w-full space-y-8">

        {/* iPhone */}
        <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#0095DA] px-5 py-3 flex items-center gap-3">
            <span className="text-2xl">🍎</span>
            <span className="text-white font-semibold text-lg">iPhone / iPad</span>
          </div>
          <div className="px-5 py-5 space-y-5">

            <Step number={1} title='Open this page in Safari'>
              Make sure you&apos;re using <strong>Safari</strong> — not Chrome or another browser. The install option only appears in Safari.
            </Step>

            <Step number={2} title='Tap the Share button'>
              At the bottom of the screen, tap the Share button — it looks like a box with an arrow pointing up.
            </Step>

            <Step number={3} title='Tap "Add to Home Screen"'>
              Scroll down in the share menu and tap <strong>Add to Home Screen</strong>.
            </Step>

            <Step number={4} title='Tap "Add"'>
              A preview will appear. Tap <strong>Add</strong> in the top right corner.
            </Step>

            <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-800">
              ✅ The Floorworld Conference app will now appear on your home screen — tap it to open.
            </div>
          </div>
        </div>

        {/* Android */}
        <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#5DB13C] px-5 py-3 flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <span className="text-white font-semibold text-lg">Android</span>
          </div>
          <div className="px-5 py-5 space-y-5">

            <Step number={1} title='Open this page in Chrome'>
              Make sure you&apos;re using <strong>Chrome</strong>.
            </Step>

            <Step number={2} title='Tap the three-dot menu'>
              In the top right corner, tap the <strong>⋮</strong> menu.
            </Step>

            <Step number={3} title='Tap "Add to Home Screen" or "Install App"'>
              Tap <strong>Add to Home Screen</strong>. On some Android devices it may say <strong>Install App</strong> — either one works.
            </Step>

            <Step number={4} title='Tap "Add"'>
              Confirm by tapping <strong>Add</strong>.
            </Step>

            <div className="bg-green-50 rounded-xl px-4 py-3 text-sm text-green-800">
              ✅ The Floorworld Conference app will now appear on your home screen — tap it to open.
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="rounded-2xl bg-gray-50 px-5 py-5 text-center space-y-2">
          <p className="text-gray-700 font-medium">Need help?</p>
          <p className="text-gray-500 text-sm">Visit the registration desk and our team will get you set up in seconds.</p>
        </div>

      </div>

      <BrandStrip height={8} />
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0095DA] text-white flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-gray-500 text-sm mt-0.5">{children}</p>
      </div>
    </div>
  )
}
