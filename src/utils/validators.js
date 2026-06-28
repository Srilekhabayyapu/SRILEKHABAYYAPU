/**
 * Validates the user form inputs.
 * Returns an object with keys matching input fields and values containing error messages.
 */
export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address (e.g. name@example.com)";
  }

  if (!formData.department) {
    errors.department = "Department is required";
  }

  return errors;
};
