export default function Loading() {
  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-8 bg-gray-100 rounded-full dark:bg-gray-800 w-48 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded-full dark:bg-gray-800 max-w-[360px] mb-2.5"></div>
        <div className="h-4 bg-gray-100 rounded-full dark:bg-gray-800 mb-2.5"></div>
        <div className="h-4 bg-gray-100 rounded-full dark:bg-gray-800 max-w-[330px] mb-2.5"></div>
        <div className="h-4 bg-gray-100 rounded-full dark:bg-gray-800 max-w-[300px] mb-2.5"></div>
        <div className="h-4 bg-gray-100 rounded-full dark:bg-gray-800 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  )
}
