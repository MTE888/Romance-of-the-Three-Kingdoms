# Multi-stage Dockerfile for Three Kingdoms API
# Development stage: includes dev dependencies and supports hot reload
# Production stage: optimized production build

# ============================================
# Base Stage - Common dependencies
# ============================================
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY .npmrc ./

# ============================================
# Dependencies Stage - Install all dependencies
# ============================================
FROM base AS dependencies

# Copy all package.json files
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/

# Install all dependencies (including dev dependencies)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/api ./apps/api
COPY packages/database ./packages/database
COPY packages/types ./packages/types
COPY turbo.json ./
COPY tsconfig.json ./

# ============================================
# Development Stage - Hot reload
# ============================================
FROM dependencies AS development

WORKDIR /app

# Generate Prisma Client
RUN cd packages/database && pnpm exec prisma generate

# Expose API port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start development server (command specified in docker-compose.yml)
CMD ["pnpm", "--filter", "api", "dev"]

# ============================================
# Build Stage - Compile TypeScript
# ============================================
FROM dependencies AS build

WORKDIR /app

# Generate Prisma Client
RUN cd packages/database && pnpm exec prisma generate

# Build all packages
RUN pnpm run build

# ============================================
# Production Stage - Minimal runtime
# ============================================
FROM node:20-alpine AS production

# Install pnpm and curl for healthcheck
RUN npm install -g pnpm@8 && \
    apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY .npmrc ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built files from build stage
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/database/dist ./packages/database/dist
COPY --from=build /app/packages/types/dist ./packages/types/dist

# Copy Prisma schema and migrations
COPY --from=build /app/packages/database/prisma ./packages/database/prisma
COPY --from=build /app/packages/database/node_modules/.prisma ./packages/database/node_modules/.prisma

# Generate Prisma Client in production
RUN cd packages/database && pnpm exec prisma generate

# Set to production environment
ENV NODE_ENV=production

# Expose API port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

# Run migrations and start server
CMD cd packages/database && pnpm exec prisma migrate deploy && cd /app/apps/api && node dist/server.js
