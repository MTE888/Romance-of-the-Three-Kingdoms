/**
 * Mock Data for Frontend Tests
 * Sample GraphQL responses and test data
 */

// Character Mocks
export const mockCharacters = [
  {
    id: 'liu-bei',
    canonicalName: { zh: '刘备', en: 'Liu Bei' },
    courtesyName: { zh: '玄德', en: 'Xuande' },
    kingdom: 'SHU',
    birthYear: 161,
    deathYear: 223,
    historicalProfile: {
      summary: 'Founder of Shu Han, known for benevolence',
      traits: ['benevolent', 'ambitious'],
    },
    literaryProfile: {
      summary: 'Heroic protagonist portrayed as ideal Confucian ruler',
      traits: ['virtuous', 'righteous'],
    },
  },
  {
    id: 'cao-cao',
    canonicalName: { zh: '曹操', en: 'Cao Cao' },
    courtesyName: { zh: '孟德', en: 'Mengde' },
    kingdom: 'WEI',
    birthYear: 155,
    deathYear: 220,
    historicalProfile: {
      summary: 'Brilliant strategist and founder of Cao Wei',
      traits: ['intelligent', 'strategic'],
    },
    literaryProfile: {
      summary: 'Complex antagonist, cunning and ambitious',
      traits: ['cunning', 'talented'],
    },
  },
  {
    id: 'sun-quan',
    canonicalName: { zh: '孙权', en: 'Sun Quan' },
    courtesyName: { zh: '仲谋', en: 'Zhongmou' },
    kingdom: 'WU',
    birthYear: 182,
    deathYear: 252,
    historicalProfile: {
      summary: 'Founder of Eastern Wu',
      traits: ['patient', 'diplomatic'],
    },
    literaryProfile: {
      summary: 'Youngest of three kingdom founders',
      traits: ['cautious', 'pragmatic'],
    },
  },
];

// Event Mocks
export const mockEvents = [
  {
    id: 'battle-red-cliffs',
    name: { zh: '赤壁之战', en: 'Battle of Red Cliffs' },
    type: 'BATTLE',
    year: 208,
    month: 11,
    importance: 10,
    historicalAccount: {
      description: 'Major naval battle',
      outcome: 'Decisive victory for Liu-Sun alliance',
    },
    literaryAccount: {
      description: 'Epic battle featuring brilliant tactics',
      outcome: 'Dramatic victory',
    },
  },
];

// Timeline Mocks
export const mockTimeline = [
  {
    year: 184,
    description: { zh: '黄巾起义', en: 'Yellow Turban Rebellion begins' },
    importance: 9,
    event: null,
  },
  {
    year: 208,
    description: { zh: '赤壁之战', en: 'Battle of Red Cliffs' },
    importance: 10,
    event: {
      name: { zh: '赤壁之战', en: 'Battle of Red Cliffs' },
      type: 'BATTLE',
    },
  },
  {
    year: 220,
    description: { zh: '曹丕称帝', en: 'Cao Pi proclaims himself emperor' },
    importance: 10,
    event: null,
  },
];

// Source Mocks
export const mockSources = [
  {
    id: 'romance-full',
    title: { zh: '三国演义', en: 'Romance of the Three Kingdoms' },
    author: { zh: '罗贯中', en: 'Luo Guanzhong' },
    type: 'LITERARY',
    publicationYear: 1522,
    reliability: 'fiction',
  },
  {
    id: 'sanguozhi-full',
    title: { zh: '三国志', en: 'Records of the Three Kingdoms' },
    author: { zh: '陈寿', en: 'Chen Shou' },
    type: 'HISTORICAL',
    publicationYear: 280,
    reliability: 'primary',
  },
];

// GraphQL Mock Responses
export const mockGraphQLResponses = {
  getCharacters: {
    request: {
      query: expect.anything(),
    },
    result: {
      data: {
        characters: mockCharacters,
        charactersCount: mockCharacters.length,
      },
    },
  },

  getCharacter: (id: string) => ({
    request: {
      query: expect.anything(),
      variables: { id },
    },
    result: {
      data: {
        character: mockCharacters.find(c => c.id === id) || null,
      },
    },
  }),

  getTimeline: {
    request: {
      query: expect.anything(),
    },
    result: {
      data: {
        timeline: mockTimeline,
      },
    },
  },

  getEvents: {
    request: {
      query: expect.anything(),
    },
    result: {
      data: {
        events: mockEvents,
        eventsCount: mockEvents.length,
      },
    },
  },
};
