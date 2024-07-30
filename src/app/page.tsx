import Image from 'next/image'
import Link from 'next/link'

import 테스트보기Link from '@/app/테스트보기Link'

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-between gap-12 p-4 sm:p-8 md:p-12 lg:p-16">
      <Link className="flex place-items-center gap-2 whitespace-nowrap p-4" href="/">
        By <Image alt="BDSM Logo" height={24} priority src="/bdsm-logo.svg" width={24} />
      </Link>

      <h1 className="relative z-[-1] flex place-items-center whitespace-nowrap text-3xl sm:before:absolute sm:before:h-[300px] sm:before:w-[480px] sm:before:-translate-x-1/2 sm:before:rounded-full sm:before:bg-gradient-radial sm:before:from-white sm:before:to-transparent sm:before:blur-2xl sm:before:content-[''] sm:after:absolute sm:after:-z-20 sm:after:h-[180px] sm:after:w-[240px] sm:after:translate-x-1/3 sm:after:bg-gradient-conic sm:after:from-sky-200 sm:after:via-blue-200 sm:after:blur-2xl sm:after:content-[''] sm:before:dark:bg-gradient-to-br sm:before:dark:from-transparent sm:before:dark:to-blue-700 sm:before:dark:opacity-10 sm:after:dark:from-sky-900 sm:after:dark:via-[#0141ff] sm:after:dark:opacity-40 sm:before:lg:h-[360px]">
        BDSM 고사
      </h1>

      <div className="flex flex-col items-center gap-2">
        <테스트보기Link />
        <div className="h-60 rounded-lg border bg-white/50 p-2 sm:h-52 md:h-40">
          <div className="grid h-full max-w-prose gap-2 overflow-y-auto text-sm text-gray-700">
            <p>
              본 테스트는 BDSM에 대한 지식과 이해도를 검증하기 위한 목적으로 제작되었습니다. 테스트 문항 중에는 성적
              행위와 관련된 내용이 포함되어 있을 수 있음을 알려 드립니다. 각 문항은 성인 대상의 성적 표현과 테마를
              다루고 있으며, 이러한 내용에 대해 민감하거나 불편함을 느끼는 분들에게는 이 테스트가 적합하지 않을 수
              있습니다. 모든 참여자는 본인의 편안함과 준비 상태를 고려하여 테스트 참여를 결정하시기 바랍니다.
            </p>
            <p>
              이러한 문항은 BDSM의 다양한 측면과 원칙에 대한 이해를 높이고, 사람들이 이러한 활동을 더 안전하고 존중하는
              방식으로 탐험하도록 돕는 데 유용할 것입니다. 각 질문은 해당 주제와 관련된 기본적인 지식을 기반으로 하고
              있습니다. BDSM은 존중과 동의, 그리고 안전에 중점을 둬야 함을 기억해주세요.
            </p>
            <p>
              테스트 결과의 해석과 활용에 주의해 주세요. 이 테스트의 결과는 참여자의 BDSM에 대한 기본 지식을 검증하는 데
              도움을 주는 참고 자료일 뿐입니다. 결과에 대해 과도한 의미 부여나 일반화를 하지 않으시기 바라며, 개인의
              성향, 경험, 지식 등을 고려하는 것이 중요합니다. 본 테스트를 활용하거나 참고하여 발생한 어떠한 문제에
              대해서도 테스트 제공자는 책임을 지지 않습니다. 모든 책임과 결과는 테스트를 이용한 당사자에게 있으며,
              안전과 책임감을 가지고 테스트를 활용하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
      <footer className="flex flex-wrap justify-center gap-x-2 whitespace-nowrap text-gray-400">
        <span>COPYRIGHT AT bdsm.vercel.app</span>
        <span>ALL RIGHT RESERVED</span>
      </footer>
    </main>
  )
}
