import { CANONICAL_URL } from '@/common/constants'
import { PageProps } from '@/common/types'
import dynamic from 'next/dynamic'

const Question = dynamic(() => import('@/app/exam/[questionCount]/Question'), { ssr: false })

async function getQuestions(questionCount: number) {
  const res = await fetch(`${CANONICAL_URL}/api/question/${questionCount}`, { next: { tags: ['question'] } })
  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}

export default async function Page({ params }: PageProps) {
  const { questions } = await getQuestions(params.questionCount)

  return (
    <main className="flex grow flex-col p-4 sm:p-8 md:p-12 lg:p-16">
      <Question questions={questions} />
    </main>
  )
}
