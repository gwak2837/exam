'use client'

import Modal from '@/components/atoms/Modal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function CustomButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    router.push(`/exam/${(e.target as any).문제개수.value}/1`)
  }

  return (
    <>
      <button
        className="group flex flex-col items-center sm:items-start rounded-lg border border-transparent px-5 py-4 transition sm:text-left hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={() => setOpen(true)}
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Custom &nbsp;
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            <Image src="/images/arrow-right.svg" alt="right-arrow" width={20} height={20} />
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          광범위한 지식을 가지고 BDSM 세계를 탐구하는 고수를 위한 테스트
        </p>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} showCloseButton showDragButton>
        <form className=" grid gap-3 px-4 pt-5 pb-4 rounded-lg bg-white shadow-lg" onSubmit={handleSubmit}>
          <h3 className="pr-4 font-semibold text-lg">문제 개수를 입력해주세요</h3>
          <input
            className="w-full px-2 border"
            required
            min={0}
            max={50}
            name="문제개수"
            placeholder="풀고 싶은 문제 개수"
            type="number"
          />
          <button
            className="p-2 bg-violet-50 hover:bg-violet-100 text-sm font-medium text-violet-900 rounded transition duration-300"
            type="submit"
          >
            이동하기
          </button>
        </form>
      </Modal>
    </>
  )
}
