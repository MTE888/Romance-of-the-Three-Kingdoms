/**
 * Chapter Viewer Page
 * Displays a single chapter with traditional Chinese styling
 * Features character name detection and hover cards
 */

import { useParams, useNavigate, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useCharacterDetection } from '../hooks/useCharacterDetection';
import { CharacterLink } from '../components/chapter/CharacterLink';

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

  const { loading, error, data } = useQuery(GET_CHAPTER, {
    variables: { chapterNumber: number },
  });

  const {
    loading: charactersLoading,
    parseTextWithCharacters,
  } = useCharacterDetection();

  if (loading || charactersLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.chapter) return <ErrorMessage message="Chapter not found" />;

  const { chapter } = data;
  const hasNext = number < 120;
  const hasPrev = number > 1;

  // Parse content into paragraphs
  const paragraphs = (chapter.content?.zh || '').split(/\n\s*\n/).filter(p => p.trim());

  /**
   * Render a paragraph with character name detection
   */
  const renderParagraphWithCharacters = (text: string, index: number) => {
    const segments = parseTextWithCharacters(text);

    return (
      <p
        key={index}
        className="font-zh-serif text-lg md:text-xl leading-relaxed text-ink-black text-justify indent-8"
        style={{
          lineHeight: '2',
          letterSpacing: '0.05em',
        }}
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
    <div className="min-h-screen bg-rice-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-vermillion sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/chapters"
              className="text-ink-black hover:text-vermillion transition-colors"
            >
              ← Back to Chapters
            </Link>
            <div className="text-center">
              <div className="text-sm text-gray-600">Chapter {chapter.chapterNumber}</div>
              <h1 className="text-2xl md:text-3xl font-zh-serif text-ink-black">
                {chapter.title?.zh || chapter.title?.en}
              </h1>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Chapter Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose prose-lg max-w-none">
          {/* Chapter Title */}
          <div className="text-center mb-12">
            <div className="inline-block border-t-4 border-b-4 border-vermillion py-4 px-8">
              <h2 className="text-3xl md:text-4xl font-zh-serif text-ink-black m-0">
                第{convertToChineseNumber(chapter.chapterNumber)}回
              </h2>
              <p className="text-xl md:text-2xl font-zh-serif text-gray-700 mt-4 mb-0">
                {chapter.title?.zh}
              </p>
            </div>
          </div>

          {/* Chapter Text */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) =>
              renderParagraphWithCharacters(paragraph, index)
            )}
          </div>

          {/* End Marker */}
          <div className="text-center mt-16 mb-8">
            <div className="inline-block border border-vermillion rounded-full px-6 py-2">
              <span className="text-vermillion font-zh-serif">— 本回完 —</span>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <button
              onClick={() => hasPrev && navigate(`/chapters/${number - 1}`)}
              disabled={!hasPrev}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                hasPrev
                  ? 'bg-vermillion text-white hover:bg-opacity-90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>←</span>
              <span>Previous Chapter</span>
            </button>

            <Link
              to="/chapters"
              className="px-6 py-3 border-2 border-vermillion text-vermillion rounded-lg font-medium hover:bg-vermillion hover:text-white transition-colors"
            >
              All Chapters
            </Link>

            <button
              onClick={() => hasNext && navigate(`/chapters/${number + 1}`)}
              disabled={!hasNext}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                hasNext
                  ? 'bg-vermillion text-white hover:bg-opacity-90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Next Chapter</span>
              <span>→</span>
            </button>
          </div>
        </nav>

        {/* Chapter Info */}
        {chapter.source && (
          <aside className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-ink-black mb-4">Source Information</h3>
            <dl className="space-y-2">
              <div className="flex">
                <dt className="font-medium text-gray-600 w-24">Title:</dt>
                <dd className="text-ink-black">
                  {chapter.source.title?.zh || chapter.source.title?.en}
                </dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-600 w-24">Author:</dt>
                <dd className="text-ink-black">
                  {chapter.source.author?.zh || chapter.source.author?.en}
                </dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-600 w-24">Type:</dt>
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
    result += digits[0]; // Add zero for missing tens place
  }

  if (ones > 0) {
    result += digits[ones];
  }

  return result;
}
