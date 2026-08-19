/**
 * KingdomBadge Component
 *
 * Display kingdom affiliation with color coding,
 * elegant styling, and translated labels
 *
 * Design: Pill-shaped badge with kingdom-specific colors
 */

import { useTranslation } from 'react-i18next';

interface KingdomBadgeProps {
  kingdom: 'WEI' | 'SHU' | 'WU' | 'HAN' | 'OTHER';
  size?: 'sm' | 'md' | 'lg';
  /** Show Chinese label regardless of locale */
  showChineseLabel?: boolean;
}

const kingdomConfig = {
  WEI: {
    labelKey: 'kingdoms.wei',
    chineseLabel: '魏',
    color: 'bg-wei',
    textColor: 'text-white',
    borderColor: 'border-wei',
    bgLight: 'bg-wei/10',
    textLight: 'text-wei',
  },
  SHU: {
    labelKey: 'kingdoms.shu',
    chineseLabel: '蜀',
    color: 'bg-shu',
    textColor: 'text-white',
    borderColor: 'border-shu',
    bgLight: 'bg-shu/10',
    textLight: 'text-shu',
  },
  WU: {
    labelKey: 'kingdoms.wu',
    chineseLabel: '吴',
    color: 'bg-wu',
    textColor: 'text-white',
    borderColor: 'border-wu',
    bgLight: 'bg-wu/10',
    textLight: 'text-wu',
  },
  HAN: {
    labelKey: 'kingdoms.han',
    chineseLabel: '汉',
    color: 'bg-imperial-yellow',
    textColor: 'text-ink-black',
    borderColor: 'border-imperial-yellow',
    bgLight: 'bg-imperial-yellow/10',
    textLight: 'text-imperial-yellow',
  },
  OTHER: {
    labelKey: 'kingdoms.other',
    chineseLabel: '其他',
    color: 'bg-gray-400',
    textColor: 'text-white',
    borderColor: 'border-gray-400',
    bgLight: 'bg-gray-100',
    textLight: 'text-gray-600',
  },
};

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function KingdomBadge({
  kingdom,
  size = 'md',
  showChineseLabel = false,
}: KingdomBadgeProps) {
  const { t, i18n } = useTranslation('common');
  const config = kingdomConfig[kingdom];
  const sizeClass = sizeClasses[size];

  // Determine label based on locale and showChineseLabel prop
  const isChinese = i18n.language.startsWith('zh');
  const label = showChineseLabel || isChinese
    ? config.chineseLabel
    : t(config.labelKey);

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium font-zh-serif shadow-sm transition-transform duration-300 hover:scale-105 ${sizeClass} ${config.color} ${config.textColor}`}
    >
      {label}
    </span>
  );
}

/**
 * Kingdom Badge Outline variant
 * For lighter weight display
 */
export function KingdomBadgeOutline({
  kingdom,
  size = 'md',
  showChineseLabel = false,
}: KingdomBadgeProps) {
  const { t, i18n } = useTranslation('common');
  const config = kingdomConfig[kingdom];
  const sizeClass = sizeClasses[size];

  const isChinese = i18n.language.startsWith('zh');
  const label = showChineseLabel || isChinese
    ? config.chineseLabel
    : t(config.labelKey);

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium font-zh-serif border-2 ${sizeClass} ${config.borderColor} ${config.textLight} ${config.bgLight}`}
    >
      {label}
    </span>
  );
}
