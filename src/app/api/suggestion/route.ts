import { kv } from '@vercel/kv'

export async function POST(request: Request) {
  try {
    const data = await kv.set(`suggestion:${Date.now()}`, '123abc', { ex: 100, nx: true })
    return Response.json({ data })
  } catch (error) {
    return Response.json({ error })
  }
}
