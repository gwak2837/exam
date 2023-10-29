import dynamic from 'next/dynamic'
import { type PageProps } from '@/common/types'

const Answers = dynamic(async () => await import('@/app/exam/result/Answers'), { ssr: false })

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="flex grow flex-col p-4 sm:p-8 md:p-12 lg:p-16">
      <pre className="overflow-x-scroll">{JSON.stringify({ params, searchParams }, null, 2)}</pre>
      <Answers />
    </main>
  )
}
