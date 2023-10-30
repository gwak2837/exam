'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useAnswerStore } from '@/app/exam/[questionCount]/zustand'
import Modal from '@/components/atoms/Modal'

type Props = {
  add: number
}

export default function 다음Button({ add }: Props) {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const questionCount = +params.questionCount
  const questionIndex = +(searchParams.get('i') ?? 1)
  const isSubmit = questionCount === questionIndex

  const { answers } = useAnswerStore()
  const answer = answers[questionCount] ?? {}
  const 답안 = Object.values(answer)
  const hasUnsolvedQuestion = isSubmit && (답안.length !== questionCount || 답안.some((답안) => 답안.length === 0))

  const [showModal, setShowModal] = useState(false)

  function handle좋아요ButtonClick() {
    const querystring = new URLSearchParams()

    Object.entries(answer).forEach(([questionId, selections]) =>
      selections.forEach((답안) => querystring.append(questionId, 답안)),
    )

    router.push(`/exam/result?${querystring}`)
  }

  return (
    <>
      <div className="relative">
        <button
          disabled={hasUnsolvedQuestion}
          className="transition-color peer whitespace-nowrap rounded-lg bg-gray-300 px-4 py-3 text-sm text-gray-700 duration-300 hover:bg-gray-400/50 disabled:text-gray-400 disabled:hover:bg-gray-300"
          onClick={() => (isSubmit ? setShowModal(true) : router.replace(`?i=${questionIndex + add}`))}
        >
          {isSubmit ? '제출' : '다음'}
        </button>
        {isSubmit && (
          <div
            className="max-w-64 pointer-events-none absolute left-full top-full z-50 translate-x-[-100%] p-2 text-sm text-gray-500 opacity-0 transition-opacity duration-300 hover:pointer-events-auto hover:opacity-100 peer-hover:peer-disabled:pointer-events-auto peer-hover:peer-disabled:opacity-100"
            role="tooltip"
          >
            <div className="h-full w-full rounded-lg border border-gray-200 bg-white p-4 shadow">
              <h3 className="whitespace-nowrap">모든 문제를 풀어주세요</h3>
            </div>
          </div>
        )}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} showCloseButton showDragButton>
        <div className="rounded-lg bg-white p-4 shadow-xl">
          <h3 className="my-1 text-lg font-medium">제출하기</h3>
          <div className="my-4">지금까지 푼 답안을 제출할까요?</div>
          <div className="flex justify-end gap-2">
            <button
              className="transition-color w-20 rounded-lg bg-violet-200 px-4 py-2 text-sm text-violet-700 duration-300 hover:bg-violet-300"
              onClick={handle좋아요ButtonClick}
            >
              좋아요
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

export function 다음ButtonFallback() {
  return (
    <button
      disabled
      className="transition-color peer whitespace-nowrap rounded-lg bg-gray-300 px-4 py-3 text-sm text-gray-700 duration-300 hover:bg-gray-400/50 disabled:text-gray-400 disabled:hover:bg-gray-300"
    >
      다음
    </button>
  )
}
