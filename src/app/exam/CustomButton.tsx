'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState, useRef } from 'react'
import Modal from '@/components/atoms/Modal'

export default function CustomButton() {
  const [open, setOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  function openModal() {
    setOpen(true)
    inputRef.current?.focus()
  }

  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    router.push(`/exam/${+(e.target as any).문제개수.value}?i=1`)
  }

  return (
    <>
      <button
        className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 transition hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 sm:items-start sm:text-left"
        onClick={openModal}
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
        <form className="grid gap-3 rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl" onSubmit={handleSubmit}>
          <h3 className="pr-4 text-lg font-medium">문제 개수를 입력해주세요</h3>
          <input
            className="w-full border px-2"
            required
            min={1}
            max={50}
            name="문제개수"
            pattern="[0-9]*"
            ref={inputRef}
            placeholder="풀고 싶은 문제 개수"
            type="number"
          />
          <button
            className="rounded bg-violet-50 p-2 text-sm font-medium text-violet-900 transition duration-300 hover:bg-violet-100"
            type="submit"
          >
            이동하기
          </button>
        </form>
      </Modal>
    </>
  )
}
