import prisma from '@/app/api/prisma'

export async function GET() {
  const result = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP`
  return Response.json({ result })
}
