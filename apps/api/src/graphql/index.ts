/**
 * GraphQL Server Setup
 *
 * Configures Apollo Server and integrates with Fastify
 */

import { ApolloServer } from '@apollo/server';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';

export interface GraphQLContext {
  request: FastifyRequest;
  reply: FastifyReply;
}

/**
 * Create and configure Apollo Server
 */
export async function createGraphQLServer() {
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
      // Log errors in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('GraphQL Error:', error);
      }

      // Return sanitized error to client
      return {
        ...formattedError,
        extensions: {
          ...formattedError.extensions,
          // Remove stack trace in production
          ...(process.env.NODE_ENV === 'production'
            ? { stack: undefined }
            : {}),
        },
      };
    },
    introspection: process.env.NODE_ENV !== 'production',
  });

  await server.start();

  return server;
}

/**
 * Convert Fastify headers to a Map-like object that Apollo expects
 */
function createHeadersMap(
  headers: Record<string, string | string[] | undefined>
): Map<string, string> {
  const map = new Map<string, string>();
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      map.set(key.toLowerCase(), Array.isArray(value) ? value.join(', ') : value);
    }
  }
  return map;
}

/**
 * Register GraphQL endpoint with Fastify
 */
export async function registerGraphQL(
  app: FastifyInstance,
  apolloServer: ApolloServer<GraphQLContext>
) {
  // GraphQL endpoint
  app.post('/graphql', async (request, reply) => {
    const headersMap = createHeadersMap(request.headers as Record<string, string | string[] | undefined>);

    const response = await apolloServer.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        body: request.body as any,
        headers: headersMap,
        method: request.method,
        search: '',
      },
      context: async () => ({
        request,
        reply,
      }),
    });

    // Set headers
    if (response.headers) {
      for (const [key, value] of response.headers) {
        reply.header(key, value);
      }
    }

    // Set status and send body
    reply.status(response.status || 200);

    if (response.body.kind === 'complete') {
      return reply.send(response.body.string);
    }

    // Handle streaming responses (not typically used with POST)
    if (response.body.kind === 'chunked') {
      for await (const chunk of response.body.asyncIterator) {
        reply.raw.write(chunk);
      }
      reply.raw.end();
    }
  });

  // GraphQL GET endpoint (for Apollo Studio and introspection)
  app.get('/graphql', async (request, reply) => {
    const headersMap = createHeadersMap(request.headers as Record<string, string | string[] | undefined>);

    const response = await apolloServer.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        body: null,
        headers: headersMap,
        method: request.method,
        search: request.url.split('?')[1] || '',
      },
      context: async () => ({
        request,
        reply,
      }),
    });

    if (response.headers) {
      for (const [key, value] of response.headers) {
        reply.header(key, value);
      }
    }

    reply.status(response.status || 200);

    if (response.body.kind === 'complete') {
      return reply.send(response.body.string);
    }
  });

  app.log.info('GraphQL server registered at /graphql');
}
