/**
 * Relationships Page
 *
 * Interactive visualization of character relationships with i18n support
 * Phase 3 - Relationships & Timeline
 */

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('relationships');
  const { t: tCommon } = useTranslation('common');
  const { t: tErrors } = useTranslation('errors');

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
  if (error) return <ErrorMessage title={tErrors('api.loadFailed')} message={error.message} />;

  const relationships = data?.relationships || [];

  return (
    <div className="min-h-screen bg-rice-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-vermillion shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-zh-serif text-ink-black mb-2">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-gray-600 font-en-serif">
            Character Relationship Graph
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('subtitle')}
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
                {t('filters.type')}
              </label>
              <select
                value={relationshipType || ''}
                onChange={(e) => setRelationshipType(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-vermillion focus:border-vermillion"
              >
                <option value="">{t('types.all')}</option>
                <option value="SWORN_BROTHER">{t('types.sworn_brothers')}</option>
                <option value="FAMILY">{t('types.family')}</option>
                <option value="SPOUSE">{t('types.marriage')}</option>
                <option value="PARENT_CHILD">{t('types.family')}</option>
                <option value="LORD_VASSAL">{t('types.lord_vassal')}</option>
                <option value="FRIEND">{t('types.ally')}</option>
                <option value="RIVAL">{t('types.rival')}</option>
                <option value="ENEMY">{t('types.enemy')}</option>
                <option value="MENTOR_STUDENT">{t('types.mentor_student')}</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                {t('filters.source')}
              </label>
              <select
                value={relationshipSource || ''}
                onChange={(e) => setRelationshipSource(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-vermillion focus:border-vermillion"
              >
                <option value="">{t('types.all')}</option>
                <option value="HISTORICAL">{tCommon('sourceTypes.historical')}</option>
                <option value="LITERARY">{tCommon('sourceTypes.literary')}</option>
                <option value="BOTH">{tCommon('sourceTypes.historical')} + {tCommon('sourceTypes.literary')}</option>
              </select>
            </div>

            {/* Kingdom Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                {t('filters.kingdom')}
              </label>
              <select
                value={kingdom || ''}
                onChange={(e) => setKingdom(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-vermillion focus:border-vermillion"
              >
                <option value="">{tCommon('kingdoms.other')}</option>
                <option value="WEI">{tCommon('kingdoms.wei')} (魏)</option>
                <option value="SHU">{tCommon('kingdoms.shu')} (蜀)</option>
                <option value="WU">{tCommon('kingdoms.wu')} (吴)</option>
                <option value="HAN">{tCommon('kingdoms.han')} (汉)</option>
                <option value="OTHER">{tCommon('kingdoms.other')}</option>
              </select>
            </div>

            {/* Strength Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                {t('filters.strength')}: {minStrength}
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
                {tCommon('actions.reset')}
              </button>
            )}

            <div className="ml-auto text-sm text-gray-600">
              {tCommon('pagination.showing')} {relationships.length} {tCommon('pagination.results')}
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
              <p className="text-gray-500 font-medium">{t('noRelationships')}</p>
              <p className="text-gray-400 text-sm mt-2">{tCommon('status.empty')}</p>
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
              <h3 className="font-semibold text-ink-black mb-2">{t('legend.title')}</h3>
              <p className="text-gray-600">
                {t('legend.nodeColors')}
              </p>
              <p className="text-gray-600 mt-1">
                {t('legend.edgeThickness')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-ink-black mb-2">{t('graph.resetView')}</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• {t('graph.zoomIn')} / {t('graph.zoomOut')}</li>
                <li>• {t('graph.fitView')}</li>
                <li>• {t('node.clickToSelect')}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-ink-black mb-2">{t('filters.type')}</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>{t('types.sworn_brothers')}</strong></li>
                <li>• <strong>{t('types.lord_vassal')}</strong></li>
                <li>• <strong>{t('types.rival')}</strong> / <strong>{t('types.enemy')}</strong></li>
                <li>• <strong>{t('types.family')}</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
