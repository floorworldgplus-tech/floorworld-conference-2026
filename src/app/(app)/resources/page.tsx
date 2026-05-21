import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TopBar from '@/components/layout/TopBar'
import { FileText, Link as LinkIcon, Image, Video, ExternalLink } from 'lucide-react'
import type { Resource } from '@/types/database'

const TYPE_ICON: Record<string, typeof FileText> = {
  pdf:   FileText,
  image: Image,
  video: Video,
  link:  LinkIcon,
}

export default async function ResourcesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .order('sort_order')
    .order('created_at', { ascending: false })

  const resourceList = (resources ?? []) as Resource[]
  const grouped: Record<string, Resource[]> = {}
  for (const r of resourceList) {
    const cat = r.category ?? 'General'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(r)
  }

  return (
    <div>
      <TopBar title="Resource Library" />

      <div className="px-4 py-4 space-y-5">
        {Object.keys(grouped).length === 0 && (
          <p className="text-center text-gray-500 py-12 text-sm">Resources will appear here.</p>
        )}

        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2.5">
              {category}
            </h2>
            <div className="space-y-2">
              {items.map((r) => {
                const Icon = TYPE_ICON[r.file_type ?? ''] ?? FileText
                const href = r.external_url ?? r.file_url ?? '#'
                return (
                  <a
                    key={r.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex items-center gap-3 active:scale-[0.98] transition-transform"
                  >
                    <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-brand-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                      {r.description && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{r.description}</p>
                      )}
                    </div>
                    <ExternalLink size={16} className="text-gray-400 flex-shrink-0" />
                  </a>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
