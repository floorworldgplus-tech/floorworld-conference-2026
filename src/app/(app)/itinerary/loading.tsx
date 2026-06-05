import { Skeleton } from '@/components/ui/Skeleton'
import TopBar from '@/components/layout/TopBar'

export default function ItineraryLoading() {
  return (
    <div>
      <TopBar title="My Itinerary" />
      <div className="px-4 py-4 space-y-4">
        <Skeleton className="h-10 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <Skeleton className="h-10 w-full rounded-none" />
            <div className="px-4 py-4 space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex gap-3">
                  <Skeleton className="h-3 w-24 flex-shrink-0" />
                  <Skeleton className="h-3 flex-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
