import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { type PageProps } from '@/common/types'
import HideChannelTalkButton from '@/components/HideChannelTalkButton'
import { TinymceEditorLoading } from '@/components/TinymceEditor'

const TinymceEditor = dynamic(async () => await import('@/components/TinymceEditor'), {
  ssr: false,
  loading: TinymceEditorLoading,
})

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <main className="flex min-h-[100svh] flex-col items-center sm:p-8 lg:p-16 2xl:p-24">
      <HideChannelTalkButton />
      <div className="flex w-full max-w-screen-lg justify-between py-2">
        <button className="px-4 py-2">취소</button>
        <button className="transition-color peer whitespace-nowrap rounded-full bg-violet-200 px-4 py-2 text-sm text-violet-700 duration-300 hover:bg-violet-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300">
          게시하기
        </button>
      </div>
      <div className="flex max-w-screen-lg flex-1">
        <TinymceEditor placeholder={placeholder} />
      </div>
    </main>
  )
}

const placeholder = `> 구인글 첫 문단에는 본인과 원하는 파트너의 성적 지향과 성향을 명확하게 명시해야 합니다("마조히스트 성향의 이성애자 섭이 사디스트/헌터 성향의 멜 돔을 구인해요” 등등). 또한 상대가 자신에 대해 알 수 있도록 외모, 취향, 지역, 성향, 플레이 강도 등등 충분한 자기소개를 작성하는 것을 권장합니다. 그러나 신상이 특정될 수 있는 몸 사진 혹은 얼굴 사진을 구인글에 공개적으로 첨부하는 것은 권장하지 않습니다.\n
> 구인글의 링크는 오픈 카카오톡 주소 위주로 사용해주시기 바랍니다.\n
> 트위터 등은 신상 노출등을 고려하여 금지하고 있습니다.\n
> 구인을 허용한다는 것이 친목을 허용한다는 뜻은 아닙니다. 직접적인 닉네임 언급, 파벌 형성 등등은 차단 사유에 해당합니다. 현실에서 파트너/커플 관계더라도 채널 내에서는 언급을 금지합니다.`
