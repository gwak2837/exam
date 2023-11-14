import { type Metadata } from 'next'
import dynamic from 'next/dynamic'

import { QuestionFallback } from '@/app/exam/[questionCount]/Question'
import { SelectionsFallback } from '@/app/exam/[questionCount]/Selections'
import { CANONICAL_URL } from '@/common/constants'
import { type PageProps } from '@/common/types'
import HideChannelTalkButton from '@/components/HideChannelTalkButton'

const Question = dynamic(async () => await import('@/app/exam/[questionCount]/Question'), {
  ssr: false,
  loading: QuestionFallback,
})

const Selections = dynamic(async () => await import('@/app/exam/[questionCount]/Selections'), {
  ssr: false,
  loading: SelectionsFallback,
})

export const metadata: Metadata = {
  title: '문제 - BDSM 고사',
}

async function getQuestions(questionCount: number) {
  const res = await fetch(`${CANONICAL_URL}/api/question/${questionCount}`, {
    // next: { tags: [`question:${questionCount}`] }, // revalidateTag 함수에 await을 사용할 수 있을 때 활성화하기
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch data')

  return await res.json()
}

export default async function Page({ params, searchParams }: PageProps) {
  const { questions } = await getQuestions(params.questionCount)

  return (
    <main className="flex grow flex-col gap-4 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="flex grow flex-col items-center justify-center gap-4">
        <div className="text-sm">
          <b className="text-violet-900">{searchParams.i}</b> / {params.questionCount}
        </div>
        <Question questions={questions} />
      </div>
      <Selections />
      <HideChannelTalkButton />
    </main>
  )
}
