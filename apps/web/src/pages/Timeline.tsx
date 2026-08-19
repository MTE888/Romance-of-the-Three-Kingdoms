/**
 * Timeline Page
 *
 * Chronological timeline with traditional styling,
 * elegant animations, and importance indicators
 *
 * Design: Vertical timeline with heritage colors
 */

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useLocalized, formatYear } from '../lib/i18n/multilingual';

const GET_TIMELINE = gql`
  query GetTimeline($filter: TimelineFilter) {
    timeline(filter: $filter) {
      id
      year
      month
      day
      description
      importance
      category
      event {
        id
        name
        type
      }
      character {
        id
        canonicalName
      }
    }
  }
`;

export function Timeline() {
  const { t } = useTranslation('timeline');
  const { t: tCommon } = useTranslation('common');
  const { t: tErrors } = useTranslation('errors');
  const { getLocalized, locale, convertText } = useLocalized();
  const [minImportance, setMinImportance] = useState(5);

  const translateEventType = (type: string | null | undefined): string => {
    if (!type) return '';
    const key = type.toLowerCase();
    const result = t(`eventTypes.${key}`);
    if (result === `eventTypes.${key}`) return type;
    return result;
  };

  const translateCategory = (category: string | null | undefined): string => {
    if (!category) return '';
    const key = category.toLowerCase();
    const result = t(`categories.${key}`, { defaultValue: `__NOTFOUND__${key}` });
    if (result.startsWith('__NOTFOUND__')) return category;
    return result;
  };

  const { loading, error, data } = useQuery(GET_TIMELINE, {
    variables: {
      filter: {
        startYear: 160,
        endYear: 280,
        minImportance,
      },
    },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage title={tErrors('api.loadFailed')} message={error.message} />;

  const entries = data?.timeline || [];

  return (
    <div className="animate-fade-in">
      {/* Page Header with traditional styling */}
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="seal-stamp text-base">年表</div>
        </div>
        <h1 className="text-4xl font-bold font-zh-serif text-ink-black mb-2">
          {t('pageTitle')}
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Importance Filter with heritage styling */}
      <div className="card mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-heritage-gold/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-heritage-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <label className="text-sm font-medium text-text-secondary">
              {t('filters.importance')}:
            </label>
          </div>
          <div className="flex-1 max-w-xs flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={minImportance}
              onChange={(e) => setMinImportance(parseInt(e.target.value))}
              className="flex-1 accent-vermillion"
            />
            <span className="text-2xl font-bold text-vermillion min-w-[3rem] text-center">
              {minImportance}/10
            </span>
          </div>
          <div className="text-sm text-text-secondary">
            {tCommon('pagination.showing')} <span className="font-bold text-vermillion">{entries.length}</span> {tCommon('pagination.results')}
          </div>
        </div>
      </div>

      {/* Timeline */}
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-text-secondary text-lg">{t('noEvents')}</p>
          <p className="text-text-muted text-sm mt-2">Try lowering the importance filter</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline vertical line with gradient */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-vermillion via-heritage-burgundy to-vermillion rounded-full" />

          {/* Timeline entries */}
          <div className="space-y-8">
            {entries.map((entry: any, index: number) => (
              <div
                key={entry.id}
                className="relative pl-20 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Timeline dot with importance-based styling */}
                <div
                  className={`absolute left-5 top-3 w-6 h-6 rounded-full border-4 border-rice-white shadow-md transition-transform duration-300 hover:scale-125 ${
                    entry.importance >= 8
                      ? 'bg-vermillion'
                      : entry.importance >= 6
                      ? 'bg-heritage-gold'
                      : 'bg-gray-400'
                  }`}
                />

                {/* Entry card */}
                <div className="card hover:shadow-card-hover transition-all duration-300 ease-elegant group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-ink-black group-hover:text-vermillion transition-colors duration-300" lang="zh">
                        {convertText(entry.event?.name?.zh) || convertText(entry.description?.zh) || getLocalized(entry.event?.name) || getLocalized(entry.description) || ''}
                      </h3>
                      {entry.event?.name?.en && locale !== 'en' && (
                        <p className="text-text-secondary mt-1">{entry.event.name.en}</p>
                      )}
                    </div>

                    {/* Year badge */}
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-bold text-vermillion font-zh-serif">
                        {formatYear(entry.year, locale)}
                      </span>
                      {entry.month && entry.day && (
                        <span className="text-sm text-text-secondary">
                          {entry.month}月{entry.day}日
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {entry.event?.type && (
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-text-secondary text-xs rounded-lg">
                        {translateEventType(entry.event.type)}
                      </span>
                    )}
                    {entry.category && (
                      <span className="inline-flex items-center px-3 py-1 bg-indigo-blue/10 text-indigo-blue text-xs rounded-lg">
                        {translateCategory(entry.category)}
                      </span>
                    )}
                  </div>

                  {/* Character */}
                  {entry.character && (
                    <div className="text-sm text-text-secondary flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('event.participants')}:{' '}
                      <span className="font-zh-serif font-medium text-ink-black" lang="zh">
                        {convertText(entry.character.canonicalName?.zh) || getLocalized(entry.character.canonicalName) || tCommon('status.noData')}
                      </span>
                    </div>
                  )}

                  {/* Importance indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span>{t('filters.importance')}:</span>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i < entry.importance
                                ? entry.importance >= 8
                                  ? 'bg-vermillion'
                                  : entry.importance >= 6
                                  ? 'bg-heritage-gold'
                                  : 'bg-gray-400'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      entry.importance >= 8 ? 'text-vermillion' :
                      entry.importance >= 6 ? 'text-heritage-gold' :
                      'text-text-secondary'
                    }`}>
                      {entry.importance >= 8 ? '重大事件' :
                       entry.importance >= 6 ? '重要事件' : '一般事件'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline end marker */}
          <div className="relative pl-20 mt-8">
            <div className="absolute left-5 top-0 w-6 h-6 rounded-full bg-ink-black border-4 border-rice-white shadow-md" />
            <div className="text-center text-text-secondary italic py-4">
              — {t('noEvents') || 'End of Timeline'} —
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
