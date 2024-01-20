import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@/common/constants'

export enum AuthToken {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
}

export async function signJWT(payload: JWTPayload, type: AuthToken): Promise<string> {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // NOTE(taeuk): https://developer.amazon.com/docs/login-with-amazon/access-token.html#:~:text=%22bearer%22%2C-,%22expires_in%22%3A3600%2C,-%22refresh_token%22%3A
  const nbr = iat - 5 * 60 // NOTE(taeuk): Google OAuth
  const secretKey = type === AuthToken.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY

  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(nbr)
    .sign(new TextEncoder().encode(secretKey))
}

export async function verifyJWT(token: string, type: AuthToken): Promise<JWTPayload> {
  const secretKey = type === AuthToken.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey), { algorithms: ['HS256'] })
  return payload
}
