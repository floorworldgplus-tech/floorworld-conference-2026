import { Skeleton } from '@/components/ui/Skeleton'
import TopBar from '@/components/layout/TopBar'

export default function AgendaLoading() {
  return (
    <div>
      <TopBar title="Agenda" />
      <div className="px-4 py-4 space-y-4">
        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 flex-shrink-0 rounded-xl" />
          ))}
        </div>
        {/* Session cards */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-12 h-16 rounded-xl flex-shrink-0" />
            <Skeleton className="flex-1 h-16 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
