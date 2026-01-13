/**
 * Character Detection Hook
 *
 * Fetches character names and provides utilities to detect them in chapter text
 */

import { useQuery, gql } from '@apollo/client';
import { useMemo } from 'react';

const GET_CHARACTER_NAMES = gql`
  query GetCharacterNames {
    characterNames {
      id
      canonicalName
      kingdom
    }
  }
`;

interface CharacterName {
  id: string;
  canonicalName: {
    zh: string;
    en?: string;
  };
  kingdom: string;
}

interface CharacterMatch {
  id: string;
  name: string;
  kingdom: string;
  startIndex: number;
  endIndex: number;
}

export const useCharacterDetection = () => {
  const { loading, error, data } = useQuery(GET_CHARACTER_NAMES);

  const characters = useMemo<CharacterName[]>(() => {
    return data?.characterNames || [];
  }, [data]);

  /**
   * Detect character names in a text string
   * Returns array of matches with positions
   */
  const detectCharacters = useMemo(
    () => (text: string): CharacterMatch[] => {
      if (!text || characters.length === 0) return [];

      const matches: CharacterMatch[] = [];

      // Sort characters by name length (longest first) to match longer names first
      // This prevents "刘备" from being split into "刘" and "备" if both exist
      const sortedCharacters = [...characters].sort((a, b) => {
        const aLen = a.canonicalName.zh?.length || 0;
        const bLen = b.canonicalName.zh?.length || 0;
        return bLen - aLen;
      });

      for (const character of sortedCharacters) {
        const name = character.canonicalName.zh;
        if (!name || name.length < 2) continue; // Skip single-character names to reduce false positives

        let searchIndex = 0;
        while (searchIndex < text.length) {
          const index = text.indexOf(name, searchIndex);
          if (index === -1) break;

          // Check if this position is already covered by a longer match
          const isOverlapping = matches.some(
            (m) => index >= m.startIndex && index < m.endIndex
          );

          if (!isOverlapping) {
            matches.push({
              id: character.id,
              name,
              kingdom: character.kingdom,
              startIndex: index,
              endIndex: index + name.length,
            });
          }

          searchIndex = index + 1;
        }
      }

      // Sort matches by position
      return matches.sort((a, b) => a.startIndex - b.startIndex);
    },
    [characters]
  );

  /**
   * Split text into segments, some of which are character names
   */
  const parseTextWithCharacters = useMemo(
    () => (
      text: string
    ): Array<
      | { type: 'text'; content: string }
      | { type: 'character'; id: string; name: string; kingdom: string }
    > => {
      const matches = detectCharacters(text);
      if (matches.length === 0) {
        return [{ type: 'text', content: text }];
      }

      const segments: Array<
        | { type: 'text'; content: string }
        | { type: 'character'; id: string; name: string; kingdom: string }
      > = [];
      let lastIndex = 0;

      for (const match of matches) {
        // Add text before this character
        if (match.startIndex > lastIndex) {
          segments.push({
            type: 'text',
            content: text.substring(lastIndex, match.startIndex),
          });
        }

        // Add character segment
        segments.push({
          type: 'character',
          id: match.id,
          name: match.name,
          kingdom: match.kingdom,
        });

        lastIndex = match.endIndex;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        segments.push({
          type: 'text',
          content: text.substring(lastIndex),
        });
      }

      return segments;
    },
    [detectCharacters]
  );

  return {
    loading,
    error,
    characters,
    detectCharacters,
    parseTextWithCharacters,
  };
};
