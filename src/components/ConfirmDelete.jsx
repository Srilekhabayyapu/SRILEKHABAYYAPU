import React, { useState } from 'react';

export default function ConfirmDelete({ isOpen, onClose, user, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  if (!isOpen || !user) return null;

  const handleConfirm = async () => {
    setDeleteError("");
    setIsDeleting(true);
    const success = await onConfirm(user.id);
    setIsDeleting(false);

    if (success) {
      onClose();
    } else {
      setDeleteError("Could not delete user. Server connection failed.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-small" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="header-icon-badge danger-badge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="modal-header-icon text-danger">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <div>
            <h2>Confirm Deletion</h2>
            <p className="modal-subtitle">This action is irreversible and will remove access.</p>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="modal-close-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="modal-body">
          {deleteError && (
            <div className="form-alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="alert-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <span>{deleteError}</span>
            </div>
          )}
          
          <p className="confirm-text">
            Are you sure you want to delete user <strong>{user.firstName} {user.lastName}</strong> (ID #{user.id})?
          </p>
          <div className="user-summary-preview">
            <div className="preview-field">
              <span className="preview-label">Email:</span>
              <span className="preview-value">{user.email}</span>
            </div>
            <div className="preview-field">
              <span className="preview-label">Department:</span>
              <span className="preview-value">{user.department}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn btn-danger btn-submit"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="spinner"></span>
                <span>Deleting...</span>
              </>
            ) : (
              <span>Confirm Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
