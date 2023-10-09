// 자동
export const NODE_ENV = process.env.NODE_ENV as string
const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL as string
const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV as string

// 환경 공통
export const PROJECT_ENV = process.env.PROJECT_ENV as string
export const REVALIDATION_KEY = process.env.REVALIDATION_KEY as string

// 환경 개별
export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID as string

export const APPLICATION_NAME = 'BDSM 고사 - BDSM 지식 테스트' // = site.webmanifest name
export const APPLICATION_SHORT_NAME = 'BDSM 고사' // = site.webmanifest short_name
export const DESCRIPTION = 'BDSM 고사에서는 BDSM에 대한 깊이 있는 지식을 테스트해 볼 수 있어요'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},BDSM,exam,test` // 최대 10개
export const CATEGORY = 'BDSM'
export const AUTHOR = ''
export const THEME_COLOR = '#bae6fd'
export const CANONICAL_URL =
  NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://bdsm.vercel.app'
    : NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
