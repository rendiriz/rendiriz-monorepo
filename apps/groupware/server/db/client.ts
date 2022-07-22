/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';
const { env } = require('../env');

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
