'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type MouseEvent, useState } from 'react'
import toast from 'react-hot-toast'

import AppleCheckbox from '@/components/atoms/AppleCheckbox'

export default function 테스트보기Link() {
  const [checked, setChecked] = useState(false)

  function warnIfNotChecked(e: MouseEvent) {
    if (!checked) {
      e.preventDefault()
      toast.error('아래 내용에 동의해주세요')
    }
  }

  return (
    <>
      <Link
        className="group my-8 rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        href="/exam"
        onClick={warnIfNotChecked}
      >
        <h2 className="mb-3 text-2xl font-semibold">
          테스트 보기 &nbsp;
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            <Image alt="right-arrow" height={20} src="/images/arrow-right.svg" width={20} />
          </span>
        </h2>
        <p className="m-0 max-w-[25ch] text-sm opacity-50">자신의 BDSM 지식이 어느 정도인지 확인해보세요</p>
      </Link>
      <div className="flex items-center gap-2">
        <h3 className="text-violet-900">아래 내용에 동의합니다</h3>
        <AppleCheckbox onChange={(e) => setChecked(e.target.checked)} />
      </div>
    </>
  )
}
