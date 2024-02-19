import prisma from '@/app/api/prisma'

export async function GET() {
  const result = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP`.catch((error) => console.error(error.message))
  return Response.json({ result })
}
