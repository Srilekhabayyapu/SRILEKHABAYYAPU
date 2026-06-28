import axios from 'axios';
import { API_URL } from '../utils/constants';

/**
 * Fetch all users from JSONPlaceholder.
 */
export const getUsers = () => {
  return axios.get(API_URL);
};

/**
 * Create a new user (mock post).
 * Returns status 201 with the created object on success.
 */
export const createUser = (userData) => {
  return axios.post(API_URL, userData);
};

/**
 * Update an existing user details (mock put).
 * Returns status 200 with the updated object on success.
 */
export const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

/**
 * Delete a user (mock delete).
 * Returns status 200 on success.
 */
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
