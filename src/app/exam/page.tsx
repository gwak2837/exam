import CustomButton from '@/app/exam/CustomButton'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  return (
    <main className="flex gap-12 min-h-[100dvh] flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24">
      <Link href="/" className="flex place-items-center gap-2 whitespace-nowrap">
        By <Image src="/bdsm-logo.svg" alt="BDSM Logo" width={24} height={24} />
      </Link>
      <nav className="grid text-center sm:mb-0 sm:grid-cols-2 sm:text-left lg:mb-0 lg:grid-cols-4">
        <Link
          href="/exam/10?i=1"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Child &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Image src="/images/arrow-right.svg" alt="right-arrow" width={20} height={20} />
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            BDSM에 대한 초보자 또는 호기심 많은 사용자를 대상으로 한 기본적인 테스트
          </p>
        </Link>
        <Link
          href="/exam/20?i=1"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Teen &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Image src="/images/arrow-right.svg" alt="right-arrow" width={20} height={20} />
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            더 깊이 있는 지식을 시험해 보고 싶은 사용자를 위한 테스트
          </p>
        </Link>
        <Link
          href="/exam/30?i=1"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Adult &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Image src="/images/arrow-right.svg" alt="right-arrow" width={20} height={20} />
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            BDSM에 대한 깊은 경험을 가진 사람들을 위한 도전적인 테스트
          </p>
        </Link>
        <CustomButton />
      </nav>
    </main>
  )
}
