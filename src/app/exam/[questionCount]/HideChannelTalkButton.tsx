'use client'

import { useEffect } from 'react'

import { waitForElement } from '@/util/dom'

export default function HideChannelTalkButton() {
  useEffect(() => {
    void (async () => {
      const element = await waitForElement(document, '#ch-plugin-entry > div')
      const element2 = element.shadowRoot?.querySelector('#ch-shadow-root-wrapper')
      if (!element2) return

      const channelTalkButton = await waitForElement(element2, '#ch-shadow-root-wrapper > div')
      channelTalkButton?.setAttribute('style', 'display: none')
    })()

    return () =>
      document
        .querySelector('#ch-plugin-entry > div')
        ?.shadowRoot?.querySelector('#ch-shadow-root-wrapper > div')
        ?.removeAttribute('style')
  }, [])

  return null
}
