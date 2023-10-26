import 새로하기Button from '@/app/exam/[questionCount]/새로하기Button'
import 이동Button from '@/app/exam/[questionCount]/이동Button'
import { LayoutProps } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto min-h-[100dvh] max-w-screen-lg p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="sticky top-0 flex items-end justify-between gap-4 pb-2 backdrop-blur">
        <이동Button add={-1}>이전</이동Button>
        <div className="grid">
          <Link href="/" className="flex place-items-center gap-2 whitespace-nowrap p-4">
            By <Image src="/bdsm-logo.svg" alt="bdsm-logo" width={24} height={24} priority />
          </Link>
          <새로하기Button />
        </div>
        <이동Button add={1}>다음</이동Button>
      </div>
      {children}
    </div>
  )
}
