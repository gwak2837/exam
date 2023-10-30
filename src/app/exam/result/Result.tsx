'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'
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
  const exam = exams[examId]

  const { answers } = useAnswerStore()

  return (
    <div className="m-auto flex max-w-md flex-wrap justify-center gap-4">
      {exam.map((question, i) => (
        <Link key={question.id} href={`/exam/${examId}?i=${i + 1}`} className="flex items-center gap-2">
          <span>{i + 1}</span>
          {상세[question.id].isCorrect ? <GreenChecked className="w-12" /> : <RedX className="w-12" />}
        </Link>
      ))}
    </div>
  )
}
