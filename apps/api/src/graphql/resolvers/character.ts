/**
 * Character Resolvers
 *
 * GraphQL resolvers for character-related queries
 * Uses mock data for development without PostgreSQL
 */

import { mockDb, type Kingdom } from '../../data/mockData.js';

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

interface RelationshipFilter {
  relationshipType?: string;
  relationshipSource?: string;
  characterId?: string;
  kingdom?: Kingdom;
  minStrength?: number;
}

export const characterResolvers = {
  Query: {
    /**
     * Get a single character by ID
     */
    character: async (_parent: unknown, args: { id: string }) => {
      return mockDb.character.findUnique({ where: { id: args.id } });
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
      let orderBy: any = { createdAt: 'desc' };

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
          default:
            orderBy = { createdAt: direction };
        }
      }

      return mockDb.character.findMany({
        where,
        orderBy,
        take: pagination?.limit || 20,
        skip: pagination?.offset || 0,
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

      return mockDb.character.count({ where });
    },

    /**
     * Get lightweight character names for quick lookups
     */
    characterNames: async () => {
      const characters = mockDb.character.findMany();
      return characters.map(c => ({
        id: c.id,
        canonicalName: c.canonicalName,
        kingdom: c.kingdom,
      }));
    },

    /**
     * Get character relationships with optional filtering
     */
    relationships: async (
      _parent: unknown,
      args: { filter?: RelationshipFilter }
    ) => {
      const { filter } = args;
      const where: any = {};

      if (filter?.relationshipType) {
        where.relationshipType = filter.relationshipType;
      }

      if (filter?.relationshipSource) {
        where.relationshipSource = filter.relationshipSource;
      }

      if (filter?.minStrength) {
        where.strength = { gte: filter.minStrength };
      }

      if (filter?.characterId) {
        where.OR = [
          { characterAId: filter.characterId },
          { characterBId: filter.characterId },
        ];
      }

      let relationships = mockDb.characterRelationship.findMany({
        where,
        orderBy: { strength: 'desc' },
      });

      // Filter by kingdom if specified
      if (filter?.kingdom) {
        relationships = relationships.filter(
          (rel) =>
            rel.characterA?.kingdom === filter.kingdom ||
            rel.characterB?.kingdom === filter.kingdom
        );
      }

      return relationships;
    },
  },

  Character: {
    /**
     * Resolve relationships field
     */
    relationships: async (parent: { id: string }) => {
      const asA = mockDb.characterRelationship.findMany({
        where: { OR: [{ characterAId: parent.id }] },
      });

      const asB = mockDb.characterRelationship.findMany({
        where: { OR: [{ characterBId: parent.id }] },
      });

      return [...asA, ...asB];
    },
  },
};
