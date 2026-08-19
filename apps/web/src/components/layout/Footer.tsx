/**
 * Footer Component
 *
 * Site footer with heritage colors, cloud pattern background,
 * and traditional Chinese design elements
 *
 * Design: Dark theme with gold accents (Palace Museum inspired)
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('layout');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-black text-rice-white mt-auto bg-cloud-pattern-dark relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-heritage-gold to-transparent" />

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section with seal stamp */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="seal-stamp-square text-sm">
                三国
              </div>
              <h3 className="text-heritage-gold font-zh-serif font-bold text-xl">
                {t('footer.title')}
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-heritage-gold font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-heritage-gold" />
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/chapters">{t('header.nav.chapters')}</FooterLink>
              <FooterLink to="/characters">{t('header.nav.characters')}</FooterLink>
              <FooterLink to="/events">{t('header.nav.events')}</FooterLink>
              <FooterLink to="/timeline">{t('header.nav.timeline')}</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-heritage-gold font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-heritage-gold" />
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/about">{t('header.nav.about')}</FooterLink>
              <li>
                <a
                  href="https://github.com/MTE888/Romance-of-the-Three-Kingdoms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-heritage-gold transition-colors duration-300 ease-elegant inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {t('footer.github')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="divider-traditional my-8">
          <span className="text-heritage-gold font-zh-serif text-sm px-4 bg-ink-black">
            以史为鉴
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Footer Link Component with elegant hover effect
 */
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-400 hover:text-heritage-gold transition-colors duration-300 ease-elegant inline-flex items-center gap-2 group"
      >
        <span className="w-0 h-px bg-heritage-gold group-hover:w-4 transition-all duration-300 ease-elegant" />
        {children}
      </Link>
    </li>
  );
}
