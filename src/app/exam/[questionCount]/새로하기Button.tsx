'use client'

import { useAnswerStore } from '@/app/exam/[questionCount]/zustand'
import Modal from '@/components/atoms/Modal'
import LoadingSpinner from '@/svgs/LoadingSpinner'
import { fetchPOST } from '@/utils/swr'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function 새로하기Button() {
  const [showModal, setShowModal] = useState(false)

  const { questionCount } = useParams()

  const router = useRouter()
  const { resetAnswer } = useAnswerStore()

  const { trigger, isMutating } = useSWRMutation(`/api/question/${questionCount}`, fetchPOST)

  async function handle좋아요ButtonClick() {
    await trigger()
    setShowModal(false)
    router.push(`/exam/${questionCount}?i=1`)
    router.refresh()
    resetAnswer()
  }

  return (
    <>
      <button
        className="flex gap-2 items-center px-4 py-3 text-sm text-gray-700 aria-disabled:text-gray-400 rounded-lg transition-color duration-300 bg-gray-300 hover:bg-gray-400/50 aria-disabled:hover:bg-gray-300 aria-disabled:cursor-not-allowed"
        disabled={isMutating}
        onClick={() => setShowModal(true)}
      >
        {isMutating && <LoadingSpinner className="w-5 fill-gray-700" />} 새로하기
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} showCloseButton showDragButton>
        <div className="bg-white rounded-lg p-4 shadow-xl">
          <h3 className="my-2 text-lg font-medium">새로하기</h3>
          <div className="my-4">새로운 문제를 풀까요? 지금까지 작성한 답안은 모두 초기화돼요</div>
          <div className="flex justify-end gap-2">
            <button
              className="flex gap-2 items-center w-20 px-4 py-2 text-sm text-violet-700 rounded-lg transition-color duration-300 bg-violet-200 hover:bg-violet-300"
              disabled={isMutating}
              onClick={handle좋아요ButtonClick}
            >
              {isMutating && <LoadingSpinner className="w-5" />} 좋아요
            </button>
            <button
              className="w-20 px-4 py-2 text-sm text-neutral-700 rounded-lg transition-color duration-300 bg-neutral-200 hover:bg-neutral-300"
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
