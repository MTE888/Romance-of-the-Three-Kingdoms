/**
 * Reading Progress Context
 *
 * Manages reading progress tracking across the application.
 * Uses localStorage for persistence (no authentication required).
 * Can be migrated to database storage when user auth is implemented.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ChapterProgress {
  completed: boolean;
  lastRead: number; // timestamp
  scrollPosition: number;
  timeSpent: number; // seconds
}

interface ReadingProgressData {
  chapters: Record<number, ChapterProgress>;
  currentChapter: number | null;
  totalTimeSpent: number;
  lastActivity: number;
}

interface ReadingProgressContextType {
  progress: ReadingProgressData;
  markChapterAsRead: (chapterNumber: number) => void;
  markChapterAsInProgress: (chapterNumber: number) => void;
  updateScrollPosition: (chapterNumber: number, position: number) => void;
  addReadingTime: (chapterNumber: number, seconds: number) => void;
  setCurrentChapter: (chapterNumber: number | null) => void;
  getChapterProgress: (chapterNumber: number) => ChapterProgress | undefined;
  getReadChaptersCount: () => number;
  getTotalChapters: () => number;
  getProgressPercentage: () => number;
  resetProgress: () => void;
}

const STORAGE_KEY = 'three-kingdoms-reading-progress';
const TOTAL_CHAPTERS = 120;

const defaultProgress: ReadingProgressData = {
  chapters: {},
  currentChapter: null,
  totalTimeSpent: 0,
  lastActivity: Date.now(),
};

const ReadingProgressContext = createContext<ReadingProgressContextType | undefined>(undefined);

export const ReadingProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ReadingProgressData>(() => {
    // Load from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load reading progress:', error);
    }
    return defaultProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save reading progress:', error);
    }
  }, [progress]);

  const markChapterAsRead = (chapterNumber: number) => {
    setProgress((prev) => ({
      ...prev,
      chapters: {
        ...prev.chapters,
        [chapterNumber]: {
          ...(prev.chapters[chapterNumber] || { timeSpent: 0, scrollPosition: 0 }),
          completed: true,
          lastRead: Date.now(),
        },
      },
      lastActivity: Date.now(),
    }));
  };

  const markChapterAsInProgress = (chapterNumber: number) => {
    setProgress((prev) => ({
      ...prev,
      chapters: {
        ...prev.chapters,
        [chapterNumber]: {
          ...(prev.chapters[chapterNumber] || { timeSpent: 0, scrollPosition: 0 }),
          completed: false,
          lastRead: Date.now(),
        },
      },
      lastActivity: Date.now(),
    }));
  };

  const updateScrollPosition = (chapterNumber: number, position: number) => {
    setProgress((prev) => ({
      ...prev,
      chapters: {
        ...prev.chapters,
        [chapterNumber]: {
          ...(prev.chapters[chapterNumber] || { completed: false, lastRead: Date.now(), timeSpent: 0 }),
          scrollPosition: position,
        },
      },
      lastActivity: Date.now(),
    }));
  };

  const addReadingTime = (chapterNumber: number, seconds: number) => {
    setProgress((prev) => ({
      ...prev,
      chapters: {
        ...prev.chapters,
        [chapterNumber]: {
          ...(prev.chapters[chapterNumber] || { completed: false, lastRead: Date.now(), scrollPosition: 0 }),
          timeSpent: (prev.chapters[chapterNumber]?.timeSpent || 0) + seconds,
        },
      },
      totalTimeSpent: prev.totalTimeSpent + seconds,
      lastActivity: Date.now(),
    }));
  };

  const setCurrentChapter = (chapterNumber: number | null) => {
    setProgress((prev) => ({
      ...prev,
      currentChapter: chapterNumber,
      lastActivity: Date.now(),
    }));
  };

  const getChapterProgress = (chapterNumber: number): ChapterProgress | undefined => {
    return progress.chapters[chapterNumber];
  };

  const getReadChaptersCount = (): number => {
    return Object.values(progress.chapters).filter((ch) => ch.completed).length;
  };

  const getTotalChapters = (): number => {
    return TOTAL_CHAPTERS;
  };

  const getProgressPercentage = (): number => {
    const readCount = getReadChaptersCount();
    return Math.round((readCount / TOTAL_CHAPTERS) * 100);
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  const value: ReadingProgressContextType = {
    progress,
    markChapterAsRead,
    markChapterAsInProgress,
    updateScrollPosition,
    addReadingTime,
    setCurrentChapter,
    getChapterProgress,
    getReadChaptersCount,
    getTotalChapters,
    getProgressPercentage,
    resetProgress,
  };

  return (
    <ReadingProgressContext.Provider value={value}>
      {children}
    </ReadingProgressContext.Provider>
  );
};

export const useReadingProgress = (): ReadingProgressContextType => {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    throw new Error('useReadingProgress must be used within ReadingProgressProvider');
  }
  return context;
};
