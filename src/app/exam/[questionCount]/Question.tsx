'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useExamStore } from '@/app/exam/[questionCount]/zustand'
import { type TQuestion } from '@/common/exam'

type Props = {
  questions: TQuestion[]
}

export default function Question({ questions: newQuestions }: Props) {
  const params = useParams()
  const searchParams = useSearchParams()
  const examId = params.questionCount as string

  const { exams, setExam } = useExamStore()
  const exam = exams[examId] ?? []
  const i = +(searchParams.get('i') ?? 1)
  const question = exam[i - 1] ?? {}

  const newQuestionIds = newQuestions?.map((q) => q.id)

  useEffect(() => {
    if (exam.length > 0) return
    setExam(examId, newQuestions)
  }, [examId, newQuestionIds.toString()])

  return <p className="max-w-prose text-center text-xl font-medium md:text-2xl">{question.문제}</p>
}

export function QuestionFallback() {
  return <p className="h-5 w-full animate-pulse rounded-full bg-white text-center text-xl font-medium md:text-2xl" />
}
