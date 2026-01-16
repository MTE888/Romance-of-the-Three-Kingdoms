/**
 * Timeline Page
 *
 * Chronological timeline of Three Kingdoms events
 */

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

// GraphQL query
const GET_TIMELINE = gql`
  query GetTimeline($filter: TimelineFilter) {
    timeline(filter: $filter) {
      id
      year
      month
      day
      description
      importance
      category
      event {
        id
        name
        type
      }
      character {
        id
        canonicalName
      }
    }
  }
`;

export function Timeline() {
  const [minImportance, setMinImportance] = useState(5);

  const { loading, error, data } = useQuery(GET_TIMELINE, {
    variables: {
      filter: {
        startYear: 160,
        endYear: 280,
        minImportance,
      },
    },
  });

  if (loading) return <Loading message="Loading timeline..." />;
  if (error)
    return (
      <ErrorMessage title="Failed to load timeline" message={error.message} />
    );

  const entries = data?.timeline || [];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ink-black mb-2">
          Timeline <span className="font-zh-serif">时间线</span>
        </h1>
        <p className="text-gray-600">
          Chronological timeline of events from 160-280 AD
        </p>
      </div>

      {/* Importance Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Minimum Importance:
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={minImportance}
            onChange={(e) => setMinImportance(parseInt(e.target.value))}
            className="flex-1 max-w-xs"
          />
          <span className="text-lg font-bold text-vermillion">
            {minImportance}/10
          </span>
        </div>
      </div>

      {/* Timeline */}
      {entries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No events found for the selected criteria
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-vermillion"></div>

          {/* Timeline entries */}
          <div className="space-y-6">
            {entries.map((entry: any) => (
              <div key={entry.id} className="relative pl-20">
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 top-2 w-4 h-4 rounded-full border-4 border-white ${
                    entry.importance >= 8
                      ? 'bg-vermillion'
                      : entry.importance >= 6
                      ? 'bg-imperial-yellow'
                      : 'bg-gray-400'
                  }`}
                ></div>

                {/* Entry card */}
                <div className="card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-ink-black">
                        {entry.event?.name?.zh || entry.description?.zh || ''}
                      </h3>
                      {entry.event?.name?.en && (
                        <p className="text-gray-600">
                          {entry.event.name.en}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-vermillion">
                        {entry.year} AD
                      </p>
                      {entry.month && entry.day && (
                        <p className="text-sm text-gray-500">
                          {entry.month}/{entry.day}
                        </p>
                      )}
                    </div>
                  </div>

                  {entry.event?.type && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {entry.event.type}
                    </span>
                  )}

                  {entry.category && (
                    <span className="inline-block ml-2 px-2 py-1 bg-indigo-blue bg-opacity-10 text-indigo-blue text-xs rounded">
                      {entry.category}
                    </span>
                  )}

                  {entry.character && (
                    <div className="mt-2 text-sm text-gray-600">
                      Related to:{' '}
                      <span className="font-zh-serif font-medium">
                        {entry.character.canonicalName?.zh || 'Unknown'}
                      </span>
                    </div>
                  )}

                  {/* Importance indicator */}
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span className="mr-2">Importance:</span>
                    <div className="flex space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < entry.importance
                              ? 'bg-vermillion'
                              : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
