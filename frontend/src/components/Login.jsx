/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSLice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordToggle from "./features/PasswordToggle.jsx";

function Login() {
  const [lemail, setLEmail] = useState("");
  const [lpassword, setLPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      login({ email: lemail, password: lpassword })
    );

    if (login.fulfilled.match(result)) {
      toast.success("Login successful!");

      const role = result.payload.user.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      toast.error("Something went wrong!");
    }

    setLEmail("");
    setLPassword("");
  };

  return (
    <>
      <form className="form">
        <h1 className="form_title">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="form_input"
          value={lemail}
          onChange={(e) => setLEmail(e.target.value)}
          autoComplete="email"
        />
        <PasswordToggle
          value={lpassword}
          onChange={(e) => setLPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="form_button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
