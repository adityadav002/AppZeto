/** @format */

import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

function PasswordToggle({ value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        style={{ paddingRight: "2rem", width: "100%" }}
        className="form_input"
        autoComplete="current-password"
      />
      <span
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          right: "20px",
          top: "25%",
          fontSize: "1.5rem",
          cursor: "pointer",
          userSelect: "none",
          color: "#ffffff",
        }}>
        {showPassword ? <BiShow /> : <BiHide />}
      </span>
    </div>
  );
}

export default PasswordToggle;
