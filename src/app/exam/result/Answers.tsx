'use client'

import { useAnswerStore } from '@/app/exam/[questionCount]/zustand'

export default function Answers() {
  const { answers } = useAnswerStore()

  return (
    <>
      <pre className="overflow-x-scroll">{JSON.stringify({ answers }, null, 2)}</pre>
    </>
  )
}
