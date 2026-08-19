/**
 * Home Page
 *
 * Landing page with traditional Chinese design elements,
 * cloud patterns, seal stamps, and heritage colors
 *
 * Design: Palace Museum inspired with Guochao (国潮) aesthetics
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReadingProgressStats } from '../components/ui/ReadingProgressStats';

export function Home() {
  const { t } = useTranslation('home');

  return (
    <div className="animate-fade-in">
      {/* Hero Section with cloud pattern and decorative elements */}
      <section className="relative bg-cloud-pattern py-20 mb-16 overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-rice-white via-transparent to-rice-white pointer-events-none" />

        <div className="relative text-center">
          {/* Seal stamp decoration */}
          <div className="flex justify-center mb-6">
            <div className="seal-stamp-filled text-lg px-4 py-2">
              三国演义
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-zh-serif text-vermillion mb-4 text-balance">
            {t('hero.titleChinese')}
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-heritage-gold" />
            <div className="w-2 h-2 bg-heritage-gold rotate-45" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-heritage-gold" />
          </div>

          <h2 className="text-3xl md:text-4xl font-en-serif text-ink-black mb-8">
            {t('hero.titleEnglish')}
          </h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/chapters"
              className="btn btn-primary px-8 py-4 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-elegant"
            >
              开始阅读
            </Link>
            <Link
              to="/characters"
              className="btn px-8 py-4 text-lg border-2 border-vermillion text-vermillion hover:bg-vermillion hover:text-white transition-all duration-300 ease-elegant"
            >
              探索人物
            </Link>
          </div>
        </div>
      </section>

      {/* Reading Progress with heritage styling */}
      <section className="mb-16">
        <ReadingProgressStats />
      </section>

      {/* Features Grid with enhanced cards */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-zh-serif text-ink-black mb-2">
            探索平台
          </h2>
          <p className="text-text-secondary">Explore the Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chapters Card */}
          <FeatureCard
            to="/chapters"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            title={t('features.chapters.title')}
            titleChinese={t('features.chapters.titleChinese')}
            description={t('features.chapters.description')}
            accentColor="vermillion"
          />

          {/* Characters Card */}
          <FeatureCard
            to="/characters"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title={t('features.characters.title')}
            titleChinese={t('features.characters.titleChinese')}
            description={t('features.characters.description')}
            accentColor="wei"
          />

          {/* Timeline Card */}
          <FeatureCard
            to="/timeline"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            title={t('features.timeline.title')}
            titleChinese={t('features.timeline.titleChinese')}
            description={t('features.timeline.description')}
            accentColor="heritage-gold"
          />
        </div>
      </section>

      {/* Multi-Source Truth Section with traditional styling */}
      <section className="relative">
        <div className="card bg-white/80 backdrop-blur-sm p-10">
          {/* Section header with traditional divider */}
          <div className="text-center mb-10">
            <div className="divider-traditional mb-6">
              <span className="seal-stamp text-sm px-4 bg-white">源</span>
            </div>
            <h2 className="text-3xl font-bold font-zh-serif text-ink-black mb-2">
              {t('multiSource.title')}
            </h2>
            <p className="text-text-secondary">Multi-Source Truth System</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Historical Profile */}
            <div className="accent-wei bg-gray-50/50 rounded-xl p-6 hover:shadow-md transition-all duration-300 ease-elegant">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-blue/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-blue">
                    {t('multiSource.historical.title')}
                  </h3>
                  <p className="text-sm text-text-secondary font-zh-serif">
                    {t('multiSource.historical.titleChinese')}
                  </p>
                </div>
              </div>
              <p className="text-text-primary leading-relaxed">
                {t('multiSource.historical.description')}
              </p>
            </div>

            {/* Literary Profile */}
            <div className="accent-shu bg-gray-50/50 rounded-xl p-6 hover:shadow-md transition-all duration-300 ease-elegant">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-vermillion/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-vermillion" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-vermillion">
                    {t('multiSource.literary.title')}
                  </h3>
                  <p className="text-sm text-text-secondary font-zh-serif">
                    {t('multiSource.literary.titleChinese')}
                  </p>
                </div>
              </div>
              <p className="text-text-primary leading-relaxed">
                {t('multiSource.literary.description')}
              </p>
            </div>
          </div>

          {/* Note with traditional styling */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary italic flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-heritage-gold" />
              {t('multiSource.note')}
              <span className="w-8 h-px bg-heritage-gold" />
            </p>
          </div>
        </div>
      </section>

      {/* Kingdom Stats Section */}
      <section className="mt-16 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KingdomCard
            name="魏"
            nameEn="Wei"
            color="wei"
            description="曹操所建，北方霸主"
          />
          <KingdomCard
            name="蜀"
            nameEn="Shu"
            color="shu"
            description="刘备所建，复兴汉室"
          />
          <KingdomCard
            name="吴"
            nameEn="Wu"
            color="wu"
            description="孙权所建，江东之主"
          />
        </div>
      </section>
    </div>
  );
}

/**
 * Feature Card Component with elegant hover effects
 */
function FeatureCard({
  to,
  icon,
  title,
  titleChinese,
  description,
  accentColor,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  titleChinese: string;
  description: string;
  accentColor: string;
}) {
  return (
    <Link
      to={to}
      className="card group hover:shadow-card-hover transition-all duration-300 ease-elegant transform hover:-translate-y-1"
    >
      <div className="text-center">
        {/* Icon with accent color */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-${accentColor}/10 text-${accentColor} mb-6 group-hover:scale-110 transition-transform duration-300 ease-elegant`}>
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-ink-black mb-2 group-hover:text-vermillion transition-colors duration-300">
          {title}
        </h3>
        <p className="text-lg font-zh-serif text-text-secondary mb-4">
          {titleChinese}
        </p>
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>

        {/* Arrow indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-vermillion opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium">Explore</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/**
 * Kingdom Card Component
 */
function KingdomCard({
  name,
  nameEn,
  color,
  description,
}: {
  name: string;
  nameEn: string;
  color: string;
  description: string;
}) {
  return (
    <Link
      to={`/characters?kingdom=${nameEn.toUpperCase()}`}
      className={`block p-6 rounded-xl bg-${color}/5 border-2 border-${color}/20 hover:border-${color}/50 hover:shadow-md transition-all duration-300 ease-elegant group`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-full bg-${color} flex items-center justify-center text-white text-3xl font-zh-serif font-bold group-hover:scale-110 transition-transform duration-300`}>
          {name}
        </div>
        <div>
          <h3 className={`text-xl font-bold text-${color}`}>{nameEn}</h3>
          <p className="text-sm text-text-secondary font-zh-serif">{description}</p>
        </div>
      </div>
    </Link>
  );
}
