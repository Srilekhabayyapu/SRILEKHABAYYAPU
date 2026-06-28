import React from 'react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onFilterClick,
  activeFiltersCount,
  onClearAllFilters,
  hasFiltersApplied
}) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="search-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by first name, last name, email..."
          className="search-input"
          aria-label="Search users"
        />
        {searchQuery && (
          <button 
            type="button" 
            onClick={() => onSearchChange("")} 
            className="clear-search-btn"
            title="Clear search query"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="clear-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="search-actions">
        {/* Toggle Filters Popup */}
        <button
          type="button"
          onClick={onFilterClick}
          className={`btn btn-secondary filter-toggle-btn ${activeFiltersCount > 0 ? 'active' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="btn-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="badge badge-accent filter-count">{activeFiltersCount}</span>
          )}
        </button>

        {/* Clear All Filters Option */}
        {hasFiltersApplied && (
          <button
            type="button"
            onClick={onClearAllFilters}
            className="btn-text clear-filters-btn"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
