import { pool } from '@/app/api/postgres'

export async function GET() {
  const { rows } = await pool.query("SELECT 'Hello world!'")
  return Response.json({ data: rows })
}
