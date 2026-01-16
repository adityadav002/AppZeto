/** @format */

import React, { useState } from "react";
import "../Style/FormStyle.css";
import { useDispatch } from "react-redux";
import { signup } from "../store/AuthSLice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PasswordToggle from "./features/PasswordToggle.jsx";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const result = await dispatch(signup({ name, email, password }));

    if (signup.fulfilled.match(result)) {
      toast.success("Signup successful!");
      navigate("/user/dashboard");
    } else {
      toast.error("Something went wrong!");
    }

    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <form className="form">
        <h1 className="form_title">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          className="form_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          type="email"
          placeholder="Email"
          className="form_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <PasswordToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="form_button"
          type="submit"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
      </form>
    </>
  );
}

export default Signup;
