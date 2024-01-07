'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { create } from 'zustand'

import Modal from '@/components/atoms/Modal'

export default function Authentication() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const provider = searchParams.get('provider')

  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  const router = useRouter()

  useEffect(() => {
    if (!code || !provider) return

    void (async () => {
      const response = await fetch(`/api/auth/${provider}?code=${code}`, { method: 'POST' })
      if (response.status === 403) {
        setLoginForbiddenReason(await response.text())
        return setShowLoginForbiddenModal(true)
      }
      if (response.status >= 500) return

      const result = await response.json()
      setAccessToken(result.accessToken)

      const deletedSearchParams = new URLSearchParams(searchParams)
      deletedSearchParams.delete('code')
      deletedSearchParams.delete('provider')
      router.replace(`?${deletedSearchParams}`)

      toast.success('로그인에 성공했어요')
    })()
  }, [code])

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

type AuthState = {
  accessToken: string
  setAccessToken: (newAccessToken: string) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: '',
  setAccessToken: (newAccessToken) => set(() => ({ accessToken: newAccessToken })),
}))
