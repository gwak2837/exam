// 자동
export const NODE_ENV = process.env.NODE_ENV
export const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL as string
const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV as string

// 환경 공통
export const PROJECT_ENV = process.env.PROJECT_ENV as string
export const REVALIDATION_KEY = process.env.REVALIDATION_KEY as string
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY as string
export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY as string

export const KV_URL = process.env.KV_URL as string
export const KV_REST_API_URL = process.env.KV_REST_API_URL as string
export const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN as string
export const KV_REST_API_READ_ONLY_TOKEN = process.env.KV_REST_API_READ_ONLY_TOKEN as string

export const PGURI = process.env.PGURI as string
export const POSTGRES_CERT = process.env.POSTGRES_CERT as string
export const POSTGRES_URL = process.env.POSTGRES_URL as string
export const POSTGRES_PRISMA_URL = process.env.POSTGRES_PRISMA_URL as string
export const POSTGRES_URL_NON_POOLING = process.env.POSTGRES_URL_NON_POOLING as string
export const POSTGRES_USER = process.env.POSTGRES_USER as string
export const POSTGRES_HOST = process.env.POSTGRES_HOST as string
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE as string

export const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN as string

export const NEXT_PUBLIC_BBATON_CLIENT_ID = process.env.NEXT_PUBLIC_BBATON_CLIENT_ID as string
export const NEXT_PUBLIC_BBATON_REDIRECT_URI = process.env.NEXT_PUBLIC_BBATON_REDIRECT_URI as string
export const BBATON_CLIENT_SECRET = process.env.BBATON_CLIENT_SECRET as string

// 환경 개별
export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID as string
export const NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY = process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY as string

// 상수
export const APPLICATION_NAME = 'BDSM 고사'
export const APPLICATION_SHORT_NAME = 'BDSM 고사'
export const DESCRIPTION =
  'BDSM 고사를 통해 깊이 있는 BDSM 지식을 검증해보세요. BDSM에 대한 폭넓고 심층적인 지식을 확인하고 향상할 수 있는 기회를 제공합니다.'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},BDSM,고사,지식,테스트,퀴즈,시험,exam,test` // 최대 10개
export const CATEGORY = 'BDSM'
export const AUTHOR = ''
export const THEME_COLOR = '#5f0080'
export const CANONICAL_URL =
  NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://bdsm.vercel.app'
    : NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
