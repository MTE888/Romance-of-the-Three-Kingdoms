/**
 * i18n Configuration
 *
 * Internationalization setup for the Three Kingdoms Platform
 * Supports: English (en), Simplified Chinese (zh-Hans), Traditional Chinese (zh-Hant)
 *
 * Traditional Chinese (zh-Hant) is automatically generated from Simplified Chinese (zh-Hans)
 * using character-level conversion, ensuring all content is properly converted.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { convertTranslationObject } from './chinese-converter';

// Import Simplified Chinese translations (source of truth for Chinese content)
import zhCommon from '../../../public/locales/zh-Hans/common.json';
import zhLayout from '../../../public/locales/zh-Hans/layout.json';
import zhHome from '../../../public/locales/zh-Hans/home.json';
import zhCharacters from '../../../public/locales/zh-Hans/characters.json';
import zhChapters from '../../../public/locales/zh-Hans/chapters.json';
import zhTimeline from '../../../public/locales/zh-Hans/timeline.json';
import zhRelationships from '../../../public/locales/zh-Hans/relationships.json';
import zhErrors from '../../../public/locales/zh-Hans/errors.json';

// Import English translations
import enCommon from '../../../public/locales/en/common.json';
import enLayout from '../../../public/locales/en/layout.json';
import enHome from '../../../public/locales/en/home.json';
import enCharacters from '../../../public/locales/en/characters.json';
import enChapters from '../../../public/locales/en/chapters.json';
import enTimeline from '../../../public/locales/en/timeline.json';
import enRelationships from '../../../public/locales/en/relationships.json';
import enErrors from '../../../public/locales/en/errors.json';

/**
 * Supported locales
 */
export const SUPPORTED_LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'zh'] as const;
export type LocaleCode = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const NAMESPACES = [
  'common',
  'layout',
  'home',
  'characters',
  'chapters',
  'timeline',
  'relationships',
  'errors',
] as const;

export type Namespace = (typeof NAMESPACES)[number];
export const DEFAULT_NS: Namespace = 'common';

export const LOCALE_NAMES: Record<LocaleCode, string> = {
  en: 'English',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
};

export function isChinese(locale: string): boolean {
  return locale === 'zh-Hans' || locale === 'zh-Hant';
}

export function isTraditionalChinese(locale: string): boolean {
  return locale === 'zh-Hant';
}

export function getBaseLocale(locale: string): string {
  if (locale === 'zh-Hant') {
    return 'zh-Hans';
  }
  return locale;
}

/**
 * Get stored language preference
 */
function getStoredLanguage(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng');
  }
  return null;
}

/**
 * Detect browser language
 */
function detectBrowserLanguage(): string {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language || (navigator as Record<string, string>).userLanguage;
    if (lang) {
      if (lang.startsWith('zh-TW') || lang.startsWith('zh-Hant') || lang === 'zh-HK') {
        return 'zh-Hant';
      }
      if (lang.startsWith('zh')) {
        return 'zh-Hans';
      }
      if (lang.startsWith('en')) {
        return 'en';
      }
    }
  }
  return DEFAULT_LOCALE;
}

// Generate Traditional Chinese translations from Simplified Chinese
// This ensures all content is properly converted
const zhHantCommon = convertTranslationObject(zhCommon as Record<string, unknown>, 'zh-Hant', 'zh-Hans');
const zhHantLayout = convertTranslationObject(zhLayout as Record<string, unknown>, 'zh-Hant', 'zh-Hans');
const zhHantHome = convertTranslationObject(zhHome as Record<string, unknown>, 'zh-Hant', 'zh-Hans');
const zhHantCharacters = convertTranslationObject(zhCharacters as Record<string, unknown>, 'zh-Hant', 'zh-Hans');
const zhHantChapters = convertTranslationObject(zhChapters as Record<string, unknown>, 'zh-Hant', 'zh-Hans');
const zhHantTimeline = convertTranslationObject(zhTimeline as Record<string, unknown>, 'zh-Hant', 'zh-Hans');
const zhHantRelationships = convertTranslationObject(zhRelationships as Record<string, unknown>, 'zh-Hant', 'zh-Hans');
const zhHantErrors = convertTranslationObject(zhErrors as Record<string, unknown>, 'zh-Hant', 'zh-Hans');

// Bundled translation resources
const resources = {
  en: {
    common: enCommon,
    layout: enLayout,
    home: enHome,
    characters: enCharacters,
    chapters: enChapters,
    timeline: enTimeline,
    relationships: enRelationships,
    errors: enErrors,
  },
  'zh-Hans': {
    common: zhCommon,
    layout: zhLayout,
    home: zhHome,
    characters: zhCharacters,
    chapters: zhChapters,
    timeline: zhTimeline,
    relationships: zhRelationships,
    errors: zhErrors,
  },
  'zh-Hant': {
    common: zhHantCommon,
    layout: zhHantLayout,
    home: zhHantHome,
    characters: zhHantCharacters,
    chapters: zhHantChapters,
    timeline: zhHantTimeline,
    relationships: zhHantRelationships,
    errors: zhHantErrors,
  },
};

// Determine initial language
const initialLanguage = getStoredLanguage() || detectBrowserLanguage();

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    supportedLngs: SUPPORTED_LOCALES,
    fallbackLng: {
      'zh': ['zh-Hans', 'en'],
      'zh-Hant': ['zh-Hans', 'en'],
      default: ['en'],
    },
    defaultNS: DEFAULT_NS,
    ns: NAMESPACES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: import.meta.env.DEV,
  });

// Store language preference when it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', lng);
    // Update document lang attribute
    document.documentElement.lang = lng === 'zh-Hans' ? 'zh-CN' : lng === 'zh-Hant' ? 'zh-TW' : 'en';
  }
});

// Set initial document lang
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage === 'zh-Hans' ? 'zh-CN' : initialLanguage === 'zh-Hant' ? 'zh-TW' : 'en';
}

export default i18n;
