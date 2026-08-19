/**
 * Chapters List Page
 *
 * Browse all 120 chapters with elegant card design,
 * reading progress indicators, and traditional styling
 *
 * Design: Card-based layout with kingdom accents
 */

import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useReadingProgress } from '../contexts/ReadingProgressContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { BookmarksList } from '../components/ui/BookmarksList';
import { useLocalized } from '../lib/i18n/multilingual';

const GET_CHAPTERS = gql`
  query GetChapters {
    chapters {
      id
      chapterNumber
      title
      summary
    }
  }
`;

export function Chapters() {
  const { t } = useTranslation('chapters');
  const { t: tErrors } = useTranslation('errors');
  const { t: tCommon } = useTranslation('common');
  const { getLocalized, isChinese, convertText } = useLocalized();
  const { loading, error, data } = useQuery(GET_CHAPTERS);
  const {
    getChapterProgress,
    getReadChaptersCount,
    getTotalChapters,
    getProgressPercentage,
  } = useReadingProgress();

  const { isBookmarked, getBookmarkCount } = useBookmarks();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage title={tErrors('api.loadFailed')} message={error.message} />;

  const chapters = data?.chapters || [];
  const readCount = getReadChaptersCount();
  const totalCount = getTotalChapters();
  const progressPercent = getProgressPercentage();

  return (
    <div className="min-h-screen bg-paper-texture py-12 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with traditional styling */}
        <header className="text-center mb-12">
          {/* Seal stamp decoration */}
          <div className="flex justify-center mb-4">
            <div className="seal-stamp text-base">回目</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-zh-serif text-ink-black mb-4" lang="zh">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-text-secondary font-en-serif">
            {isChinese ? '' : 'Romance of the Three Kingdoms'}
          </p>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Reading Progress with heritage styling */}
          {readCount > 0 && (
            <div className="mt-10 max-w-md mx-auto bg-white/50 rounded-2xl p-6 shadow-paper">
              <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
                <span className="font-medium">{t('progress.overallProgress')}</span>
                <span className="font-bold text-ink-black">
                  {t('progress.chaptersRead', { count: readCount })} / {totalCount}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-vermillion via-heritage-burgundy to-vermillion h-full transition-all duration-500 rounded-full relative overflow-hidden"
                  style={{ width: `${progressPercent}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-subtle" />
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-heritage-burgundy font-medium">
                {t('progress.percentComplete', { percent: progressPercent })}
              </p>
            </div>
          )}
        </header>

        {/* Bookmarks Section with heritage styling */}
        {getBookmarkCount() > 0 && (
          <div className="mb-12">
            <div className="card-heritage">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-heritage-gold"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-zh-serif text-ink-black">
                  {t('bookmarks.recentBookmarks')}
                </h2>
              </div>
              <BookmarksList maxDisplay={3} />
            </div>
          </div>
        )}

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter: any) => {
            const progress = getChapterProgress(chapter.chapterNumber);
            const isCompleted = progress?.completed || false;
            const isInProgress = progress && !progress.completed;
            const bookmarked = isBookmarked(chapter.chapterNumber);

            return (
              <Link
                key={chapter.id}
                to={`/chapters/${chapter.chapterNumber}`}
                className={`group block bg-white rounded-xl transition-all duration-300 ease-elegant hover:shadow-card-hover transform hover:-translate-y-1 overflow-hidden ${
                  isCompleted
                    ? 'ring-2 ring-success/50'
                    : bookmarked
                    ? 'ring-2 ring-heritage-gold/50'
                    : ''
                }`}
              >
                {/* Top accent bar */}
                <div className={`h-1 ${
                  isCompleted
                    ? 'bg-success'
                    : bookmarked
                    ? 'bg-heritage-gold'
                    : 'bg-gray-200 group-hover:bg-vermillion'
                } transition-colors duration-300`} />

                <div className="p-6">
                  {/* Chapter Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 text-white text-sm font-medium rounded-lg shadow-sm ${
                        isCompleted ? 'bg-success' : 'bg-vermillion'
                      }`}
                    >
                      {isChinese
                        ? `第 ${chapter.chapterNumber} 回`
                        : t('chapterNumber', { number: chapter.chapterNumber })}
                    </span>
                    <div className="flex items-center gap-2">
                      {bookmarked && (
                        <span className="w-8 h-8 rounded-full bg-heritage-gold/10 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-heritage-gold"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-label={t('bookmarks.bookmarked')}
                          >
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </span>
                      )}
                      {isCompleted && (
                        <span className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-success"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-label={t('progress.completed')}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                      {isInProgress && !isCompleted && (
                        <span className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-info"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-label={t('progress.inProgress')}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chapter Title */}
                  <h2 className="font-zh-serif text-lg text-ink-black mb-3 line-clamp-2 group-hover:text-vermillion transition-colors duration-300" lang="zh">
                    {convertText(chapter.title?.zh) || chapter.title?.en}
                  </h2>

                  {/* Summary */}
                  {chapter.summary?.zh && (
                    <p className="text-sm text-text-secondary line-clamp-3 font-zh-serif leading-relaxed" lang="zh">
                      {convertText(chapter.summary.zh)}
                    </p>
                  )}

                  {/* Read indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {isCompleted ? '已读' : isInProgress ? '阅读中' : '未读'}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-vermillion group-hover:translate-x-1 transition-all duration-300"
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
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Box with heritage styling */}
        <div className="mt-16 card-heritage">
          <div className="flex items-center gap-3 mb-4">
            <div className="seal-stamp text-sm">典</div>
            <h2 className="text-2xl font-zh-serif text-ink-black">{tCommon('about.title')}</h2>
          </div>
          <div className="prose max-w-none text-text-primary">
            <p className="mb-4">
              <strong className="font-zh-serif text-heritage-burgundy">{tCommon('about.description1')}</strong>
            </p>
            <p className="mb-4 leading-relaxed">
              {tCommon('about.description2')}
            </p>
            <p className="leading-relaxed">
              {tCommon('about.description3')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
