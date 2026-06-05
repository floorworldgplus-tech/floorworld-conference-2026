import { Skeleton } from '@/components/ui/Skeleton'
import TopBar from '@/components/layout/TopBar'

export default function SuppliersLoading() {
  return (
    <div>
      <TopBar title="Suppliers" />
      <div className="px-4 py-4 space-y-3">
        <Skeleton className="h-11 w-full rounded-xl" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl px-4 py-4 border border-gray-100 space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-36" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="w-14 h-5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
