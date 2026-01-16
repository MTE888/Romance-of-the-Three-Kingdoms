/**
 * KingdomBadge Component
 *
 * Display kingdom affiliation with color coding
 */

interface KingdomBadgeProps {
  kingdom: 'WEI' | 'SHU' | 'WU' | 'HAN' | 'OTHER';
}

const kingdomConfig = {
  WEI: { label: '魏', color: 'bg-wei', textColor: 'text-white' },
  SHU: { label: '蜀', color: 'bg-shu', textColor: 'text-white' },
  WU: { label: '吴', color: 'bg-wu', textColor: 'text-white' },
  HAN: { label: '汉', color: 'bg-imperial-yellow', textColor: 'text-ink-black' },
  OTHER: { label: '其他', color: 'bg-gray-400', textColor: 'text-white' },
};

export function KingdomBadge({ kingdom }: KingdomBadgeProps) {
  const config = kingdomConfig[kingdom];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-zh-serif ${config.color} ${config.textColor}`}
    >
      {config.label}
    </span>
  );
}
