import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prsm: PrismaClient | undefined;

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prsm = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }

    prsm = global.prisma;
  }
}

export const prisma = prsm;
