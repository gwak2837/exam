import { kv } from '@vercel/kv'

export async function GET() {
  return Response.json({ data: 'Hello world!' })
}

export async function POST() {
  try {
    const data = await kv.set('user_1_session', '123abc', { ex: 100, nx: true })
    return Response.json({ data })
  } catch (error) {
    return Response.json({ error })
  }
}
