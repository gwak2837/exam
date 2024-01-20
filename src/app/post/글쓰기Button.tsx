'use client'

import { type FormEvent, useState } from 'react'

import Modal from '@/components/atoms/Modal'
import Squircle from '@/components/atoms/Squircle'
import HideChannelTalkButton from '@/components/HideChannelTalkButton'
import QuillIcon from '@/svg/QuillIcon'

export default function 글쓰기Button() {
  const [showModal, setShowModal] = useState(false)
  const [content, setContent] = useState('')

  async function requestCreatingPost(e: FormEvent) {
    e.preventDefault()

    await fetch('/api/post', {})
  }

  return (
    <>
      <HideChannelTalkButton />
      <button
        className="fixed bottom-8 right-8 rounded-full bg-violet-500 p-4 sm:relative sm:bottom-0 sm:right-0"
        onClick={() => setShowModal(true)}
      >
        <QuillIcon height="24" width="24" />
      </button>
      <Modal fullscreen open={showModal} onClose={() => setShowModal(false)}>
        <form
          className="flex h-full w-full flex-col items-center gap-2 bg-white p-3 sm:h-fit sm:w-fit sm:rounded-2xl"
          onSubmit={requestCreatingPost}
        >
          <div className="flex w-full max-w-screen-lg items-stretch justify-between">
            <button className="px-2 text-lg" onClick={() => setShowModal(false)}>
              취소
            </button>
            <button
              className="transition-color peer whitespace-nowrap rounded-full bg-violet-200 px-4 py-2 text-sm text-violet-700 duration-300 hover:bg-violet-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300"
              disabled={content.length === 0}
            >
              게시하기
            </button>
          </div>
          <div className="flex w-full max-w-screen-lg flex-1 gap-2">
            <Squircle
              href="https://blog.kakaocdn.net/dn/lJTm3/btqz9tNsJFf/v2DrpinJKt1o1JyysoEcM1/img.jpg"
              wrapperClassName="w-10"
            />
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
