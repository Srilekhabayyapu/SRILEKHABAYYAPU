import React from 'react';

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange
}) {
  const pageSizes = [5, 10, 25, 50];

  const startRecord = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array to display (e.g. [1, 2, 3])
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-wrapper">
      {/* Page Size Selector */}
      <div className="pagination-size-selector">
        <label htmlFor="pageSize-select">Rows per page:</label>
        <select
          id="pageSize-select"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1); // reset to page 1 on resize
          }}
          className="page-size-select"
        >
          {pageSizes.map(size => (
            <option key={size} value={size}>
              {size} rows
            </option>
          ))}
        </select>
        <span className="pagination-total-records">
          Showing <strong>{startRecord}</strong> - <strong>{endRecord}</strong> of <strong>{totalItems}</strong> entries
        </span>
      </div>

      {/* Page Navigation */}
      <div className="pagination-navigation">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-pagination pagination-prev"
          aria-label="Previous Page"
          title="Previous Page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Page Buttons */}
        <div className="pagination-pages-list">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`btn-pagination pagination-num ${currentPage === number ? 'active' : ''}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-pagination pagination-next"
          aria-label="Next Page"
          title="Next Page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
