/**
 * Chapters List Page
 * Browse all 120 chapters of Romance of the Three Kingdoms
 */

import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';

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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  const chapters = data?.chapters || [];

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
        </header>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter: any) => (
            <Link
              key={chapter.id}
              to={`/chapters/${chapter.chapterNumber}`}
              className="block bg-white rounded-lg border-2 border-gray-200 hover:border-vermillion transition-all duration-200 hover:shadow-lg group"
            >
              <div className="p-6">
                {/* Chapter Number */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-vermillion text-white text-sm font-medium rounded-full">
                    第 {chapter.chapterNumber} 回
                  </span>
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
          ))}
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
