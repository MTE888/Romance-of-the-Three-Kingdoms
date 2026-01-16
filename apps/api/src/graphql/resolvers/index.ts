/**
 * GraphQL Resolvers Index
 *
 * Combines all resolver modules into a single resolver object
 */

import { GraphQLJSON, DateTimeResolver } from 'graphql-scalars';
import { characterResolvers } from './character.js';
import { eventResolvers } from './event.js';
import { chapterResolvers } from './chapter.js';
import { db } from '@three-kingdoms/database';
import type { SourceType } from '@three-kingdoms/database';

interface TimelineFilter {
  startYear?: number;
  endYear?: number;
  minImportance?: number;
  category?: string;
}

/**
 * Combined resolvers object
 */
export const resolvers = {
  // Custom scalars
  JSON: GraphQLJSON,
  DateTime: DateTimeResolver,

  // Queries
  Query: {
    // Character queries (from character.ts)
    ...characterResolvers.Query,

    // Event queries (from event.ts)
    ...eventResolvers.Query,

    // Chapter queries (from chapter.ts)
    ...chapterResolvers.Query,

    // Timeline queries
    timeline: async (_parent: unknown, args: { filter?: TimelineFilter }) => {
      const where: any = {};

      if (args.filter) {
        const { startYear, endYear, minImportance, category } = args.filter;

        if (startYear !== undefined || endYear !== undefined) {
          where.year = {};
          if (startYear) where.year.gte = startYear;
          if (endYear) where.year.lte = endYear;
        }

        if (minImportance !== undefined) {
          where.importance = { gte: minImportance };
        }

        if (category) {
          where.category = category;
        }
      }

      return await db.timelineEntry.findMany({
        where,
        orderBy: [{ year: 'asc' }, { month: 'asc' }, { day: 'asc' }],
        include: {
          event: true,
          character: true,
        },
      });
    },

    // Source queries
    source: async (_parent: unknown, args: { id: string }) => {
      return await db.source.findUnique({
        where: { id: args.id },
      });
    },

    sources: async (_parent: unknown, args: { type?: SourceType }) => {
      const where = args.type ? { type: args.type } : {};
      return await db.source.findMany({
        where,
        orderBy: { createdAt: 'asc' },
      });
    },

    // Location queries
    location: async (_parent: unknown, args: { id: string }) => {
      return await db.location.findUnique({
        where: { id: args.id },
      });
    },

    locations: async () => {
      return await db.location.findMany({
        orderBy: { createdAt: 'asc' },
      });
    },

    // Search across entities
    search: async (_parent: unknown, args: { query: string; limit?: number }) => {
      const limit = args.limit || 10;
      const searchTerm = args.query;

      // Search characters
      const characters = await db.character.findMany({
        where: {
          OR: [
            {
              canonicalName: {
                path: ['zh'],
                string_contains: searchTerm,
              },
            },
            {
              canonicalName: {
                path: ['en'],
                string_contains: searchTerm,
              },
            },
          ],
        },
        take: limit,
      });

      // Search events
      const events = await db.event.findMany({
        where: {
          OR: [
            {
              name: {
                path: ['zh'],
                string_contains: searchTerm,
              },
            },
            {
              name: {
                path: ['en'],
                string_contains: searchTerm,
              },
            },
          ],
        },
        take: limit,
      });

      // Search locations
      const locations = await db.location.findMany({
        where: {
          OR: [
            {
              name: {
                path: ['zh'],
                string_contains: searchTerm,
              },
            },
            {
              name: {
                path: ['en'],
                string_contains: searchTerm,
              },
            },
          ],
        },
        take: limit,
      });

      return {
        characters,
        events,
        locations,
      };
    },
  },

  // Type resolvers
  Character: characterResolvers.Character,
  Chapter: chapterResolvers.Chapter,
};
