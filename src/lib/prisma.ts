// src/lib/prisma.js
import { PrismaClient } from '@prisma/client';

// Add prisma to the NodeJS global type
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if we already have an instance of Prisma Client
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Only in development, save the prisma instance in global
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;