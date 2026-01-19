/**
 * Prisma Database Client Configuration
 *
 * This module configures and exports a singleton Prisma client instance
 * optimized for use with Neon's serverless PostgreSQL driver. The Neon adapter
 * provides connection pooling and edge-compatible database access, making it
 * ideal for serverless and edge deployments.
 */

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Global reference to store the Prisma client instance across hot reloads.
 *
 * In Next.js development mode, the module is re-evaluated on every hot reload,
 * which would normally create new PrismaClient instances. This leads to
 * connection pool exhaustion with the error:
 * "PrismaClientInitializationError: Too many database connections"
 *
 * By storing the client on `globalThis`, we preserve the instance across
 * hot reloads since `globalThis` persists throughout the Node.js process lifetime.
 *
 * @see {@link https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help | Prisma + Next.js Best Practices}
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Creates and configures a new Prisma client instance with the Neon adapter.
 *
 * This factory function initializes Prisma with:
 * 1. The Neon serverless adapter for optimized PostgreSQL connections
 * 2. Environment-appropriate logging configuration
 *
 * The Neon adapter (`@prisma/adapter-neon`) replaces Prisma's default connection
 * handling with Neon's serverless driver, which:
 * - Enables HTTP-based database connections (no persistent TCP)
 * - Supports edge runtime environments (Vercel Edge, Cloudflare Workers)
 * - Provides automatic connection pooling via Neon's infrastructure
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
 * Singleton Prisma client instance.
 *
 * Uses the nullish coalescing operator to either:
 * - Reuse an existing instance from `globalForPrisma` (in development)
 * - Create a new instance via `createPrismaClient()` (first load or production)
 */
const prisma = globalForPrisma.prisma ?? createPrismaClient();

/**
 * Store the client globally in non-production environments.
 *
 * This conditional ensures the singleton pattern only applies during development
 * where hot reloading is active. In production, each serverless function
 * invocation manages its own connection lifecycle, and Neon's pooling
 * handles connection reuse at the infrastructure level.
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Pre-configured Prisma client for database operations.
 *
 * This is the primary export for all database access throughout the application.
 * It provides type-safe database queries with full TypeScript autocompletion
 * based on the Prisma schema.
 *
 */
export default prisma;
