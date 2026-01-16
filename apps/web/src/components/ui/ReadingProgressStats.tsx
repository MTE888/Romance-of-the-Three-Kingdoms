/**
 * Reading Progress Statistics Component
 *
 * Displays overall reading progress statistics
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useReadingProgress } from '../../contexts/ReadingProgressContext';

export const ReadingProgressStats: React.FC = () => {
  const {
    getReadChaptersCount,
    getTotalChapters,
    getProgressPercentage,
    progress,
  } = useReadingProgress();

  const readCount = getReadChaptersCount();
  const totalCount = getTotalChapters();
  const progressPercent = getProgressPercentage();
  const totalTimeSpent = progress.totalTimeSpent;

  // Convert seconds to hours and minutes
  const hours = Math.floor(totalTimeSpent / 3600);
  const minutes = Math.floor((totalTimeSpent % 3600) / 60);

  if (readCount === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-zh-serif text-ink-black mb-4">
          Start Your Journey
        </h2>
        <p className="text-gray-600 mb-6">
          Begin reading Romance of the Three Kingdoms. Track your progress through all 120 chapters.
        </p>
        <Link
          to="/chapters"
          className="inline-block px-6 py-3 bg-vermillion text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Browse Chapters
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-zh-serif text-ink-black mb-6">
        Your Reading Progress
      </h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">Chapters Completed</span>
          <span className="font-bold text-ink-black">
            {readCount} / {totalCount} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-vermillion to-red-700 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-vermillion mb-1">
            {readCount}
          </div>
          <div className="text-sm text-gray-600">Chapters Read</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {totalCount - readCount}
          </div>
          <div className="text-sm text-gray-600">Chapters Remaining</div>
        </div>

        {totalTimeSpent > 0 && (
          <>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {hours > 0 ? `${hours}h` : `${minutes}m`}
              </div>
              <div className="text-sm text-gray-600">Reading Time</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {totalTimeSpent > 0 && readCount > 0
                  ? Math.round(totalTimeSpent / readCount / 60)
                  : 0}
                m
              </div>
              <div className="text-sm text-gray-600">Avg. per Chapter</div>
            </div>
          </>
        )}
      </div>

      {/* Milestones */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Milestones</h3>
        <div className="space-y-2">
          <Milestone
            title="First Steps"
            description="Read your first chapter"
            completed={readCount >= 1}
          />
          <Milestone
            title="Getting Started"
            description="Read 10 chapters"
            completed={readCount >= 10}
            progress={readCount}
            total={10}
          />
          <Milestone
            title="Making Progress"
            description="Read 30 chapters"
            completed={readCount >= 30}
            progress={readCount}
            total={30}
          />
          <Milestone
            title="Halfway There"
            description="Read 60 chapters"
            completed={readCount >= 60}
            progress={readCount}
            total={60}
          />
          <Milestone
            title="Almost Done"
            description="Read 100 chapters"
            completed={readCount >= 100}
            progress={readCount}
            total={100}
          />
          <Milestone
            title="Journey Complete"
            description="Read all 120 chapters"
            completed={readCount >= 120}
            progress={readCount}
            total={120}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <Link
          to="/chapters"
          className="w-full block text-center px-6 py-3 border-2 border-vermillion text-vermillion rounded-lg font-medium hover:bg-vermillion hover:text-white transition-colors"
        >
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

interface MilestoneProps {
  title: string;
  description: string;
  completed: boolean;
  progress?: number;
  total?: number;
}

const Milestone: React.FC<MilestoneProps> = ({
  title,
  description,
  completed,
  progress,
  total,
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        {completed ? (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <div className={`text-sm font-medium ${completed ? 'text-green-700' : 'text-gray-700'}`}>
          {title}
        </div>
        <div className="text-xs text-gray-500">{description}</div>
        {!completed && progress !== undefined && total !== undefined && progress > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            {progress} / {total}
          </div>
        )}
      </div>
    </div>
  );
};
