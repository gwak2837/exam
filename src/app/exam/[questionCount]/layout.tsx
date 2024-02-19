import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { ProgressBarFallback } from '@/app/exam/[questionCount]/ProgressBar'
import { 다음ButtonFallback } from '@/app/exam/[questionCount]/다음Button'
import 새로하기Button from '@/app/exam/[questionCount]/새로하기Button'
import 이전Button, { 이전ButtonFallback } from '@/app/exam/[questionCount]/이전Button'
import { type LayoutProps } from '@/common/types'

const 다음Button = dynamic(async () => await import('@/app/exam/[questionCount]/다음Button'), {
  ssr: false,
  loading: 다음ButtonFallback,
})
const ProgressBar = dynamic(async () => await import('@/app/exam/[questionCount]/ProgressBar'), {
  ssr: false,
  loading: ProgressBarFallback,
})

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-[100svh] max-w-screen-lg flex-col">
      <div className="sticky top-0 border-b border-gray-100 p-4 backdrop-blur sm:px-8 md:px-12 lg:border-b-0 lg:px-16">
        <div className="flex items-end justify-between gap-4">
          <Suspense fallback={<이전ButtonFallback />}>
            <이전Button add={-1} />
          </Suspense>
          <div className="grid">
            <Link className="flex place-items-center gap-2 whitespace-nowrap p-4" href="/">
              By <Image alt="bdsm-logo" height={24} priority src="/bdsm-logo.svg" width={24} />
            </Link>
            <새로하기Button />
          </div>
          <Suspense fallback={<다음ButtonFallback />}>
            <다음Button add={1} />
          </Suspense>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full">
          <Suspense fallback={<ProgressBarFallback />}>
            <ProgressBar />
          </Suspense>
        </div>
      </div>
      {children}
    </div>
  )
}
