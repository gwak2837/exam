'use client'

import { useParams, useSearchParams } from 'next/navigation'

import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'

export default function Selections() {
  const params = useParams()
  const examId = params.questionCount as string

  const { exams } = useExamStore()
  const exam = exams[examId] ?? []

  const searchParams = useSearchParams()
  const i = +(searchParams.get('i') ?? 1)
  const question = exam[i - 1] ?? {}
  const 선택지 = question.선택지 ?? []

  const { answers, toggleAnswer } = useAnswerStore()
  const examAnswers = answers[examId] ?? []
  const questionAnswers = examAnswers[question.id] ?? []

  return (
    <form className="scrollbar-hide flex flex-wrap gap-4 overflow-x-auto" onSubmit={(e) => e.preventDefault()}>
      {선택지.map((선택지) => (
        <label
          key={question.id + 선택지.id}
          className={`grow basis-0 cursor-pointer whitespace-nowrap rounded-lg border-2 border-violet-200  p-4 text-center text-gray-600 transition-colors hover:bg-violet-50 md:text-lg ${
            checked[String(questionAnswers.includes(선택지.id))]
          }`}
        >
          {선택지.label}
          <input
            className="peer hidden"
            checked={questionAnswers.includes(선택지.id)}
            onChange={() => toggleAnswer([examId, question.id, [선택지.id]])}
            type="checkbox"
          />
        </label>
      ))}
    </form>
  )
}

const checked: Record<string, string> = {
  true: '!bg-violet-100 !text-violet-900',
  false: 'bg-white',
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
