type ProductSkeletonProps = {
  count?: number
}

export function ProductSkeleton({ count = 12 }: ProductSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <article
          key={i}
          className="group rounded-2xl overflow-hidden glass ring-1 ring-white/10"
        >
          <div className="aspect-[4/3] shimmer" />
          <div className="p-3 space-y-2">
            <div className="h-4 w-3/4 shimmer rounded" />
            <div className="h-4 w-1/3 shimmer rounded" />
          </div>
        </article>
      ))}
    </>
  )
}
