import { Skeleton } from '@/components/ui/Skeleton'
import TopBar from '@/components/layout/TopBar'

export default function NotificationsLoading() {
  return (
    <div>
      <TopBar title="Notifications" />
      <div className="px-4 py-4 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100">
            <Skeleton className="w-9 h-9 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
