/**
 * Test Fixtures
 * Sample data for testing
 */

import type { Character, Event, Source, Location, TimelineEntry } from '@prisma/client';

// Sample Sources
export const mockSources = {
  romance: {
    id: 'romance-full',
    title: { zh: '三国演义', en: 'Romance of the Three Kingdoms' },
    author: { zh: '罗贯中', en: 'Luo Guanzhong' },
    type: 'LITERARY' as const,
    publicationYear: 1522,
    reliability: 'fiction' as const,
    language: 'zh',
    metadata: {},
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } as Source,

  sanguozhi: {
    id: 'sanguozhi-full',
    title: { zh: '三国志', en: 'Records of the Three Kingdoms' },
    author: { zh: '陈寿', en: 'Chen Shou' },
    type: 'HISTORICAL' as const,
    publicationYear: 280,
    reliability: 'primary' as const,
    language: 'zh',
    metadata: {},
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } as Source,
};

// Sample Characters
export const mockCharacters = {
  liuBei: {
    id: 'liu-bei',
    canonicalName: { zh: '刘备', en: 'Liu Bei' },
    courtesyName: { zh: '玄德', en: 'Xuande' },
    kingdom: 'SHU' as const,
    birthYear: 161,
    deathYear: 223,
    birthLocationId: null,
    deathLocationId: null,
    historicalProfile: {
      summary: 'Founder of Shu Han, known for benevolence',
      traits: ['benevolent', 'ambitious', 'humble'],
      achievements: ['Founded Shu Han', 'Gained Zhuge Liang as advisor'],
    },
    literaryProfile: {
      summary: 'Heroic protagonist portrayed as ideal Confucian ruler',
      traits: ['virtuous', 'righteous', 'compassionate'],
      famousScenes: ['Oath in the Peach Garden', 'Three visits to Zhuge Liang'],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } as Character,

  caoCAo: {
    id: 'cao-cao',
    canonicalName: { zh: '曹操', en: 'Cao Cao' },
    courtesyName: { zh: '孟德', en: 'Mengde' },
    kingdom: 'WEI' as const,
    birthYear: 155,
    deathYear: 220,
    birthLocationId: null,
    deathLocationId: null,
    historicalProfile: {
      summary: 'Brilliant strategist and founder of Cao Wei',
      traits: ['intelligent', 'strategic', 'ruthless'],
      achievements: ['Unified northern China', 'Exceptional military commander'],
    },
    literaryProfile: {
      summary: 'Complex antagonist, cunning and ambitious',
      traits: ['cunning', 'suspicious', 'talented'],
      famousScenes: ['Battle of Red Cliffs', 'Assassination attempt by Dong Cheng'],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } as Character,

  sunQuan: {
    id: 'sun-quan',
    canonicalName: { zh: '孙权', en: 'Sun Quan' },
    courtesyName: { zh: '仲谋', en: 'Zhongmou' },
    kingdom: 'WU' as const,
    birthYear: 182,
    deathYear: 252,
    birthLocationId: null,
    deathLocationId: null,
    historicalProfile: {
      summary: 'Founder of Eastern Wu, ruled for longest period',
      traits: ['patient', 'diplomatic', 'strategic'],
      achievements: ['Established Eastern Wu', 'Maintained independence'],
    },
    literaryProfile: {
      summary: 'Youngest of three kingdom founders, cautious leader',
      traits: ['cautious', 'pragmatic', 'loyal'],
      famousScenes: ['Alliance with Liu Bei', 'Battle of Red Cliffs'],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } as Character,
};

// Sample Events
export const mockEvents = {
  redCliffs: {
    id: 'battle-red-cliffs',
    name: { zh: '赤壁之战', en: 'Battle of Red Cliffs' },
    type: 'BATTLE' as const,
    year: 208,
    month: 11,
    day: null,
    locationId: null,
    historicalAccount: {
      description: 'Major naval battle where allied forces of Liu Bei and Sun Quan defeated Cao Cao',
      participants: ['Cao Cao', 'Liu Bei', 'Sun Quan', 'Zhou Yu'],
      outcome: 'Decisive victory for Liu-Sun alliance',
    },
    literaryAccount: {
      description: 'Epic battle featuring Zhuge Liang\'s tactics and Zhou Yu\'s strategies',
      participants: ['Cao Cao', 'Liu Bei', 'Sun Quan', 'Zhou Yu', 'Zhuge Liang'],
      outcome: 'Dramatic victory showcasing strategic brilliance',
      famousScenes: ['Borrowing arrows', 'Linked boats strategy'],
    },
    importance: 10,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } as Event,
};

// Sample Locations
export const mockLocations = {
  luoyang: {
    id: 'luoyang',
    name: { zh: '洛阳', en: 'Luoyang' },
    type: 'CAPITAL' as const,
    modernName: { zh: '洛阳市', en: 'Luoyang City' },
    province: 'Henan',
    coordinates: { lat: 34.6197, lng: 112.4542 },
    description: {
      zh: '东汉都城，后为曹魏都城',
      en: 'Capital of Eastern Han, later capital of Cao Wei',
    },
    significance: 'Major political center during Three Kingdoms period',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  } as Location,
};

// Sample Timeline Entries
export const mockTimelineEntries: TimelineEntry[] = [
  {
    id: 'timeline-1',
    year: 184,
    month: null,
    day: null,
    description: { zh: '黄巾起义', en: 'Yellow Turban Rebellion begins' },
    eventId: null,
    importance: 9,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'timeline-2',
    year: 208,
    month: 11,
    day: null,
    description: { zh: '赤壁之战', en: 'Battle of Red Cliffs' },
    eventId: 'battle-red-cliffs',
    importance: 10,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'timeline-3',
    year: 220,
    month: null,
    day: null,
    description: { zh: '曹丕称帝，建立魏国', en: 'Cao Pi proclaims himself emperor, establishes Wei' },
    eventId: null,
    importance: 10,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Helper function to create character with relationships
export const createCharacterWithRelationships = (character: typeof mockCharacters.liuBei) => {
  return {
    ...character,
    relationships: [],
    events: [],
  };
};

// Helper function to create event with participants
export const createEventWithParticipants = (event: typeof mockEvents.redCliffs) => {
  return {
    ...event,
    location: null,
    characters: [],
    sources: [],
  };
};
