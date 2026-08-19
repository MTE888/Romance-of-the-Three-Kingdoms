/**
 * Loading Component
 *
 * Heritage-styled loading spinner with traditional Chinese aesthetics,
 * subtle animations, and translated messages
 *
 * Design: Vermillion accent with elegant fade animation
 */

import { useTranslation } from 'react-i18next';

interface LoadingProps {
  /** Optional custom message key (defaults to 'common:status.loading') */
  messageKey?: string;
  /** Direct message text (overrides messageKey) */
  message?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export function Loading({ messageKey = 'status.loading', message, size = 'md' }: LoadingProps) {
  const { t } = useTranslation('common');

  const displayMessage = message || t(messageKey);

  const sizeClasses = {
    sm: { container: 'py-6', spinner: 'w-8 h-8', text: 'text-sm mt-3' },
    md: { container: 'py-12', spinner: 'w-12 h-12', text: 'text-base mt-4' },
    lg: { container: 'py-16', spinner: 'w-16 h-16', text: 'text-lg mt-5' },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center ${classes.container} animate-fade-in`}>
      {/* Custom heritage spinner */}
      <div className={`relative ${classes.spinner}`}>
        {/* Outer ring with gradient */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        {/* Spinning accent */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-vermillion border-r-heritage-gold animate-spin" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-vermillion rounded-full animate-pulse" />
        </div>
      </div>

      {/* Message with heritage styling */}
      <p className={`${classes.text} text-text-secondary font-zh-serif tracking-wide`}>
        {displayMessage}
      </p>

      {/* Subtle decorative dots */}
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-heritage-gold/50 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
