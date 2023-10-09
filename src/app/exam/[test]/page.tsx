import { PageProps } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="">
      <pre className="overflow-x-scroll">{JSON.stringify({}, null, 2)}</pre>
    </main>
  )
}
