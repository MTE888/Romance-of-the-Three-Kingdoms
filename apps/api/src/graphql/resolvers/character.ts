/**
 * Character Resolvers
 *
 * GraphQL resolvers for character-related queries
 */

import { db } from '@three-kingdoms/database';
import type { Kingdom } from '@three-kingdoms/database';

interface CharacterFilter {
  kingdom?: Kingdom;
  search?: string;
  verified?: boolean;
}

interface PaginationInput {
  limit?: number;
  offset?: number;
}

interface CharacterSort {
  field: 'CANONICAL_NAME' | 'BIRTH_YEAR' | 'DEATH_YEAR' | 'CREATED_AT';
  direction?: 'ASC' | 'DESC';
}

export const characterResolvers = {
  Query: {
    /**
     * Get a single character by ID
     */
    character: async (_parent: unknown, args: { id: string }) => {
      return await db.character.findUnique({
        where: { id: args.id },
        include: {
          birthLocation: true,
          relationshipsAsA: {
            include: {
              characterB: true,
            },
          },
          relationshipsAsB: {
            include: {
              characterA: true,
            },
          },
        },
      });
    },

    /**
     * List characters with filtering, sorting, and pagination
     */
    characters: async (
      _parent: unknown,
      args: {
        filter?: CharacterFilter;
        sort?: CharacterSort;
        pagination?: PaginationInput;
      }
    ) => {
      const { filter, sort, pagination } = args;

      // Build where clause
      const where: any = {};

      if (filter?.kingdom) {
        where.kingdom = filter.kingdom;
      }

      if (filter?.verified !== undefined) {
        where.verified = filter.verified;
      }

      if (filter?.search) {
        // Search in canonical name (JSONB field)
        where.OR = [
          {
            canonicalName: {
              path: ['zh'],
              string_contains: filter.search,
            },
          },
          {
            canonicalName: {
              path: ['en'],
              string_contains: filter.search,
            },
          },
        ];
      }

      // Build orderBy clause
      let orderBy: any = { createdAt: 'desc' }; // Default sort

      if (sort) {
        const direction = sort.direction?.toLowerCase() || 'asc';
        switch (sort.field) {
          case 'BIRTH_YEAR':
            orderBy = { birthYear: direction };
            break;
          case 'DEATH_YEAR':
            orderBy = { deathYear: direction };
            break;
          case 'CREATED_AT':
            orderBy = { createdAt: direction };
            break;
          // CANONICAL_NAME sorting would require raw SQL for JSONB
          default:
            orderBy = { createdAt: direction };
        }
      }

      return await db.character.findMany({
        where,
        orderBy,
        take: pagination?.limit || 20,
        skip: pagination?.offset || 0,
        include: {
          birthLocation: true,
        },
      });
    },

    /**
     * Count total characters matching filter
     */
    charactersCount: async (
      _parent: unknown,
      args: { filter?: CharacterFilter }
    ) => {
      const where: any = {};

      if (args.filter?.kingdom) {
        where.kingdom = args.filter.kingdom;
      }

      if (args.filter?.verified !== undefined) {
        where.verified = args.filter.verified;
      }

      if (args.filter?.search) {
        where.OR = [
          {
            canonicalName: {
              path: ['zh'],
              string_contains: args.filter.search,
            },
          },
          {
            canonicalName: {
              path: ['en'],
              string_contains: args.filter.search,
            },
          },
        ];
      }

      return await db.character.count({ where });
    },
  },

  Character: {
    /**
     * Resolve relationships field by combining both directions
     */
    relationships: async (parent: { id: string }) => {
      const asA = await db.characterRelationship.findMany({
        where: { characterAId: parent.id },
        include: {
          characterA: true,
          characterB: true,
        },
      });

      const asB = await db.characterRelationship.findMany({
        where: { characterBId: parent.id },
        include: {
          characterA: true,
          characterB: true,
        },
      });

      return [...asA, ...asB];
    },
  },
};
