/**
 * GraphQL Schema Type Definitions
 *
 * Defines the GraphQL API schema matching the Prisma database model
 */

export const typeDefs = `#graphql
  # ============================================================================
  # SCALARS
  # ============================================================================

  """
  ISO 8601 date-time string
  """
  scalar DateTime

  """
  JSON object for flexible multilingual and metadata storage
  """
  scalar JSON

  # ============================================================================
  # ENUMS
  # ============================================================================

  enum SourceType {
    NOVEL
    HISTORY
    ANALYSIS
    ARTWORK
    MAP
  }

  enum ReliabilityTier {
    PRIMARY
    SECONDARY
    TERTIARY
    FICTION
  }

  enum Kingdom {
    WEI
    SHU
    WU
    HAN
    OTHER
  }

  enum RelationshipType {
    SWORN_BROTHER
    FAMILY
    SPOUSE
    PARENT_CHILD
    LORD_VASSAL
    FRIEND
    RIVAL
    ENEMY
    MENTOR_STUDENT
  }

  enum RelationshipSource {
    HISTORICAL
    LITERARY
    BOTH
  }

  enum EventType {
    BATTLE
    POLITICAL
    PERSONAL
    NATURAL
    CULTURAL
  }

  enum DatePrecision {
    EXACT
    APPROXIMATE
    ERA
  }

  # ============================================================================
  # TYPES
  # ============================================================================

  """
  Multilingual string supporting Chinese and English
  """
  type MultilingualString {
    zh: String!
    en: String
  }

  """
  Source of information (historical record, novel, analysis, etc.)
  """
  type Source {
    id: ID!
    type: SourceType!
    title: JSON!
    author: JSON
    era: String
    language: String!
    reliability: ReliabilityTier!
    description: JSON!
    metadata: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  """
  Character from the Three Kingdoms period
  Features dual profiles for historical vs literary representation
  """
  type Character {
    id: ID!
    canonicalName: JSON!
    courtesyName: JSON
    aliases: [JSON!]!
    birthYear: Int
    deathYear: Int
    kingdom: Kingdom!
    socialClass: String
    occupations: [String!]!

    # Multi-source profiles
    historicalProfile: JSON!
    literaryProfile: JSON!

    # Rich content
    biography: JSON
    images: [JSON!]!
    quotes: [JSON!]!

    # Metadata
    verified: Boolean!
    verificationNotes: String
    createdAt: DateTime!
    updatedAt: DateTime!

    # Relations
    birthLocation: Location
    relationships: [CharacterRelationship!]!
  }

  """
  Lightweight character info for quick lookups (name detection, hover cards)
  """
  type CharacterName {
    id: ID!
    canonicalName: JSON!
    kingdom: Kingdom!
  }

  """
  Relationship between two characters
  """
  type CharacterRelationship {
    id: ID!
    relationshipType: RelationshipType!
    relationshipSource: RelationshipSource!
    sources: [JSON!]!
    startYear: Int
    endYear: Int
    description: JSON
    strength: Int!
    isReciprocal: Boolean!

    # Related characters
    characterA: Character!
    characterB: Character!

    createdAt: DateTime!
  }

  """
  Historical or literary event
  """
  type Event {
    id: ID!
    name: JSON!
    type: EventType!

    # Temporal information
    dateYear: Int!
    dateMonth: Int
    dateDay: Int
    datePrecision: DatePrecision!
    durationDays: Int

    # Content
    description: JSON!
    significance: JSON

    # Multi-source accounts
    historicalAccount: JSON
    literaryAccount: JSON

    # Participants and outcomes
    participants: [JSON!]!
    outcomes: [JSON!]!
    leadsToEventIds: [String!]!

    # Relations
    location: Location

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  """
  Geographic location
  """
  type Location {
    id: ID!
    name: JSON!
    modernName: JSON
    type: String!
    coordinates: JSON
    region: String
    controllingKingdom: String
    historicalSignificance: JSON
    description: JSON
    images: [JSON!]!
    createdAt: DateTime!
  }

  """
  Chapter from Romance of Three Kingdoms
  """
  type Chapter {
    id: ID!
    chapterNumber: Int!
    title: JSON!
    content: JSON!
    summary: JSON
    metadata: JSON

    # Relations
    source: Source

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  """
  Timeline entry for chronological visualization
  """
  type TimelineEntry {
    id: ID!
    year: Int!
    month: Int
    day: Int
    description: JSON
    importance: Int!
    category: String

    # Relations
    event: Event
    character: Character

    createdAt: DateTime!
  }

  # ============================================================================
  # INPUT TYPES
  # ============================================================================

  """
  Filter options for character queries
  """
  input CharacterFilter {
    kingdom: Kingdom
    search: String
    verified: Boolean
  }

  """
  Pagination input
  """
  input PaginationInput {
    limit: Int = 20
    offset: Int = 0
  }

  """
  Sort direction
  """
  enum SortDirection {
    ASC
    DESC
  }

  """
  Character sort options
  """
  input CharacterSort {
    field: CharacterSortField!
    direction: SortDirection = ASC
  }

  enum CharacterSortField {
    CANONICAL_NAME
    BIRTH_YEAR
    DEATH_YEAR
    CREATED_AT
  }

  """
  Relationship filter options
  """
  input RelationshipFilter {
    relationshipType: RelationshipType
    relationshipSource: RelationshipSource
    characterId: ID
    kingdom: Kingdom
    minStrength: Int
  }

  """
  Timeline filter options
  """
  input TimelineFilter {
    startYear: Int
    endYear: Int
    minImportance: Int
    category: String
  }

  # ============================================================================
  # QUERIES
  # ============================================================================

  type Query {
    """
    Get a single character by ID
    """
    character(id: ID!): Character

    """
    List characters with optional filtering, sorting, and pagination
    """
    characters(
      filter: CharacterFilter
      sort: CharacterSort
      pagination: PaginationInput
    ): [Character!]!

    """
    Count total characters matching filter
    """
    charactersCount(filter: CharacterFilter): Int!

    """
    Get lightweight character names for quick lookups (chapter text detection)
    """
    characterNames: [CharacterName!]!

    """
    Get character relationships with optional filtering
    """
    relationships(filter: RelationshipFilter): [CharacterRelationship!]!

    """
    Get a single event by ID
    """
    event(id: ID!): Event

    """
    List events with filtering and pagination
    """
    events(
      type: EventType
      startYear: Int
      endYear: Int
      pagination: PaginationInput
    ): [Event!]!

    """
    Get timeline entries for visualization
    """
    timeline(filter: TimelineFilter): [TimelineEntry!]!

    """
    Get a single source by ID
    """
    source(id: ID!): Source

    """
    List all sources
    """
    sources(type: SourceType): [Source!]!

    """
    Get a single location by ID
    """
    location(id: ID!): Location

    """
    List locations
    """
    locations: [Location!]!

    """
    Get a single chapter by chapter number
    """
    chapter(chapterNumber: Int!): Chapter

    """
    List all chapters
    """
    chapters: [Chapter!]!

    """
    Count total chapters
    """
    chaptersCount: Int!

    """
    Search across characters, events, and locations
    """
    search(query: String!, limit: Int = 10): SearchResults!
  }

  """
  Search results across different entity types
  """
  type SearchResults {
    characters: [Character!]!
    events: [Event!]!
    locations: [Location!]!
  }

  # ============================================================================
  # MUTATIONS (Future - Phase 4+)
  # ============================================================================

  # type Mutation {
  #   # User authentication
  #   # Character contributions
  #   # Fact verification
  # }
`;
