/**
 * Server Entry Point
 *
 * Starts the Fastify server with GraphQL
 */

import { buildApp } from './app.js';
import { createGraphQLServer, registerGraphQL } from './graphql/index.js';
import { config } from './config/env.js';

async function start() {
  try {
    // Build Fastify app
    const app = await buildApp();

    // Create and register GraphQL server
    const apolloServer = await createGraphQLServer();
    await registerGraphQL(app, apolloServer);

    // Start listening
    await app.listen({
      port: config.port,
      host: config.host,
    });

    app.log.info(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   Three Kingdoms Platform API                                  ║
║                                                                ║
║   Environment: ${config.nodeEnv.padEnd(47)}║
║   Server:      http://${config.host}:${config.port.toString().padEnd(38)}║
║   GraphQL:     http://${config.host}:${config.port}/graphql${' '.repeat(27)}║
║   Health:      http://${config.host}:${config.port}/health${' '.repeat(28)}║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    `);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
start();
