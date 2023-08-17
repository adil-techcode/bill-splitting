import React from "react";

const errorContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#eef3fd",
};

const errorContentStyle = {
  textAlign: "center",
};

const h1Style = {
  fontSize: "24px",
  marginBottom: "10px",
};

const pStyle = {
  fontSize: "16px",
  margin: "5px 0",
};

const ErrorEmailTimeoutPage = () => {
  return (
    <div style={errorContainerStyle}>
      <div style={errorContentStyle}>
        <h1 style={h1Style}>Email Link Expired</h1>
        <p style={pStyle}>Oops! The password reset link has expired.</p>
        <p style={pStyle}>Please request a new link to reset your password.</p>
      </div>
    </div>
  );
};

export default ErrorEmailTimeoutPage;
