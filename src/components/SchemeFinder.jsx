// src/components/SchemeFinder.jsx

import { useState, useMemo } from 'react';
import { Search, Users, IndianRupee, Calendar, FilterX } from 'lucide-react';
import { mockSchemes } from '../mockschemes';

const CATEGORIES = [
  'All',
  'Education',
  'Agriculture',
  'Livelihood',
  'Financial Assistance',
  'Tribal Development',
];

const toSafeString = (value) =>
  typeof value === 'string' ? value : value == null ? '' : String(value);

const toNumberOrNull = (value) => {
  if (value === '' || value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatRupees = (value) => {
  const num = toNumberOrNull(value);
  return num == null ? 'N/A' : `₹${num.toLocaleString('en-IN')}`;
};

const formatAgeRange = (min, max) => {
  const minAge = toNumberOrNull(min);
  const maxAge = toNumberOrNull(max);
  if (minAge == null && maxAge == null) return 'Any age';
  if (minAge == null) return `Up to ${maxAge} yrs`;
  if (maxAge == null) return `${minAge}+ yrs`;
  return `${minAge}–${maxAge} yrs`;
};

function SchemeFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ageFilter, setAgeFilter] = useState('');
  const [incomeFilter, setIncomeFilter] = useState('');

  const filteredSchemes = useMemo(() => {
    const schemes = Array.isArray(mockSchemes) ? mockSchemes : [];
    const query = searchQuery.trim().toLowerCase();
    const age = toNumberOrNull(ageFilter);
    const income = toNumberOrNull(incomeFilter);

    return schemes.filter((scheme) => {
      if (!scheme) return false;

      if (selectedCategory !== 'All' && scheme.category !== selectedCategory) {
        return false;
      }

      if (query) {
        const haystack = [
          toSafeString(scheme.title),
          toSafeString(scheme.description),
          toSafeString(scheme.eligibleBeneficiaries),
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      if (age != null) {
        const minAge = toNumberOrNull(scheme.minAge);
        const maxAge = toNumberOrNull(scheme.maxAge);
        if (minAge != null && age < minAge) return false;
        if (maxAge != null && age > maxAge) return false;
      }

      if (income != null) {
        const maxIncome = toNumberOrNull(scheme.maxIncome);
        if (maxIncome != null && income > maxIncome) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, ageFilter, incomeFilter]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setAgeFilter('');
    setIncomeFilter('');
  };

  return (
    <section aria-labelledby="scheme-finder-heading">
      <h2
        id="scheme-finder-heading"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--forest-green)',
          marginTop: 0,
        }}
      >
        <Users size={26} aria-hidden="true" />
        Scheme Finder
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
            placeholder="Search schemes, benefits or beneficiaries..."
            aria-label="Search schemes"
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

        <div className="eligibility-row">
          <label
            htmlFor="scheme-age-filter"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Calendar size={18} aria-hidden="true" />
            Age
          </label>
          <input
            id="scheme-age-filter"
            type="number"
            inputMode="numeric"
            min="0"
            className="filter-input"
            placeholder="Your age"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          />

          <label
            htmlFor="scheme-income-filter"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <IndianRupee size={18} aria-hidden="true" />
            Annual Income (₹)
          </label>
          <input
            id="scheme-income-filter"
            type="number"
            inputMode="numeric"
            min="0"
            className="filter-input"
            placeholder="Annual income"
            value={incomeFilter}
            onChange={(e) => setIncomeFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="cards-grid">
        {filteredSchemes.length === 0 ? (
          <div className="empty-state" role="status">
            <FilterX
              size={40}
              aria-hidden="true"
              style={{ marginBottom: '0.75rem', color: 'var(--earthy-brown-light)' }}
            />
            <p style={{ margin: '0 0 1rem' }}>
              No schemes match your search or eligibility filters.
            </p>
            <button type="button" className="filter-pill active" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSchemes.map((scheme, index) => (
            <article className="info-card" key={scheme.id ?? `scheme-${index}`}>
              <span className="card-badge">{toSafeString(scheme.category)}</span>

              <h3 className="card-title">{toSafeString(scheme.title)}</h3>

              <p className="card-desc">{toSafeString(scheme.description)}</p>

              {scheme.eligibleBeneficiaries && (
                <p
                  className="card-desc"
                  style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}
                >
                  <Users
                    size={18}
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      marginTop: '0.2rem',
                      color: 'var(--forest-green-light)',
                    }}
                  />
                  <span>{toSafeString(scheme.eligibleBeneficiaries)}</span>
                </p>
              )}

              <div className="card-meta">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={16} aria-hidden="true" />
                  {formatAgeRange(scheme.minAge, scheme.maxAge)}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IndianRupee size={16} aria-hidden="true" />
                  Income up to {formatRupees(scheme.maxIncome)}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default SchemeFinder;