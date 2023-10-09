import { kv } from '@vercel/kv'

export async function GET() {
  return await kv.get('user_1_session')
}

export async function POST() {
  return await kv.set('user_1_session', 'session_token_value')
}
