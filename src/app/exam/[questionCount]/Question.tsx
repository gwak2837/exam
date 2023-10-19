'use client'

import { useAnswerStore, useQuestionStore } from '@/app/exam/[questionCount]/zustand'
import { useEffect } from 'react'

type Props = {
  questions: any[]
}

export default function Question({ questions: newQuestions }: Props) {
  const { questions, setQuestions } = useQuestionStore()
  const { answers, addAnswer } = useAnswerStore()

  const newQuestionIds = newQuestions?.map((q) => q.id).toString()

  useEffect(() => {
    if (questions.length > 0) return
    setQuestions(newQuestions)
  }, [newQuestionIds])

  return (
    <>
      <button onClick={() => addAnswer([1, 2])}>asdf</button>
      <pre className="overflow-x-scroll">{JSON.stringify({ answers, newQuestions, questions }, null, 2)}</pre>
    </>
  )
}
