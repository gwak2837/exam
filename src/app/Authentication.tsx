'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { create } from 'zustand'

import Modal from '@/components/atoms/Modal'

export default function Authentication() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const provider = searchParams.get('provider')

  const { accessToken, setAccessToken } = useAuthStore((state) => state)

  useEffect(() => {
    if (!code || !provider) return

    void (async () => {
      const response = await fetch(`/api/auth/${provider}?code=${code}`, { method: 'POST' })
      if (response.status === 403) {
        setLoginForbiddenReason(await response.text())
        setShowLoginForbiddenModal(true)
        return
      }
      if (response.status >= 500) return

      const result = await response.json()
      setAccessToken(result.accessToken)
      localStorage.setItem('refreshToken', result.refreshToken)

      const deletedSearchParams = new URLSearchParams(searchParams)
      deletedSearchParams.delete('code')
      deletedSearchParams.delete('provider')
      router.replace(`?${deletedSearchParams}`)

      toast.success('로그인에 성공했어요')
    })()
  }, [code])

  useEffect(() => {
    if (accessToken) return

    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) return

    void (async () => {
      const response = await fetch('/api/auth/token', { method: 'POST', headers: { Authorization: refreshToken } })
      if (response.status === 401) {
        localStorage.removeItem('refreshToken')
        toast.error('로그인 유지 기간이 만료됐어요')
        return
      } else if (response.status === 403) {
        localStorage.removeItem('refreshToken')
        toast.error('로그아웃 됐어요')
        return
      } else if (!response.ok) return toast.error('일시적인 오류가 발생했어요') // TODO(taeuk): 1, 2, 4초 간격으로 3번 retry하기

      const { accessToken } = await response.json()
      setAccessToken(accessToken)
    })()
  }, [accessToken])

  const [showLoginForbiddenModal, setShowLoginForbiddenModal] = useState(false)
  const [loginForbiddenReason, setLoginForbiddenReason] = useState('')

  return (
    <>
      <Modal
        open={showLoginForbiddenModal}
        showCloseButton
        showDragButton
        onClose={() => setShowLoginForbiddenModal(false)}
      >
        <div className="rounded-lg bg-white p-4 shadow-xl">{loginForbiddenReason}</div>
      </Modal>
    </>
  )
}

type AuthStore = {
  accessToken: string
  setAccessToken: (newAccessToken: string) => void
  clearAccessToken: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  accessToken: '',
  setAccessToken: (newAccessToken) => set(() => ({ accessToken: newAccessToken })),
  clearAccessToken: () => set(() => ({ accessToken: '' })),
}))

export async function fetchWithToken<T>(
  authStore: AuthStore,
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  })
  if (response.status === 401) {
    authStore.clearAccessToken()
    return
  }

  return (await response.json()) as T
}
