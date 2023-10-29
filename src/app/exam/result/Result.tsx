'use client'

import { useSearchParams } from 'next/navigation'
import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'

type Props = {
  result: any
}

export default function Result({ result }: Props) {
  const { exams, setExam } = useExamStore()
  const { answers } = useAnswerStore()

  const searchParams = useSearchParams()

  return (
    <>
      <pre className="overflow-x-scroll">{JSON.stringify({ result, answers }, null, 2)}</pre>
    </>
  )
}
