'use client'

import { useAnswerStore, useQuestionStore } from '@/app/exam/[questionCount]/zustand'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  questions: any[]
}

export default function Question({ questions: newQuestions }: Props) {
  const { questions, setQuestions } = useQuestionStore()
  const { addAnswer } = useAnswerStore()

  const newQuestionIds = newQuestions?.map((q) => q.id)

  useEffect(() => {
    if (questions.length > 0) return
    setQuestions(newQuestions)
  }, [newQuestionIds.toString()])

  const searchParams = useSearchParams()
  const i = +(searchParams.get('i') ?? 1)
  const question = questions[i - 1]

  function selectAnswer() {}

  return (
    <>
      <div className="flex grow items-center justify-center">
        <p className="max-w-prose text-center text-xl md:text-2xl">{question?.문제}</p>
      </div>
      <form className="flex flex-wrap gap-4" onSubmit={(e) => e.preventDefault()}>
        {question?.선택지.map((선택지) => (
          <button
            key={선택지.id}
            className="grow basis-0 whitespace-nowrap border p-4 md:text-lg"
            onClick={selectAnswer}
          >
            {선택지.label}
          </button>
        ))}
      </form>
    </>
  )
}
