import { useMemo } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../services/usersApi";
import "./UsersTable.css";
import SearchBar from "../SearchBar/SearchBar";
import AddUserForm from "../Form/AddUserForm";
import FilterActive from "../FilterActiveUsers/FilterActive";
import { UserData } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { toggleShowActiveOnly } from "../../Store/usersSlice";

const UsersTable = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const searchQuery = useSelector(
    (state: RootState) => state.users.searchQuery
  );
  const showActiveOnly = useSelector(
    (state: RootState) => state.users.showActiveOnly
  );

  const dispatch = useDispatch();

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    const query = searchQuery.toLowerCase();

    return data.filter((user: UserData) => {
      if (showActiveOnly && !user.isActive) return false;
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    });
  }, [data, searchQuery, showActiveOnly]);

  const handleFilterChange = () => {
    dispatch(toggleShowActiveOnly());
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id.toString()).unwrap();
      refetch();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="users-table-container">
      <div className="users-options-container">
        <AddUserForm
          onAddUser={() => {
            refetch();
          }}
        />
        <SearchBar />
        <FilterActive
          showActiveOnly={showActiveOnly}
          onFilterChange={handleFilterChange}
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
