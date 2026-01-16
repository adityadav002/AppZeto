import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setUsers(res.data);
      } catch (error) {
        toast.error("Failed to load users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await axios.delete(
      `http://localhost:3000/api/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    // remove user from UI
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userId)
    );

    toast.success("User deleted successfully");
  } catch (error) {
    toast.error("Failed to delete user");
    console.error(error);
  }
};


  if (loading)
    return (
      <h3 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading users...
      </h3>
    );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        All Users
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={noDataStyle}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}><button onClick={() => handleDelete(user._id)}>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const noDataStyle = {
  textAlign: "center",
  padding: "20px",
  border: "1px solid #ddd",
};

export default UserList;
