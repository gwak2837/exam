import Image from 'next/image'
import Link from 'next/link'

import { type LayoutProps } from '@/common/types'

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-screen-lg flex-col">
      <div className="sticky top-0 flex items-end justify-center gap-4 border-b border-gray-200 p-4 backdrop-blur sm:px-8 md:px-12 lg:border-b-0 lg:px-16">
        <Link href="/" className="flex place-items-center gap-2 whitespace-nowrap">
          By <Image src="/bdsm-logo.svg" alt="bdsm-logo" width={24} height={24} priority />
        </Link>
      </div>
      {children}
    </div>
  )
}
