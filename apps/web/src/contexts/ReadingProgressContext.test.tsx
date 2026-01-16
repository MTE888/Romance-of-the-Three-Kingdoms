/**
 * Reading Progress Context Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ReadingProgressProvider, useReadingProgress } from './ReadingProgressContext';
import { ReactNode } from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component that uses the hook
function TestComponent() {
  const {
    getReadChaptersCount,
    getProgressPercentage,
    markChapterAsRead,
    markChapterAsInProgress,
    getChapterProgress,
  } = useReadingProgress();

  return (
    <div>
      <div data-testid="read-count">{getReadChaptersCount()}</div>
      <div data-testid="progress-percentage">{getProgressPercentage()}</div>
      <button
        onClick={() => markChapterAsRead(1)}
        data-testid="mark-read-btn"
      >
        Mark Chapter 1 as Read
      </button>
      <button
        onClick={() => markChapterAsInProgress(2)}
        data-testid="mark-progress-btn"
      >
        Mark Chapter 2 as In Progress
      </button>
      <div data-testid="chapter-1-status">
        {getChapterProgress(1)?.completed ? 'completed' : 'not completed'}
      </div>
    </div>
  );
}

describe('ReadingProgressContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should provide default progress state', () => {
    render(
      <ReadingProgressProvider>
        <TestComponent />
      </ReadingProgressProvider>
    );

    expect(screen.getByTestId('read-count')).toHaveTextContent('0');
    expect(screen.getByTestId('progress-percentage')).toHaveTextContent('0');
  });

  it('should mark chapter as read', () => {
    render(
      <ReadingProgressProvider>
        <TestComponent />
      </ReadingProgressProvider>
    );

    const markReadBtn = screen.getByTestId('mark-read-btn');

    act(() => {
      markReadBtn.click();
    });

    expect(screen.getByTestId('read-count')).toHaveTextContent('1');
    expect(screen.getByTestId('chapter-1-status')).toHaveTextContent('completed');
    expect(screen.getByTestId('progress-percentage')).toHaveTextContent('1'); // 1 out of 120
  });

  it('should mark chapter as in progress', () => {
    render(
      <ReadingProgressProvider>
        <TestComponent />
      </ReadingProgressProvider>
    );

    const markProgressBtn = screen.getByTestId('mark-progress-btn');

    act(() => {
      markProgressBtn.click();
    });

    expect(screen.getByTestId('read-count')).toHaveTextContent('0'); // Not completed yet
  });

  it('should persist progress to localStorage', () => {
    render(
      <ReadingProgressProvider>
        <TestComponent />
      </ReadingProgressProvider>
    );

    const markReadBtn = screen.getByTestId('mark-read-btn');

    act(() => {
      markReadBtn.click();
    });

    const stored = localStorage.getItem('three-kingdoms-reading-progress');
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed.chapters['1']).toBeDefined();
    expect(parsed.chapters['1'].completed).toBe(true);
  });

  it('should load progress from localStorage', () => {
    // Pre-populate localStorage
    const initialData = {
      chapters: {
        '1': {
          completed: true,
          lastRead: Date.now(),
          scrollPosition: 0,
          timeSpent: 100,
        },
      },
      currentChapter: 1,
      totalTimeSpent: 100,
      lastActivity: Date.now(),
    };
    localStorage.setItem('three-kingdoms-reading-progress', JSON.stringify(initialData));

    render(
      <ReadingProgressProvider>
        <TestComponent />
      </ReadingProgressProvider>
    );

    expect(screen.getByTestId('read-count')).toHaveTextContent('1');
    expect(screen.getByTestId('chapter-1-status')).toHaveTextContent('completed');
  });

  it('should calculate progress percentage correctly', () => {
    render(
      <ReadingProgressProvider>
        <TestComponent />
      </ReadingProgressProvider>
    );

    const markReadBtn = screen.getByTestId('mark-read-btn');

    // Mark 12 chapters as read (10% of 120)
    act(() => {
      for (let i = 1; i <= 12; i++) {
        markReadBtn.click();
      }
    });

    expect(screen.getByTestId('progress-percentage')).toHaveTextContent('10');
  });
});
