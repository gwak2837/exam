// 자동
export const NODE_ENV = process.env.NODE_ENV
export const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL as string
const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV as string

// 환경 공통
export const PROJECT_ENV = process.env.PROJECT_ENV as string
export const REVALIDATION_KEY = process.env.REVALIDATION_KEY as string

export const KV_URL = process.env.KV_URL as string
export const KV_REST_API_URL = process.env.KV_REST_API_URL as string
export const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN as string
export const KV_REST_API_READ_ONLY_TOKEN = process.env.KV_REST_API_READ_ONLY_TOKEN as string

export const POSTGRES_URL = process.env.POSTGRES_URL as string
export const POSTGRES_PRISMA_URL = process.env.POSTGRES_PRISMA_URL as string
export const POSTGRES_URL_NON_POOLING = process.env.POSTGRES_URL_NON_POOLING as string
export const POSTGRES_USER = process.env.POSTGRES_USER as string
export const POSTGRES_HOST = process.env.POSTGRES_HOST as string
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE as string

export const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN as string

// 환경 개별
export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID as string
export const NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY = process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY as string

// 상수
export const APPLICATION_NAME = 'BDSM 고사'
export const APPLICATION_SHORT_NAME = 'BDSM 고사'
export const DESCRIPTION = 'BDSM 고사에서는 BDSM에 대한 깊이 있는 지식을 테스트해 볼 수 있어요'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},BDSM,exam,test,지식,테스트,퀴즈` // 최대 10개
export const CATEGORY = 'BDSM'
export const AUTHOR = ''
export const THEME_COLOR = '#5f0080'
export const CANONICAL_URL =
  NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://bdsm.vercel.app'
    : NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
