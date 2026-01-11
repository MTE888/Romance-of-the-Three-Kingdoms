/**
 * Shared TypeScript types for the Three Kingdoms Platform
 *
 * This package contains all shared types used across the application.
 */

/**
 * Multilingual string structure for storing text in multiple languages
 */
export interface MultilingualString {
  zh: string; // Chinese (required)
  en?: string; // English (optional)
  // Future: ja, ko, etc.
}

/**
 * Base entity interface - all entities extend this
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Source reliability tiers
 */
export enum SourceReliability {
  PRIMARY = 'primary',     // Historical records (三国志)
  SECONDARY = 'secondary', // Secondary historical sources
  TERTIARY = 'tertiary',   // Modern scholarly analysis
  FICTION = 'fiction'      // Literary interpretation (三国演义)
}

/**
 * Kingdom enum
 */
export enum Kingdom {
  WEI = 'Wei',   // 魏
  SHU = 'Shu',   // 蜀
  WU = 'Wu',     // 吴
  HAN = 'Han',   // 汉
  OTHER = 'Other'
}

// Export placeholder for future types
export type * from './types';
