import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { type LayoutProps } from '@/common/types'

export const metadata: Metadata = {
  title: '결과 - BDSM 고사',
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-screen-lg flex-col">
      <div className="sticky top-0 grid place-items-center border-b border-gray-200 p-4 backdrop-blur sm:px-8 md:px-12 lg:border-b-0 lg:px-16">
        <Link href="/" className="flex place-items-center gap-2 whitespace-nowrap">
          By <Image src="/bdsm-logo.svg" alt="bdsm-logo" width={24} height={24} priority />
        </Link>
        <h5 className="text-center text-xs text-gray-400">
          <Link href="/">https://bdsm.vercel.app</Link>
        </h5>
      </div>
      <main className="flex grow flex-col p-4 sm:p-8 md:p-12 lg:p-16">
        <h1 className="text-center text-3xl">BDSM 고사 결과</h1>

        {children}
      </main>
    </div>
  )
}
