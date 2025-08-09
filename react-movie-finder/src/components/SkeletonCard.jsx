export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden shadow bg-white relative">
  <div className="aspect-[2/3] bg-gray-200 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]"></div>
  </div>
  <div className="p-3 space-y-2">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-3 bg-gray-200 rounded w-1/2" />
  </div>
</div>

  );
}
