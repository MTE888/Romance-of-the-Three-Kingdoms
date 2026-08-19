/**
 * Multilingual String Helper
 *
 * Utilities for working with multilingual content from the API.
 * Handles extraction of the correct language version based on current locale.
 *
 * IMPORTANT: This module handles BOTH:
 * 1. UI translations (via i18next t() function)
 * 2. API data conversion (via extractLocalized / useLocalized)
 *
 * For Traditional Chinese:
 * - UI strings are automatically converted in the i18n config
 * - API data (from GraphQL) must be converted using these utilities
 */

import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { LocaleCode } from './index';
import { isTraditionalChinese } from './index';
import { convertChineseSync } from './chinese-converter';

/**
 * Multilingual string structure matching the API format
 */
export interface MultilingualString {
  zh: string;
  en?: string;
}

/**
 * Extract the localized string from a MultilingualString object
 * For Traditional Chinese, converts the Chinese text automatically
 */
export function extractLocalized(
  multilingual: MultilingualString | null | undefined,
  locale: LocaleCode | string
): string {
  if (!multilingual) {
    return '';
  }

  // English locale - prefer English, fallback to Chinese
  if (locale === 'en') {
    return multilingual.en || multilingual.zh || '';
  }

  // Chinese locales - use Chinese text
  const zhText = multilingual.zh || '';

  // Traditional Chinese - convert from Simplified
  if (locale === 'zh-Hant') {
    return convertChineseSync(zhText, 'zh-Hant', 'zh-Hans');
  }

  // Simplified Chinese
  return zhText;
}

/**
 * Convert any string for the target locale
 * Use this for strings that come from the API but aren't in MultilingualString format
 */
export function convertForLocale(
  text: string | null | undefined,
  locale: LocaleCode | string,
  sourceLocale: LocaleCode | string = 'zh-Hans'
): string {
  if (!text) return '';

  // If target is Traditional Chinese and source is Simplified, convert
  if (locale === 'zh-Hant' && sourceLocale === 'zh-Hans') {
    return convertChineseSync(text, 'zh-Hant', 'zh-Hans');
  }

  return text;
}

/**
 * React hook for extracting localized content from API data
 *
 * This hook provides utilities for:
 * 1. getLocalized() - Extract correct language from MultilingualString
 * 2. convertText() - Convert any Chinese text for current locale
 * 3. formatYear() - Format year in locale-appropriate format
 */
export function useLocalized() {
  const { i18n } = useTranslation();
  const locale = (i18n.language || 'en') as LocaleCode;

  const isChinese = locale === 'zh-Hans' || locale === 'zh-Hant';
  const isTraditional = locale === 'zh-Hant';
  const isEnglish = locale === 'en';

  /**
   * Get the localized version of a multilingual string from API
   */
  const getLocalized = useCallback(
    (multilingual: MultilingualString | null | undefined): string => {
      return extractLocalized(multilingual, locale);
    },
    [locale]
  );

  /**
   * Convert any Chinese text for the current locale
   * Use this for text that comes from API but isn't MultilingualString format
   */
  const convertText = useCallback(
    (text: string | null | undefined, sourceLocale: LocaleCode | string = 'zh-Hans'): string => {
      return convertForLocale(text, locale, sourceLocale);
    },
    [locale]
  );

  /**
   * Convert an array of strings (like traits, achievements, etc.)
   */
  const convertArray = useCallback(
    (arr: string[] | null | undefined, sourceLocale: LocaleCode | string = 'zh-Hans'): string[] => {
      if (!arr) return [];
      return arr.map(item => convertForLocale(item, locale, sourceLocale));
    },
    [locale]
  );

  return useMemo(() => ({
    locale,
    isChinese,
    isTraditional,
    isEnglish,
    getLocalized,
    convertText,
    convertArray,
  }), [locale, isChinese, isTraditional, isEnglish, getLocalized, convertText, convertArray]);
}

/**
 * Hook for displaying character names
 * Character names always show both Chinese + English romanization
 */
export function useCharacterName(name: MultilingualString | null | undefined) {
  const { locale, isChinese, getLocalized, convertText } = useLocalized();

  // Chinese name (with Traditional conversion if needed)
  const chineseName = convertText(name?.zh || '', 'zh-Hans');

  // English romanization
  const englishName = name?.en || '';

  // Full display name based on locale
  const displayName = getLocalized(name);

  return {
    chineseName,
    englishName,
    displayName,
    showBoth: true,
    locale,
    isChinese,
  };
}

/**
 * Format a year based on locale
 */
export function formatYear(year: number, locale: LocaleCode | string): string {
  if (locale === 'en') {
    if (year < 0) {
      return `${Math.abs(year)} BC`;
    }
    return `${year} AD`;
  }

  // Chinese format
  let result: string;
  if (year < 0) {
    result = `公元前${Math.abs(year)}年`;
  } else {
    result = `公元${year}年`;
  }

  // Convert to Traditional if needed
  if (locale === 'zh-Hant') {
    return convertChineseSync(result, 'zh-Hant', 'zh-Hans');
  }

  return result;
}

/**
 * Format a year range based on locale
 */
export function formatYearRange(
  startYear: number | null | undefined,
  endYear: number | null | undefined,
  locale: LocaleCode | string
): string {
  if (!startYear && !endYear) {
    return locale === 'en' ? 'Unknown' : (locale === 'zh-Hant' ? '未知' : '未知');
  }

  if (!startYear) {
    return `? - ${formatYear(endYear!, locale)}`;
  }

  if (!endYear) {
    return `${formatYear(startYear, locale)} - ?`;
  }

  return `${formatYear(startYear, locale)} - ${formatYear(endYear, locale)}`;
}
