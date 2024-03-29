import { PrismaClient } from '@prisma/client'

import { NODE_ENV } from '@/common/constants'

const prisma = new PrismaClient({ log: NODE_ENV === 'test' ? [] : ['query'] })

export default prisma

declare global {
  interface BigInt {
    toJSON: () => string
  }
}

/* eslint-disable no-extend-native */
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export enum PrismaError {
  UNIQUE_CONSTRAINT_FAILED = 'P2002',
}

export const POSTGRES_MAX_BIGINT = 9223372036854775807n
