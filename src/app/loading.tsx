export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#0A0A0F' }}>
      {/* Header skeleton */}
      <header className="border-b border-white/[0.06]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo area */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/[0.06] animate-pulse rounded-lg" />
            <div className="h-5 w-36 bg-white/[0.06] animate-pulse rounded" />
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block h-3 w-28 bg-white/[0.06] animate-pulse rounded" />
            <div className="w-11 h-11 bg-white/[0.06] animate-pulse rounded-lg" />
            <div className="w-28 h-11 bg-white/[0.06] animate-pulse rounded" />
          </div>
        </nav>
      </header>

      {/* Winner banner skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* "Product of the Day" label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px flex-1 max-w-[120px] sm:max-w-[160px] bg-white/[0.04]" />
          <div className="h-3 w-36 bg-white/[0.06] animate-pulse rounded" />
          <div className="h-px flex-1 max-w-[120px] sm:max-w-[160px] bg-white/[0.04]" />
        </div>

        {/* Winner card */}
        <div
          className="rounded-2xl p-4 sm:p-8 max-w-3xl mx-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            {/* Logo + Score */}
            <div className="flex sm:flex-col items-center gap-4 sm:gap-2 shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/[0.06] animate-pulse rounded-xl" />
              <div className="text-center">
                <div className="w-14 h-8 bg-white/[0.06] animate-pulse rounded mx-auto" />
                <div className="w-12 h-2 bg-white/[0.04] animate-pulse rounded mx-auto mt-1.5" />
              </div>
            </div>
            {/* Details */}
            <div className="flex-1 w-full space-y-3">
              <div className="h-7 sm:h-9 w-3/4 bg-white/[0.06] animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-white/[0.06] animate-pulse rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/[0.04] animate-pulse rounded" />
                <div className="h-3 w-5/6 bg-white/[0.04] animate-pulse rounded" />
                <div className="h-3 w-2/3 bg-white/[0.04] animate-pulse rounded" />
              </div>
              {/* AI Verdict box */}
              <div
                className="rounded-lg p-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div className="h-2.5 w-16 bg-white/[0.06] animate-pulse rounded mb-2" />
                <div className="h-3 w-full bg-white/[0.04] animate-pulse rounded" />
                <div className="h-3 w-4/5 bg-white/[0.04] animate-pulse rounded mt-1.5" />
              </div>
              {/* Score breakdown pills */}
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="h-2 w-14 bg-white/[0.04] animate-pulse rounded" />
                    <div className="h-3 w-6 bg-white/[0.06] animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="h-5 w-40 bg-white/[0.06] animate-pulse rounded mb-1.5" />
            <div className="h-3 w-48 bg-white/[0.04] animate-pulse rounded" />
          </div>
          <div className="h-8 w-32 bg-white/[0.06] animate-pulse rounded-lg" />
        </div>

        {/* Time filter bar skeleton */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-8 rounded-md bg-white/[0.06] animate-pulse"
              style={{ width: i === 1 ? '64px' : i === 4 ? '80px' : '56px' }}
            />
          ))}
        </div>

        {/* Category pills skeleton */}
        <div className="flex gap-2 mb-6 overflow-hidden">
          {[48, 56, 72, 64, 52, 60].map((w, i) => (
            <div
              key={i}
              className="h-7 rounded-full bg-white/[0.06] animate-pulse shrink-0"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        {/* Product cards skeleton */}
        <div className="space-y-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl p-4 sm:p-5"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                opacity: 1 - i * 0.12,
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Rank */}
                <div className="shrink-0 pt-1">
                  <div className="w-8 h-7 bg-white/[0.06] animate-pulse rounded" />
                </div>
                {/* Emoji */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/[0.06] animate-pulse rounded-lg shrink-0" />
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-2/5 bg-white/[0.06] animate-pulse rounded" />
                      <div className="h-3 w-3/5 bg-white/[0.04] animate-pulse rounded mt-2" />
                    </div>
                    {/* Score badge */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      <div className="w-10 h-10 bg-white/[0.06] animate-pulse rounded-lg" />
                      <div
                        className="rounded-lg px-3 py-1.5"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.04)',
                        }}
                      >
                        <div className="w-8 h-5 bg-white/[0.06] animate-pulse rounded mx-auto" />
                        <div className="w-5 h-1.5 bg-white/[0.04] animate-pulse rounded mx-auto mt-1" />
                      </div>
                    </div>
                  </div>
                  {/* Tags */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="h-5 w-16 bg-white/[0.06] animate-pulse rounded-full" />
                    <div className="h-2.5 w-20 bg-white/[0.04] animate-pulse rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
