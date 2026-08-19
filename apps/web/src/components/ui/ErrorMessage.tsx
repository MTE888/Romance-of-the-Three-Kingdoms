/**
 * ErrorMessage Component
 *
 * Heritage-styled error message with traditional Chinese aesthetics,
 * vermillion accents, and elegant visual treatment
 *
 * Design: Card with vermillion border accent and heritage styling
 */

import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  /** Error title (translation key or direct text) */
  title?: string;
  /** Error message (translation key or direct text) */
  message: string;
  /** If true, title and message are treated as translation keys */
  useTranslationKeys?: boolean;
  /** Optional retry callback */
  onRetry?: () => void;
}

export function ErrorMessage({
  title,
  message,
  useTranslationKeys = false,
  onRetry,
}: ErrorMessageProps) {
  const { t } = useTranslation('errors');
  const { t: tCommon } = useTranslation('common');

  // Determine display text
  const displayTitle = useTranslationKeys
    ? t(title || 'generic.title')
    : title || t('generic.title');

  const displayMessage = useTranslationKeys ? t(message) : message;

  return (
    <div className="card border-l-4 border-vermillion my-6 animate-fade-in overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-vermillion/5 pointer-events-none" />

      <div className="relative flex items-start gap-4">
        {/* Icon container */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-vermillion/10 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-vermillion"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold font-zh-serif text-ink-black mb-2">
            {displayTitle}
          </h3>
          <p className="text-text-secondary leading-relaxed">
            {displayMessage}
          </p>

          {/* Retry button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-vermillion/10 text-vermillion rounded-lg font-medium hover:bg-vermillion hover:text-white transition-all duration-300 ease-elegant"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {tCommon('actions.retry')}
            </button>
          )}
        </div>
      </div>

      {/* Decorative seal stamp */}
      <div className="absolute -bottom-4 -right-4 opacity-10">
        <div className="seal-stamp text-4xl px-6 py-4 rotate-12">误</div>
      </div>
    </div>
  );
}
