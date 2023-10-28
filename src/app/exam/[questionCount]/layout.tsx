import 새로하기Button from '@/app/exam/[questionCount]/새로하기Button'
import 이동Button from '@/app/exam/[questionCount]/이동Button'
import { type LayoutProps } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-screen-lg flex-col">
      <div className="sticky top-0 flex items-end justify-between gap-4 border-b border-gray-200 p-4 backdrop-blur sm:px-8 md:px-12 lg:border-b-0 lg:px-16">
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
