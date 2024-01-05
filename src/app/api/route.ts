import { pool } from '@/app/api/postgres'

export const runtime = 'edge'

export async function GET() {
  const { rows } = await pool.query("SELECT 'Hello world!'")
  return Response.json({ data: rows })
}
