'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { type Params } from '@/common/types'

export default function LanguageUpdate() {
  const { lang } = useParams<Params>()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return null
}
