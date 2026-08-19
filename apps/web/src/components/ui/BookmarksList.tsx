/**
 * Bookmarks List Component
 *
 * Heritage-styled bookmarks display with traditional Chinese aesthetics,
 * elegant cards, and imperial yellow accents
 *
 * Design: Card-based list with heritage colors and smooth transitions
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBookmarks, Bookmark } from '../../contexts/BookmarkContext';
import { useLocalized } from '../../lib/i18n/multilingual';

interface BookmarksListProps {
  maxDisplay?: number;
  showRemove?: boolean;
}

export function BookmarksList({ maxDisplay, showRemove = true }: BookmarksListProps) {
  const { t } = useTranslation('common');
  const { t: tChapters } = useTranslation('chapters');
  const { getAllBookmarks, removeBookmark, getBookmarkCount } = useBookmarks();

  const allBookmarks = getAllBookmarks();
  const bookmarks = maxDisplay ? allBookmarks.slice(0, maxDisplay) : allBookmarks;
  const hasMore = maxDisplay && allBookmarks.length > maxDisplay;
  const remainingCount = hasMore ? allBookmarks.length - maxDisplay! : 0;

  if (allBookmarks.length === 0) {
    return (
      <div className="text-center py-12 px-4 animate-fade-in">
        {/* Empty state icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-imperial-yellow/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-imperial-yellow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold font-zh-serif text-ink-black mb-2">
          {t('reading.noBookmarksYet')}
        </h3>
        <p className="text-text-secondary text-sm max-w-xs mx-auto leading-relaxed">
          {t('reading.bookmarkHint')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {bookmarks.map((bookmark, index) => (
        <BookmarkItem
          key={bookmark.chapterNumber}
          bookmark={bookmark}
          showRemove={showRemove}
          onRemove={removeBookmark}
          index={index}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-6 border-t border-gray-100">
          <p className="text-sm text-text-secondary">
            <span className="text-heritage-gold font-semibold">+{remainingCount}</span> {t('reading.moreBookmarks', { count: remainingCount })}
          </p>
        </div>
      )}

      {allBookmarks.length > 0 && (
        <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full bg-heritage-gold/20 flex items-center justify-center">
            <svg className="w-3 h-3 text-heritage-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="text-sm text-text-secondary">
            {t('reading.totalBookmarks', { count: getBookmarkCount() })}
          </p>
        </div>
      )}
    </div>
  );
}

interface BookmarkItemProps {
  bookmark: Bookmark;
  showRemove: boolean;
  onRemove: (chapterNumber: number) => void;
  index: number;
}

function BookmarkItem({ bookmark, showRemove, onRemove, index }: BookmarkItemProps) {
  const { t } = useTranslation('common');
  const { t: tChapters } = useTranslation('chapters');
  const { locale, isChinese, convertText } = useLocalized();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(bookmark.chapterNumber);
  };

  // Format date according to locale
  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString(
    locale === 'zh-Hans' ? 'zh-CN' : locale === 'zh-Hant' ? 'zh-TW' : 'en-US',
    { month: 'short', day: 'numeric' }
  );

  // Convert chapter title for Traditional Chinese
  const displayTitle = isChinese ? convertText(bookmark.titleZh) : bookmark.titleZh;

  return (
    <Link
      to={`/chapters/${bookmark.chapterNumber}`}
      className="block group animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="card hover:shadow-card-hover transition-all duration-300 ease-elegant transform hover:-translate-y-0.5 border-l-4 border-imperial-yellow overflow-hidden relative">
        {/* Subtle background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-imperial-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Chapter info header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-imperial-yellow/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-imperial-yellow"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-bold text-vermillion">
                  {isChinese
                    ? `第 ${bookmark.chapterNumber} 回`
                    : tChapters('chapterNumber', { number: bookmark.chapterNumber })}
                </span>
                <span className="text-xs text-text-muted ml-2">• {formattedDate}</span>
              </div>
            </div>

            {/* Chapter title */}
            <h4 className="font-zh-serif text-lg text-ink-black group-hover:text-vermillion transition-colors duration-300 line-clamp-2 mb-1" lang="zh">
              {displayTitle}
            </h4>

            {/* English title for non-Chinese locales */}
            {bookmark.titleEn && !isChinese && (
              <p className="text-sm text-text-secondary truncate">{bookmark.titleEn}</p>
            )}

            {/* User note */}
            {bookmark.note && (
              <div className="mt-3 pl-3 border-l-2 border-heritage-gold/30">
                <p className="text-sm text-text-secondary italic line-clamp-2">
                  "{bookmark.note}"
                </p>
              </div>
            )}
          </div>

          {/* Remove button */}
          {showRemove && (
            <button
              onClick={handleRemove}
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-vermillion hover:bg-vermillion/10 transition-all duration-300 ease-elegant"
              title={t('actions.removeBookmark')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-imperial-yellow to-heritage-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-elegant origin-left" />
      </div>
    </Link>
  );
}
