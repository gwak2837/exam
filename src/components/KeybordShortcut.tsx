'use client'

import { useEffect, type ReactNode } from 'react'

type Props = {
  keyCode: string
  children: ReactNode
  onKeyDown?: () => void
}

export default function KeybordShortcut({ children, keyCode, onKeyDown }: Props) {
  useEffect(() => {
    function downHandler({ code, altKey }: KeyboardEvent) {
      if (altKey && keyCode === code) {
        onKeyDown?.()
      }
    }

    document.addEventListener('keydown', downHandler)
    return () => {
      document.removeEventListener('keydown', downHandler)
    }
  }, [keyCode, onKeyDown])

  return <>{children}</>
}
