import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
      <Link href="/" className="flex place-items-center gap-2 whitespace-nowrap">
        By <Image src="/bdsm-logo.svg" alt="BDSM Logo" width={24} height={24} />
      </Link>
      <div className="relative flex place-items-center text-3xl whitespace-nowrap z-[-1] sm:before:absolute sm:before:h-[300px] sm:before:w-[480px] sm:before:-translate-x-1/2 sm:before:rounded-full sm:before:bg-gradient-radial sm:before:from-white sm:before:to-transparent sm:before:blur-2xl sm:before:content-[''] sm:after:absolute sm:after:-z-20 sm:after:h-[180px] sm:after:w-[240px] sm:after:translate-x-1/3 sm:after:bg-gradient-conic sm:after:from-sky-200 sm:after:via-blue-200 sm:after:blur-2xl sm:after:content-[''] sm:before:dark:bg-gradient-to-br sm:before:dark:from-transparent sm:before:dark:to-blue-700 sm:before:dark:opacity-10 sm:after:dark:from-sky-900 sm:after:dark:via-[#0141ff] sm:after:dark:opacity-40 sm:before:lg:h-[360px]">
        BDSM 고사
      </div>
      <Link
        href="/exam"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          테스트 보기{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -{'>'}
          </span>
        </h2>
        <p className="m-0 max-w-[25ch] text-sm opacity-50">자신의 BDSM 지식이 어느 정도인지 확인해보세요</p>
      </Link>
    </main>
  )
}
