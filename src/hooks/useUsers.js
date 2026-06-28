import { useState, useEffect, useMemo } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { splitFullName, assignDepartment } from '../utils/helpers';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter state
  const [filterParams, setFilterParams] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });
  
  // Sorting state
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Fetch initial user list
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getUsers()
      .then(response => {
        if (!isMounted) return;
        const mappedUsers = response.data.map(user => {
          const { firstName, lastName } = splitFullName(user.name);
          return {
            id: user.id,
            firstName,
            lastName,
            email: user.email,
            department: assignDepartment(user.id)
          };
        });
        setUsers(mappedUsers);
        setError(null);
      })
      .catch(err => {
        if (!isMounted) return;
        console.error("API error loading users:", err);
        setError("Failed to retrieve users. Please check your network connection and try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter & Search Logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // 1. Search Query checking (First Name, Last Name, Email)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        user.firstName.toLowerCase().includes(q) ||
        user.lastName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // 2. Filter Parameters checking
      const fName = filterParams.firstName.toLowerCase().trim();
      const lName = filterParams.lastName.toLowerCase().trim();
      const emailVal = filterParams.email.toLowerCase().trim();
      const dept = filterParams.department;

      if (fName && !user.firstName.toLowerCase().includes(fName)) return false;
      if (lName && !user.lastName.toLowerCase().includes(lName)) return false;
      if (emailVal && !user.email.toLowerCase().includes(emailVal)) return false;
      if (dept && user.department !== dept) return false;

      return true;
    });
  }, [users, searchQuery, filterParams]);

  // Sorting Logic
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      // Convert to string safely for comparison
      if (valueA === undefined || valueA === null) valueA = "";
      if (valueB === undefined || valueB === null) valueB = "";
      
      const strA = valueA.toString().toLowerCase();
      const strB = valueB.toString().toLowerCase();

      // If comparing numerical IDs
      if (sortField === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      }

      return sortOrder === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }, [filteredUsers, sortField, sortOrder]);

  // Pagination bounds checking and math
  const totalItems = sortedUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Reset page to 1 if page index exceeds total pages (e.g. after search/filtering narrows results)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = useMemo(() => {
    return sortedUsers.slice(startIndex, startIndex + pageSize);
  }, [sortedUsers, startIndex, pageSize]);

  // Operations
  const handleAddUser = async (newUserData) => {
    try {
      setError(null);
      // Construct a new ID. Since mock doesn't persist, we increment based on max existing ID.
      const maxId = users.reduce((max, u) => u.id > max ? u.id : max, 0);
      const generatedId = maxId + 1;
      
      const userPayload = {
        name: `${newUserData.firstName} ${newUserData.lastName}`,
        email: newUserData.email,
        // JSONPlaceholder expects certain properties
      };

      const response = await createUser(userPayload);
      
      // JSONPlaceholder usually returns id: 11 for any POST.
      // We will override with generatedId so our local list has unique keys.
      const addedUser = {
        id: generatedId,
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        email: newUserData.email,
        department: newUserData.department
      };

      // Add new user to the top of list
      setUsers(prev => [addedUser, ...prev]);
      return true;
    } catch (err) {
      console.error("Failed to add user:", err);
      setError("Failed to add user. Server returned an error.");
      return false;
    }
  };

  const handleEditUser = async (id, updatedUserData) => {
    try {
      setError(null);
      const userPayload = {
        id,
        name: `${updatedUserData.firstName} ${updatedUserData.lastName}`,
        email: updatedUserData.email,
      };

      await updateUser(id, userPayload);

      // Update local state
      setUsers(prev => prev.map(u => u.id === id ? {
        ...u,
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
        email: updatedUserData.email,
        department: updatedUserData.department
      } : u));
      return true;
    } catch (err) {
      console.error("Failed to edit user:", err);
      setError(`Failed to update user details. Server connection failed.`);
      return false;
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setError(null);
      await deleteUser(id);
      
      // Filter out user in local state
      setUsers(prev => prev.filter(u => u.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to complete delete request. Please try again.");
      return false;
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return {
    users: paginatedUsers,
    allUsersCount: users.length,
    filteredCount: totalItems,
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
  };
}
