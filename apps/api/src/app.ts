/**
 * Fastify Application Setup
 *
 * Configures Fastify server with plugins and middleware
 */

import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { config } from './config/env.js';

export async function buildApp(): Promise<FastifyInstance> {
  // Create Fastify instance with logging configuration
  const app = Fastify({
    logger: {
      level: config.logLevel,
      transport:
        config.nodeEnv === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
                colorize: true,
              },
            }
          : undefined,
    },
    // Trust proxy for deployment behind reverse proxy (Azure App Service)
    trustProxy: true,
  });

  // Register CORS
  await app.register(cors, {
    origin: config.corsOrigin,
    credentials: true,
  });

  // Health check endpoint
  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
    };
  });

  // Root endpoint
  app.get('/', async () => {
    return {
      name: 'Three Kingdoms Platform API',
      version: '0.1.0',
      graphql: '/graphql',
      health: '/health',
    };
  });

  return app;
}
