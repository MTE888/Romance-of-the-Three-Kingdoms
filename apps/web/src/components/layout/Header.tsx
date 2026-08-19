/**
 * Header Component
 *
 * Main navigation header with glassmorphic design, elegant transitions,
 * and traditional Chinese design elements
 *
 * Design: Glassmorphic effect with backdrop blur (Xiaohongshu inspired)
 */

import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation('layout');
  const location = useLocation();

  // Check if a nav link is active
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-sticky glass border-b border-vermillion/30 shadow-paper">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo with seal stamp effect */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Seal stamp decoration */}
              <div className="absolute -inset-2 bg-vermillion/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-vermillion text-3xl font-zh-serif font-bold relative">
                {t('header.logo.chinese')}
              </div>
            </div>
            <div className="text-ink-black text-xl font-en-serif group-hover:text-heritage-burgundy transition-colors duration-300 ease-elegant">
              {t('header.logo.english')}
            </div>
          </Link>

          {/* Navigation Links with elegant hover effects */}
          <div className="flex items-center space-x-1">
            <NavLink to="/chapters" active={isActive('/chapters')}>
              {t('header.nav.chapters')}
            </NavLink>
            <NavLink to="/characters" active={isActive('/characters')}>
              {t('header.nav.characters')}
            </NavLink>
            <NavLink to="/events" active={isActive('/events')}>
              {t('header.nav.events')}
            </NavLink>
            <NavLink to="/timeline" active={isActive('/timeline')}>
              {t('header.nav.timeline')}
            </NavLink>
            <NavLink to="/relationships" active={isActive('/relationships')}>
              {t('header.nav.relationships')}
            </NavLink>
            <NavLink to="/about" active={isActive('/about')}>
              {t('header.nav.about')}
            </NavLink>

            {/* Language Switcher with divider */}
            <div className="ml-4 pl-4 border-l border-gray-300/50">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

/**
 * Navigation Link Component
 * Elegant hover effect with underline animation
 */
function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 font-medium transition-colors duration-300 ease-elegant group ${
        active
          ? 'text-vermillion'
          : 'text-ink-black hover:text-vermillion'
      }`}
    >
      {children}
      {/* Animated underline */}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-vermillion transition-all duration-300 ease-elegant ${
          active ? 'w-3/4' : 'w-0 group-hover:w-3/4'
        }`}
      />
    </Link>
  );
}
