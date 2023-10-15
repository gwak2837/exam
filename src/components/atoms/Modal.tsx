'use client'

import Image from 'next/image'
import { MouseEvent, ReactNode, TouchEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
  lazy?: boolean
  open: boolean
  onClose?: () => void
  showCloseButton?: boolean
  showDragButton?: boolean
}

export default function Modal({ children, open, onClose, showCloseButton, showDragButton }: Props) {
  function closeModal(e: MouseEvent) {
    e.stopPropagation()
    onClose?.()
  }

  useEffect(() => {
    function closeOnEscapeKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose?.()
      }
    }

    if (open) {
      const bodyStyle = document.body.style

      document.addEventListener('keydown', closeOnEscapeKey, false)
      bodyStyle.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', closeOnEscapeKey, false)
        bodyStyle.overflow = ''
      }
    }
  }, [open])

  // --
  const modalRef = useRef<HTMLDivElement>(null)

  function dragModalMouse(event: MouseEvent) {
    const modal = modalRef.current
    if (!modal) return

    const modalRect = modal.getBoundingClientRect()
    const modalStyle = modal.style

    let shiftX = event.clientX - modalRect.left
    let shiftY = event.clientY - modalRect.top

    function moveModal(event: globalThis.MouseEvent) {
      modalStyle.left = event.clientX - shiftX + 'px'
      modalStyle.top = event.clientY - shiftY + 'px'
    }

    document.addEventListener('mousemove', moveModal)
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', moveModal), { once: true })
  }

  function dragModalTouch(event: TouchEvent) {
    const modal = modalRef.current
    if (!modal) return

    const modalRect = modal.getBoundingClientRect()
    const modalStyle = modal.style

    let shiftX = event.touches[0].clientX - modalRect.left
    let shiftY = event.touches[0].clientY - modalRect.top

    function moveModal(event: globalThis.TouchEvent) {
      modalStyle.left = event.touches[0].clientX - shiftX + 'px'
      modalStyle.top = event.touches[0].clientY - shiftY + 'px'
    }

    document.addEventListener('touchmove', moveModal)
    document.addEventListener('touchend', () => document.removeEventListener('touchmove', moveModal), { once: true })
    document.addEventListener('touchcancel', () => document.removeEventListener('touchmove', moveModal), { once: true })
  }

  const o = String(open)

  // --
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-20 flex justify-center items-center bg-black/25 transition duration-300 ${c.show[o]}`}
      onClick={closeModal}
    >
      {showCloseButton && (
        <Image
          src="/images/x.svg"
          alt="x"
          width="48"
          height="48"
          className="absolute top-0 right-0 z-10 p-3 cursor-pointer"
          onClick={closeModal}
        />
      )}
      <div
        className={`absolute transition duration-300 ${c.scale[o]}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {showDragButton && (
          <div
            className="absolute top-0 left-0 right-0 z-10 flex justify-center h-4 p-2 cursor-move"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={dragModalMouse}
            onTouchStart={dragModalTouch}
          >
            <div className="w-8 h-1 rounded-full bg-slate-200" />
          </div>
        )}
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') ?? document.body,
  )
}

const c = {
  scale: {
    true: 'scale-100',
    false: 'scale-90',
  },
  show: {
    true: 'opacity-100 pointer-events-auto',
    false: 'opacity-0 pointer-events-none',
  },
} as Record<string, any>
