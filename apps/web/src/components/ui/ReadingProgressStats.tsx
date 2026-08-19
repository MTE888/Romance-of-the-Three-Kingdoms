/**
 * Reading Progress Statistics Component
 *
 * Displays overall reading progress with heritage styling,
 * milestone achievements, and elegant animations
 *
 * Design: Card-based dashboard with traditional Chinese aesthetics
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReadingProgress } from '../../contexts/ReadingProgressContext';

export const ReadingProgressStats: React.FC = () => {
  const { t } = useTranslation('common');
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

  const hours = Math.floor(totalTimeSpent / 3600);
  const minutes = Math.floor((totalTimeSpent % 3600) / 60);

  // Not started state
  if (readCount === 0) {
    return (
      <div className="card-heritage text-center">
        <div className="flex justify-center mb-6">
          <div className="seal-stamp text-lg px-4 py-2">开始</div>
        </div>
        <h2 className="text-2xl font-zh-serif text-ink-black mb-4">
          {t('reading.startJourney')}
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
          {t('reading.startJourneyDesc')}
        </p>
        <Link
          to="/chapters"
          className="inline-flex items-center gap-2 px-8 py-4 bg-vermillion text-white rounded-xl font-medium hover:bg-heritage-burgundy transition-all duration-300 ease-elegant shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {t('actions.browseChapters')}
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header with seal stamp */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="seal-stamp text-sm">读</div>
          <h2 className="text-2xl font-zh-serif text-ink-black">
            {t('reading.yourProgress')}
          </h2>
        </div>
        <div className="text-sm text-text-secondary">
          {progressPercent}% complete
        </div>
      </div>

      {/* Progress Bar with shimmer */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
          <span className="font-medium">{t('reading.chaptersCompleted')}</span>
          <span className="font-bold text-ink-black text-lg">
            {readCount} / {totalCount}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-vermillion via-heritage-burgundy to-vermillion h-full transition-all duration-700 rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-subtle" />
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          value={readCount}
          label={t('reading.chaptersRead')}
          color="vermillion"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
        <StatCard
          value={totalCount - readCount}
          label={t('reading.chaptersRemaining')}
          color="info"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        {totalTimeSpent > 0 && (
          <>
            <StatCard
              value={hours > 0 ? `${hours}h` : `${minutes}m`}
              label={t('reading.readingTime')}
              color="success"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatCard
              value={`${totalTimeSpent > 0 && readCount > 0 ? Math.round(totalTimeSpent / readCount / 60) : 0}m`}
              label={t('reading.avgPerChapter')}
              color="heritage-gold"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </>
        )}
      </div>

      {/* Milestones */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-heritage-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {t('reading.milestones')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Milestone title={t('milestones.firstSteps')} description={t('milestones.firstStepsDesc')} completed={readCount >= 1} />
          <Milestone title={t('milestones.gettingStarted')} description={t('milestones.gettingStartedDesc')} completed={readCount >= 10} progress={readCount} total={10} />
          <Milestone title={t('milestones.makingProgress')} description={t('milestones.makingProgressDesc')} completed={readCount >= 30} progress={readCount} total={30} />
          <Milestone title={t('milestones.halfway')} description={t('milestones.halfwayDesc')} completed={readCount >= 60} progress={readCount} total={60} />
          <Milestone title={t('milestones.almostDone')} description={t('milestones.almostDoneDesc')} completed={readCount >= 100} progress={readCount} total={100} />
          <Milestone title={t('milestones.journeyComplete')} description={t('milestones.journeyCompleteDesc')} completed={readCount >= 120} progress={readCount} total={120} />
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <Link
          to="/chapters"
          className="w-full block text-center px-6 py-4 border-2 border-vermillion text-vermillion rounded-xl font-medium hover:bg-vermillion hover:text-white transition-all duration-300 ease-elegant"
        >
          {t('actions.continueReading')}
        </Link>
      </div>
    </div>
  );
};

/**
 * Stat Card Component
 */
function StatCard({
  value,
  label,
  color,
  icon,
}: {
  value: number | string;
  label: string;
  color: string;
  icon: React.ReactNode;
}) {
  const colorClasses: Record<string, string> = {
    vermillion: 'bg-vermillion/10 text-vermillion',
    info: 'bg-info/10 text-info',
    success: 'bg-success/10 text-success',
    'heritage-gold': 'bg-heritage-gold/10 text-heritage-gold',
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-sm transition-shadow duration-300">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className={`text-2xl font-bold text-${color === 'heritage-gold' ? 'heritage-gold' : color} mb-1`}>
        {value}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  );
}

/**
 * Milestone Component
 */
function Milestone({
  title,
  description,
  completed,
  progress,
  total,
}: {
  title: string;
  description: string;
  completed: boolean;
  progress?: number;
  total?: number;
}) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-300 ${
      completed ? 'bg-success/5' : 'bg-gray-50'
    }`}>
      <div className="mt-0.5">
        {completed ? (
          <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${completed ? 'text-success' : 'text-text-primary'}`}>
          {title}
        </div>
        <div className="text-xs text-text-secondary truncate">{description}</div>
        {!completed && progress !== undefined && total !== undefined && progress > 0 && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
              <span>{progress} / {total}</span>
              <span>{Math.round((progress / total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-heritage-gold h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((progress / total) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
