import { DEPARTMENTS } from './constants';

/**
 * Splits a full name string into first name and last name.
 * Splits by the first space.
 */
export const splitFullName = (fullName = "") => {
  if (!fullName) return { firstName: "", lastName: "" };
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
};

/**
 * Assigns a department deterministically based on ID or index
 * to make the initial user list look realistic.
 */
export const assignDepartment = (id) => {
  const index = (id - 1) % DEPARTMENTS.length;
  return DEPARTMENTS[index] || DEPARTMENTS[0];
};

/**
 * Gets initials from first name and last name.
 */
export const getInitials = (firstName = "", lastName = "") => {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}` || "?";
};

/**
 * Generates a consistent visual color theme based on name hash.
 */
export const getAvatarColorClass = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % 6;
  const colors = [
    "avatar-blue",
    "avatar-purple",
    "avatar-emerald",
    "avatar-orange",
    "avatar-rose",
    "avatar-amber"
  ];
  return colors[index];
};
