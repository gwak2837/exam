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
  const post = await getPost(postId)

  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      {post.ok && <TinymceViewer initialValue={post.content} />}
      {!post.ok && <div>{post.message}</div>}
    </main>
  )
}

async function getPost(postId: string) {
  const response = await fetch(`http://localhost:3000/api/post/${postId}`)
  if (!response.ok) return { ok: false, message: await response.text() }

  return await response.json()
}
