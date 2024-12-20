import React, { useState } from "react";
import { useCreateUserMutation } from "../../services/usersApi";
import "./AddUserForm.css";
import { UserData } from "../../models";

interface AddUserFormProps {
  onAddUser: (user: UserData) => void;
}

function AddUserForm({ onAddUser }: AddUserFormProps) {
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    age: 18,
    isActive: Math.random() < 0.5,
    id: Date.now(),
  });

  const [error, setError] = useState<string | null>(null);
  const [createUser, { isLoading, error: apiError }] = useCreateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, age } = formData;

    if (!firstName || !lastName || !email) {
      setError("All fields are required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (age < 18 || age > 100) {
      setError("Age must be between 18 and 100.");
      return;
    }

    setError(null);

    try {
      const newUser = await createUser(formData).unwrap();
      onAddUser(newUser);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: 18,
        id: Date.now(),
        isActive: Math.random() < 0.5,
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="add-user-form">
      {error && <p className="error-message">{error}</p>}
      {apiError && (
        <p className="error-message">Error: {apiError.toString()}</p>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min={18}
            max={100}
            required
          />
        </div>
        <div className="form-group">
          <p className="title-button">Add Users</p>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Adding User..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
