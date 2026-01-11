#!/bin/bash

# Docker Development Helper Script for Three Kingdoms Platform
# Provides convenient commands for Docker operations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_msg() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Show usage
show_usage() {
    cat << EOF
Three Kingdoms Platform - Docker Development Helper

Usage: $0 <command>

Commands:
  start           Start all services (detached mode)
  stop            Stop all services
  restart         Restart all services
  logs            Show logs from all services
  logs-api        Show API logs only
  logs-web        Show Web logs only
  logs-db         Show PostgreSQL logs only
  build           Build all Docker images
  rebuild         Rebuild all Docker images (no cache)
  clean           Stop and remove all containers, volumes, and images
  db-migrate      Run Prisma migrations
  db-seed         Seed the database with sample data
  db-studio       Open Prisma Studio
  db-reset        Reset database (drop + migrate + seed)
  shell-api       Open shell in API container
  shell-web       Open shell in Web container
  shell-db        Open PostgreSQL shell
  health          Check health of all services
  install         Install dependencies in all containers
  help            Show this help message

Examples:
  $0 start              # Start all services
  $0 logs-api           # Watch API logs
  $0 db-migrate         # Run database migrations
  $0 rebuild            # Rebuild everything from scratch

EOF
}

# Start services
start_services() {
    print_msg "$GREEN" "Starting Three Kingdoms Platform services..."
    docker-compose up -d
    print_msg "$GREEN" "✓ Services started!"
    print_msg "$BLUE" "
╔════════════════════════════════════════════════════════════╗
║   Three Kingdoms Platform - Development Environment       ║
║                                                            ║
║   Web:      http://localhost:5173                         ║
║   API:      http://localhost:4000                         ║
║   GraphQL:  http://localhost:4000/graphql                 ║
║   DB:       postgresql://localhost:5432/threekingdoms     ║
║   Redis:    redis://localhost:6379                        ║
╚════════════════════════════════════════════════════════════╝
    "
}

# Stop services
stop_services() {
    print_msg "$YELLOW" "Stopping all services..."
    docker-compose down
    print_msg "$GREEN" "✓ Services stopped"
}

# Restart services
restart_services() {
    print_msg "$YELLOW" "Restarting all services..."
    docker-compose restart
    print_msg "$GREEN" "✓ Services restarted"
}

# Show logs
show_logs() {
    docker-compose logs -f
}

show_api_logs() {
    docker-compose logs -f api
}

show_web_logs() {
    docker-compose logs -f web
}

show_db_logs() {
    docker-compose logs -f postgres
}

# Build images
build_images() {
    print_msg "$BLUE" "Building Docker images..."
    docker-compose build
    print_msg "$GREEN" "✓ Build complete"
}

# Rebuild images (no cache)
rebuild_images() {
    print_msg "$BLUE" "Rebuilding Docker images (no cache)..."
    docker-compose build --no-cache
    print_msg "$GREEN" "✓ Rebuild complete"
}

# Clean everything
clean_all() {
    print_msg "$RED" "⚠️  This will remove all containers, volumes, and images"
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        print_msg "$YELLOW" "Cancelled"
        exit 0
    fi

    print_msg "$YELLOW" "Stopping and removing containers..."
    docker-compose down -v

    print_msg "$YELLOW" "Removing images..."
    docker-compose down --rmi all

    print_msg "$GREEN" "✓ Cleanup complete"
}

# Database operations
db_migrate() {
    print_msg "$BLUE" "Running database migrations..."
    docker-compose exec api sh -c "cd /app/packages/database && pnpm exec prisma migrate deploy"
    print_msg "$GREEN" "✓ Migrations complete"
}

db_seed() {
    print_msg "$BLUE" "Seeding database..."
    docker-compose exec api sh -c "cd /app/packages/database && pnpm exec prisma db seed"
    print_msg "$GREEN" "✓ Database seeded"
}

db_studio() {
    print_msg "$BLUE" "Opening Prisma Studio..."
    docker-compose exec api sh -c "cd /app/packages/database && pnpm exec prisma studio"
}

db_reset() {
    print_msg "$RED" "⚠️  This will reset the entire database"
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        print_msg "$YELLOW" "Cancelled"
        exit 0
    fi

    print_msg "$YELLOW" "Resetting database..."
    docker-compose exec api sh -c "cd /app/packages/database && pnpm exec prisma migrate reset --force"
    print_msg "$GREEN" "✓ Database reset complete"
}

# Shell access
shell_api() {
    print_msg "$BLUE" "Opening shell in API container..."
    docker-compose exec api sh
}

shell_web() {
    print_msg "$BLUE" "Opening shell in Web container..."
    docker-compose exec web sh
}

shell_db() {
    print_msg "$BLUE" "Opening PostgreSQL shell..."
    docker-compose exec postgres psql -U threekingdoms -d threekingdoms
}

# Health check
check_health() {
    print_msg "$BLUE" "Checking service health..."

    echo ""
    print_msg "$YELLOW" "PostgreSQL:"
    docker-compose exec postgres pg_isready -U threekingdoms && \
        print_msg "$GREEN" "✓ Healthy" || \
        print_msg "$RED" "✗ Unhealthy"

    echo ""
    print_msg "$YELLOW" "Redis:"
    docker-compose exec redis redis-cli ping && \
        print_msg "$GREEN" "✓ Healthy" || \
        print_msg "$RED" "✗ Unhealthy"

    echo ""
    print_msg "$YELLOW" "API:"
    curl -f http://localhost:4000/health > /dev/null 2>&1 && \
        print_msg "$GREEN" "✓ Healthy" || \
        print_msg "$RED" "✗ Unhealthy"

    echo ""
    print_msg "$YELLOW" "Web:"
    curl -f http://localhost:5173 > /dev/null 2>&1 && \
        print_msg "$GREEN" "✓ Healthy" || \
        print_msg "$RED" "✗ Unhealthy"
}

# Install dependencies
install_deps() {
    print_msg "$BLUE" "Installing dependencies..."
    docker-compose exec api pnpm install
    docker-compose exec web pnpm install
    print_msg "$GREEN" "✓ Dependencies installed"
}

# Main command handler
case "$1" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    logs)
        show_logs
        ;;
    logs-api)
        show_api_logs
        ;;
    logs-web)
        show_web_logs
        ;;
    logs-db)
        show_db_logs
        ;;
    build)
        build_images
        ;;
    rebuild)
        rebuild_images
        ;;
    clean)
        clean_all
        ;;
    db-migrate)
        db_migrate
        ;;
    db-seed)
        db_seed
        ;;
    db-studio)
        db_studio
        ;;
    db-reset)
        db_reset
        ;;
    shell-api)
        shell_api
        ;;
    shell-web)
        shell_web
        ;;
    shell-db)
        shell_db
        ;;
    health)
        check_health
        ;;
    install)
        install_deps
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        print_msg "$RED" "Error: Unknown command '$1'"
        echo ""
        show_usage
        exit 1
        ;;
esac
