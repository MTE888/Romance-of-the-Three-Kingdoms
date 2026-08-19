/**
 * CharacterList Page
 *
 * Browse and search characters with kingdom filtering,
 * elegant card design with kingdom accents
 *
 * Design: Card-based layout with kingdom color coding
 */

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { KingdomBadge } from '../components/ui/KingdomBadge';
import { useLocalized, formatYearRange } from '../lib/i18n/multilingual';

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

const kingdomColors = {
  WEI: { border: 'border-wei', bg: 'bg-wei/5', hover: 'hover:border-wei' },
  SHU: { border: 'border-shu', bg: 'bg-shu/5', hover: 'hover:border-shu' },
  WU: { border: 'border-wu', bg: 'bg-wu/5', hover: 'hover:border-wu' },
  HAN: { border: 'border-imperial-yellow', bg: 'bg-imperial-yellow/5', hover: 'hover:border-imperial-yellow' },
  OTHER: { border: 'border-gray-300', bg: 'bg-gray-50', hover: 'hover:border-gray-400' },
};

export function CharacterList() {
  const { t } = useTranslation('characters');
  const { t: tCommon } = useTranslation('common');
  const { t: tErrors } = useTranslation('errors');
  const { getLocalized, locale, isChinese, convertText } = useLocalized();
  const [kingdomFilter, setKingdomFilter] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      filter: kingdomFilter ? { kingdom: kingdomFilter } : {},
      pagination: { limit: 50, offset: 0 },
    },
  });

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorMessage
        title={tErrors('api.loadFailed')}
        message={error.message}
      />
    );

  const characters = data?.characters || [];
  const totalCount = data?.charactersCount || 0;

  return (
    <div className="animate-fade-in">
      {/* Page Header with traditional styling */}
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="seal-stamp text-base">人物</div>
        </div>
        <h1 className="text-4xl font-bold font-zh-serif text-ink-black mb-2">
          {t('pageTitle')}
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Filters with heritage styling */}
      <div className="card mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {t('filterByKingdom')}:
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={kingdomFilter === null}
              onClick={() => setKingdomFilter(null)}
            >
              {t('allKingdoms')}
            </FilterButton>
            {['WEI', 'SHU', 'WU', 'HAN'].map((kingdom) => (
              <FilterButton
                key={kingdom}
                active={kingdomFilter === kingdom}
                onClick={() => setKingdomFilter(kingdom)}
                kingdom={kingdom}
              >
                {tCommon(`kingdoms.${kingdom.toLowerCase()}`)}
              </FilterButton>
            ))}
          </div>
          <div className="ml-auto text-sm text-text-secondary">
            {tCommon('pagination.showing')} <span className="font-bold text-vermillion">{totalCount}</span> {tCommon('pagination.results')}
          </div>
        </div>
      </div>

      {/* Character Grid */}
      {characters.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-text-secondary text-lg">{t('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character: any) => {
            const colors = kingdomColors[character.kingdom as keyof typeof kingdomColors] || kingdomColors.OTHER;

            return (
              <Link
                key={character.id}
                to={`/characters/${character.id}`}
                className={`group block bg-white rounded-xl border-2 ${colors.border} ${colors.hover} transition-all duration-300 ease-elegant hover:shadow-card-hover transform hover:-translate-y-1 overflow-hidden`}
              >
                {/* Kingdom accent bar */}
                <div className={`h-1 ${colors.bg.replace('/5', '')} opacity-50`} />

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {/* Chinese name */}
                      <h3 className="text-2xl font-bold font-zh-serif text-ink-black group-hover:text-vermillion transition-colors duration-300" lang="zh">
                        {convertText(character.canonicalName?.zh) || tCommon('status.noData')}
                      </h3>
                      {character.courtesyName?.zh && (
                        <p className="text-sm text-text-secondary font-zh-serif mt-1" lang="zh">
                          {t('fields.courtesyName')} {convertText(character.courtesyName?.zh)}
                        </p>
                      )}
                    </div>
                    <KingdomBadge kingdom={character.kingdom} />
                  </div>

                  {/* English romanization */}
                  <div className="mb-4">
                    <p className="text-lg font-en-serif text-text-primary">
                      {character.canonicalName?.en || ''}
                    </p>
                    {character.courtesyName?.en && !isChinese && (
                      <p className="text-sm text-text-secondary mt-1">
                        {t('fields.courtesyName')}: {character.courtesyName.en}
                      </p>
                    )}
                  </div>

                  {/* Lifespan with elegant divider */}
                  {(character.birthYear || character.deathYear) && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatYearRange(character.birthYear, character.deathYear, locale)}
                      </div>
                    </div>
                  )}

                  {/* View profile indicator */}
                  <div className="mt-4 flex items-center justify-end gap-2 text-vermillion opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">View Profile</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Filter Button Component
 */
function FilterButton({
  active,
  onClick,
  kingdom,
  children,
}: {
  active: boolean;
  onClick: () => void;
  kingdom?: string;
  children: React.ReactNode;
}) {
  const getKingdomColor = () => {
    if (!kingdom) return 'bg-vermillion';
    switch (kingdom) {
      case 'WEI': return 'bg-wei';
      case 'SHU': return 'bg-shu';
      case 'WU': return 'bg-wu';
      case 'HAN': return 'bg-imperial-yellow text-ink-black';
      default: return 'bg-vermillion';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ease-elegant ${
        active
          ? `${getKingdomColor()} text-white shadow-md`
          : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
