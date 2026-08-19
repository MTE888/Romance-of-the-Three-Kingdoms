/**
 * Language Context
 *
 * Provides language state management for the application.
 * Syncs with i18next and provides helper functions/booleans.
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { LocaleCode } from '../lib/i18n';
import { SUPPORTED_LOCALES, LOCALE_NAMES, isChinese, isTraditionalChinese } from '../lib/i18n';
import { preloadConverter } from '../lib/i18n/chinese-converter';

/**
 * Language context value interface
 */
interface LanguageContextValue {
  /** Current locale code */
  locale: LocaleCode;
  /** Change the current locale */
  setLocale: (locale: LocaleCode) => void;
  /** All supported locales */
  supportedLocales: readonly LocaleCode[];
  /** Get display name for a locale */
  getLocaleName: (locale: LocaleCode) => string;
  /** Whether current locale is Chinese (simplified or traditional) */
  isChinese: boolean;
  /** Whether current locale is English */
  isEnglish: boolean;
  /** Whether current locale is Traditional Chinese */
  isTraditional: boolean;
  /** Whether i18n is initialized and ready */
  isReady: boolean;
}

/**
 * Language context
 */
const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Language Provider Props
 */
interface LanguageProviderProps {
  children: React.ReactNode;
}

/**
 * Language Provider Component
 *
 * Wraps the application to provide language context.
 * Syncs with i18next and manages document lang attribute.
 */
export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n, ready } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<LocaleCode>(
    (i18n.language as LocaleCode) || 'en'
  );

  // Sync state with i18next language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLocale(lng as LocaleCode);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Update document lang attribute when locale changes
  useEffect(() => {
    // Set the html lang attribute
    // Use standard BCP 47 language tags for HTML
    const htmlLang = currentLocale === 'zh-Hans' ? 'zh-CN' : currentLocale === 'zh-Hant' ? 'zh-TW' : 'en';
    document.documentElement.lang = htmlLang;

    // Preload converter for Traditional Chinese
    if (isTraditionalChinese(currentLocale)) {
      preloadConverter(currentLocale);
    }
  }, [currentLocale]);

  // Change locale handler
  const setLocale = useCallback(
    (locale: LocaleCode) => {
      i18n.changeLanguage(locale);
    },
    [i18n]
  );

  // Get display name for a locale
  const getLocaleName = useCallback((locale: LocaleCode): string => {
    return LOCALE_NAMES[locale] || locale;
  }, []);

  // Memoized context value
  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      locale: currentLocale,
      setLocale,
      supportedLocales: SUPPORTED_LOCALES,
      getLocaleName,
      isChinese: isChinese(currentLocale),
      isEnglish: currentLocale === 'en',
      isTraditional: isTraditionalChinese(currentLocale),
      isReady: ready,
    }),
    [currentLocale, setLocale, getLocaleName, ready]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context
 *
 * @throws Error if used outside LanguageProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { locale, setLocale, isChinese } = useLanguage();
 *
 *   return (
 *     <div>
 *       <p>Current: {locale}</p>
 *       <button onClick={() => setLocale('zh-Hans')}>中文</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}

/**
 * Higher-order component for language context
 *
 * @deprecated Prefer using the useLanguage hook instead
 */
export function withLanguage<P extends object>(
  WrappedComponent: React.ComponentType<P & LanguageContextValue>
): React.FC<P> {
  return function WithLanguageWrapper(props: P) {
    const language = useLanguage();
    return <WrappedComponent {...props} {...language} />;
  };
}
