/**
 * App Component
 *
 * Main application component with routing and providers
 */

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { apolloClient } from './lib/apollo';
import { LanguageProvider } from './contexts/LanguageContext';
import { ReadingProgressProvider } from './contexts/ReadingProgressContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { CharacterList } from './pages/CharacterList';
import { CharacterDetail } from './pages/CharacterDetail';
import { Timeline } from './pages/Timeline';
import { Chapters } from './pages/Chapters';
import { ChapterViewer } from './pages/ChapterViewer';
import { Relationships } from './pages/Relationships';

/**
 * Placeholder pages with i18n support
 * These are temporary until full pages are implemented
 */
function EventsPage() {
  const { t } = useTranslation('common');
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">{t('pages.events.title')}</h1>
      <p className="text-gray-600">{t('pages.events.comingSoon')}</p>
    </div>
  );
}

function AboutPage() {
  const { t } = useTranslation('common');
  return (
    <div className="card">
      <h1 className="text-3xl font-bold mb-4">{t('pages.about.title')}</h1>
      <div className="prose max-w-none">
        <p className="mb-4">{t('pages.about.intro')}</p>
        <h2 className="text-2xl font-bold mb-2 mt-6">{t('pages.about.multiSourceTitle')}</h2>
        <p className="mb-4">{t('pages.about.multiSourceIntro')}</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{t('pages.about.source1')}</li>
          <li>{t('pages.about.source2')}</li>
          <li>{t('pages.about.source3')}</li>
        </ul>
        <p className="mb-4">{t('pages.about.attribution')}</p>
        <h2 className="text-2xl font-bold mb-2 mt-6">{t('pages.about.technologyTitle')}</h2>
        <p className="mb-4">{t('pages.about.technology')}</p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  const { t } = useTranslation('common');
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">{t('pages.notFound.title')}</h1>
      <p className="text-gray-600 mb-6">{t('pages.notFound.message')}</p>
      <Link to="/" className="btn btn-primary">
        {t('pages.notFound.returnHome')}
      </Link>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <LanguageProvider>
        <ReadingProgressProvider>
          <BookmarkProvider>
            <BrowserRouter>
              <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/relationships" element={<Relationships />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/chapters/:chapterNumber" element={<ChapterViewer />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Layout>
          </BrowserRouter>
        </BookmarkProvider>
      </ReadingProgressProvider>
    </LanguageProvider>
    </ApolloProvider>
  );
}

export default App;
