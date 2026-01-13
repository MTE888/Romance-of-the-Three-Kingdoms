/**
 * Character Resolver Tests
 * Unit tests for character GraphQL resolvers
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockPrismaClient, mockPrismaResponses, resetPrismaMocks } from '../../test/mocks/prisma';
import { mockCharacters } from '../../test/fixtures';

// Mock the database module
vi.mock('@three-kingdoms/database', () => ({
  db: mockPrismaClient,
}));

// Import resolvers after mocking
import { characterResolvers } from './character';

describe('Character Resolvers', () => {
  beforeEach(() => {
    resetPrismaMocks();
  });

  describe('Query.character', () => {
    it('should fetch a single character by ID', async () => {
      mockPrismaResponses.character.findLiuBei();

      const result = await characterResolvers.Query.character(
        null,
        { id: 'liu-bei' },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findUnique).toHaveBeenCalledWith({
        where: { id: 'liu-bei' },
        include: {
          relationships: {
            include: {
              characterA: true,
              characterB: true,
            },
          },
          birthLocation: true,
          deathLocation: true,
        },
      });

      expect(result).toEqual(mockCharacters.liuBei);
    });

    it('should return null for non-existent character', async () => {
      mockPrismaClient.character.findUnique.mockResolvedValue(null);

      const result = await characterResolvers.Query.character(
        null,
        { id: 'non-existent' },
        {} as any,
        {} as any
      );

      expect(result).toBeNull();
    });
  });

  describe('Query.characters', () => {
    it('should fetch all characters without filters', async () => {
      mockPrismaResponses.character.findAll();

      const result = await characterResolvers.Query.characters(
        null,
        {},
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { canonicalName: 'asc' },
        take: 20,
        skip: 0,
      });

      expect(result).toHaveLength(3);
      expect(result).toContainEqual(mockCharacters.liuBei);
      expect(result).toContainEqual(mockCharacters.caoCAo);
      expect(result).toContainEqual(mockCharacters.sunQuan);
    });

    it('should filter characters by kingdom', async () => {
      mockPrismaResponses.character.findShuCharacters();

      const result = await characterResolvers.Query.characters(
        null,
        { filter: { kingdom: 'SHU' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith({
        where: { kingdom: 'SHU' },
        orderBy: { canonicalName: 'asc' },
        take: 20,
        skip: 0,
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockCharacters.liuBei);
    });

    it('should search characters by name (Chinese)', async () => {
      mockPrismaResponses.character.findShuCharacters();

      await characterResolvers.Query.characters(
        null,
        { filter: { search: '刘备' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { canonicalName: { path: ['zh'], string_contains: '刘备' } },
              { canonicalName: { path: ['en'], string_contains: '刘备' } },
            ],
          },
        })
      );
    });

    it('should search characters by name (English)', async () => {
      mockPrismaResponses.character.findShuCharacters();

      await characterResolvers.Query.characters(
        null,
        { filter: { search: 'Liu Bei' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { canonicalName: { path: ['zh'], string_contains: 'Liu Bei' } },
              { canonicalName: { path: ['en'], string_contains: 'Liu Bei' } },
            ],
          },
        })
      );
    });

    it('should filter by birth year range', async () => {
      mockPrismaResponses.character.findAll();

      await characterResolvers.Query.characters(
        null,
        { filter: { birthYearMin: 150, birthYearMax: 170 } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            birthYear: { gte: 150, lte: 170 },
          },
        })
      );
    });

    it('should apply pagination', async () => {
      mockPrismaResponses.character.findAll();

      await characterResolvers.Query.characters(
        null,
        { pagination: { limit: 10, offset: 20 } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
          skip: 20,
        })
      );
    });

    it('should sort by birth year', async () => {
      mockPrismaResponses.character.findAll();

      await characterResolvers.Query.characters(
        null,
        { sort: { field: 'birthYear', order: 'desc' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { birthYear: 'desc' },
        })
      );
    });

    it('should sort by death year', async () => {
      mockPrismaResponses.character.findAll();

      await characterResolvers.Query.characters(
        null,
        { sort: { field: 'deathYear', order: 'asc' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { deathYear: 'asc' },
        })
      );
    });
  });

  describe('Query.charactersCount', () => {
    it('should count all characters without filters', async () => {
      mockPrismaResponses.character.countAll();

      const result = await characterResolvers.Query.charactersCount(
        null,
        {},
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.count).toHaveBeenCalledWith({
        where: {},
      });

      expect(result).toBe(3);
    });

    it('should count characters with kingdom filter', async () => {
      mockPrismaClient.character.count.mockResolvedValue(1);

      const result = await characterResolvers.Query.charactersCount(
        null,
        { filter: { kingdom: 'SHU' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.count).toHaveBeenCalledWith({
        where: { kingdom: 'SHU' },
      });

      expect(result).toBe(1);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty result set', async () => {
      mockPrismaClient.character.findMany.mockResolvedValue([]);

      const result = await characterResolvers.Query.characters(
        null,
        {},
        {} as any,
        {} as any
      );

      expect(result).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      mockPrismaClient.character.findMany.mockRejectedValue(
        new Error('Database connection failed')
      );

      await expect(
        characterResolvers.Query.characters(null, {}, {} as any, {} as any)
      ).rejects.toThrow('Database connection failed');
    });

    it('should default to limit 20 if not specified', async () => {
      mockPrismaResponses.character.findAll();

      await characterResolvers.Query.characters(
        null,
        {},
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 20,
        })
      );
    });

    it('should respect max limit of 100', async () => {
      mockPrismaResponses.character.findAll();

      await characterResolvers.Query.characters(
        null,
        { pagination: { limit: 200 } }, // Requesting more than max
        {} as any,
        {} as any
      );

      // Should be capped at 100 (if implemented in resolver)
      const call = mockPrismaClient.character.findMany.mock.calls[0][0];
      expect(call.take).toBeLessThanOrEqual(100);
    });
  });

  describe('Complex queries', () => {
    it('should combine multiple filters', async () => {
      mockPrismaResponses.character.findShuCharacters();

      await characterResolvers.Query.characters(
        null,
        {
          filter: {
            kingdom: 'SHU',
            search: 'Liu',
            birthYearMin: 150,
            birthYearMax: 200,
          },
        },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.character.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            kingdom: 'SHU',
            birthYear: { gte: 150, lte: 200 },
            OR: [
              { canonicalName: { path: ['zh'], string_contains: 'Liu' } },
              { canonicalName: { path: ['en'], string_contains: 'Liu' } },
            ],
          },
        })
      );
    });
  });
});
