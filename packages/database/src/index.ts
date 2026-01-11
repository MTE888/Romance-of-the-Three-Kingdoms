/**
 * Three Kingdoms Platform - Database Package
 *
 * Prisma client and database utilities
 */

import { PrismaClient } from './generated';

// Export Prisma client and types
export * from './generated';

// Export database version
export const DATABASE_VERSION = '0.1.0';

// Export singleton database client instance
// This ensures only one Prisma Client instance is created across the application
let db: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  // In development, use a global variable to preserve the client across hot reloads
  if (!global.__db) {
    global.__db = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  db = global.__db;
}

export { db };
