import React from "react";

const errorContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#eef3fd",
};



const h1Style = {
  fontSize: "24px",
  marginBottom: "10px",
};

const pStyle = {
  fontSize: "16px",
  margin: "5px 0",
};

const ServerError500 = () => {
  return (
    <div style={errorContainerStyle}>
      <div>
        <h1 style={h1Style}>500 Internal Server Error</h1>
        <p style={pStyle}>Oops! Something went wrong on our end. Please try again later.</p>
      
      </div>
    </div>
  );
};

export default ServerError500;
