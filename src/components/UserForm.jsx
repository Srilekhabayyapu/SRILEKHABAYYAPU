import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../utils/constants';
import { validateForm } from '../utils/validators';

export default function UserForm({ isOpen, onClose, user, onSubmit }) {
  const isEditMode = !!user;

  // Form input states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  // Validation error states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Sync form inputs when user changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          department: user.department || ""
        });
      } else {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          department: DEPARTMENTS[0] // default option
        });
      }
      setErrors({});
      setSubmitError("");
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-level error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate inputs
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Submit payload
    setIsSubmitting(true);
    const success = await onSubmit(formData);
    setIsSubmitting(false);

    if (success) {
      onClose();
    } else {
      setSubmitError("Failed to save user. Please check your inputs and network connection.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-medium" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="header-icon-badge">
            {isEditMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="modal-header-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="modal-header-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6 6 0 0 1 6-6h.75a6 6 0 0 1 6 6v.115m-12.75 0h13.5" />
              </svg>
            )}
          </div>
          <div>
            <h2>{isEditMode ? "Update User Details" : "Create New User"}</h2>
            <p className="modal-subtitle">
              {isEditMode ? `Modifying settings for user ID #${user.id}` : "Provide details below to provision a new user."}
            </p>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="modal-close-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-form">
          {submitError && (
            <div className="form-alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="alert-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <span>{submitError}</span>
            </div>
          )}

          <div className="form-fields-container">
            {/* First Name Field */}
            <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
              <label htmlFor="firstName" className="required-label">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="form-control"
                disabled={isSubmitting}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && (
                <span id="firstName-error" className="error-message">
                  {errors.firstName}
                </span>
              )}
            </div>

            {/* Last Name Field */}
            <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
              <label htmlFor="lastName" className="required-label">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="form-control"
                disabled={isSubmitting}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              {errors.lastName && (
                <span id="lastName-error" className="error-message">
                  {errors.lastName}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email" className="required-label">Email Address</label>
              <input
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. employee@company.com"
                className="form-control"
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Department Field */}
            <div className={`form-group ${errors.department ? 'has-error' : ''}`}>
              <label htmlFor="department" className="required-label">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-control select-control"
                disabled={isSubmitting}
                aria-invalid={!!errors.department}
                aria-describedby={errors.department ? "department-error" : undefined}
              >
                <option value="" disabled>Select Department</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <span id="department-error" className="error-message">
                  {errors.department}
                </span>
              )}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Saving Changes...</span>
                </>
              ) : (
                <span>{isEditMode ? "Save Changes" : "Provision User"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
