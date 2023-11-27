'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'
import { type Params } from '@/common/types'

export default function Selections() {
  const params = useParams<Params>()
  const examId = params.questionCount

  const { exams } = useExamStore()
  const exam = exams[examId] ?? []

  const searchParams = useSearchParams()
  const i = +(searchParams.get('i') ?? 1)
  const question = exam[i - 1] ?? {}
  const 선택지 = question.선택지 ?? []
  const isLastQuestion = i === +examId

  const { answers, toggleAnswer } = useAnswerStore()
  const examAnswers = answers[examId] ?? []
  const questionAnswers = examAnswers[question.id] ?? []
  const isSelectionCompleted = !question.is복수정답 && questionAnswers.length === 0

  const router = useRouter()

  return (
    <form className="scrollbar-hide flex flex-wrap gap-4 overflow-x-auto" onSubmit={(e) => e.preventDefault()}>
      {선택지.map((선택지) => (
        <label
          key={question.id + 선택지.id}
          aria-checked={questionAnswers.includes(선택지.id)}
          className="grow basis-0 cursor-pointer whitespace-nowrap rounded-lg border-2 border-violet-200  p-4 text-center text-gray-600 transition-colors hover:bg-violet-50 aria-checked:bg-violet-100 aria-checked:text-violet-900 md:text-lg"
        >
          {선택지.label}
          <input
            className="peer hidden"
            checked={questionAnswers.includes(선택지.id)}
            onChange={() => {
              toggleAnswer([examId, question.id, [선택지.id]])
              if (!question.is복수정답 && !isLastQuestion && isSelectionCompleted) router.replace(`?i=${i + 1}`)
            }}
            type="checkbox"
          />
        </label>
      ))}
    </form>
  )
}

export function SelectionsFallback() {
  return (
    <form className="scrollbar-hide flex flex-wrap gap-4 overflow-x-auto">
      {[...Array(4)].map((_, i) => (
        <label
          key={i}
          className="h-16 grow basis-0 animate-pulse cursor-not-allowed whitespace-nowrap rounded-lg border-2 border-violet-200 bg-white p-4 text-center text-gray-600 transition-colors md:text-lg"
        >
          <input className="peer hidden" disabled type="checkbox" />
        </label>
      ))}
    </form>
  )
}
