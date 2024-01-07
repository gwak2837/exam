import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken'

import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@/common/constants'

const { sign, verify } = jsonwebtoken

export enum AuthToken {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
}

export type AuthTokenPayload = JwtPayload & {
  // uid: string
}

// https://developer.amazon.com/docs/login-with-amazon/access-token.html#:~:text=%22bearer%22%2C-,%22expires_in%22%3A3600%2C,-%22refresh_token%22%3A
export async function signJWT(payload: AuthTokenPayload, type: AuthToken, expiresIn = '1 hour') {
  return await new Promise<string>((resolve, reject) => {
    sign(
      payload,
      type === AuthToken.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY,
      {
        notBefore: '-5 minutes',
        expiresIn:
          type === AuthToken.ACCESS_TOKEN ? '1 hour' : type === AuthToken.REFRESH_TOKEN ? '30 days' : expiresIn,
      },
      (err, token) => {
        if (!token || err) return reject(err)
        resolve(token)
      },
    )
  })
}

export async function verifyJWT(token: string, type: AuthToken) {
  return await new Promise<AuthTokenPayload>((resolve, reject) => {
    verify(
      token,
      type === AuthToken.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY,
      { algorithms: ['HS256'] },
      (err, decoded: any) => {
        if (!decoded || err) return reject(err) // JWT가 아니거나, JWT 서명이 유효하지 않거나, JWT 유효기간이 만료됐을 때
        resolve(decoded)
      },
    )
  })
}
