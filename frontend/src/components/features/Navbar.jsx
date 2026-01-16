/** @format */

import React from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/AuthSLice.js";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth, role } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="navbar_container">
      {/* LOGO → redirect based on role */}
      <Link
        to={
          role === "admin"
            ? "/admin/dashboard"
            : isAuth
            ? "/user/dashboard"
            : "/login"
        }
        className="navbar_logo"
      >
        MyAuth
      </Link>

      <div className="navbar_links">
        {isAuth ? (
          <>
            {/* USER LINKS */}
            {role === "user" && (
              <>
                <Link to="/user/dashboard" className="navbar navbar_home">
                  Dashboard
                </Link>
                <Link to="/user/profile" className="navbar navbar_profile">
                  Profile
                </Link>
              </>
            )}

            {/* ADMIN LINKS */}
            {role === "admin" && (
              <>
                <Link to="/admin/dashboard" className="navbar navbar_admin">
                  Admin Dashboard
                </Link>
                <Link to="/admin/users" className="navbar navbar_users">
                  Users
                </Link>
              </>
            )}

            <button className="navbar navbar_logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="navbar navbar_signup">
              Signup
            </Link>
            <Link to="/login" className="navbar navbar_login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
