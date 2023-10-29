'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'

export default function ProgressBar() {
  const params = useParams()
  const questionCount = +params.questionCount

  const searchParams = useSearchParams()
  const questionIndex = +(searchParams.get('i') ?? 1)

  const router = useRouter()

  const { answers } = useAnswerStore()

  const { exams } = useExamStore()
  const exam = exams[questionCount] ?? []
  const 문제Ids = exam.map((q) => q.id)
  const 답안Ids = answers[questionCount] ?? []

  return (
    <div className="relative grid h-full w-full grid-cols-[repeat(auto-fit,minmax(1px,1fr))] rounded-full bg-white">
      <div
        className="absolute inset-0 z-10 h-full w-full  bg-violet-100 transition-transform duration-300"
        style={{ transform: `translateX(${(100 * questionIndex) / questionCount - 100}%)` }}
      />
      {[...Array(questionCount)].map((_, i) => (
        <button
          key={i}
          className={`relative z-10 transition-colors hover:bg-violet-300 ${
            checked[String(답안Ids[문제Ids[i]]?.length > 0)]
          }`}
          onClick={() => router.replace(`?i=${+i + 1}`)}
        />
      ))}
    </div>
  )
}

export function ProgressBarFallback() {
  return (
    <div className="relative grid h-full w-full animate-pulse grid-cols-[repeat(auto-fit,minmax(1px,1fr))] rounded-full bg-white" />
  )
}

const checked: Record<string, string> = {
  true: '!bg-violet-400',
  false: '',
}
