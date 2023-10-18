'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  add: number
}

export default function 이동Link({ children, add }: Props) {
  const { questionCount, questionIndex } = useParams()

  const disabled = +questionIndex + add < 1 || +questionIndex + add > +questionCount

  return (
    <Link
      aria-disabled={disabled}
      className="px-4 py-3 text-sm text-gray-700 aria-disabled:text-gray-400 rounded-lg transition-color duration-300 bg-gray-300 hover:bg-gray-400/50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 aria-disabled:hover:bg-gray-300 aria-disabled:cursor-not-allowed"
      href={`${+questionIndex + add}`}
      onClick={(e) => disabled && e.preventDefault()}
    >
      {children}
    </Link>
  )
}
