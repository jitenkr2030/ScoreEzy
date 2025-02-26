import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set. Please check your environment configuration.')
  }

  try {
    return new PrismaClient({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    })
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error)
    throw new Error('Database connection failed. Please check your database configuration and credentials.')
  }
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

