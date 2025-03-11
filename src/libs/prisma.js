import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}?pool_timeout=30`,
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: `${process.env.DATABASE_URL}?pool_timeout=30`,
        },
      },
    });
  }
  prisma = global.prisma;
}

export default prisma;
