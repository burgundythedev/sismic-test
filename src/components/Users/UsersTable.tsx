import { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../services/usersApi";
import UserData from "../../models";
import "./UsersTable.css";

import SearchBar from "../SearchBar/SearchBar";
import AddUserForm from "../Form/AddUserForm";
import FilterActive from "../FilterActiveUsers/FilterActive";

const UsersTable = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [showActiveOnly, setShowActiveOnly] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      let filtered = data.filter((user: UserData) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email.toLowerCase();
        return (
          fullName.includes(searchQuery.toLowerCase()) ||
          email.includes(searchQuery.toLowerCase())
        );
      });

      if (showActiveOnly) {
        filtered = filtered.filter((user: UserData) => user.isActive);
      }

      setFilteredUsers(filtered);
    }
  }, [searchQuery, data, showActiveOnly]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id.toString()).unwrap();
      refetch();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleAddUser = (newUser: UserData) => {
    console.log("Added user:", newUser);
    refetch();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="users-table-container">
      <h1 className="title">User List</h1>
      <div className="users-options-container">
        <AddUserForm onAddUser={handleAddUser} />
        <SearchBar onSearch={handleSearch} />
        <FilterActive
          showActiveOnly={showActiveOnly}
          onFilterChange={setShowActiveOnly}
        />
      </div>
      {error && <p className="error-message">Error: {error.toString()}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: UserData) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <span
                    className={`status-live ${
                      user.isActive ? "active" : "inactive"
                    }`}
                  ></span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="search-error">
              <td colSpan={6}>No users found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
