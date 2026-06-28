import React from 'react';
import UserRow from './UserRow';

export default function UserTable({
  users,
  loading,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete
}) {

  // Renders sorting indicators (up/down arrow)
  const renderSortIndicator = (field) => {
    if (sortField !== field) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="sort-icon-neutral">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      );
    }
    return sortOrder === "asc" ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="sort-icon-active">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="sort-icon-active">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    );
  };

  return (
    <div className="table-responsive-container">
      <table className="user-dashboard-table">
        <thead>
          <tr>
            {/* ID column: Sortable */}
            <th onClick={() => onSort("id")} className="sortable-header col-id">
              <div className="header-cell-content">
                <span>ID</span>
                {renderSortIndicator("id")}
              </div>
            </th>

            {/* Name column: Sortable */}
            <th onClick={() => onSort("firstName")} className="sortable-header col-name">
              <div className="header-cell-content">
                <span>Name</span>
                {renderSortIndicator("firstName")}
              </div>
            </th>

            {/* Email column: Sortable */}
            <th onClick={() => onSort("email")} className="sortable-header col-email">
              <div className="header-cell-content">
                <span>Email</span>
                {renderSortIndicator("email")}
              </div>
            </th>

            {/* Department column: Sortable */}
            <th onClick={() => onSort("department")} className="sortable-header col-department">
              <div className="header-cell-content">
                <span>Department</span>
                {renderSortIndicator("department")}
              </div>
            </th>

            {/* Actions column: Not Sortable */}
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {loading ? (
            // Render Skeleton Loader Rows
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="skeleton-row">
                <td className="col-id"><div className="skeleton skeleton-id"></div></td>
                <td className="col-name">
                  <div className="skeleton-profile-cell">
                    <div className="skeleton skeleton-avatar"></div>
                    <div className="skeleton-details-cell">
                      <div className="skeleton skeleton-text skeleton-title"></div>
                      <div className="skeleton skeleton-text skeleton-sub"></div>
                    </div>
                  </div>
                </td>
                <td className="col-email"><div className="skeleton skeleton-text skeleton-email"></div></td>
                <td className="col-department"><div className="skeleton skeleton-badge"></div></td>
                <td className="col-actions">
                  <div className="skeleton-actions-cell">
                    <div className="skeleton skeleton-action-btn"></div>
                    <div className="skeleton skeleton-action-btn"></div>
                  </div>
                </td>
              </tr>
            ))
          ) : users.length > 0 ? (
            // Render Actual Rows
            users.map(user => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            // Render Empty State Row
            <tr>
              <td colSpan="5">
                <div className="empty-state-card">
                  <div className="empty-state-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="search-empty-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <h3>No Cohorts Found</h3>
                  <p>We couldn't find any users matching your query or filter criteria. Try resetting your search parameters or adding a new user.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
