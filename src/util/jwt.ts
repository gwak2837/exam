import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken'

import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '@/common/constants'

const { sign, verify } = jsonwebtoken

export enum TokenType {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
}

export type AuthTokenPayload = JwtPayload & {
  // uid: string
}

// https://developer.amazon.com/docs/login-with-amazon/access-token.html#:~:text=%22bearer%22%2C-,%22expires_in%22%3A3600%2C,-%22refresh_token%22%3A
export async function signJWT(payload: AuthTokenPayload, type: TokenType, expiresIn = '1 hour') {
  return await new Promise<string>((resolve, reject) => {
    sign(
      payload,
      type === TokenType.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY,
      {
        notBefore: '-5 minutes',
        expiresIn:
          type === TokenType.ACCESS_TOKEN ? '1 hour' : type === TokenType.REFRESH_TOKEN ? '30 days' : expiresIn,
      },
      (err, token) => {
        if (!token || err) return reject(err)
        resolve(token)
      },
    )
  })
}

export async function verifyJWT(token: string, type: TokenType) {
  return await new Promise<AuthTokenPayload>((resolve, reject) => {
    verify(
      token,
      type === TokenType.ACCESS_TOKEN ? ACCESS_TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY,
      { algorithms: ['HS256'] },
      (err, decoded: any) => {
        if (!decoded || err) return reject(err) // JWT가 아니거나, JWT 서명이 유효하지 않거나, JWT 유효기간이 만료됐을 때
        resolve(decoded)
      },
    )
  })
}
/* {
  "iss": "https://accounts.google.com",
  "azp": "988296421237-q91q5j1kfl7no6sdn5uep23ersecaro8.apps.googleusercontent.com",
  "aud": "988296421237-q91q5j1kfl7no6sdn5uep23ersecaro8.apps.googleusercontent.com",
  "sub": "111480564111084783931",
  "email": "gwak2837@gmail.com",
  "email_verified": true,
  "nbf": 1704464837,
  "name": "곽태욱",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocKSAgyesqHM_0xRbGVbevSHP0CYU-YCi6SIGvPoKIT7Dg=s96-c",
  "given_name": "태욱",
  "family_name": "곽",
  "locale": "ko",
  "iat": 1704465137,
  "exp": 1704468737,
  "jti": "2e4a94f2cd5f1a78a214b921983d4e6abeb4be86"
} */
