'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'
import { type TQuestion } from '@/common/exam'

type Props = {
  questions: TQuestion[]
}

export default function Question({ questions: newQuestions }: Props) {
  const params = useParams()
  const examId = params.questionCount.toString()

  const { exams, setExam } = useExamStore()
  const exam = exams[examId] ?? []

  const newQuestionIds = newQuestions?.map((q) => q.id)

  useEffect(() => {
    if (exam.length > 0) return
    setExam(examId, newQuestions)
  }, [examId, newQuestionIds.toString()])

  // --
  const searchParams = useSearchParams()
  const i = +(searchParams.get('i') ?? 1)

  const question = exam[i - 1] ?? {}
  const 선택지 = question.선택지 ?? []

  const { answers, toggleAnswer } = useAnswerStore()
  const examAnswer = answers[examId] ?? []
  const questionAnswer = examAnswer[question.id] ?? []

  return (
    <>
      <div className="flex grow flex-col items-center justify-center gap-4">
        <div className="text-sm">
          <b className="text-violet-900">{i}</b> / {examId}
        </div>
        <p className="max-w-prose text-center text-xl font-medium md:text-2xl">{question.문제}</p>
      </div>
      <form className=" scrollbar-hide flex flex-wrap gap-4 overflow-x-auto" onSubmit={(e) => e.preventDefault()}>
        {선택지.map((선택지) => (
          <label
            key={question.id + 선택지.id}
            className={`grow basis-0 cursor-pointer whitespace-nowrap rounded-lg border-2 border-violet-200  p-4 text-center text-gray-600 transition-colors hover:bg-violet-50 md:text-lg ${
              checked[String(questionAnswer.includes(선택지.id))]
            }`}
          >
            {선택지.label}
            <input
              className="peer hidden"
              checked={questionAnswer.includes(선택지.id)}
              onChange={() => toggleAnswer([examId, question.id, [선택지.id]])}
              type="checkbox"
            />
          </label>
        ))}
      </form>
    </>
  )
}

const checked: Record<string, string> = {
  true: '!bg-violet-100 !text-violet-900',
  false: 'bg-white',
}
