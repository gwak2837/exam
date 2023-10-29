import dynamic from 'next/dynamic'
import { type PageProps } from '@/common/types'
import { CANONICAL_URL } from '@/common/constants'
import { toQuerystring } from '@/utils/utils'

const Result = dynamic(async () => await import('@/app/exam/result/Result'), { ssr: false })

async function getResult(querystring: string) {
  const res = await fetch(`${CANONICAL_URL}/api/question/result?${querystring}`, { next: { tags: ['result'] } })
  if (!res.ok) throw new Error('Failed to fetch data')

  return await res.json()
}

export default async function Page({ params, searchParams }: PageProps) {
  const result = await getResult(toQuerystring(searchParams))

  return (
    <main className="flex grow flex-col p-4 sm:p-8 md:p-12 lg:p-16">
      <pre className="overflow-x-scroll">{JSON.stringify({ params, searchParams }, null, 2)}</pre>
      <Result result={result} />
    </main>
  )
}
