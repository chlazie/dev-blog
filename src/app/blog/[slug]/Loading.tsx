// app/blog/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Breadcrumb skeleton */}
          <div className="flex gap-2 mb-8">
            <div className="h-4 w-16 bg-slate-200 rounded"></div>
            <div className="h-4 w-4 bg-slate-200 rounded"></div>
            <div className="h-4 w-20 bg-slate-200 rounded"></div>
          </div>
          
          {/* Title skeleton */}
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-slate-200 rounded mb-8"></div>
          
          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}