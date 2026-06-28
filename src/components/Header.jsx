import React from 'react';

export default function Header({ onAddClick, darkMode, onThemeToggle }) {
  return (
    <header className="dashboard-header">
      <div className="header-logo-section">
        <div className="logo-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="logo-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 10.089 20c-2.296 0-4.443-.68-6.242-1.848a3.89 3.89 0 0 1 3.296-6.143M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 20a7.5 7.5 0 0 1 7.5-7.5V13a6.75 6.75 0 1 0-6.75-6.75" />
          </svg>
        </div>
        <div className="header-titles">
          <h1>AuraUser</h1>
          <p className="subtitle">Enterprise User Management & Cohort Control</p>
        </div>
      </div>

      <div className="header-controls">
        {/* Dark/Light Mode Switch */}
        <button 
          onClick={onThemeToggle} 
          className="theme-toggle-btn"
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            // Sun Icon for Dark Mode (click to go light)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="control-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42l1.58 1.58M3 12h2.25m13.5 0H21M4.22 19.78l1.58-1.58M18.18 5.82l1.58-1.58M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
            </svg>
          ) : (
            // Moon Icon for Light Mode (click to go dark)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="control-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>

        {/* Add User Button */}
        <button className="btn btn-primary btn-add-user" onClick={onAddClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="btn-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add User</span>
        </button>
      </div>
    </header>
  );
}
