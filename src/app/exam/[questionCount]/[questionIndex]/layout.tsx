import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 이동Button from '@/app/exam/[questionCount]/[questionIndex]/이동Button'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="max-w-screen-md min-h-[100dvh] mx-auto p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="flex justify-between items-end gap-4">
        <이동Button add={-1}>이전</이동Button>
        <div className="grid">
          <Link href="/" className="flex place-items-center gap-2 p-4 whitespace-nowrap">
            By <Image src="/bdsm-logo.svg" alt="BDSM Logo" width={24} height={24} />
          </Link>
          <button>새로하기</button>
        </div>
        <이동Button add={1}>다음</이동Button>
      </div>
      {children}
    </div>
  )
}
