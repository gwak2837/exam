import Image from 'next/image'
import Link from 'next/link'

import { NEXT_PUBLIC_BBATON_CLIENT_ID, NEXT_PUBLIC_BBATON_REDIRECT_URI } from '@/common/constants'
import { type PageProps } from '@/common/types'

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="min-h-[100dvh] p-4 sm:p-8 md:p-16 lg:p-24">
      <a
        href={`https://bauth.bbaton.com/oauth/authorize?client_id=${NEXT_PUBLIC_BBATON_CLIENT_ID}&redirect_uri=${NEXT_PUBLIC_BBATON_REDIRECT_URI}&response_type=code&scope=read_profile`}
      >
        <Image alt="BBaton_Logo_Login_KR_v2.png" height="100" src="/images/BBaton_Logo_Login_KR_v2.png" width="350" />
      </a>
      <pre className="overflow-x-scroll">{JSON.stringify({ params, searchParams }, null, 2)}</pre>
    </main>
  )
}
