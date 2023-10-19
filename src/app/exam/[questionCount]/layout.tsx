import 새로하기Button from '@/app/exam/[questionCount]/새로하기Button'
import 이동Link from '@/app/exam/[questionCount]/이동Link'
import { LayoutProps } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <div className="max-w-screen-lg min-h-[100dvh] mx-auto p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="flex justify-between items-end gap-4">
        <이동Link add={-1}>이전</이동Link>
        <div className="grid">
          <Link href="/" className="flex place-items-center gap-2 p-4 whitespace-nowrap">
            By <Image src="/bdsm-logo.svg" alt="bdsm-logo" width={24} height={24} priority />
          </Link>
          <새로하기Button />
        </div>
        <이동Link add={1}>다음</이동Link>
      </div>
      {children}
    </div>
  )
}
