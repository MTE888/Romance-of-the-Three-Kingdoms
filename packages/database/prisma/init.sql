-- PostgreSQL initialization script for Three Kingdoms Platform
-- This script runs when the database container is first created

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy text search

-- Create indexes for better performance (applied after Prisma migrations)
-- Note: Prisma will handle most schema setup via migrations
-- This file is for database-level configuration only

-- Set default timezone
SET timezone = 'UTC';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE threekingdoms TO threekingdoms;
