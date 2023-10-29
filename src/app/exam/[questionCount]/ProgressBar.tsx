'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

export default function ProgressBar() {
  const params = useParams()
  const questionCount = +params.questionCount

  const searchParams = useSearchParams()
  const questionIndex = +(searchParams.get('i') ?? 1)

  const router = useRouter()

  return (
    <div className="relative grid h-full w-full grid-cols-[repeat(auto-fit,minmax(1px,1fr))] rounded-full bg-white">
      <div
        className="absolute inset-0 z-10 h-full w-full  bg-violet-100 transition-transform"
        style={{ transform: `translateX(${(100 * questionIndex) / questionCount - 100}%)` }}
      />
      {[...Array(questionCount)].map((_, i) => (
        <button
          key={i}
          className="relative z-10 transition-colors hover:bg-violet-300"
          onClick={() => router.replace(`?i=${+i + 1}`)}
        />
      ))}
    </div>
  )
}
