import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPopup from './components/FilterPopup';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';
import Pagination from './components/Pagination';
import useUsers from './hooks/useUsers';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Modal open states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // Load custom hook state
  const {
    users,
    allUsersCount,
    filteredCount,
    loading,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    filterParams,
    setFilterParams,
    sortField,
    sortOrder,
    toggleSort,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    handleAddUser,
    handleEditUser,
    handleDeleteUser
  } = useUsers();

  // Sync theme attribute with document body
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Triggered when user clicks Add User
  const handleOpenAddForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  // Triggered when user clicks Edit on a row
  const handleOpenEditForm = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  // Triggered when user clicks Delete on a row
  const handleOpenDeleteConfirm = (user) => {
    setDeletingUser(user);
  };

  // Submits form for either Add or Edit mode
  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      // Edit Mode
      return await handleEditUser(editingUser.id, formData);
    } else {
      // Add Mode
      return await handleAddUser(formData);
    }
  };

  // Confirms delete sequence
  const handleConfirmDelete = async (id) => {
    return await handleDeleteUser(id);
  };

  // Helper checks for search controls
  const activeFiltersCount = Object.values(filterParams).filter(val => val !== "").length;
  const hasFiltersApplied = activeFiltersCount > 0 || searchQuery !== "";

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setFilterParams({
      firstName: "",
      lastName: "",
      email: "",
      department: ""
    });
  };

  const handleApplyFilterPopup = (params) => {
    setFilterParams(params);
    setCurrentPage(1); // Reset page on filter application
  };

  const handleResetFilterPopup = () => {
    setFilterParams({
      firstName: "",
      lastName: "",
      email: "",
      department: ""
    });
  };

  return (
    <div className="app-container">
      {/* Top Header Logo branding & actions */}
      <Header 
        onAddClick={handleOpenAddForm}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(prev => !prev)}
      />

      {/* System Warning Banners */}
      {error && (
        <div className="system-alert-overlay">
          <div className="alert-content-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="alert-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{error}</span>
          </div>
          <button 
            onClick={() => setError(null)} 
            className="btn-close-alert" 
            title="Dismiss warning"
            aria-label="Close error message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="clear-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Search and Advanced Filter triggers */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1); // Reset page to 1 on search
        }}
        onFilterClick={() => setIsFilterOpen(true)}
        activeFiltersCount={activeFiltersCount}
        onClearAllFilters={handleClearAllFilters}
        hasFiltersApplied={hasFiltersApplied}
      />

      {/* Popovers for advanced filters */}
      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterParams={filterParams}
        onApplyFilters={handleApplyFilterPopup}
        onResetFilters={handleResetFilterPopup}
      />

      {/* Main relational table grid */}
      <UserTable
        users={users}
        loading={loading}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={toggleSort}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteConfirm}
      />

      {/* Table Pagination footer bar */}
      {!loading && filteredCount > 0 && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={filteredCount}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}

      {/* Overlay dialog for Adding / Editing Users */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        user={editingUser}
        onSubmit={handleFormSubmit}
      />

      {/* Overlay dialog to confirm user deletion */}
      <ConfirmDelete
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        user={deletingUser}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
