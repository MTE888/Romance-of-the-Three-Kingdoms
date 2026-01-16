/**
 * Bookmarks List Component
 * Displays all bookmarked chapters with quick navigation
 */

import { Link } from 'react-router-dom';
import { useBookmarks, Bookmark } from '../../contexts/BookmarkContext';

interface BookmarksListProps {
  maxDisplay?: number;
  showRemove?: boolean;
}

export function BookmarksList({ maxDisplay, showRemove = true }: BookmarksListProps) {
  const { getAllBookmarks, removeBookmark, getBookmarkCount } = useBookmarks();

  const allBookmarks = getAllBookmarks();
  const bookmarks = maxDisplay ? allBookmarks.slice(0, maxDisplay) : allBookmarks;
  const hasMore = maxDisplay && allBookmarks.length > maxDisplay;

  if (allBookmarks.length === 0) {
    return (
      <div className="text-center py-8 px-4">
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
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <p className="text-gray-500 font-medium">No bookmarks yet</p>
        <p className="text-gray-400 text-sm mt-2">
          Bookmark your favorite chapters for quick access
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.chapterNumber}
          bookmark={bookmark}
          showRemove={showRemove}
          onRemove={removeBookmark}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            And {allBookmarks.length - maxDisplay!} more bookmark
            {allBookmarks.length - maxDisplay! === 1 ? '' : 's'}
          </p>
        </div>
      )}

      {allBookmarks.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Total: {getBookmarkCount()} bookmark{getBookmarkCount() === 1 ? '' : 's'}
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
}

function BookmarkItem({ bookmark, showRemove, onRemove }: BookmarkItemProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(bookmark.chapterNumber);
  };

  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      to={`/chapters/${bookmark.chapterNumber}`}
      className="block group"
    >
      <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-imperial-yellow transition-colors p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-4 h-4 text-imperial-yellow flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                Chapter {bookmark.chapterNumber}
              </span>
              <span className="text-xs text-gray-400">• {formattedDate}</span>
            </div>

            <h4 className="font-zh-serif text-lg text-ink-black group-hover:text-vermillion transition-colors truncate">
              {bookmark.titleZh}
            </h4>

            {bookmark.titleEn && (
              <p className="text-sm text-gray-500 mt-1 truncate">{bookmark.titleEn}</p>
            )}

            {bookmark.note && (
              <p className="text-sm text-gray-600 mt-2 italic line-clamp-2">
                "{bookmark.note}"
              </p>
            )}
          </div>

          {showRemove && (
            <button
              onClick={handleRemove}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove bookmark"
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
      </div>
    </Link>
  );
}
