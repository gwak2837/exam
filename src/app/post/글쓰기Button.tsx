'use client'

import Link from 'next/link'
import { type FormEvent, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import { type GETUserResponse } from '@/app/api/user/type'
import { fetchWithToken, useAuthStore } from '@/app/Authentication'
import Modal from '@/components/atoms/Modal'
import Squircle from '@/components/atoms/Squircle'
import HideChannelTalkButton from '@/components/HideChannelTalkButton'
import QuillIcon from '@/svg/QuillIcon'
import { hashToColorHexCode } from '@/util/utils'

export default function 글쓰기Button() {
  const authStore = useAuthStore((state) => state)
  const { data: user } = useSWR(
    authStore.accessToken ? '/api/user' : null,
    async (url) => await fetchWithToken<GETUserResponse>(authStore, url),
  )

  function showModalWhenLogin() {
    if (user) {
      setShowModal(true)
    } else {
      toast.error(
        <div>
          로그인이 필요해요{' '}
          <Link className="text-violet-700 underline underline-offset-2" href="/login">
            로그인하기
          </Link>
        </div>,
      )
    }
  }

  const [showModal, setShowModal] = useState(false)

  //
  const [content, setContent] = useState('')

  useEffect(() => {
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  useEffect(() => {
    if (content) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = null
    }
  }, [content])

  async function requestCreatingPost(e: FormEvent) {
    e.preventDefault()

    await fetch('/api/post', { method: 'POST', body: JSON.stringify(content) })
  }

  return (
    <>
      <HideChannelTalkButton />
      <button
        className="fixed bottom-8 right-8 rounded-full bg-violet-500 p-4 sm:relative sm:bottom-0 sm:right-0"
        onClick={showModalWhenLogin}
      >
        <QuillIcon height="24" width="24" />
      </button>
      <Modal
        className="flex h-full w-full items-center justify-center sm:h-fit sm:w-fit"
        fullscreen
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <form
          className="flex h-full w-full flex-col items-center gap-2 bg-white p-3 sm:h-fit sm:w-fit sm:rounded-2xl"
          onSubmit={requestCreatingPost}
        >
          <div className="flex w-full max-w-screen-lg items-stretch justify-between">
            <button className="px-2 text-lg" type="reset" onClick={() => setShowModal(false)}>
              취소
            </button>
            <button
              className="transition-color peer whitespace-nowrap rounded-full bg-violet-200 px-4 py-2 text-sm text-violet-700 duration-300 hover:bg-violet-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300"
              disabled={content.length === 0}
              type="submit"
            >
              게시하기
            </button>
          </div>
          <div className="flex w-full max-w-screen-lg flex-1 gap-2">
            <Squircle
              fill={hashToColorHexCode(user?.nickname) ?? '#fae100'}
              href={user?.profileImageURLs?.[0]}
              wrapperClassName="w-10"
            >
              {user?.nickname?.slice(0, 2) ?? 'DS'}
            </Squircle>
            <textarea
              className="h-full w-full resize-none p-2 sm:max-h-screen sm:min-h-[10rem] sm:w-screen sm:max-w-prose sm:resize-y"
              placeholder="무슨 일이 일어나고 있나요?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}
