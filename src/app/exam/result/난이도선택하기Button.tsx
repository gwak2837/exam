'use client'

import { useRouter } from 'next/navigation'

export default function 난이도선택하기Button() {
  const router = useRouter()

  return (
    <button
      className="transition-color m-auto flex w-full max-w-md items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-violet-700 px-4 py-2 text-white duration-300 hover:bg-violet-600 disabled:bg-gray-300"
      onClick={() => router.push('/exam')}
    >
      난이도 선택하기
    </button>
  )
}
