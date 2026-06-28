import React from 'react';
import { getInitials, getAvatarColorClass } from '../utils/helpers';

export default function UserRow({ user, onEdit, onDelete }) {
  const initials = getInitials(user.firstName, user.lastName);
  const avatarColorClass = getAvatarColorClass(`${user.firstName} ${user.lastName}`);
  
  // Clean department class mapping for background/text color varieties
  const getDeptBadgeClass = (dept = "") => {
    const formatted = dept.toLowerCase().replace(/\s+/g, '-');
    return `dept-badge dept-${formatted}`;
  };

  return (
    <tr className="user-row-tr">
      {/* User ID */}
      <td className="col-id">
        <span className="user-id-badge">#{user.id}</span>
      </td>

      {/* User Avatar + Full Name */}
      <td className="col-name">
        <div className="user-profile-cell">
          <div className={`user-avatar ${avatarColorClass}`}>
            {initials}
          </div>
          <div className="user-details">
            <span className="user-fullname">{user.firstName} {user.lastName}</span>
            <span className="user-username-sub">@{user.firstName.toLowerCase()}</span>
          </div>
        </div>
      </td>

      {/* User Email */}
      <td className="col-email">
        <a href={`mailto:${user.email}`} className="user-email-link" title={`Send email to ${user.email}`}>
          {user.email}
        </a>
      </td>

      {/* User Department */}
      <td className="col-department">
        <span className={getDeptBadgeClass(user.department)}>
          {user.department}
        </span>
      </td>

      {/* User Actions */}
      <td className="col-actions">
        <div className="action-buttons-group">
          {/* Edit Trigger */}
          <button
            onClick={() => onEdit(user)}
            className="action-btn edit-btn"
            title={`Edit details of ${user.firstName}`}
            aria-label={`Edit ${user.firstName} ${user.lastName}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="action-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>

          {/* Delete Trigger */}
          <button
            onClick={() => onDelete(user)}
            className="action-btn delete-btn"
            title={`Delete ${user.firstName}`}
            aria-label={`Delete ${user.firstName} ${user.lastName}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="action-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9 9m9.768-1.567-.702 12.012a2.25 2.25 0 0 1-2.247 2.118H7.758a2.25 2.25 0 0 1-2.247-2.118L4.72 7.433m13.717-1.565A48.245 48.245 0 0 0 14.25 6h-4.5a48.245 48.245 0 0 0-3.483.472M21 7.5c-3.733-.5-7.567-.702-11.5-.702s-7.767.202-11.5.702" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
