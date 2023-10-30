'use client'

import { useRouter } from 'next/navigation'
import useRevalidateExam from '@/app/exam/[questionCount]/useRevalidateExam'
import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'
import LoadingSpinner from '@/svg/LoadingSpinner'

type Props = {
  examId: string
}

export default function 새로풀기Button({ examId }: Props) {
  const { resetExam } = useExamStore()
  const { resetAnswer } = useAnswerStore()
  const router = useRouter()
  const { trigger: revalidateExam, isMutating } = useRevalidateExam({ examId })

  async function handle새로풀기Button() {
    resetExam(examId)
    resetAnswer(examId)
    await revalidateExam()
    router.push(`/exam/${examId}?i=1`)
  }

  return (
    <button
      className="transition-color m-auto flex w-full max-w-md items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-violet-700 px-4 py-2 text-white duration-300 hover:bg-violet-600 disabled:bg-gray-300"
      disabled={!examId || isMutating}
      onClick={handle새로풀기Button}
    >
      {isMutating && <LoadingSpinner className="w-5" />} 다른 문제 새로 풀기
    </button>
  )
}
