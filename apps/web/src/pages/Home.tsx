/**
 * Home Page
 *
 * Landing page for the Three Kingdoms Platform
 */

import { Link } from 'react-router-dom';
import { ReadingProgressStats } from '../components/ui/ReadingProgressStats';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-16 mb-12">
        <h1 className="text-6xl font-bold font-zh-serif text-vermillion mb-4">
          三国演义
        </h1>
        <h2 className="text-4xl font-en-serif text-ink-black mb-6">
          Romance of the Three Kingdoms
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore the rich history and captivating literature of the Three
          Kingdoms period (169-280 AD). Discover characters, events, and
          timelines from both historical records and literary interpretation.
        </p>
      </div>

      {/* Reading Progress */}
      <div className="mb-12">
        <ReadingProgressStats />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Characters */}
        <Link to="/characters" className="card hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-ink-black mb-2">
              Characters
            </h3>
            <p className="text-zh-serif text-xl text-gray-600 mb-3">人物</p>
            <p className="text-gray-600">
              Browse detailed profiles of historical and literary characters
              from the Three Kingdoms era.
            </p>
          </div>
        </Link>

        {/* Events */}
        <Link to="/events" className="card hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-2xl font-bold text-ink-black mb-2">Events</h3>
            <p className="text-zh-serif text-xl text-gray-600 mb-3">事件</p>
            <p className="text-gray-600">
              Explore major battles, political events, and personal moments that
              shaped history.
            </p>
          </div>
        </Link>

        {/* Timeline */}
        <Link to="/timeline" className="card hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-ink-black mb-2">
              Timeline
            </h3>
            <p className="text-zh-serif text-xl text-gray-600 mb-3">
              时间线
            </p>
            <p className="text-gray-600">
              Follow the chronological journey through over a century of Three
              Kingdoms history.
            </p>
          </div>
        </Link>
      </div>

      {/* Multi-Source Truth Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-ink-black mb-6 text-center">
          Multi-Source Truth System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-indigo-blue pl-4">
            <h3 className="text-xl font-bold text-indigo-blue mb-2">
              Historical Records
            </h3>
            <p className="text-zh-serif text-lg text-gray-700 mb-2">三国志</p>
            <p className="text-gray-600">
              Based on the <em>Records of the Three Kingdoms</em> compiled by
              Chen Shou in the 3rd century - the authoritative historical
              account.
            </p>
          </div>

          <div className="border-l-4 border-vermillion pl-4">
            <h3 className="text-xl font-bold text-vermillion mb-2">
              Literary Interpretation
            </h3>
            <p className="text-zh-serif text-lg text-gray-700 mb-2">
              三国演义
            </p>
            <p className="text-gray-600">
              Based on the <em>Romance of the Three Kingdoms</em> by Luo
              Guanzhong - one of China's Four Great Classical Novels with
              literary dramatization.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-gray-600 italic">
          Every character and event presents both perspectives side-by-side,
          helping you distinguish fact from fiction.
        </p>
      </div>
    </div>
  );
}
