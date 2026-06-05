import { Skeleton } from '@/components/ui/Skeleton'
import TopBar from '@/components/layout/TopBar'

export default function DelegatesLoading() {
  return (
    <div>
      <TopBar title="Delegates" />
      <div className="px-4 py-4 space-y-3">
        <Skeleton className="h-11 w-full rounded-xl" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100">
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
