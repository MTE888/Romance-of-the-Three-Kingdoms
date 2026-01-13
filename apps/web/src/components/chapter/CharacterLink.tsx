/**
 * Character Link Component
 *
 * Wraps character names in chapter text, providing hover interactions
 * and triggering the character hover card on hover.
 */

import React, { useRef, useState } from 'react';
import { CharacterHoverCard } from './CharacterHoverCard';

interface CharacterLinkProps {
  characterId: string;
  characterName: string;
  kingdom: string;
}

export const CharacterLink: React.FC<CharacterLinkProps> = ({
  characterId,
  characterName,
  kingdom,
}) => {
  const [showCard, setShowCard] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);

  const kingdomColors: Record<string, string> = {
    WEI: 'text-blue-700 hover:bg-blue-50',
    SHU: 'text-red-700 hover:bg-red-50',
    WU: 'text-green-700 hover:bg-green-50',
    HAN: 'text-yellow-700 hover:bg-yellow-50',
    OTHER: 'text-gray-700 hover:bg-gray-50',
  };

  const colorClass = kingdomColors[kingdom] || kingdomColors.OTHER;

  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    // Delay showing card slightly to avoid flashing on quick mouse movements
    hoverTimeout = setTimeout(() => {
      setShowCard(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    // Delay hiding to allow moving mouse to card
    setTimeout(() => {
      setShowCard(false);
    }, 200);
  };

  return (
    <>
      <span
        ref={anchorRef}
        className={`cursor-pointer font-semibold ${colorClass} transition-colors duration-150 rounded px-0.5`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {characterName}
      </span>
      {showCard && anchorRef.current && (
        <CharacterHoverCard
          characterId={characterId}
          anchorElement={anchorRef.current}
          onClose={() => setShowCard(false)}
        />
      )}
    </>
  );
};
