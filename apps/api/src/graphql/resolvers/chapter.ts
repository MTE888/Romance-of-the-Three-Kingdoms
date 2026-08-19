/**
 * Chapter GraphQL Resolvers
 * Uses mock data for development without PostgreSQL
 */

import { mockDb } from '../../data/mockData.js';

export const chapterResolvers = {
  Query: {
    /**
     * Get a single chapter by chapter number
     */
    chapter: async (_parent: unknown, args: { chapterNumber: number }) => {
      return mockDb.chapter.findUnique({ where: { number: args.chapterNumber } });
    },

    /**
     * Get all chapters
     */
    chapters: async () => {
      return mockDb.chapter.findMany({ orderBy: { number: 'asc' } });
    },

    /**
     * Get chapters count
     */
    chaptersCount: async () => {
      return mockDb.chapter.count();
    },
  },

  Chapter: {
    /**
     * Resolve source relationship (returns the novel source)
     */
    source: async () => {
      return mockDb.source.findUnique({ where: { id: 'source-sanguo-yanyi' } });
    },
  },
};
