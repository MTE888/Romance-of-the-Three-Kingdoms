/**
 * Footer Component
 *
 * Site footer with copyright and links
 */

export function Footer() {
  return (
    <footer className="bg-ink-black text-rice-white mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-imperial-yellow font-zh-serif font-bold mb-3">
              三国演义平台
            </h3>
            <p className="text-sm text-gray-300">
              A comprehensive digital platform for exploring the Three Kingdoms
              period, blending historical records with literary interpretation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-imperial-yellow font-semibold mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/characters"
                  className="text-gray-300 hover:text-imperial-yellow"
                >
                  Characters
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-300 hover:text-imperial-yellow"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/timeline"
                  className="text-gray-300 hover:text-imperial-yellow"
                >
                  Timeline
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-imperial-yellow font-semibold mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-imperial-yellow"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MTE888/Romance-of-the-Three-Kingdoms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-imperial-yellow"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2026 Three Kingdoms Digital Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
