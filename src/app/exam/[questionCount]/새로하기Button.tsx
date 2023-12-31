'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import useRevalidateExam from '@/app/exam/[questionCount]/useRevalidateExam'
import { useAnswerStore, useExamStore } from '@/app/exam/[questionCount]/zustand'
import Modal from '@/components/atoms/Modal'
import LoadingSpinner from '@/svg/LoadingSpinner'

export default function 새로하기Button() {
  const [showModal, setShowModal] = useState(false)

  const params = useParams()
  const questionCount = params.questionCount as string

  const router = useRouter()
  const { resetExam } = useExamStore()
  const { resetAnswer } = useAnswerStore()

  const { trigger: revalidateExam, isMutating } = useRevalidateExam({ examId: questionCount })

  async function handle좋아요ButtonClick() {
    resetExam(questionCount)
    resetAnswer(questionCount)
    await revalidateExam()
    router.replace(`/exam/${questionCount}?i=1`)
    router.refresh()
    setShowModal(false)
  }

  return (
    <>
      <button
        className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-gray-300 px-4 py-3 text-sm text-gray-700 transition-colors duration-300 hover:bg-gray-400/50 aria-disabled:cursor-not-allowed aria-disabled:text-gray-400 aria-disabled:hover:bg-gray-300"
        disabled={isMutating}
        onClick={() => setShowModal(true)}
      >
        {isMutating && <LoadingSpinner className="w-5 fill-gray-700" />} 새로하기
      </button>
      <Modal open={showModal} showCloseButton showDragButton onClose={() => setShowModal(false)}>
        <div className="rounded-lg bg-white p-4 shadow-xl">
          <h3 className="my-2 text-lg font-medium">새로하기</h3>
          <div className="my-4">새로운 문제를 풀까요? 지금까지 작성한 답안은 모두 초기화돼요</div>
          <div className="flex justify-end gap-2">
            <button
              className="transition-color flex w-20 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-red-200 px-4 py-2 text-sm text-red-700 duration-300 hover:bg-red-300"
              disabled={isMutating}
              onClick={handle좋아요ButtonClick}
            >
              {isMutating && <LoadingSpinner className="w-5 fill-red-600" />} 좋아요
            </button>
            <button
              className="transition-color w-20 rounded-lg bg-neutral-200 px-4 py-2 text-sm text-neutral-700 duration-300 hover:bg-neutral-300"
              onClick={() => setShowModal(false)}
            >
              아니요
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
