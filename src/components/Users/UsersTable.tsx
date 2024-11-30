import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "../../services/usersApi";
import "./UsersTable.css";
import UserData from "../../models";
import SearchBar from "../SearchBar/SearchBar";
import FilterActive from "../FilterActiveUsers/FilterActive";


const UsersTable = () => {
  const { data, error, isLoading } = useGetUsersQuery({ limit: 20, page: 1 });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showActiveOnly, setShowActiveOnly] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((user: UserData) => {
        const matchesSearch =
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesActiveFilter = showActiveOnly ? user.isActive : true;

        return matchesSearch && matchesActiveFilter;
      });
      setFilteredUsers(filtered);
    }
  }, [searchQuery, showActiveOnly, data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (showActive: boolean) => {
    setShowActiveOnly(showActive);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    if ("message" in error) {
      return <p>Error: {error.message}</p>;
    }
    return <p>An error occurred</p>;
  }

  return (
    <div className="users-table-container">
      <h1 className="title">User List</h1>
      <div className="users-options-container">
        <SearchBar onSearch={handleSearch} />
        <FilterActive showActiveOnly={showActiveOnly} onFilterChange={handleFilterChange} />
      </div>
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
                    className={`status-live ${user.isActive ? "active" : "inactive"}`}
                  ></span>
                </td>
                <td>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="search-error">
              <td className="nousers" colSpan={6}>
                No users found! Write another name or email
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
