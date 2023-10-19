import { PageProps } from '@/common/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const Answers = dynamic(() => import('@/app/exam/result/Answers'), { ssr: false })

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <pre className="overflow-x-scroll">{JSON.stringify({ params, searchParams }, null, 2)}</pre>
      <Answers />
    </main>
  )
}
