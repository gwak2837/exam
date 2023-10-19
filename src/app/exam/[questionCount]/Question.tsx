'use client'

import { useAnswerStore, useQuestionStore } from '@/app/exam/[questionCount]/zustand'
import { useEffect } from 'react'

type Props = {
  questions: any[]
}

export default function Question({ questions: newQuestions }: Props) {
  const { questions, setQuestions } = useQuestionStore()
  const { answers, setAnswer } = useAnswerStore()

  useEffect(() => {
    const 기존QuestionIds = questions.join(',')

    // if(기존QuestionIds)
  }, [])

  return (
    <>
      <button onClick={() => setAnswer([1, 2])}>asdf</button>
      <pre className="overflow-x-scroll">{JSON.stringify({ answers, newQuestions, questions }, null, 2)}</pre>
    </>
  )
}
