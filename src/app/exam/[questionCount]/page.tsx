import { CANONICAL_URL } from '@/common/constants'
import { PageProps } from '@/common/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const Question = dynamic(() => import('@/app/exam/[questionCount]/Question'), { ssr: false })

async function getQuestions(questionCount: number) {
  const res = await fetch(`${CANONICAL_URL}/api/question/${questionCount}`, { next: { tags: ['question'] } })
  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}

export default async function Page({ params }: PageProps) {
  const { questions } = await getQuestions(params.questionCount)

  return (
    <main>
      <Question questions={questions} />
      <pre className="overflow-scroll h-full">{JSON.stringify(questions, null, 2)}</pre>
    </main>
  )
}
