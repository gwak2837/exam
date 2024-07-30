'use client'

import Link from 'next/link'
import { type FormEvent, useState, useEffect, useRef, type KeyboardEvent } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

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
    async (url) => await fetchWithToken<any>(authStore, url),
  )

  const [showModal, setShowModal] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  function showModalWhenLogin() {
    if (user) {
      // if (true) {
      divRef.current?.focus()
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

  //
  const formRef = useRef<HTMLFormElement>(null)

  function submitWhenCommandEnter(e: KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    '/api/post',
    async (url) =>
      await fetchWithToken(authStore, url, {
        method: 'POST',
        body: JSON.stringify({ content }),
      }),
  )

  async function requestCreatingPost(e: FormEvent) {
    e.preventDefault()
    if (!authStore.accessToken) return toast.error('로그인이 필요합니다')

    try {
      await trigger()
      setShowModal(false)
      setContent('')
      toast.success('글을 작성했어요')
    } catch (error) {
      toast.error('글 작성에 실패했어요')
    }
  }

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
        className="fixed inset-0 flex items-center justify-center sm:static sm:h-fit sm:w-fit"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <form
          ref={formRef}
          className="flex h-full w-full flex-col items-center gap-2 bg-white p-3 sm:h-fit sm:w-fit sm:rounded-2xl"
          onSubmit={requestCreatingPost}
        >
          <div className="sticky top-0 flex w-full max-w-screen-lg items-stretch justify-between">
            <button className="px-2 text-lg" type="reset" onClick={() => setShowModal(false)}>
              취소
            </button>
            <button
              className="transition-color peer whitespace-nowrap rounded-full bg-violet-200 px-4 py-2 text-sm text-violet-700 duration-300 hover:bg-violet-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300"
              disabled={content.length === 0}
              type="submit"
            >
              게시하기{isMutating && <span>...</span>}
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
            <div
              ref={divRef}
              className=" h-fit w-full p-2 sm:max-h-screen sm:min-h-[10rem] sm:w-screen sm:max-w-prose sm:resize-y"
              contentEditable
              placeholder="무슨 일이 일어나고 있나요?"
              // value={content}
              onChange={(e) => setContent((e.target as any).value)}
              onKeyDown={submitWhenCommandEnter}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}
