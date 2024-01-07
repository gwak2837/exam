import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

export default prisma

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  interface BigInt {
    toJSON: () => string
  }
}

/* eslint-disable no-extend-native */
BigInt.prototype.toJSON = function (): string {
  return this.toString()
}
