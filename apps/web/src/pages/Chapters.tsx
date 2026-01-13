/**
 * Chapters List Page
 * Browse all 120 chapters of Romance of the Three Kingdoms
 * Features reading progress tracking
 */

import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useReadingProgress } from '../contexts/ReadingProgressContext';

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
  const { loading, error, data } = useQuery(GET_CHAPTERS);
  const {
    getChapterProgress,
    getReadChaptersCount,
    getTotalChapters,
    getProgressPercentage,
  } = useReadingProgress();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  const chapters = data?.chapters || [];
  const readCount = getReadChaptersCount();
  const totalCount = getTotalChapters();
  const progressPercent = getProgressPercentage();

  return (
    <div className="min-h-screen bg-rice-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-zh-serif text-ink-black mb-4">
            三国演义
          </h1>
          <p className="text-xl text-gray-600 font-en-serif">
            Romance of the Three Kingdoms
          </p>
          <p className="text-gray-500 mt-4">
            {chapters.length} Chapters • Ming Dynasty Classic
          </p>

          {/* Reading Progress */}
          {readCount > 0 && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Your Progress</span>
                <span className="font-medium">
                  {readCount} / {totalCount} chapters ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-vermillion to-red-700 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter: any) => {
            const progress = getChapterProgress(chapter.chapterNumber);
            const isCompleted = progress?.completed || false;
            const isInProgress = progress && !progress.completed;

            return (
              <Link
                key={chapter.id}
                to={`/chapters/${chapter.chapterNumber}`}
                className={`block bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-lg group ${
                  isCompleted
                    ? 'border-green-300 hover:border-green-500'
                    : 'border-gray-200 hover:border-vermillion'
                }`}
              >
                <div className="p-6">
                  {/* Chapter Number */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-block px-3 py-1 text-white text-sm font-medium rounded-full ${
                        isCompleted ? 'bg-green-600' : 'bg-vermillion'
                      }`}
                    >
                      第 {chapter.chapterNumber} 回
                    </span>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {isInProgress && !isCompleted && (
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-vermillion transition-colors"
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

                {/* Chapter Title */}
                <h2 className="font-zh-serif text-lg text-ink-black mb-3 line-clamp-2 group-hover:text-vermillion transition-colors">
                  {chapter.title?.zh || chapter.title?.en}
                </h2>

                  {/* Summary */}
                  {chapter.summary?.zh && (
                    <p className="text-sm text-gray-600 line-clamp-3 font-zh-serif">
                      {chapter.summary.zh}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-zh-serif text-ink-black mb-4">About This Edition</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              <strong className="font-zh-serif">Romance of the Three Kingdoms</strong> (三国演义) is one of the Four Great Classical Novels of Chinese literature.
              Written by Luo Guanzhong during the Ming Dynasty (14th century), it chronicles the turbulent Three Kingdoms period (169-280 AD).
            </p>
            <p className="text-gray-700">
              This platform presents the complete 120 chapters, allowing you to explore both the literary narrative
              and the historical context behind the stories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
