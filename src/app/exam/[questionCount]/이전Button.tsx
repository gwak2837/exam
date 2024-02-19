'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  add: number
}

export default function 이전Button({ add }: Props) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const questionIndex = +(searchParams.get('i') ?? 1)
  const isFirstQuestion = questionIndex + add < 1

  return (
    <button
      className="transition-color peer whitespace-nowrap rounded-lg bg-gray-300 px-4 py-3 text-sm text-gray-700 duration-300 hover:bg-gray-400/50 disabled:text-gray-400 disabled:hover:bg-gray-300"
      disabled={isFirstQuestion}
      onClick={() => router.replace(`?i=${questionIndex + add}`)}
    >
      이전
    </button>
  )
}

export function 이전ButtonFallback() {
  return (
    <button
      className="transition-color peer whitespace-nowrap rounded-lg bg-gray-300 px-4 py-3 text-sm text-gray-700 duration-300 hover:bg-gray-400/50 disabled:text-gray-400 disabled:hover:bg-gray-300"
      disabled
    >
      이전
    </button>
  )
}
