import prisma from '@/app/api/prisma'
import { OAuthProvider } from '@/database/OAuth'

export async function createOAuthUser({
  ageRange = 20,
  sex = 1,
  oAuthId = 'gwak2837',
  provider = OAuthProvider.BBATON,
}) {
  return await prisma.user.create({
    data: {
      ageRange,
      sex,
      oAuth: {
        create: {
          id: oAuthId,
          provider,
        },
      },
    },
  })
}

export async function deleteOAuthUser({ oAuthId = 'gwak2837', provider = OAuthProvider.BBATON }) {
  const deleteOAuth = await prisma.oAuth.delete({
    where: {
      id_provider: {
        id: oAuthId,
        provider,
      },
    },
  })
  if (!deleteOAuth.userId) return

  await prisma.user.delete({
    where: {
      id: deleteOAuth.userId,
    },
  })
}
