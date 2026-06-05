import { Skeleton } from '@/components/ui/Skeleton'
import BrandStrip from '@/components/layout/BrandStrip'

export default function HomeLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white">
        <BrandStrip height={8} />
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="w-40 h-40 rounded-2xl flex-shrink-0" />
          </div>
          <div className="border-t border-gray-100 pt-3.5">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
        {/* Sessions */}
        <Skeleton className="h-4 w-32" />
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
        {/* Quick links */}
        <Skeleton className="h-4 w-28" />
        <div className="grid grid-cols-4 gap-1">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
