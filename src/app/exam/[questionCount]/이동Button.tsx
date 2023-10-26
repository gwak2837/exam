'use client'

import Modal from '@/components/atoms/Modal'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { MouseEvent, ReactNode, useState } from 'react'

type Props = {
  children: ReactNode
  add: number
}

export default function 이동Button({ children, add }: Props) {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const questionCount = +params.questionCount
  const questionIndex = +(searchParams.get('i') ?? 1)
  const disabled = questionIndex + add < 1
  const isSubmit = children === '다음' && questionCount === questionIndex

  const [showModal, setShowModal] = useState(false)

  function handle제출Click(e: MouseEvent) {
    if (disabled) return e.preventDefault()

    if (isSubmit) {
      setShowModal(true)
    } else {
      router.replace(`?i=${+questionIndex + add}`)
    }
  }

  return (
    <>
      <button
        disabled={disabled}
        className="transition-color rounded-lg bg-gray-300 px-4 py-3 text-sm text-gray-700 duration-300 hover:bg-gray-400/50 disabled:text-gray-400 disabled:hover:bg-gray-300"
        onClick={handle제출Click}
      >
        {isSubmit ? '제출' : children}
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} showCloseButton showDragButton>
        <div className="rounded-lg bg-white p-4 shadow-xl">
          <h3 className="my-1 text-lg font-medium">제출하기</h3>
          <div className="my-4">지금까지 푼 답안을 제출할까요?</div>
          <div className="flex justify-end gap-2">
            <button
              className="transition-color w-20 rounded-lg bg-violet-200 px-4 py-2 text-sm text-violet-700 duration-300 hover:bg-violet-300"
              onClick={() => router.push('/exam/result')}
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
