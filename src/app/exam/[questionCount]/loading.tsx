export default function Loading() {
  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <div role="status" className="max-w-sm animate-pulse">
        <div className="mb-4 h-8 w-48 rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="mb-2.5 h-4 max-w-[360px] rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="mb-2.5 h-4 rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="mb-2.5 h-4 max-w-[330px] rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <div className="h-4 max-w-[360px] rounded-full bg-gray-100 dark:bg-gray-800"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  )
}
