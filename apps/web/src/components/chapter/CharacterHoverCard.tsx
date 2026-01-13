/**
 * Character Hover Card Component
 *
 * Displays a floating card with character information when hovering over character names
 * in chapter text. Shows quick profile info without leaving the reading experience.
 */

import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { KingdomBadge } from '../ui/KingdomBadge';
import { Loading } from '../ui/Loading';

const GET_CHARACTER = gql`
  query GetCharacterForHoverCard($id: ID!) {
    character(id: $id) {
      id
      canonicalName
      kingdom
      birthYear
      deathYear
      literaryProfile
      images
    }
  }
`;

interface CharacterHoverCardProps {
  characterId: string;
  anchorElement: HTMLElement;
  onClose: () => void;
}

export const CharacterHoverCard: React.FC<CharacterHoverCardProps> = ({
  characterId,
  anchorElement,
  onClose,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  // Calculate position based on anchor element
  useEffect(() => {
    if (!anchorElement) return;

    const rect = anchorElement.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    // Position card below the text, centered
    const cardWidth = 320;
    const top = rect.bottom + scrollY + 8;
    let left = rect.left + scrollX + rect.width / 2 - cardWidth / 2;

    // Keep card within viewport
    const viewportWidth = window.innerWidth;
    if (left + cardWidth > viewportWidth - 16) {
      left = viewportWidth - cardWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    setPosition({ top, left });
  }, [anchorElement]);

  if (loading) {
    return (
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: '320px',
        }}
      >
        <Loading />
      </div>
    );
  }

  if (error || !data?.character) {
    return null;
  }

  const character = data.character;
  const canonicalName = character.canonicalName || {};
  const literaryProfile = character.literaryProfile || {};
  const summary = literaryProfile.summary || '';
  const traits = literaryProfile.traits || [];

  // Get first 2 sentences for quick summary
  const quickSummary = summary
    .split(/[。.!！]/)
    .filter((s: string) => s.trim())
    .slice(0, 2)
    .join('。') + '。';

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-fade-in"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '320px',
      }}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      {/* Header with character name */}
      <div className="bg-gradient-to-r from-vermillion to-red-700 p-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-zh-serif text-xl font-bold mb-1">
              {canonicalName.zh}
            </h3>
            {canonicalName.en && (
              <p className="text-sm text-red-100">{canonicalName.en}</p>
            )}
          </div>
          <KingdomBadge kingdom={character.kingdom} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Life span */}
        {(character.birthYear || character.deathYear) && (
          <div className="text-sm text-gray-600 mb-3">
            {character.birthYear && `${character.birthYear}`}
            {character.birthYear && character.deathYear && ' - '}
            {character.deathYear && `${character.deathYear}`}
            {character.birthYear || character.deathYear ? ' AD' : ''}
          </div>
        )}

        {/* Quick summary */}
        {quickSummary && quickSummary !== '。' && (
          <p className="text-sm text-gray-700 leading-relaxed mb-3 font-zh-serif">
            {quickSummary}
          </p>
        )}

        {/* Key traits */}
        {traits.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {traits.slice(0, 3).map((trait: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {trait}
              </span>
            ))}
          </div>
        )}

        {/* View full profile link */}
        <Link
          to={`/characters/${character.id}`}
          className="text-sm text-vermillion hover:text-red-700 font-medium inline-flex items-center"
        >
          View Full Profile
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
