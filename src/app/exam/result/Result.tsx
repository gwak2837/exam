'use client'

import Link from 'next/link'

import { useExamStore } from '@/app/exam/[questionCount]/zustand'
import GreenChecked from '@/svg/GreenChecked'
import RedX from '@/svg/RedX'

type Props = {
  result: {
    문제개수: number
    정답개수: number
    상세: Record<
      string,
      {
        답안: string[]
        정답: string[]
        해설: string
        isCorrect: boolean
      }
    >
  }
}

export default function Result({ result }: Props) {
  const examId = result.문제개수
  const 상세 = result.상세

  const { exams } = useExamStore()
  const exam = exams[examId] ?? []

  const wrongAnswers = exam.filter((question) => !상세[question.id]?.isCorrect && 상세[question.id]?.해설)

  return (
    <>
      <div className="m-auto flex max-w-md flex-wrap justify-center gap-4">
        {exam.map((question, i) => (
          <Link key={question.id} className="flex items-center gap-2" href={`/exam/${examId}?i=${i + 1}`}>
            <span>{i + 1}</span>
            {상세[question.id]?.isCorrect ? <GreenChecked className="w-12" /> : <RedX className="w-12" />}
          </Link>
        ))}
      </div>
      {wrongAnswers.length > 0 && (
        <>
          <h4 className="mb-4 mt-8 text-center text-xl">해설</h4>
          <div className="grid max-h-[50vh] justify-center gap-2 overflow-y-auto text-sm">
            {exam.map(
              (question, i) =>
                !상세[question.id]?.isCorrect && (
                  <Link
                    key={question.id}
                    className="flex gap-2 text-red-800 transition-colors hover:text-red-600"
                    href={`/exam/${examId}?i=${i + 1}`}
                  >
                    <span>{i + 1}.</span>
                    <div className="max-w-prose">{상세[question.id]?.해설 || '(준비 중)'}</div>
                  </Link>
                ),
            )}
          </div>
        </>
      )}
    </>
  )
}

export function ResultFallback() {
  return (
    <div className="m-auto flex h-36 w-full max-w-md animate-pulse flex-wrap justify-center gap-4 rounded-2xl bg-white" />
  )
}
