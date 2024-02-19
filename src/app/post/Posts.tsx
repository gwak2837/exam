'use client'

import useSWR from 'swr'

import { useAuthStore } from '@/app/Authentication'

export default function Posts() {
  const accessToken = useAuthStore((state) => state.accessToken)

  const { data, error } = useSWR('/api/posts', fetcher)

  return <></>
}
