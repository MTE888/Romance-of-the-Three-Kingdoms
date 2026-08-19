/**
 * GraphQL Resolvers Index
 *
 * Combines all resolver modules into a single resolver object
 * Uses mock data for development without PostgreSQL
 */

import { GraphQLJSON, DateTimeResolver } from 'graphql-scalars';
import { characterResolvers } from './character.js';
import { eventResolvers } from './event.js';
import { chapterResolvers } from './chapter.js';
import { mockDb, type SourceType } from '../../data/mockData.js';

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

      return mockDb.timelineEntry.findMany({ where });
    },

    // Source queries
    source: async (_parent: unknown, args: { id: string }) => {
      return mockDb.source.findUnique({ where: { id: args.id } });
    },

    sources: async (_parent: unknown, args: { type?: SourceType }) => {
      return mockDb.source.findMany(args.type ? { where: { type: args.type } } : undefined);
    },

    // Location queries
    location: async (_parent: unknown, args: { id: string }) => {
      return mockDb.location.findUnique({ where: { id: args.id } });
    },

    locations: async () => {
      return mockDb.location.findMany();
    },

    // Search across entities
    search: async (_parent: unknown, args: { query: string; limit?: number }) => {
      const limit = args.limit || 10;
      const searchTerm = args.query.toLowerCase();

      // Search characters
      const allCharacters = mockDb.character.findMany();
      const characters = allCharacters
        .filter(c => {
          const nameZh = (c.canonicalName as any).zh?.toLowerCase() || '';
          const nameEn = (c.canonicalName as any).en?.toLowerCase() || '';
          return nameZh.includes(searchTerm) || nameEn.includes(searchTerm);
        })
        .slice(0, limit);

      // Search events
      const allEvents = mockDb.event.findMany();
      const events = allEvents
        .filter(e => {
          const nameZh = (e.name as any).zh?.toLowerCase() || '';
          const nameEn = (e.name as any).en?.toLowerCase() || '';
          return nameZh.includes(searchTerm) || nameEn.includes(searchTerm);
        })
        .slice(0, limit);

      // Search locations
      const allLocations = mockDb.location.findMany();
      const locations = allLocations
        .filter(l => {
          const nameZh = (l.name as any).zh?.toLowerCase() || '';
          const nameEn = (l.name as any).en?.toLowerCase() || '';
          return nameZh.includes(searchTerm) || nameEn.includes(searchTerm);
        })
        .slice(0, limit);

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
