# Docker Development Environment

This document explains how to use Docker for local development of the Three Kingdoms Platform.

## Overview

The Docker setup provides a complete local development environment with:
- **PostgreSQL 16** - Database with automatic migrations
- **Redis 7** - Caching layer
- **API Service** - Fastify + GraphQL backend with hot reload
- **Web Service** - React + Vite frontend with hot reload

All services are orchestrated with Docker Compose for easy setup and teardown.

## Prerequisites

- **Docker Desktop** 4.20+ (includes Docker Compose)
  - [Download for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Download for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Download for Linux](https://docs.docker.com/desktop/install/linux-install/)
- **Git** (to clone the repository)
- **Minimum 4GB RAM** allocated to Docker
- **Minimum 10GB disk space**

## Quick Start

### 1. Clone and Start

```bash
# Clone repository
git clone https://github.com/MTE888/Romance-of-the-Three-Kingdoms.git
cd Romance-of-the-Three-Kingdoms

# Start all services
./scripts/docker-dev.sh start

# Or use docker-compose directly
docker-compose up -d
```

### 2. Run Migrations and Seed Database

```bash
# Run database migrations
./scripts/docker-dev.sh db-migrate

# Seed with sample data
./scripts/docker-dev.sh db-seed
```

### 3. Access Services

Once services are running, access them at:

- **Web Frontend**: http://localhost:5173
- **API Server**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql
- **PostgreSQL**: `postgresql://threekingdoms:dev_password_change_in_production@localhost:5432/threekingdoms`
- **Redis**: `redis://localhost:6379`

## Helper Script Usage

The `scripts/docker-dev.sh` script provides convenient commands:

```bash
# Start/Stop
./scripts/docker-dev.sh start         # Start all services
./scripts/docker-dev.sh stop          # Stop all services
./scripts/docker-dev.sh restart       # Restart all services

# Logs
./scripts/docker-dev.sh logs          # All logs (streaming)
./scripts/docker-dev.sh logs-api      # API logs only
./scripts/docker-dev.sh logs-web      # Web logs only
./scripts/docker-dev.sh logs-db       # PostgreSQL logs only

# Build
./scripts/docker-dev.sh build         # Build images
./scripts/docker-dev.sh rebuild       # Rebuild (no cache)
./scripts/docker-dev.sh clean         # Remove everything

# Database
./scripts/docker-dev.sh db-migrate    # Run migrations
./scripts/docker-dev.sh db-seed       # Seed database
./scripts/docker-dev.sh db-studio     # Open Prisma Studio
./scripts/docker-dev.sh db-reset      # Reset database (⚠️ destructive)

# Shell Access
./scripts/docker-dev.sh shell-api     # API container shell
./scripts/docker-dev.sh shell-web     # Web container shell
./scripts/docker-dev.sh shell-db      # PostgreSQL shell

# Other
./scripts/docker-dev.sh health        # Check service health
./scripts/docker-dev.sh install       # Install dependencies
./scripts/docker-dev.sh help          # Show all commands
```

## Docker Compose Commands

If you prefer using docker-compose directly:

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
docker-compose logs -f api
docker-compose logs -f web

# Rebuild services
docker-compose build
docker-compose build --no-cache

# Remove everything (including volumes)
docker-compose down -v

# Run command in container
docker-compose exec api sh
docker-compose exec postgres psql -U threekingdoms
```

## Service Details

### PostgreSQL Service

```yaml
Container: three-kingdoms-db
Port: 5432
User: threekingdoms
Password: dev_password_change_in_production
Database: threekingdoms
```

**Connection String**:
```
postgresql://threekingdoms:dev_password_change_in_production@localhost:5432/threekingdoms
```

**Access via CLI**:
```bash
docker-compose exec postgres psql -U threekingdoms -d threekingdoms
```

**Persistent Data**:
- Volume: `postgres_data`
- Location: Docker managed volume

### Redis Service

```yaml
Container: three-kingdoms-redis
Port: 6379
```

**Access via CLI**:
```bash
docker-compose exec redis redis-cli
```

**Persistent Data**:
- Volume: `redis_data`
- Location: Docker managed volume

### API Service

```yaml
Container: three-kingdoms-api
Port: 4000
Hot Reload: Yes (via volume mounts)
```

**Environment Variables**:
```env
NODE_ENV=development
DATABASE_URL=postgresql://threekingdoms:dev_password_change_in_production@postgres:5432/threekingdoms
REDIS_URL=redis://redis:6379
PORT=4000
HOST=0.0.0.0
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
LOG_LEVEL=debug
```

**Access Shell**:
```bash
docker-compose exec api sh
```

**Hot Reload**: Changes to files in `apps/api/` and `packages/` will automatically reload the API server.

### Web Service

```yaml
Container: three-kingdoms-web
Port: 5173
Hot Reload: Yes (via volume mounts)
```

**Environment Variables**:
```env
NODE_ENV=development
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
VITE_API_URL=http://localhost:4000
```

**Access Shell**:
```bash
docker-compose exec web sh
```

**Hot Reload**: Changes to files in `apps/web/` and `packages/` will automatically trigger Vite HMR.

## Development Workflow

### Daily Development

1. **Start services** (if not running):
   ```bash
   ./scripts/docker-dev.sh start
   ```

2. **Make code changes** in your editor - changes will hot reload automatically

3. **View logs** to debug:
   ```bash
   ./scripts/docker-dev.sh logs-api
   ```

4. **Stop services** when done:
   ```bash
   ./scripts/docker-dev.sh stop
   ```

### Database Changes

1. **Modify Prisma schema** (`packages/database/prisma/schema.prisma`)

2. **Create migration**:
   ```bash
   docker-compose exec api sh -c "cd /app/packages/database && pnpm exec prisma migrate dev --name description_of_change"
   ```

3. **Migration runs automatically** and Prisma Client regenerates

### Installing New Dependencies

```bash
# Install in API
docker-compose exec api sh -c "cd /app/apps/api && pnpm add package-name"

# Install in Web
docker-compose exec web sh -c "cd /app/apps/web && pnpm add package-name"

# Rebuild containers (if needed)
./scripts/docker-dev.sh rebuild
```

### Running Tests

```bash
# API tests
docker-compose exec api pnpm --filter api test

# Web tests
docker-compose exec web pnpm --filter web test

# All tests
docker-compose exec api pnpm test
```

## Troubleshooting

### Services Won't Start

1. **Check Docker is running**:
   ```bash
   docker ps
   ```

2. **Check ports aren't in use**:
   ```bash
   lsof -i :5432  # PostgreSQL
   lsof -i :6379  # Redis
   lsof -i :4000  # API
   lsof -i :5173  # Web
   ```

3. **View service logs**:
   ```bash
   ./scripts/docker-dev.sh logs
   ```

4. **Rebuild images**:
   ```bash
   ./scripts/docker-dev.sh rebuild
   ```

### Database Connection Errors

1. **Check PostgreSQL is healthy**:
   ```bash
   docker-compose exec postgres pg_isready -U threekingdoms
   ```

2. **Verify connection string** in API container:
   ```bash
   docker-compose exec api printenv DATABASE_URL
   ```

3. **Check migrations ran**:
   ```bash
   docker-compose exec postgres psql -U threekingdoms -d threekingdoms -c "\dt"
   ```

### Hot Reload Not Working

1. **Check volume mounts** are working:
   ```bash
   docker-compose exec api ls -la /app/apps/api/src
   ```

2. **Restart the service**:
   ```bash
   docker-compose restart api
   # or
   docker-compose restart web
   ```

3. **Rebuild without cache**:
   ```bash
   ./scripts/docker-dev.sh rebuild
   ```

### Out of Disk Space

1. **Clean unused images and volumes**:
   ```bash
   docker system prune -a --volumes
   ```

2. **Check disk usage**:
   ```bash
   docker system df
   ```

### Port Already in Use

If ports are in use by other services:

1. **Stop conflicting services** or change ports in `docker-compose.yml`:
   ```yaml
   ports:
     - "5433:5432"  # Use different host port
   ```

## Production Build

To test production builds locally:

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up

# Access production build
# Web: http://localhost (nginx on port 80)
# API: http://localhost:4000
```

## Environment Variables

### API Container

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment mode |
| `DATABASE_URL` | (see above) | PostgreSQL connection |
| `REDIS_URL` | `redis://redis:6379` | Redis connection |
| `PORT` | `4000` | API server port |
| `HOST` | `0.0.0.0` | API server host |
| `CORS_ORIGIN` | `http://localhost:5173` | CORS allowed origins |
| `LOG_LEVEL` | `debug` | Logging level |

### Web Container

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment mode |
| `VITE_GRAPHQL_ENDPOINT` | `http://localhost:4000/graphql` | GraphQL endpoint |
| `VITE_API_URL` | `http://localhost:4000` | API base URL |

## Data Persistence

### Volumes

Docker volumes persist data between container restarts:

- `postgres_data`: PostgreSQL database files
- `redis_data`: Redis persistence files

### Backup Database

```bash
# Backup
docker-compose exec postgres pg_dump -U threekingdoms threekingdoms > backup.sql

# Restore
cat backup.sql | docker-compose exec -T postgres psql -U threekingdoms threekingdoms
```

### Reset Everything

To completely reset the development environment:

```bash
# Stop and remove everything
./scripts/docker-dev.sh clean

# Remove volumes
docker volume rm romance-of-the-three-kingdoms_postgres_data
docker volume rm romance-of-the-three-kingdoms_redis_data

# Start fresh
./scripts/docker-dev.sh start
./scripts/docker-dev.sh db-migrate
./scripts/docker-dev.sh db-seed
```

## Performance Tips

1. **Allocate enough resources** to Docker Desktop:
   - Go to Docker Desktop → Settings → Resources
   - Recommended: 4GB RAM, 2 CPUs minimum

2. **Use volume mounts wisely**:
   - Exclude `node_modules` from sync (already configured)

3. **Enable BuildKit** for faster builds:
   ```bash
   export DOCKER_BUILDKIT=1
   export COMPOSE_DOCKER_CLI_BUILD=1
   ```

4. **Use layer caching**:
   - Don't run `rebuild` unless necessary
   - Only `build` when dependencies change

## CI/CD Integration

The Dockerfiles support both development and production modes:

- **Development**: Hot reload, source maps, verbose logging
- **Production**: Optimized builds, minified assets, security hardening

See `.github/workflows/` for CI/CD pipeline examples.

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Vite Docker Guide](https://vitejs.dev/guide/static-deploy.html)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Redis Docker Image](https://hub.docker.com/_/redis)

## Support

If you encounter issues:

1. Check this documentation
2. Review logs: `./scripts/docker-dev.sh logs`
3. Check service health: `./scripts/docker-dev.sh health`
4. Try rebuilding: `./scripts/docker-dev.sh rebuild`
5. Open an issue on GitHub with logs and error messages

---

**Last Updated**: 2026-01-11
