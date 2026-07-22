export default function ProfessionalCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
      {/* Header strip */}
      <div className="bg-zinc-100 dark:bg-zinc-800 px-5 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-3 w-24 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
          </div>
          <div className="h-5 w-20 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-2xl flex-shrink-0" />

          {/* Info */}
          <div className="flex-1 space-y-2">
            <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
            <div className="h-3.5 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
            <div className="flex items-center gap-3">
              <div className="h-3.5 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
              <div className="h-3.5 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full" />
          <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Location + Price */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="h-3.5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
          <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <div className="flex-1 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-xl" />
          <div className="w-14 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
