/**
 * CharacterDetail Page
 *
 * Detailed view of a single character with dual profiles (historical vs literary)
 */

import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { KingdomBadge } from '@/components/ui/KingdomBadge';

// GraphQL query
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      canonicalName
      courtesyName
      aliases
      birthYear
      deathYear
      kingdom
      socialClass
      occupations
      historicalProfile
      literaryProfile
      birthLocation {
        id
        name
        modernName
      }
      relationships {
        id
        relationshipType
        relationshipSource
        characterA {
          id
          canonicalName
        }
        characterB {
          id
          canonicalName
        }
      }
    }
  }
`;

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return <Loading message="Loading character..." />;
  if (error)
    return (
      <ErrorMessage
        title="Failed to load character"
        message={error.message}
      />
    );

  const character = data?.character;

  if (!character) {
    return <ErrorMessage title="Not Found" message="Character not found" />;
  }

  const historicalProfile = character.historicalProfile || {};
  const literaryProfile = character.literaryProfile || {};

  return (
    <div>
      {/* Character Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-5xl font-bold font-zh-serif text-ink-black mb-2">
              {character.canonicalName?.zh || 'Unknown'}
            </h1>
            {character.courtesyName?.zh && (
              <p className="text-xl text-gray-600 font-zh-serif">
                字 {character.courtesyName.zh}
              </p>
            )}
          </div>
          <KingdomBadge kingdom={character.kingdom} />
        </div>

        <div className="space-y-2">
          <p className="text-2xl font-en-serif text-gray-800">
            {character.canonicalName?.en || ''}
          </p>
          {character.courtesyName?.en && (
            <p className="text-lg text-gray-600">
              Courtesy name: {character.courtesyName.en}
            </p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          {(character.birthYear || character.deathYear) && (
            <div>
              <p className="text-sm text-gray-500">Lifespan</p>
              <p className="text-lg font-medium">
                {character.birthYear && character.deathYear
                  ? `${character.birthYear} - ${character.deathYear} AD`
                  : character.birthYear
                  ? `Born ${character.birthYear} AD`
                  : `Died ${character.deathYear} AD`}
              </p>
            </div>
          )}

          {character.socialClass && (
            <div>
              <p className="text-sm text-gray-500">Social Class</p>
              <p className="text-lg font-medium">{character.socialClass}</p>
            </div>
          )}

          {character.occupations && character.occupations.length > 0 && (
            <div>
              <p className="text-sm text-gray-500">Occupations</p>
              <p className="text-lg font-medium">
                {character.occupations.join(', ')}
              </p>
            </div>
          )}
        </div>

        {character.birthLocation && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Birthplace</p>
            <p className="text-lg font-medium">
              {character.birthLocation.name?.zh || ''}{' '}
              {character.birthLocation.modernName?.zh &&
                `(${character.birthLocation.modernName.zh})`}
            </p>
          </div>
        )}
      </div>

      {/* Dual Profiles: Historical vs Literary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Historical Profile */}
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-1 h-8 bg-indigo-blue mr-3"></div>
            <div>
              <h2 className="text-2xl font-bold text-ink-black">
                Historical Profile
              </h2>
              <p className="text-sm text-gray-500">
                Based on historical records (三国志)
              </p>
            </div>
          </div>

          {historicalProfile.summary?.zh && (
            <div className="mb-4">
              <p className="text-gray-700 font-zh-serif leading-relaxed">
                {historicalProfile.summary.zh}
              </p>
              {historicalProfile.summary.en && (
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {historicalProfile.summary.en}
                </p>
              )}
            </div>
          )}

          {historicalProfile.personalityTraits &&
            historicalProfile.personalityTraits.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Personality Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {historicalProfile.personalityTraits.map(
                    (trait: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-blue bg-opacity-10 text-indigo-blue rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {historicalProfile.achievements &&
            historicalProfile.achievements.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Achievements
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {historicalProfile.achievements.map(
                    (achievement: string, i: number) => (
                      <li key={i}>{achievement}</li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>

        {/* Literary Profile */}
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-1 h-8 bg-vermillion mr-3"></div>
            <div>
              <h2 className="text-2xl font-bold text-ink-black">
                Literary Profile
              </h2>
              <p className="text-sm text-gray-500">
                Based on Romance of Three Kingdoms (三国演义)
              </p>
            </div>
          </div>

          {literaryProfile.summary?.zh && (
            <div className="mb-4">
              <p className="text-gray-700 font-zh-serif leading-relaxed">
                {literaryProfile.summary.zh}
              </p>
              {literaryProfile.summary.en && (
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {literaryProfile.summary.en}
                </p>
              )}
            </div>
          )}

          {literaryProfile.personalityTraits &&
            literaryProfile.personalityTraits.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Personality Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {literaryProfile.personalityTraits.map(
                    (trait: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-vermillion bg-opacity-10 text-vermillion rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {literaryProfile.famousScenes &&
            literaryProfile.famousScenes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Famous Scenes
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {literaryProfile.famousScenes.map(
                    (scene: string, i: number) => (
                      <li key={i}>{scene}</li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
      </div>

      {/* Relationships */}
      {character.relationships && character.relationships.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-ink-black mb-4">
            Relationships
          </h2>
          <div className="space-y-3">
            {character.relationships.map((rel: any) => {
              const otherCharacter =
                rel.characterA.id === character.id
                  ? rel.characterB
                  : rel.characterA;

              return (
                <div
                  key={rel.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {otherCharacter.canonicalName?.zh || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {rel.relationshipType.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                    {rel.relationshipSource}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
