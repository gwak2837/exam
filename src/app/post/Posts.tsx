'use client'

import useSWR from 'swr'

import { fetchWithToken, useAuthStore } from '@/app/Authentication'

export default function Posts() {
  const authStore = useAuthStore()

  const { data, error } = useSWR('/api/post', async (url) => await fetchWithToken(authStore, url))

  return <></>
}
