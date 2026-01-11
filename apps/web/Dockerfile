# Multi-stage Dockerfile for Three Kingdoms Web Frontend
# Development stage: includes dev dependencies and supports hot reload
# Production stage: optimized static build served with nginx

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
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/types/package.json ./packages/types/

# Install all dependencies (including dev dependencies)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web ./apps/web
COPY packages/ui ./packages/ui
COPY packages/types ./packages/types
COPY turbo.json ./
COPY tsconfig.json ./

# ============================================
# Development Stage - Hot reload with Vite
# ============================================
FROM dependencies AS development

WORKDIR /app/apps/web

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# ============================================
# Build Stage - Compile and bundle with Vite
# ============================================
FROM dependencies AS build

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV VITE_GRAPHQL_ENDPOINT=/graphql
ENV VITE_API_URL=/api

# Build the application
RUN pnpm run build

# ============================================
# Production Stage - Serve with nginx
# ============================================
FROM nginx:alpine AS production

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

# Copy custom error pages (if any)
# COPY apps/web/public/404.html /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# nginx starts automatically
CMD ["nginx", "-g", "daemon off;"]
