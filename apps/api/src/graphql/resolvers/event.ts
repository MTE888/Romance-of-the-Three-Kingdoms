/**
 * Event Resolvers
 *
 * GraphQL resolvers for event-related queries
 */

import { db } from '@three-kingdoms/database';
import type { EventType } from '@three-kingdoms/database';

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
      return await db.event.findUnique({
        where: { id: args.id },
        include: {
          location: true,
        },
      });
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

      return await db.event.findMany({
        where,
        orderBy: { dateYear: 'asc' },
        take: pagination?.limit || 20,
        skip: pagination?.offset || 0,
        include: {
          location: true,
        },
      });
    },
  },
};
