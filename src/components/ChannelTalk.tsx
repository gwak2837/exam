'use client'

import * as ChannelService from '@channel.io/channel-web-sdk-loader'
import { useEffect } from 'react'

export default function ChannelTalk() {
  useEffect(() => {
    ChannelService.loadScript()
    ChannelService.boot({
      pluginKey: '882e72cc-247f-4307-b3d9-ada158054a4c',
    })

    return () => ChannelService.shutdown()
  }, [])

  return null
}
