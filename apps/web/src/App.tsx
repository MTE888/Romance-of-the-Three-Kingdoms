/**
 * App Component
 *
 * Main application component with routing
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';
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

function App() {
  return (
    <ApolloProvider client={apolloClient}>
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
            <Route
              path="/events"
              element={
                <div className="text-center py-12">
                  <h1 className="text-3xl font-bold mb-4">Events</h1>
                  <p className="text-gray-600">
                    Events page coming soon...
                  </p>
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="card">
                  <h1 className="text-3xl font-bold mb-4">
                    About Three Kingdoms Platform
                  </h1>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      The Three Kingdoms Digital Platform is a comprehensive
                      web application for exploring the Three Kingdoms period
                      (169-280 AD) of Chinese history.
                    </p>
                    <h2 className="text-2xl font-bold mb-2 mt-6">
                      Multi-Source Truth System
                    </h2>
                    <p className="mb-4">
                      Our platform uniquely presents information from multiple
                      sources, explicitly distinguishing between:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-2">
                      <li>
                        Historical records (三国志 - Records of the Three
                        Kingdoms)
                      </li>
                      <li>
                        Literary interpretation (三国演义 - Romance of the Three
                        Kingdoms)
                      </li>
                      <li>Modern scholarly analysis</li>
                    </ul>
                    <p className="mb-4">
                      Every fact is attributed to its source with clear
                      reliability indicators, allowing you to understand the
                      difference between historical fact and literary
                      dramatization.
                    </p>
                    <h2 className="text-2xl font-bold mb-2 mt-6">
                      Technology
                    </h2>
                    <p className="mb-4">
                      Built with modern web technologies including React,
                      GraphQL, and PostgreSQL, hosted on Microsoft Azure.
                    </p>
                  </div>
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div className="text-center py-12">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-gray-600 mb-6">Page not found</p>
                  <a href="/" className="btn btn-primary">
                    Return Home
                  </a>
                </div>
              }
            />
            </Routes>
            </Layout>
          </BrowserRouter>
        </BookmarkProvider>
      </ReadingProgressProvider>
    </ApolloProvider>
  );
}

export default App;
