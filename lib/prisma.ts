import { PrismaClient } from '@prisma/client'

const MAX_RETRIES = 3
const RETRY_DELAY = 2000 // 2 seconds

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | null = null

const getPrismaClient = () => {
  const databaseUrl = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set. Please check your environment configuration.')
  }

  if (prismaInstance) return prismaInstance

  prismaInstance = new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'pretty',
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  })

  return prismaInstance
}

export const prisma = globalForPrisma.prisma ?? getPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

