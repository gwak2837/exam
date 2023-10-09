import { PageProps } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <div className="">
      <pre className="overflow-x-scroll">22{JSON.stringify({}, null, 2)}</pre>
    </div>
  )
}
