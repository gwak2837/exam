import prisma, { PrismaError } from '@/app/api/prisma'
import { BBATON_CLIENT_SECRET, NEXT_PUBLIC_BBATON_CLIENT_ID, NEXT_PUBLIC_BBATON_REDIRECT_URI } from '@/common/constants'
import { OAuthProvider } from '@/database/OAuth'
import { AuthToken, signJWT } from '@/util/jwt'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  if (!code) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

  const base64Token = btoa(`${NEXT_PUBLIC_BBATON_CLIENT_ID}:${BBATON_CLIENT_SECRET}`)
  const tokenResponse = await fetch('https://bauth.bbaton.com/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64Token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: NEXT_PUBLIC_BBATON_REDIRECT_URI,
      code,
    }),
  })

  const token: BBatonTokenResponse = await tokenResponse.json()
  if (!token.access_token) return new Response('502 Bad Gateway', { status: 502, statusText: 'Bad Gateway' })

  const bbatonUsername: string = JSON.parse(atob(token.access_token.split('.')[1])).user_name
  if (!bbatonUsername) return new Response('502 Bad Gateway', { status: 502, statusText: 'Bad Gateway' })

  const [oauth] = await prisma.$queryRaw<[OAuthUserRow?]>`
    SELECT "OAuth".id,
      "User".id AS "user_id",
      "User"."suspendedAt" AS "user_suspendedAt",
      "User"."unsuspendAt" AS "user_unsuspendAt",
      "User"."suspendedType" AS "user_suspendedType",
      "User"."suspendedReason" AS "user_suspendedReason"
    FROM "OAuth"
      JOIN "User" ON "User".id = "OAuth"."userId"
    WHERE "OAuth".id = ${bbatonUsername}
      AND "OAuth".provider = ${OAuthProvider.BBATON};`

  if (!oauth) {
    const init = { headers: { Authorization: `Bearer ${token.access_token}` } }
    const bbatonUserResponse = await fetch('https://bauth.bbaton.com/v2/user/me', init)

    const bbatonUser: BBatonUserResponse = await bbatonUserResponse.json()
    if (!bbatonUser.user_id) return new Response('502 Bad Gateway', { status: 502, statusText: 'Bad Gateway' })

    const user = await prisma.user
      .create({
        data: {
          ageRange: +bbatonUser.birth_year,
          sex: encodeBBatonGender(bbatonUser.gender),
          oAuth: {
            create: {
              id: bbatonUser.user_id,
              provider: OAuthProvider.BBATON,
            },
          },
        },
        select: { id: true },
      })
      .catch((error) => {
        // NOTE(gwak): 위 쿼리가 여러 번 실행될 수 있어 UNIQUE_CONSTRAINT을 만족하지 못할 수 있다
        if (error.code === PrismaError.UNIQUE_CONSTRAINT_FAILED) return null
        throw error
      })
    if (!user) return new Response('400 Bad Request', { status: 400, statusText: 'Bad Request' })

    return Response.json({
      accessToken: await signJWT({ sub: user.id }, AuthToken.ACCESS_TOKEN),
      refreshToken: await signJWT({ sub: user.id }, AuthToken.REFRESH_TOKEN),
    })
  } else if (!oauth.user_id) {
    const infoMessage = 'You have already signed up with this BBaton account before.'
    return new Response(infoMessage, { status: 403, statusText: 'Forbidden' })
  } else if (oauth.user_suspendedType) {
    const infoMessage = `You cannot login with this account bacause:\n${oauth.user_suspendedReason}`
    return new Response(infoMessage, { status: 403, statusText: 'Forbidden' })
  }

  fetch('https://bauth.bbaton.com/v2/user/me', { headers: { Authorization: `Bearer ${token.access_token}` } })
    .then(async (bbatonUserResponse) => await bbatonUserResponse.json())
    .then(async (bbatonUser: BBatonUserResponse) => {
      if (!bbatonUser.user_id || !oauth.user_id) return
      await prisma.user.update({
        data: {
          ageRange: +bbatonUser.birth_year,
          sex: encodeBBatonGender(bbatonUser.gender),
        },
        where: { id: oauth.user_id },
        select: { id: true },
      })
    })
    .catch((error) => console.warn('Warn: Fail to update age range of user from BBaton.\n' + error))

  return Response.json({
    accessToken: await signJWT({ sub: oauth.user_id }, AuthToken.ACCESS_TOKEN),
    refreshToken: await signJWT({ sub: oauth.user_id }, AuthToken.REFRESH_TOKEN),
  })
}

type BBatonTokenResponse = {
  access_token: string
  token_type: 'bearer'
  expires_in: number
  scope: string
}

type BBatonUserResponse = {
  user_id: string
  adult_flag: string
  birth_year: string
  gender: string
  income?: string
  student?: string
}

type OAuthUserRow = {
  id: string
  user_id: string
  user_suspendedAt: string
  user_unsuspendAt: string
  user_suspendedType: string
  user_suspendedReason: string
}

function encodeBBatonGender(gender: string) {
  switch (gender) {
    case 'M':
    case 'male':
      return 1
    case 'F':
    case 'female':
      return 2
    default:
      return 0
  }
}
