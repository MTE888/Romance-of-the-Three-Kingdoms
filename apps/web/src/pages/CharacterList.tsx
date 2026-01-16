/**
 * CharacterList Page
 *
 * Browse and search all characters with filtering by kingdom
 */

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { KingdomBadge } from '@/components/ui/KingdomBadge';

// GraphQL query
const GET_CHARACTERS = gql`
  query GetCharacters($filter: CharacterFilter, $pagination: PaginationInput) {
    characters(filter: $filter, pagination: $pagination) {
      id
      canonicalName
      courtesyName
      kingdom
      birthYear
      deathYear
    }
    charactersCount(filter: $filter)
  }
`;

export function CharacterList() {
  const [kingdomFilter, setKingdomFilter] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      filter: kingdomFilter ? { kingdom: kingdomFilter } : {},
      pagination: { limit: 50, offset: 0 },
    },
  });

  if (loading) return <Loading message="Loading characters..." />;
  if (error)
    return (
      <ErrorMessage
        title="Failed to load characters"
        message={error.message}
      />
    );

  const characters = data?.characters || [];
  const totalCount = data?.charactersCount || 0;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ink-black mb-2">
          Characters <span className="font-zh-serif">人物</span>
        </h1>
        <p className="text-gray-600">
          Browse {totalCount} characters from the Three Kingdoms period
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Filter by Kingdom:
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setKingdomFilter(null)}
              className={`px-4 py-2 rounded ${
                kingdomFilter === null
                  ? 'bg-vermillion text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {['WEI', 'SHU', 'WU', 'HAN'].map((kingdom) => (
              <button
                key={kingdom}
                onClick={() => setKingdomFilter(kingdom)}
                className={`px-4 py-2 rounded ${
                  kingdomFilter === kingdom
                    ? 'bg-vermillion text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {kingdom}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Character Grid */}
      {characters.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No characters found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character: any) => (
            <Link
              key={character.id}
              to={`/characters/${character.id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold font-zh-serif">
                    {character.canonicalName?.zh || 'Unknown'}
                  </h3>
                  {character.courtesyName?.zh && (
                    <p className="text-sm text-gray-600 font-zh-serif">
                      字 {character.courtesyName.zh}
                    </p>
                  )}
                </div>
                <KingdomBadge kingdom={character.kingdom} />
              </div>

              <div className="text-gray-700">
                <p className="text-lg font-en-serif">
                  {character.canonicalName?.en || ''}
                </p>
                {character.courtesyName?.en && (
                  <p className="text-sm text-gray-500">
                    Courtesy name: {character.courtesyName.en}
                  </p>
                )}
              </div>

              {(character.birthYear || character.deathYear) && (
                <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                  {character.birthYear && character.deathYear
                    ? `${character.birthYear} - ${character.deathYear} AD`
                    : character.birthYear
                    ? `Born ${character.birthYear} AD`
                    : `Died ${character.deathYear} AD`}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
