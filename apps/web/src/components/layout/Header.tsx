/**
 * Header Component
 *
 * Main navigation header with logo and navigation links
 */

import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b-2 border-vermillion">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-vermillion text-3xl font-zh-serif font-bold">
              三国
            </div>
            <div className="text-ink-black text-xl font-en-serif">
              Three Kingdoms
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/chapters"
              className="text-ink-black hover:text-vermillion font-medium transition-colors"
            >
              Chapters
            </Link>
            <Link
              to="/characters"
              className="text-ink-black hover:text-vermillion font-medium transition-colors"
            >
              Characters
            </Link>
            <Link
              to="/events"
              className="text-ink-black hover:text-vermillion font-medium transition-colors"
            >
              Events
            </Link>
            <Link
              to="/timeline"
              className="text-ink-black hover:text-vermillion font-medium transition-colors"
            >
              Timeline
            </Link>
            <Link
              to="/about"
              className="text-ink-black hover:text-vermillion font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
