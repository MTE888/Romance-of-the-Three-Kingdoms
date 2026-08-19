/**
 * Event Resolvers
 *
 * GraphQL resolvers for event-related queries
 * Uses mock data for development without PostgreSQL
 */

import { mockDb, type EventType } from '../../data/mockData.js';

interface PaginationInput {
  limit?: number;
  offset?: number;
}

export const eventResolvers = {
  Query: {
    /**
     * Get a single event by ID
     */
    event: async (_parent: unknown, args: { id: string }) => {
      return mockDb.event.findUnique({ where: { id: args.id } });
    },

    /**
     * List events with filtering and pagination
     */
    events: async (
      _parent: unknown,
      args: {
        type?: EventType;
        startYear?: number;
        endYear?: number;
        pagination?: PaginationInput;
      }
    ) => {
      const { type, startYear, endYear, pagination } = args;

      const where: any = {};

      if (type) {
        where.type = type;
      }

      if (startYear !== undefined || endYear !== undefined) {
        where.dateYear = {};
        if (startYear !== undefined) {
          where.dateYear.gte = startYear;
        }
        if (endYear !== undefined) {
          where.dateYear.lte = endYear;
        }
      }

      return mockDb.event.findMany({
        where,
        take: pagination?.limit || 20,
        skip: pagination?.offset || 0,
      });
    },
  },
};
