/**
 * Apollo Client Configuration
 *
 * Sets up Apollo Client for GraphQL queries to the backend API
 */

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Get GraphQL endpoint from environment
const graphqlEndpoint =
  import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql';

/**
 * Apollo Client instance
 */
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: graphqlEndpoint,
    credentials: 'include', // Send cookies for authentication (future)
  }),
  cache: new InMemoryCache({
    typePolicies: {
      // Custom cache policies
      Query: {
        fields: {
          characters: {
            // Use filter and sort as cache key args, but replace instead of merge
            keyArgs: ['filter', 'sort'],
            // Don't merge - just replace with incoming data
            merge(existing, incoming) {
              return incoming;
            },
          },
          events: {
            keyArgs: ['type', 'startYear', 'endYear'],
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  devtools: {
    enabled: import.meta.env.VITE_APP_ENV !== 'production',
  },
});
