// frontend/src/pages/UserManagement.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      setError("Error fetching users");
    }
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      {error && <div className="error">{error}</div>}
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.isAdmin ? "Admin" : "User"}</p>
            <p>Borrowed Books: {user.borrowedBooks.length}</p>
            <div className="actions">
              {/* Add buttons for further actions like edit, delete */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
