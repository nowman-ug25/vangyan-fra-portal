// src/components/RightsNavigator.jsx

import { useState, useMemo } from 'react';
import { Search, Scale, BookOpen, CheckCircle2 } from 'lucide-react';
import { mockRights } from '../mockrights';

const CATEGORIES = [
  'All',
  'Individual Forest Rights (IFR)',
  'Community Forest Rights (CFR)',
  'Community Forest Resource (CFR) rights',
  'Role of Gram Sabha',
];

const toSafeString = (value) =>
  typeof value === 'string' ? value : value == null ? '' : String(value);

const getKeyPoints = (item) =>
  Array.isArray(item?.keyPoints) ? item.keyPoints.filter(Boolean) : [];

function RightsNavigator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRights = useMemo(() => {
    const rights = Array.isArray(mockRights) ? mockRights : [];
    const query = searchQuery.trim().toLowerCase();

    return rights.filter((item) => {
      if (!item) return false;

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const haystack = [
        toSafeString(item.title),
        toSafeString(item.shortDescription),
        ...getKeyPoints(item).map(toSafeString),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [searchQuery, selectedCategory]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <section aria-labelledby="rights-navigator-heading">
      <h2
        id="rights-navigator-heading"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--forest-green)',
          marginTop: 0,
        }}
      >
        <Scale size={26} aria-hidden="true" />
        Forest Rights Navigator
      </h2>

      <div className="controls-bar">
        <div className="search-wrapper">
          <Search
            size={18}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="search"
            className="search-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search rights, sections or key points..."
            aria-label="Search forest rights"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-pills" role="group" aria-label="Filter by category">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-pill${selectedCategory === category ? ' active' : ''}`}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-grid">
        {filteredRights.length === 0 ? (
          <div className="empty-state" role="status">
            <BookOpen
              size={40}
              aria-hidden="true"
              style={{ marginBottom: '0.75rem', color: 'var(--earthy-brown-light)' }}
            />
            <p style={{ margin: '0 0 1rem' }}>
              No rights match your search or selected category.
            </p>
            <button type="button" className="filter-pill active" onClick={handleReset}>
              Reset search &amp; filters
            </button>
          </div>
        ) : (
          filteredRights.map((item, index) => {
            const points = getKeyPoints(item);

            return (
              <article className="info-card" key={item.id ?? `right-${index}`}>
                <span className="card-badge">{toSafeString(item.category)}</span>

                <h3 className="card-title">{toSafeString(item.title)}</h3>

                <p className="card-section-ref">
                  <BookOpen
                    size={15}
                    aria-hidden="true"
                    style={{ marginRight: '0.35rem', verticalAlign: '-2px' }}
                  />
                  {toSafeString(item.sectionRef)}
                </p>

                <p className="card-desc">{toSafeString(item.shortDescription)}</p>

                {points.length > 0 && (
                  <ul className="card-points" style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {points.map((point, pointIndex) => (
                      <li
                        key={`${item.id ?? index}-point-${pointIndex}`}
                        style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}
                      >
                        <CheckCircle2
                          size={18}
                          aria-hidden="true"
                          style={{
                            flexShrink: 0,
                            marginTop: '0.2rem',
                            color: 'var(--forest-green-light)',
                          }}
                        />
                        <span>{toSafeString(point)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default RightsNavigator;