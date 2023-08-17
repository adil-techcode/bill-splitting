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

const buttonStyle = {
  marginTop: "20px",
};

const Error401Page = () => {
  return (
    <div style={errorContainerStyle}>
      <div style={errorContentStyle}>
        <h1 style={h1Style}>401 Unauthorized</h1>
        <p style={pStyle}>Oops! You don't have permission to access this resource.</p>
        <p style={pStyle}>Please log in or check your credentials.</p>
        <div style={buttonStyle}>
          <button className="btn btn-primary mx-2"> <a  className="text-decoration-none text-white " href={`${process.env.REACT_APP_MAIN_URL}/signin`}>  Sign In  </a>  </button>
          <button className="btn btn-secondary"> <a  className="text-decoration-none text-white  " href={`${process.env.REACT_APP_MAIN_URL}/signup`}>  Sign Up   </a>   </button>
        </div>
      </div>
    </div>
  );
};

export default Error401Page;
