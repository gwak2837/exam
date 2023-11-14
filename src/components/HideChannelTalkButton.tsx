'use client'

import { useEffect } from 'react'

import { waitForElement } from '@/util/dom'

export default function HideChannelTalkButton() {
  useEffect(() => {
    void (async () => {
      const element = await waitForElement('#ch-plugin-entry > div')
      const channelTalkElement = element.shadowRoot?.querySelector('#ch-shadow-root-wrapper')
      channelTalkElement?.setAttribute('style', 'display: none')
    })()

    return () =>
      document
        .querySelector('#ch-plugin-entry > div')
        ?.shadowRoot?.querySelector('#ch-shadow-root-wrapper')
        ?.removeAttribute('style')
  }, [])

  return null
}
