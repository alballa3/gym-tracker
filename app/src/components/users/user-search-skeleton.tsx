import { Skeleton } from "@/components/ui/skeleton"

export default function UserSearchSkeleton() {
  return (
    <div className="divide-y divide-white/5">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Skeleton className="h-16 w-16 rounded-2xl bg-zinc-800/50" />

              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Skeleton className="h-5 w-40 bg-zinc-800/50" />
                  <Skeleton className="h-4 w-24 bg-zinc-800/50" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-4 w-32 bg-zinc-800/50" />
                  <Skeleton className="h-4 w-28 bg-zinc-800/50" />
                  <Skeleton className="h-4 w-36 bg-zinc-800/50" />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-5 w-24 rounded-full bg-zinc-800/50" />
                  <Skeleton className="h-5 w-20 rounded-full bg-zinc-800/50" />
                  <Skeleton className="h-5 w-28 rounded-full bg-zinc-800/50" />
                </div>
              </div>

              <div className="flex gap-2 mt-4 sm:mt-0 sm:flex-col">
                <Skeleton className="h-9 w-24 bg-zinc-800/50" />
                <Skeleton className="h-9 w-24 bg-zinc-800/50" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
