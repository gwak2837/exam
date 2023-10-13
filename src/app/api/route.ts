import { kv } from '@vercel/kv'

export async function GET() {
  return 'Hello world!'
}

export async function POST() {
  try {
    await kv.set('user_1_session', '123abc', { ex: 100, nx: true })
  } catch (error) {
    console.error(error)
  }
}
