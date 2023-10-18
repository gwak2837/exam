'use client'

import { useAnswerStore, useQuestionStore } from '@/app/exam/[questionCount]/[questionIndex]/zustand'
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
      <button onClick={() => fetch('/api/question/10', { method: 'POST' })}>asdf</button>
      <pre className="overflow-x-scroll">{JSON.stringify({ answers, newQuestions, questions }, null, 2)}</pre>
    </>
  )
}
