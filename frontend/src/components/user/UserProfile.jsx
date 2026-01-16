/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setUser(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading profile...</h3>;

  if (!user) return <h3 style={{ textAlign: "center" }}>No user data found</h3>;

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fa",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px 40px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          minWidth: "320px",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          User Profile
        </h2>

        <p style={{ marginBottom: "10px" }}>
          <strong>Name:</strong> {user.name}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>Email:</strong> {user.email}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>Role:</strong> {user.role}
        </p>
        <p style={{ marginBottom: "0" }}>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
