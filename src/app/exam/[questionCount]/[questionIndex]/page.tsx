import { CANONICAL_URL } from '@/common/constants'
import { PageProps } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'

async function getQuestions(questionCount: number) {
  const res = await fetch(`${CANONICAL_URL}/api/question/${questionCount}`)
  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}

export default async function Page({ params }: PageProps) {
  const questions = await getQuestions(params.questionCount)

  return (
    <main>
      <pre className="overflow-x-scroll">{JSON.stringify(questions, null, 2)}</pre>
    </main>
  )
}
