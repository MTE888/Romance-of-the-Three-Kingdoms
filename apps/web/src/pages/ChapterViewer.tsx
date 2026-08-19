/**
 * Chapter Viewer Page
 *
 * Traditional Chinese reading experience with WeChat Reading-inspired typography,
 * scroll-like margins, elegant animations, and character hover cards
 *
 * Design: WeChat Reading + Traditional Chinese scroll aesthetics
 */

import { useParams, useNavigate, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useCharacterDetection } from '../hooks/useCharacterDetection';
import { CharacterLink } from '../components/chapter/CharacterLink';
import { useReadingProgress } from '../contexts/ReadingProgressContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useLocalized } from '../lib/i18n/multilingual';

const GET_CHAPTER = gql`
  query GetChapter($chapterNumber: Int!) {
    chapter(chapterNumber: $chapterNumber) {
      id
      chapterNumber
      title
      content
      summary
      source {
        id
        title
        author
        type
      }
    }
  }
`;

export function ChapterViewer() {
  const { chapterNumber } = useParams<{ chapterNumber: string }>();
  const navigate = useNavigate();
  const number = parseInt(chapterNumber || '1');
  const { t } = useTranslation('chapters');
  const { t: tErrors } = useTranslation('errors');
  const { isChinese, convertText } = useLocalized();

  const { loading, error, data } = useQuery(GET_CHAPTER, {
    variables: { chapterNumber: number },
  });

  const {
    loading: charactersLoading,
    parseTextWithCharacters,
  } = useCharacterDetection();

  const {
    markChapterAsRead,
    markChapterAsInProgress,
    addReadingTime,
    setCurrentChapter,
    getChapterProgress,
  } = useReadingProgress();

  const {
    addBookmark,
    removeBookmark,
    isBookmarked,
  } = useBookmarks();

  const [isCompleted, setIsCompleted] = useState(false);
  const readingTimeRef = useRef(0);
  const lastTickRef = useRef(Date.now());
  const initializedRef = useRef(false);

  // Get chapter progress (must be called before any conditional returns)
  const chapterProgress = getChapterProgress(number);

  // Initialize isCompleted from chapter progress (only once per chapter)
  useEffect(() => {
    setIsCompleted(chapterProgress?.completed || false);
  }, [number]); // Only reset when chapter changes, not when chapterProgress changes

  // Mark chapter as in-progress on mount and track reading time
  useEffect(() => {
    if (loading || charactersLoading || error || !data?.chapter) return;

    // Only initialize once per chapter number
    if (initializedRef.current) return;
    initializedRef.current = true;

    setCurrentChapter(number);
    markChapterAsInProgress(number);

    // Track reading time every 10 seconds
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastTickRef.current) / 1000);
      if (elapsed > 0) {
        readingTimeRef.current += elapsed;
        addReadingTime(number, elapsed);
        lastTickRef.current = now;
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      const now = Date.now();
      const elapsed = Math.floor((now - lastTickRef.current) / 1000);
      if (elapsed > 0) {
        addReadingTime(number, elapsed);
      }
    };
  }, [number, loading, charactersLoading, error, data, setCurrentChapter, markChapterAsInProgress, addReadingTime]);

  // Reset initialization when chapter number changes
  useEffect(() => {
    initializedRef.current = false;
    lastTickRef.current = Date.now();
    readingTimeRef.current = 0;
  }, [number]);

  // Early returns AFTER all hooks
  if (loading || charactersLoading) return <Loading />;
  if (error) return <ErrorMessage title={tErrors('api.loadFailed')} message={error.message} />;
  if (!data?.chapter) return <ErrorMessage title={tErrors('notFound.title')} message={t('chapterNotFound')} />;

  const { chapter } = data;
  const hasNext = number < 120;
  const hasPrev = number > 1;

  const handleMarkAsComplete = () => {
    markChapterAsRead(number);
    setIsCompleted(true);
  };

  const handleToggleBookmark = () => {
    const titleZh = chapter.title?.zh || '';
    const titleEn = chapter.title?.en || '';

    if (isBookmarked(number)) {
      removeBookmark(number);
    } else {
      addBookmark(number, titleZh, titleEn);
    }
  };

  // Parse content into paragraphs
  const paragraphs = (chapter.content?.zh || '').split(/\n\s*\n/).filter(p => p.trim());

  /**
   * Render a paragraph with character name detection
   * Using WeChat Reading-inspired typography
   */
  const renderParagraphWithCharacters = (text: string, index: number) => {
    const segments = parseTextWithCharacters(text);

    return (
      <p
        key={index}
        className="reading-chapter mb-8"
        lang="zh"
      >
        {segments.map((segment, i) => {
          if (segment.type === 'text') {
            return <span key={i}>{segment.content}</span>;
          } else {
            return (
              <CharacterLink
                key={i}
                characterId={segment.id}
                characterName={segment.name}
                kingdom={segment.kingdom}
              />
            );
          }
        })}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-paper-texture animate-fade-in">
      {/* Sticky Header with glassmorphic effect */}
      <header className="glass sticky top-0 z-sticky border-b border-vermillion/20 shadow-paper">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/chapters"
              className="text-text-secondary hover:text-vermillion transition-colors duration-300 ease-elegant flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('reader.backToChapters')}
            </Link>
            <div className="text-center">
              <div className="text-sm text-text-secondary">
                {isChinese
                  ? `第 ${chapter.chapterNumber} 回`
                  : t('chapterNumber', { number: chapter.chapterNumber })}
              </div>
              <h1 className="text-xl md:text-2xl font-zh-serif text-ink-black" lang="zh">
                {convertText(chapter.title?.zh) || chapter.title?.en}
              </h1>
            </div>
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ease-elegant ${
                isBookmarked(number)
                  ? 'bg-heritage-gold text-ink-black shadow-seal hover:shadow-md'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
              title={isBookmarked(number) ? t('bookmarks.remove') : t('bookmarks.add')}
            >
              <svg
                className="w-5 h-5"
                fill={isBookmarked(number) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={isBookmarked(number) ? 0 : 2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span className="hidden md:inline">
                {isBookmarked(number) ? t('bookmarks.bookmarked') : t('bookmarks.add')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Chapter Content with scroll-like margins */}
      <main className="scroll-margin max-w-4xl mx-auto">
        <article>
          {/* Chapter Title Block - Traditional styling */}
          <div className="text-center mb-16 relative">
            {/* Decorative top border */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-vermillion" />
              <div className="seal-stamp text-sm">回</div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-vermillion" />
            </div>

            <div className="inline-block border-t-4 border-b-4 border-vermillion py-6 px-12 bg-white/50">
              <h2 className="text-3xl md:text-4xl font-zh-serif text-ink-black mb-4" lang="zh">
                第{convertToChineseNumber(chapter.chapterNumber)}回
              </h2>
              <p className="text-xl md:text-2xl font-zh-serif text-text-primary" lang="zh">
                {convertText(chapter.title?.zh)}
              </p>
            </div>

            {/* Decorative bottom element */}
            <div className="mt-8 flex items-center justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-heritage-gold to-transparent" />
            </div>
          </div>

          {/* Chapter Text - WeChat Reading inspired typography */}
          <div className="bg-white/30 rounded-2xl p-8 md:p-12 shadow-paper">
            {paragraphs.map((paragraph, index) =>
              renderParagraphWithCharacters(paragraph, index)
            )}
          </div>

          {/* End Marker with traditional styling */}
          <div className="text-center mt-16 mb-12">
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-vermillion" />
              <div className="seal-stamp-round px-6 py-2">
                <span className="font-zh-serif">本回完</span>
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-vermillion" />
            </div>
          </div>

          {/* Mark as Complete Button */}
          {!isCompleted && (
            <div className="text-center mt-8">
              <button
                onClick={handleMarkAsComplete}
                className="inline-flex items-center gap-2 px-8 py-4 bg-success text-white rounded-xl font-medium hover:bg-opacity-90 transition-all duration-300 ease-elegant shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('reader.markComplete')}
              </button>
            </div>
          )}

          {isCompleted && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-success/10 text-success rounded-xl font-medium border border-success/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('reader.chapterCompleted')}
              </div>
            </div>
          )}
        </article>

        {/* Navigation with elegant styling */}
        <nav className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => hasPrev && navigate(`/chapters/${number - 1}`)}
              disabled={!hasPrev}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-elegant ${
                hasPrev
                  ? 'bg-vermillion text-white hover:bg-heritage-burgundy shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">{t('reader.previousChapter')}</span>
              <span className="sm:hidden">上一回</span>
            </button>

            <Link
              to="/chapters"
              className="px-6 py-3 border-2 border-vermillion text-vermillion rounded-xl font-medium hover:bg-vermillion hover:text-white transition-all duration-300 ease-elegant"
            >
              {t('reader.allChapters')}
            </Link>

            <button
              onClick={() => hasNext && navigate(`/chapters/${number + 1}`)}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-elegant ${
                hasNext
                  ? 'bg-vermillion text-white hover:bg-heritage-burgundy shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">{t('reader.nextChapter')}</span>
              <span className="sm:hidden">下一回</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Chapter Info with heritage styling */}
        {chapter.source && (
          <aside className="mt-12 card-heritage">
            <h3 className="text-lg font-semibold text-ink-black mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-heritage-gold rounded-full" />
              {t('source.title')}
            </h3>
            <dl className="space-y-3">
              <div className="flex">
                <dt className="font-medium text-text-secondary w-24">{t('source.chapterTitle')}</dt>
                <dd className="text-ink-black font-zh-serif" lang="zh">
                  {convertText(chapter.source.title?.zh) || chapter.source.title?.en}
                </dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-text-secondary w-24">{t('source.author')}</dt>
                <dd className="text-ink-black font-zh-serif" lang="zh">
                  {convertText(chapter.source.author?.zh) || chapter.source.author?.en}
                </dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-text-secondary w-24">{t('source.type')}</dt>
                <dd className="text-ink-black capitalize">{chapter.source.type.toLowerCase()}</dd>
              </div>
            </dl>
          </aside>
        )}
      </main>
    </div>
  );
}

/**
 * Convert Arabic numeral to Chinese number
 */
function convertToChineseNumber(num: number): string {
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const units = ['', '十', '百'];

  if (num === 0) return digits[0];
  if (num < 10) return digits[num];
  if (num === 10) return units[1];
  if (num < 20) return units[1] + digits[num % 10];

  const hundreds = Math.floor(num / 100);
  const tens = Math.floor((num % 100) / 10);
  const ones = num % 10;

  let result = '';

  if (hundreds > 0) {
    result += digits[hundreds] + units[2];
  }

  if (tens > 0) {
    if (tens === 1 && hundreds > 0) {
      result += units[1];
    } else {
      result += digits[tens] + units[1];
    }
  } else if (hundreds > 0 && ones > 0) {
    result += digits[0];
  }

  if (ones > 0) {
    result += digits[ones];
  }

  return result;
}
