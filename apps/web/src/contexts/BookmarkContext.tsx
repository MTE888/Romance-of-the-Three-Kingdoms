/**
 * Bookmark Context
 *
 * Manages chapter bookmarks across the application.
 * Uses localStorage for persistence (no authentication required).
 * Can be migrated to database storage when user auth is implemented.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Bookmark {
  chapterNumber: number;
  titleZh: string;
  titleEn: string;
  note?: string;
  createdAt: number; // timestamp
}

interface BookmarkData {
  bookmarks: Record<number, Bookmark>; // indexed by chapter number
  bookmarkOrder: number[]; // maintain insertion order
}

interface BookmarkContextType {
  bookmarks: BookmarkData;
  addBookmark: (chapterNumber: number, titleZh: string, titleEn: string, note?: string) => void;
  removeBookmark: (chapterNumber: number) => void;
  updateBookmarkNote: (chapterNumber: number, note: string) => void;
  isBookmarked: (chapterNumber: number) => boolean;
  getAllBookmarks: () => Bookmark[];
  getBookmark: (chapterNumber: number) => Bookmark | undefined;
  getBookmarkCount: () => number;
  clearAllBookmarks: () => void;
}

const STORAGE_KEY = 'three-kingdoms-bookmarks';

const defaultBookmarkData: BookmarkData = {
  bookmarks: {},
  bookmarkOrder: [],
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkData>(() => {
    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
    return defaultBookmarkData;
  });

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, [bookmarks]);

  const addBookmark = (chapterNumber: number, titleZh: string, titleEn: string, note?: string) => {
    setBookmarks((prev) => {
      // Don't add if already bookmarked
      if (prev.bookmarks[chapterNumber]) {
        return prev;
      }

      const newBookmark: Bookmark = {
        chapterNumber,
        titleZh,
        titleEn,
        note,
        createdAt: Date.now(),
      };

      return {
        bookmarks: {
          ...prev.bookmarks,
          [chapterNumber]: newBookmark,
        },
        bookmarkOrder: [...prev.bookmarkOrder, chapterNumber],
      };
    });
  };

  const removeBookmark = (chapterNumber: number) => {
    setBookmarks((prev) => {
      // Don't remove if not bookmarked
      if (!prev.bookmarks[chapterNumber]) {
        return prev;
      }

      const { [chapterNumber]: removed, ...remainingBookmarks } = prev.bookmarks;

      return {
        bookmarks: remainingBookmarks,
        bookmarkOrder: prev.bookmarkOrder.filter((num) => num !== chapterNumber),
      };
    });
  };

  const updateBookmarkNote = (chapterNumber: number, note: string) => {
    setBookmarks((prev) => {
      const bookmark = prev.bookmarks[chapterNumber];
      if (!bookmark) {
        return prev;
      }

      return {
        ...prev,
        bookmarks: {
          ...prev.bookmarks,
          [chapterNumber]: {
            ...bookmark,
            note,
          },
        },
      };
    });
  };

  const isBookmarked = (chapterNumber: number): boolean => {
    return !!bookmarks.bookmarks[chapterNumber];
  };

  const getAllBookmarks = (): Bookmark[] => {
    // Return bookmarks in order they were added
    return bookmarks.bookmarkOrder
      .map((num) => bookmarks.bookmarks[num])
      .filter((bookmark): bookmark is Bookmark => bookmark !== undefined);
  };

  const getBookmark = (chapterNumber: number): Bookmark | undefined => {
    return bookmarks.bookmarks[chapterNumber];
  };

  const getBookmarkCount = (): number => {
    return bookmarks.bookmarkOrder.length;
  };

  const clearAllBookmarks = () => {
    setBookmarks(defaultBookmarkData);
  };

  const value: BookmarkContextType = {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmarkNote,
    isBookmarked,
    getAllBookmarks,
    getBookmark,
    getBookmarkCount,
    clearAllBookmarks,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};
