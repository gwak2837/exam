import Image from 'next/image'
import Link from 'next/link'

import TinymceEditor from '@/app/post/TinymceEditor'
import { type PageProps } from '@/common/types'

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <TinymceEditor />
    </main>
  )
}
