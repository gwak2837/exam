'use client' // Error components must be Client Components

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <h2>문제가 발생했어요</h2>
      <span className="text-sm">{error.digest}</span>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도하기</button>
    </main>
  )
}
