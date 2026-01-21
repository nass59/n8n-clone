/**
 * Singleton Prisma client with Neon serverless adapter.
 * Prevents connection pool exhaustion in dev via globalThis singleton.
 * Use: import prisma from "@/lib/db"; then prisma.{table}.{method}()
 */

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * PURPOSE: Factory to create Prisma client with Neon adapter and validate env vars
 * PURE: No (reads env, creates DB connection)
 * USED BY: Singleton initialization on first import
 */
const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
};

/**
 * PURPOSE: Type-safe database client for all Prisma queries
 * PURE: No (DB access)
 * USED BY: All server-side code accessing database (auth-utils, tRPC routers, service files)
 * PATTERN: Singleton via globalThis to prevent dev hot-reload connection leaks
 */
const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
