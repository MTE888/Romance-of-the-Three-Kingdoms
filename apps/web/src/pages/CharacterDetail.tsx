/**
 * CharacterDetail Page
 *
 * Detailed view with dual profiles (historical vs literary),
 * heritage styling, and elegant transitions
 *
 * Design: Side-by-side comparison with kingdom accent colors
 */

import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { KingdomBadge } from '../components/ui/KingdomBadge';
import { useLocalized, formatYearRange } from '../lib/i18n/multilingual';

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
  const { t } = useTranslation('characters');
  const { t: tErrors } = useTranslation('errors');
  const { t: tCommon } = useTranslation('common');
  const { t: tRelationships } = useTranslation('relationships');
  const { getLocalized, convertText, convertArray, locale, isChinese, isTraditional } = useLocalized();

  const translateSocialClass = (socialClass: string | null | undefined): string => {
    if (!socialClass) return '';
    const key = socialClass.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
    const translated = t(`socialClasses.${key}`, { defaultValue: '' });
    return translated || socialClass;
  };

  const translateOccupation = (occupation: string): string => {
    const key = occupation.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
    const translated = t(`occupations.${key}`, { defaultValue: '' });
    return translated || occupation;
  };

  const translateOccupations = (occupations: string[] | null | undefined): string[] => {
    if (!occupations || occupations.length === 0) return [];
    return occupations.map(translateOccupation);
  };

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage title={tErrors('api.loadFailed')} message={error.message} />;

  const character = data?.character;
  if (!character) return <ErrorMessage title={tErrors('notFound.title')} message={tErrors('notFound.message')} />;

  const historicalProfile = character.historicalProfile || {};
  const literaryProfile = character.literaryProfile || {};
  const displayChineseName = convertText(character.canonicalName?.zh);
  const displayCourtesyName = convertText(character.courtesyName?.zh);

  return (
    <div className="animate-fade-in">
      {/* Back link */}
      <Link
        to="/characters"
        className="inline-flex items-center text-text-secondary hover:text-vermillion transition-colors duration-300 ease-elegant mb-6 group"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToList')}
      </Link>

      {/* Character Header Card */}
      <div className="card mb-8 relative overflow-hidden">
        {/* Kingdom accent gradient */}
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${
          character.kingdom === 'WEI' ? 'from-wei to-wei/50' :
          character.kingdom === 'SHU' ? 'from-shu to-shu/50' :
          character.kingdom === 'WU' ? 'from-wu to-wu/50' :
          'from-heritage-gold to-heritage-gold/50'
        }`} />

        <div className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <h1 className="text-5xl font-bold font-zh-serif text-ink-black mb-3" lang="zh">
                {displayChineseName || tCommon('status.noData')}
              </h1>
              {character.courtesyName?.zh && (
                <p className="text-xl text-text-secondary font-zh-serif">
                  {t('fields.courtesyName')} {displayCourtesyName}
                </p>
              )}
            </div>
            <KingdomBadge kingdom={character.kingdom} size="lg" />
          </div>

          {/* English romanization */}
          <div className="mb-6">
            <p className="text-2xl font-en-serif text-text-primary">
              {character.canonicalName?.en || ''}
            </p>
            {character.courtesyName?.en && !isChinese && (
              <p className="text-lg text-text-secondary mt-1">
                {t('fields.courtesyName')}: {character.courtesyName.en}
              </p>
            )}
          </div>

          {/* Character stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            {(character.birthYear || character.deathYear) && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-heritage-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-heritage-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{t('fields.lifespan')}</p>
                  <p className="text-lg font-medium text-ink-black">
                    {formatYearRange(character.birthYear, character.deathYear, locale)}
                  </p>
                </div>
              </div>
            )}

            {character.socialClass && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{t('fields.socialClass')}</p>
                  <p className="text-lg font-medium text-ink-black">
                    {translateSocialClass(character.socialClass)}
                  </p>
                </div>
              </div>
            )}

            {character.occupations && character.occupations.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-vermillion/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-vermillion" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{t('fields.occupations')}</p>
                  <p className="text-lg font-medium text-ink-black">
                    {isChinese
                      ? translateOccupations(character.occupations).join('、')
                      : translateOccupations(character.occupations).join(', ')
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {character.birthLocation && (
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-jade-green/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-jade-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-text-secondary">{t('fields.birthplace')}</p>
                <p className="text-lg font-medium text-ink-black">
                  {getLocalized(character.birthLocation.name)}{' '}
                  {character.birthLocation.modernName?.zh &&
                    `(${getLocalized(character.birthLocation.modernName)})`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dual Profiles: Historical vs Literary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Historical Profile */}
        <div className="card border-l-4 border-indigo-blue">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-blue/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink-black">{t('profile.historical')}</h2>
              <p className="text-sm text-text-secondary">{t('profile.historicalSource')}</p>
            </div>
          </div>

          {historicalProfile.summary?.zh && (
            <div className="mb-6">
              <p className="text-text-primary font-zh-serif leading-relaxed" lang="zh">
                {convertText(historicalProfile.summary.zh)}
              </p>
              {historicalProfile.summary.en && !isChinese && (
                <p className="text-text-secondary mt-3 leading-relaxed">{historicalProfile.summary.en}</p>
              )}
            </div>
          )}

          {historicalProfile.personalityTraits && historicalProfile.personalityTraits.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-text-secondary mb-3">{t('fields.traits')}</h3>
              <div className="flex flex-wrap gap-2">
                {convertArray(historicalProfile.personalityTraits).map((trait: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-indigo-blue/10 text-indigo-blue rounded-lg text-sm font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {historicalProfile.achievements && historicalProfile.achievements.length > 0 && (
            <div>
              <h3 className="font-semibold text-text-secondary mb-3">{t('fields.achievements')}</h3>
              <ul className="space-y-2">
                {convertArray(historicalProfile.achievements).map((achievement: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-blue mt-2 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Literary Profile */}
        <div className="card border-l-4 border-vermillion">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-vermillion/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-vermillion" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink-black">{t('profile.literary')}</h2>
              <p className="text-sm text-text-secondary">{t('profile.literarySource')}</p>
            </div>
          </div>

          {literaryProfile.summary?.zh && (
            <div className="mb-6">
              <p className="text-text-primary font-zh-serif leading-relaxed" lang="zh">
                {convertText(literaryProfile.summary.zh)}
              </p>
              {literaryProfile.summary.en && !isChinese && (
                <p className="text-text-secondary mt-3 leading-relaxed">{literaryProfile.summary.en}</p>
              )}
            </div>
          )}

          {literaryProfile.personalityTraits && literaryProfile.personalityTraits.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-text-secondary mb-3">{t('fields.traits')}</h3>
              <div className="flex flex-wrap gap-2">
                {convertArray(literaryProfile.personalityTraits).map((trait: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-vermillion/10 text-vermillion rounded-lg text-sm font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {literaryProfile.famousScenes && literaryProfile.famousScenes.length > 0 && (
            <div>
              <h3 className="font-semibold text-text-secondary mb-3">{t('fields.famousScenes')}</h3>
              <ul className="space-y-2">
                {convertArray(literaryProfile.famousScenes).map((scene: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-vermillion mt-2 flex-shrink-0" />
                    {scene}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Relationships */}
      {character.relationships && character.relationships.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="seal-stamp text-sm">缘</div>
            <h2 className="text-2xl font-bold text-ink-black">{tRelationships('title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {character.relationships.map((rel: any) => {
              const otherCharacter = rel.characterA.id === character.id ? rel.characterB : rel.characterA;

              return (
                <Link
                  key={rel.id}
                  to={`/characters/${otherCharacter.id}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-sm transition-all duration-300 ease-elegant group"
                >
                  <div>
                    <p className="font-medium font-zh-serif text-ink-black group-hover:text-vermillion transition-colors" lang="zh">
                      {convertText(otherCharacter.canonicalName?.zh) || tCommon('status.noData')}
                    </p>
                    <p className="text-sm text-text-secondary">{otherCharacter.canonicalName?.en || ''}</p>
                    <p className="text-sm text-text-secondary mt-1">
                      {tRelationships(`types.${rel.relationshipType.toLowerCase()}`) || rel.relationshipType.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white rounded-lg text-text-secondary border border-gray-200">
                    {rel.relationshipSource}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
