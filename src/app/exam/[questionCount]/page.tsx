import { CANONICAL_URL } from '@/common/constants'
import { PageProps } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params, searchParams }: PageProps) {
  const questions = await getQuestions(params.questionCount)

  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <pre className="overflow-x-scroll">{JSON.stringify({ questions }, null, 2)}</pre>
    </main>
  )
}

async function getQuestions(questionCount: number) {
  const res = await fetch(`${CANONICAL_URL}/api/question/${questionCount}`)
  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}
