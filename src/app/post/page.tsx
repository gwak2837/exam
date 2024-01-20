import Image from 'next/image'
import Link from 'next/link'

import 글쓰기Button from '@/app/post/글쓰기Button'
import { type PageProps } from '@/common/types'

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <Link href="/post/create">글쓰기</Link>
      <Link href="/post/2">2</Link>
      <글쓰기Button />
    </main>
  )
}
