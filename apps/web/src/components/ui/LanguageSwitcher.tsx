/**
 * Language Switcher Component
 *
 * Heritage-styled dropdown for switching between supported languages.
 * Uses Headless UI for accessible dropdown behavior with traditional
 * Chinese aesthetics and elegant animations.
 *
 * Design: Glassmorphic dropdown with heritage gold accents
 */

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { LocaleCode } from '../../lib/i18n';

/**
 * Language option with display info
 */
interface LanguageOption {
  code: LocaleCode;
  name: string;
  nativeName: string;
}

/**
 * Supported language options
 */
const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh-Hans', name: 'Simplified Chinese', nativeName: '简体中文' },
  { code: 'zh-Hant', name: 'Traditional Chinese', nativeName: '繁體中文' },
];

/**
 * Get the flag/icon for a locale
 */
function getLocaleIcon(locale: LocaleCode): string {
  switch (locale) {
    case 'en':
      return '🌐';
    case 'zh-Hans':
      return '简';
    case 'zh-Hant':
      return '繁';
    default:
      return '🌐';
  }
}

/**
 * LanguageSwitcher Props
 */
interface LanguageSwitcherProps {
  /** Compact mode shows only the icon */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Language Switcher Component
 *
 * @example
 * ```tsx
 * // Full display
 * <LanguageSwitcher />
 *
 * // Compact (icon only)
 * <LanguageSwitcher compact />
 * ```
 */
export function LanguageSwitcher({ compact = false, className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale, isReady } = useLanguage();

  // Find current language option
  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === locale) || LANGUAGE_OPTIONS[0];

  // Don't render until i18n is ready
  if (!isReady) {
    return null;
  }

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      {({ open }) => (
        <>
          {/* Trigger Button */}
          <Menu.Button
            className={`
              inline-flex items-center justify-center gap-2
              px-3 py-2 text-sm font-medium rounded-xl
              bg-white/80 backdrop-blur-sm border border-gray-200
              text-ink-black hover:bg-heritage-gold/10 hover:border-heritage-gold/50
              focus:outline-none focus:ring-2 focus:ring-heritage-gold focus:ring-offset-2
              transition-all duration-300 ease-elegant
              shadow-sm hover:shadow-md
            `}
            aria-label="Select language"
          >
            {/* Current language indicator */}
            <span className="text-base font-zh-serif" aria-hidden="true">
              {getLocaleIcon(locale)}
            </span>

            {/* Show name in non-compact mode */}
            {!compact && (
              <span className="hidden sm:inline font-medium">{currentOption.nativeName}</span>
            )}

            {/* Dropdown arrow */}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ease-elegant ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Menu.Button>

          {/* Dropdown Menu */}
          <Transition
            as={Fragment}
            enter="transition ease-elegant duration-200"
            enterFrom="transform opacity-0 scale-95 -translate-y-2"
            enterTo="transform opacity-100 scale-100 translate-y-0"
            leave="transition ease-elegant duration-150"
            leaveFrom="transform opacity-100 scale-100 translate-y-0"
            leaveTo="transform opacity-0 scale-95 -translate-y-2"
          >
            <Menu.Items
              className={`
                absolute right-0 z-dropdown mt-2 w-52
                origin-top-right rounded-xl
                bg-white/95 backdrop-blur-md
                shadow-card ring-1 ring-heritage-gold/20
                focus:outline-none
                overflow-hidden
              `}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 bg-heritage-gold/5">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">Language</p>
              </div>

              <div className="py-2">
                {LANGUAGE_OPTIONS.map((option) => (
                  <Menu.Item key={option.code}>
                    {({ active }) => (
                      <button
                        onClick={() => setLocale(option.code)}
                        className={`
                          ${active ? 'bg-heritage-gold/10' : ''}
                          ${option.code === locale ? 'bg-heritage-gold/5' : ''}
                          group flex items-center w-full px-4 py-3 text-sm
                          transition-colors duration-200 ease-elegant
                        `}
                        aria-current={option.code === locale ? 'true' : undefined}
                      >
                        {/* Language icon */}
                        <span className="mr-3 text-lg font-zh-serif w-8 text-center" aria-hidden="true">
                          {getLocaleIcon(option.code)}
                        </span>

                        {/* Language name */}
                        <span className={`flex-1 text-left ${option.code === locale ? 'font-semibold text-heritage-gold' : 'text-ink-black'}`}>
                          {option.nativeName}
                        </span>

                        {/* Check mark for current language */}
                        {option.code === locale && (
                          <div className="w-6 h-6 rounded-full bg-heritage-gold/20 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-heritage-gold"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

/**
 * Simple text-based language toggle for inline use
 * Heritage-styled with seal stamp aesthetic
 *
 * @example
 * ```tsx
 * <LanguageToggle />
 * // Renders: EN | 简 | 繁
 * ```
 */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-2 text-sm ${className}`}>
      {LANGUAGE_OPTIONS.map((option, index) => (
        <Fragment key={option.code}>
          {index > 0 && <span className="text-heritage-gold/30">•</span>}
          <button
            onClick={() => setLocale(option.code)}
            className={`
              px-2 py-1 rounded-lg font-zh-serif
              ${locale === option.code
                ? 'text-heritage-gold font-bold bg-heritage-gold/10'
                : 'text-text-secondary hover:text-heritage-gold hover:bg-heritage-gold/5'
              }
              focus:outline-none focus:ring-2 focus:ring-heritage-gold focus:ring-offset-1
              transition-all duration-300 ease-elegant
            `}
            aria-label={`Switch to ${option.name}`}
            aria-current={locale === option.code ? 'true' : undefined}
          >
            {option.code === 'en' ? 'EN' : option.code === 'zh-Hans' ? '简' : '繁'}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
