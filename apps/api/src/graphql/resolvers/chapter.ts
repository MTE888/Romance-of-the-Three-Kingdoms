/**
 * Chapter GraphQL Resolvers
 */

import { db } from '@three-kingdoms/database';

export const chapterResolvers = {
  Query: {
    /**
     * Get a single chapter by chapter number
     */
    chapter: async (_parent: unknown, args: { chapterNumber: number }) => {
      return await db.chapter.findUnique({
        where: { chapterNumber: args.chapterNumber },
        include: {
          source: true,
        },
      });
    },

    /**
     * Get all chapters
     */
    chapters: async () => {
      return await db.chapter.findMany({
        orderBy: { chapterNumber: 'asc' },
        include: {
          source: true,
        },
      });
    },

    /**
     * Get chapters count
     */
    chaptersCount: async () => {
      return await db.chapter.count();
    },
  },

  Chapter: {
    /**
     * Resolve source relationship
     */
    source: async (parent: any) => {
      if (!parent.sourceId) return null;

      return await db.source.findUnique({
        where: { id: parent.sourceId },
      });
    },
  },
};
