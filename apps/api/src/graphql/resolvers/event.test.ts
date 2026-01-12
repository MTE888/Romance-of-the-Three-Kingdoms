/**
 * Event Resolver Tests
 * Unit tests for event GraphQL resolvers
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockPrismaClient, mockPrismaResponses, resetPrismaMocks } from '../../test/mocks/prisma';
import { mockEvents } from '../../test/fixtures';

// Mock the database module
vi.mock('@three-kingdoms/database', () => ({
  db: mockPrismaClient,
}));

// Import resolvers after mocking
import { eventResolvers } from './event';

describe('Event Resolvers', () => {
  beforeEach(() => {
    resetPrismaMocks();
  });

  describe('Query.event', () => {
    it('should fetch a single event by ID', async () => {
      mockPrismaResponses.event.findRedCliffs();

      const result = await eventResolvers.Query.event(
        null,
        { id: 'battle-red-cliffs' },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findUnique).toHaveBeenCalledWith({
        where: { id: 'battle-red-cliffs' },
        include: {
          location: true,
          characters: {
            include: {
              character: true,
            },
          },
          sources: {
            include: {
              source: true,
            },
          },
        },
      });

      expect(result).toEqual(mockEvents.redCliffs);
    });

    it('should return null for non-existent event', async () => {
      mockPrismaClient.event.findUnique.mockResolvedValue(null);

      const result = await eventResolvers.Query.event(
        null,
        { id: 'non-existent' },
        {} as any,
        {} as any
      );

      expect(result).toBeNull();
    });
  });

  describe('Query.events', () => {
    it('should fetch all events without filters', async () => {
      mockPrismaResponses.event.findAll();

      const result = await eventResolvers.Query.events(
        null,
        {},
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: [{ year: 'asc' }, { month: 'asc' }, { day: 'asc' }],
        take: 50,
        skip: 0,
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockEvents.redCliffs);
    });

    it('should filter events by type', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        { filter: { type: 'BATTLE' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { type: 'BATTLE' },
        })
      );
    });

    it('should filter events by year range', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        { filter: { yearMin: 200, yearMax: 210 } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { year: { gte: 200, lte: 210 } },
        })
      );
    });

    it('should filter events by minimum importance', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        { filter: { importanceMin: 8 } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { importance: { gte: 8 } },
        })
      );
    });

    it('should search events by name', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        { filter: { search: 'Red Cliffs' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { name: { path: ['zh'], string_contains: 'Red Cliffs' } },
              { name: { path: ['en'], string_contains: 'Red Cliffs' } },
            ],
          },
        })
      );
    });

    it('should apply pagination', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        { pagination: { limit: 25, offset: 10 } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 25,
          skip: 10,
        })
      );
    });

    it('should sort by year descending', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        { sort: { field: 'year', order: 'desc' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: [{ year: 'desc' }, { month: 'desc' }, { day: 'desc' }],
        })
      );
    });

    it('should sort by importance', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        { sort: { field: 'importance', order: 'desc' } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { importance: 'desc' },
        })
      );
    });
  });

  describe('Query.eventsCount', () => {
    it('should count all events without filters', async () => {
      mockPrismaResponses.event.countAll();

      const result = await eventResolvers.Query.eventsCount(
        null,
        {},
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.count).toHaveBeenCalledWith({
        where: {},
      });

      expect(result).toBe(1);
    });

    it('should count events with filters', async () => {
      mockPrismaClient.event.count.mockResolvedValue(5);

      const result = await eventResolvers.Query.eventsCount(
        null,
        { filter: { type: 'BATTLE', importanceMin: 7 } },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.count).toHaveBeenCalledWith({
        where: {
          type: 'BATTLE',
          importance: { gte: 7 },
        },
      });

      expect(result).toBe(5);
    });
  });

  describe('Complex filters', () => {
    it('should combine multiple filters correctly', async () => {
      mockPrismaResponses.event.findAll();

      await eventResolvers.Query.events(
        null,
        {
          filter: {
            type: 'BATTLE',
            yearMin: 200,
            yearMax: 220,
            importanceMin: 8,
            search: 'battle',
          },
        },
        {} as any,
        {} as any
      );

      expect(mockPrismaClient.event.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            type: 'BATTLE',
            year: { gte: 200, lte: 220 },
            importance: { gte: 8 },
            OR: [
              { name: { path: ['zh'], string_contains: 'battle' } },
              { name: { path: ['en'], string_contains: 'battle' } },
            ],
          },
        })
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle empty result set', async () => {
      mockPrismaClient.event.findMany.mockResolvedValue([]);

      const result = await eventResolvers.Query.events(
        null,
        {},
        {} as any,
        {} as any
      );

      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockPrismaClient.event.findMany.mockRejectedValue(
        new Error('Database error')
      );

      await expect(
        eventResolvers.Query.events(null, {}, {} as any, {} as any)
      ).rejects.toThrow('Database error');
    });
  });
});
