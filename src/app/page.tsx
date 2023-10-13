import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
      <Link href="/" className="flex place-items-center gap-2 whitespace-nowrap">
        By <Image src="/bdsm-logo.svg" alt="BDSM Logo" width={24} height={24} />
      </Link>
      <div className="relative flex place-items-center text-3xl whitespace-nowrap before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
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
