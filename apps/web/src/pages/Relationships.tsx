/**
 * Relationships Page
 *
 * Interactive visualization of character relationships
 * Phase 3 - Relationships & Timeline
 */

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { RelationshipGraph } from '../components/graph/RelationshipGraph';

const GET_RELATIONSHIPS = gql`
  query GetRelationships($filter: RelationshipFilter) {
    relationships(filter: $filter) {
      id
      relationshipType
      relationshipSource
      strength
      description
      isReciprocal
      characterA {
        id
        canonicalName
        kingdom
      }
      characterB {
        id
        canonicalName
        kingdom
      }
    }
  }
`;

export function Relationships() {
  const [relationshipType, setRelationshipType] = useState<string | null>(null);
  const [relationshipSource, setRelationshipSource] = useState<string | null>(null);
  const [kingdom, setKingdom] = useState<string | null>(null);
  const [minStrength, setMinStrength] = useState<number>(0);

  const { loading, error, data } = useQuery(GET_RELATIONSHIPS, {
    variables: {
      filter: {
        relationshipType: relationshipType || undefined,
        relationshipSource: relationshipSource || undefined,
        kingdom: kingdom || undefined,
        minStrength: minStrength > 0 ? minStrength : undefined,
      },
    },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  const relationships = data?.relationships || [];

  return (
    <div className="min-h-screen bg-rice-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-vermillion shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-zh-serif text-ink-black mb-2">
            人物关系图
          </h1>
          <p className="text-lg text-gray-600 font-en-serif">
            Character Relationship Graph
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Explore the complex web of relationships between characters from the Three Kingdoms period
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Relationship Type Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Relationship Type
              </label>
              <select
                value={relationshipType || ''}
                onChange={(e) => setRelationshipType(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-vermillion focus:border-vermillion"
              >
                <option value="">All Types</option>
                <option value="SWORN_BROTHER">Sworn Brothers</option>
                <option value="FAMILY">Family</option>
                <option value="SPOUSE">Spouse</option>
                <option value="PARENT_CHILD">Parent-Child</option>
                <option value="LORD_VASSAL">Lord-Vassal</option>
                <option value="FRIEND">Friend</option>
                <option value="RIVAL">Rival</option>
                <option value="ENEMY">Enemy</option>
                <option value="MENTOR_STUDENT">Mentor-Student</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Source
              </label>
              <select
                value={relationshipSource || ''}
                onChange={(e) => setRelationshipSource(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-vermillion focus:border-vermillion"
              >
                <option value="">All Sources</option>
                <option value="HISTORICAL">Historical Records</option>
                <option value="LITERARY">Romance Novel</option>
                <option value="BOTH">Both Sources</option>
              </select>
            </div>

            {/* Kingdom Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Kingdom
              </label>
              <select
                value={kingdom || ''}
                onChange={(e) => setKingdom(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-vermillion focus:border-vermillion"
              >
                <option value="">All Kingdoms</option>
                <option value="WEI">Wei (魏)</option>
                <option value="SHU">Shu (蜀)</option>
                <option value="WU">Wu (吴)</option>
                <option value="HAN">Han (汉)</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Strength Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Min Strength: {minStrength}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={minStrength}
                onChange={(e) => setMinStrength(parseInt(e.target.value))}
                className="w-32"
              />
            </div>

            {/* Reset Button */}
            {(relationshipType || relationshipSource || kingdom || minStrength > 0) && (
              <button
                onClick={() => {
                  setRelationshipType(null);
                  setRelationshipSource(null);
                  setKingdom(null);
                  setMinStrength(0);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>
            )}

            <div className="ml-auto text-sm text-gray-600">
              Showing {relationships.length} relationship{relationships.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="h-[calc(100vh-280px)]">
        {relationships.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-500 font-medium">No relationships found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <RelationshipGraph relationships={relationships} />
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-ink-black mb-2">About This Graph</h3>
              <p className="text-gray-600">
                This interactive graph visualizes the relationships between characters from the Three Kingdoms period.
                Each node represents a character, colored by their kingdom affiliation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-ink-black mb-2">How to Use</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Click and drag nodes to rearrange the graph</li>
                <li>• Use the minimap to navigate large networks</li>
                <li>• Zoom in/out with the controls or mouse wheel</li>
                <li>• Filter relationships using the controls above</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-ink-black mb-2">Relationship Types</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>Sworn Brother</strong>: Oath of brotherhood</li>
                <li>• <strong>Lord-Vassal</strong>: Political allegiance</li>
                <li>• <strong>Rival/Enemy</strong>: Antagonistic relations</li>
                <li>• <strong>Family</strong>: Blood relatives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
