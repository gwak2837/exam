'use client'

import { useRouter } from 'next/navigation'
import { useAnswerStore } from '@/app/exam/[questionCount]/zustand'

type Props = {
  examId: string
}

export default function 다시풀기Button({ examId }: Props) {
  const { resetAnswer } = useAnswerStore()
  const router = useRouter()

  function handle다시풀기Button() {
    resetAnswer(examId)
    router.push(`/exam/${examId}?i=1`)
  }

  return (
    <button
      className="transition-color m-auto flex w-full max-w-md items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-violet-700 px-4 py-2 text-white duration-300 hover:bg-violet-600 disabled:bg-gray-300"
      disabled={!examId}
      onClick={handle다시풀기Button}
    >
      같은 문제 다시 풀기
    </button>
  )
}
