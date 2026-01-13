/**
 * Test Setup
 * Runs before all tests to configure the test environment
 */

import { beforeAll, afterAll, afterEach } from 'vitest';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.REDIS_URL = 'redis://localhost:6379/1';
process.env.LOG_LEVEL = 'silent'; // Suppress logs during tests
process.env.PORT = '0'; // Use random port for tests
process.env.HOST = 'localhost';
process.env.CORS_ORIGIN = 'http://localhost:3000';

beforeAll(async () => {
  // Global test setup
  // Note: Database setup would happen here if using test database
});

afterEach(() => {
  // Clean up after each test
  // Reset mocks, clear caches, etc.
});

afterAll(async () => {
  // Global test teardown
});
