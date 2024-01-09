import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { type PageProps } from '@/common/types'
import { TinymceViewerLoading } from '@/components/TinymceViewer'

const TinymceViewer = dynamic(async () => await import('@/components/TinymceViewer'), {
  ssr: false,
  loading: TinymceViewerLoading,
})

export default async function Page({ params, searchParams }: PageProps) {
  const postId = params.id

  const response = await fetch(`http://localhost:3000/api/post/${postId}`)
  const publicPost = await response.json()

  console.log('👀 ~ publicPost:', publicPost)

  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <TinymceViewer initialValue={publicPost.content} />
    </main>
  )
}
