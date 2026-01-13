/**
 * Prisma Client Mock
 * Mock implementation for testing without a real database
 */

import { vi } from 'vitest';
import { mockCharacters, mockEvents, mockSources, mockLocations, mockTimelineEntries } from '../fixtures';

// Create a mock Prisma client
export const mockPrismaClient = {
  // Character operations
  character: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },

  // Event operations
  event: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },

  // Source operations
  source: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },

  // Location operations
  location: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },

  // Timeline operations
  timelineEntry: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },

  // Relationship operations
  characterRelationship: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },

  // Chapter operations
  chapter: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },

  // Search operations
  searchIndex: {
    findMany: vi.fn(),
    create: vi.fn(),
    deleteMany: vi.fn(),
  },

  // Transaction support
  $transaction: vi.fn(),

  // Connection management
  $connect: vi.fn(),
  $disconnect: vi.fn(),
};

// Helper function to reset all mocks
export const resetPrismaMocks = () => {
  Object.values(mockPrismaClient).forEach((model: any) => {
    if (typeof model === 'object') {
      Object.values(model).forEach((method: any) => {
        if (typeof method?.mockReset === 'function') {
          method.mockReset();
        }
      });
    }
  });
};

// Pre-configured mock responses
export const mockPrismaResponses = {
  // Return single character
  character: {
    findLiuBei: () => {
      mockPrismaClient.character.findUnique.mockResolvedValue(mockCharacters.liuBei);
    },
    findCaoCao: () => {
      mockPrismaClient.character.findUnique.mockResolvedValue(mockCharacters.caoCAo);
    },
    findAll: () => {
      mockPrismaClient.character.findMany.mockResolvedValue([
        mockCharacters.liuBei,
        mockCharacters.caoCAo,
        mockCharacters.sunQuan,
      ]);
    },
    findShuCharacters: () => {
      mockPrismaClient.character.findMany.mockResolvedValue([mockCharacters.liuBei]);
    },
    countAll: () => {
      mockPrismaClient.character.count.mockResolvedValue(3);
    },
  },

  // Return events
  event: {
    findRedCliffs: () => {
      mockPrismaClient.event.findUnique.mockResolvedValue(mockEvents.redCliffs);
    },
    findAll: () => {
      mockPrismaClient.event.findMany.mockResolvedValue([mockEvents.redCliffs]);
    },
    countAll: () => {
      mockPrismaClient.event.count.mockResolvedValue(1);
    },
  },

  // Return sources
  source: {
    findRomance: () => {
      mockPrismaClient.source.findUnique.mockResolvedValue(mockSources.romance);
    },
    findSanguozhi: () => {
      mockPrismaClient.source.findUnique.mockResolvedValue(mockSources.sanguozhi);
    },
    findAll: () => {
      mockPrismaClient.source.findMany.mockResolvedValue([
        mockSources.romance,
        mockSources.sanguozhi,
      ]);
    },
  },

  // Return locations
  location: {
    findLuoyang: () => {
      mockPrismaClient.location.findUnique.mockResolvedValue(mockLocations.luoyang);
    },
    findAll: () => {
      mockPrismaClient.location.findMany.mockResolvedValue([mockLocations.luoyang]);
    },
  },

  // Return timeline entries
  timeline: {
    findAll: () => {
      mockPrismaClient.timelineEntry.findMany.mockResolvedValue(mockTimelineEntries);
    },
    findByYear: (year: number) => {
      const entries = mockTimelineEntries.filter(e => e.year === year);
      mockPrismaClient.timelineEntry.findMany.mockResolvedValue(entries);
    },
  },
};
