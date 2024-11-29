import React from "react";
import { useGetUsersQuery } from "../../services/usersApi";
import "./UsersTable.css";
import UserData from "../../models";

const UsersTable = () => {
  const { data, error, isLoading } = useGetUsersQuery({ limit: 20, page: 1 });

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
          {data?.map((user: UserData) => (
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
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
