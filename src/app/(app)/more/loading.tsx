import { Skeleton } from '@/components/ui/Skeleton'
import TopBar from '@/components/layout/TopBar'

export default function MoreLoading() {
  return (
    <div>
      <TopBar title="More" />
      <div className="px-4 py-4 space-y-5">
        <Skeleton className="h-24 w-full rounded-2xl" />
        {[...Array(2)].map((_, s) => (
          <div key={s} className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="flex-1 h-3.5" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
