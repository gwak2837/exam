'use client'

import InfoIcon from '@/svg/InfoIcon'

export default function 난이도Tooltip() {
  return (
    <button className="group relative text-xs focus:outline-none" onClick={(e) => e.currentTarget.focus()}>
      <InfoIcon width="16" />
      <div
        className="max-w-64 pointer-events-none absolute top-full z-50 translate-x-[-50%] p-2 text-sm text-gray-500 opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100 group-focus:opacity-100"
        role="tooltip"
      >
        <div className="grid h-full w-full gap-1 rounded-lg border border-gray-200 bg-white p-4 shadow">
          <h3 className="whitespace-nowrap">난이도 = 문제 개수</h3>
          <p className="whitespace-nowrap font-normal">문제와 선택지 순서는 매번 랜덤</p>
        </div>
      </div>
    </button>
  )
}
