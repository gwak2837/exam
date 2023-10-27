'use client'

import { useAnswerStore, useQuestionStore } from '@/app/exam/[questionCount]/zustand'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  questions: any[]
}

export default function Question({ questions: newQuestions }: Props) {
  const { questions, setQuestions } = useQuestionStore()

  const newQuestionIds = newQuestions?.map((q) => q.id)

  useEffect(() => {
    if (questions.length > 0) return
    setQuestions(newQuestions)
  }, [newQuestionIds.toString()])

  // --
  const searchParams = useSearchParams()
  const i = +(searchParams.get('i') ?? 1)
  const question = questions[i - 1] ?? {}
  const 선택지 = question.선택지 ?? []

  const { answers, toggleAnswer } = useAnswerStore()
  const answer = answers[question.id] ?? []

  return (
    <>
      <div className="flex grow items-center justify-center">
        <p className="max-w-prose text-center text-xl md:text-2xl">{question.문제}</p>
      </div>
      <pre>{JSON.stringify(answer, null, 2)}</pre>
      <form className="flex flex-wrap gap-4" onSubmit={(e) => e.preventDefault()}>
        {선택지.map((선택지) => (
          <label
            key={question.id + 선택지.id}
            className={`grow basis-0 whitespace-nowrap rounded-lg border-2 border-violet-200 p-4 text-center text-violet-950 transition-colors md:text-lg ${
              checked[String(answer.includes(선택지.id))]
            } `}
          >
            {선택지.label}
            <input
              className="peer hidden"
              checked={answer.includes(선택지.id)}
              onClick={() => toggleAnswer([question.id, [선택지.id]])}
              type="checkbox"
            />
          </label>
        ))}
      </form>
    </>
  )
}

const checked = {
  true: 'bg-violet-100 text-violet-800',
  false: '',
} as Record<string, string>
