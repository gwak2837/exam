import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import CustomButton from '@/app/exam/CustomButton'
import 난이도Tooltip from '@/app/exam/난이도Tooltip'

export const metadata: Metadata = {
  title: '난이도 선택 - BDSM 고사',
}

export default async function Page() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-12 p-4 sm:p-8 md:p-16 lg:p-24">
      <Link className="flex place-items-center gap-2 whitespace-nowrap" href="/">
        <h1>By</h1> <Image alt="BDSM Logo" height={24} priority src="/bdsm-logo.svg" width={24} />
      </Link>
      <h2 className="flex items-stretch gap-1 text-xl font-semibold">
        난이도 <난이도Tooltip /> 를 선택해주세요
      </h2>
      <nav className="grid text-center sm:mb-0 sm:grid-cols-2 sm:text-left lg:mb-0 lg:grid-cols-4">
        <Link
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          href="/exam/10?i=1"
        >
          <h3 className="mb-3 text-2xl font-semibold">
            Junior &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Image alt="right-arrow" height={20} src="/images/arrow-right.svg" width={20} />
            </span>
          </h3>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            BDSM에 대한 초보자 또는 호기심 많은 사용자를 대상으로 한 기본적인 테스트{' '}
            <span className="text-xs">(10개)</span>
          </p>
        </Link>
        <Link
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          href="/exam/20?i=1"
        >
          <h3 className="mb-3 text-2xl font-semibold">
            Senior &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Image alt="right-arrow" height={20} src="/images/arrow-right.svg" width={20} />
            </span>
          </h3>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            더 깊이 있는 지식을 시험해 보고 싶은 사용자를 위한 테스트 <span className="text-xs">(20개)</span>
          </p>
        </Link>
        <Link
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          href="/exam/30?i=1"
        >
          <h3 className="mb-3 text-2xl font-semibold">
            Staff &nbsp;
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Image alt="right-arrow" height={20} src="/images/arrow-right.svg" width={20} />
            </span>
          </h3>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            BDSM에 대한 깊은 경험을 가진 사람들을 위한 도전적인 테스트 <span className="text-xs">(30개)</span>
          </p>
        </Link>
        <CustomButton />
      </nav>
    </main>
  )
}
