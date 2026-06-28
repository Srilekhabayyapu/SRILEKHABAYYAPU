import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../utils/constants';

export default function FilterPopup({
  isOpen,
  onClose,
  filterParams,
  onApplyFilters,
  onResetFilters
}) {
  const [localParams, setLocalParams] = useState({ ...filterParams });

  // Sync state with parent state when popup opens
  useEffect(() => {
    if (isOpen) {
      setLocalParams({ ...filterParams });
    }
  }, [isOpen, filterParams]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApplyFilters(localParams);
    onClose();
  };

  const handleReset = () => {
    const emptyParams = {
      firstName: "",
      lastName: "",
      email: "",
      department: ""
    };
    setLocalParams(emptyParams);
    onResetFilters();
    onClose();
  };

  return (
    <div className="filter-popup-overlay" onClick={onClose}>
      <div className="filter-popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="filter-popup-header">
          <h3>Advanced Filter Cohorts</h3>
          <button type="button" onClick={onClose} className="close-popup-btn" aria-label="Close filter options">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="popup-close-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleApply} className="filter-popup-form">
          <div className="form-group-grid">
            {/* First Name Filter */}
            <div className="form-field">
              <label htmlFor="filter-firstName">First Name</label>
              <input
                id="filter-firstName"
                type="text"
                name="firstName"
                value={localParams.firstName}
                onChange={handleChange}
                placeholder="e.g. Leanne"
                className="filter-input"
              />
            </div>

            {/* Last Name Filter */}
            <div className="form-field">
              <label htmlFor="filter-lastName">Last Name</label>
              <input
                id="filter-lastName"
                type="text"
                name="lastName"
                value={localParams.lastName}
                onChange={handleChange}
                placeholder="e.g. Graham"
                className="filter-input"
              />
            </div>

            {/* Email Filter */}
            <div className="form-field">
              <label htmlFor="filter-email">Email Domain/Text</label>
              <input
                id="filter-email"
                type="text"
                name="email"
                value={localParams.email}
                onChange={handleChange}
                placeholder="e.g. .biz or gmail"
                className="filter-input"
              />
            </div>

            {/* Department Filter */}
            <div className="form-field">
              <label htmlFor="filter-department">Department</label>
              <select
                id="filter-department"
                name="department"
                value={localParams.department}
                onChange={handleChange}
                className="filter-select"
              >
                <option value="">All Departments</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-popup-footer">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary btn-popup-reset"
            >
              Clear Filters
            </button>
            <div className="footer-actions-right">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-text"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Apply Criteria
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
