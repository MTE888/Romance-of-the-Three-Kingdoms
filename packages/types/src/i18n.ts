/**
 * i18n TypeScript Types
 *
 * Type definitions for internationalization support
 */

/**
 * Supported locale codes
 */
export type LocaleCode = 'en' | 'zh-Hans' | 'zh-Hant';

/**
 * Extended multilingual string with Traditional Chinese support
 */
export interface MultilingualStringExtended {
  /** Simplified Chinese (required - primary content language) */
  zh: string;
  /** English translation (optional) */
  en?: string;
  /** Traditional Chinese (optional - usually computed from zh) */
  zhHant?: string;
}

/**
 * Translation namespace keys
 */
export type TranslationNamespace =
  | 'common'
  | 'layout'
  | 'home'
  | 'characters'
  | 'chapters'
  | 'timeline'
  | 'relationships'
  | 'errors';

/**
 * Language display configuration
 */
export interface LanguageConfig {
  code: LocaleCode;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  fontFamily: string;
}

/**
 * Default language configurations
 */
export const LANGUAGE_CONFIGS: Record<LocaleCode, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    fontFamily: "'Crimson Pro', Georgia, serif",
  },
  'zh-Hans': {
    code: 'zh-Hans',
    name: 'Simplified Chinese',
    nativeName: '简体中文',
    direction: 'ltr',
    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
  },
  'zh-Hant': {
    code: 'zh-Hant',
    name: 'Traditional Chinese',
    nativeName: '繁體中文',
    direction: 'ltr',
    fontFamily: "'Noto Serif TC', 'Source Han Serif TC', serif",
  },
};

/**
 * Check if a locale code is valid
 */
export function isValidLocale(locale: string): locale is LocaleCode {
  return locale === 'en' || locale === 'zh-Hans' || locale === 'zh-Hant';
}

/**
 * Get the BCP 47 language tag for HTML lang attribute
 */
export function getBcp47Tag(locale: LocaleCode): string {
  switch (locale) {
    case 'en':
      return 'en';
    case 'zh-Hans':
      return 'zh-CN';
    case 'zh-Hant':
      return 'zh-TW';
    default:
      return 'en';
  }
}
