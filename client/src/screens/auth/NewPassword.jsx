import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import NewPasswordClass from "../../services/auth/userAuth/NewPassword";
import logo from "../../assest/new-logo.png";

function NewPassword() {
  useEffect(() => {
    document.title = "New Password";
  }, []);

  const { id, token } = useParams(); // Get id and jwt token as parameters from the URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the visibility of the password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle the password reset form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMsg(""); // Reset Message Box

    // Check if the entered passwords match
    if (newPassword !== confirmPassword) {
      setMsg("Invalid: Passwords do not match");
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setMsg(
        "Invalid: Password must contain at least 8 characters, including uppercase and lowercase letters, and a number"
      );
      return;
    }

    setLoading(true); // Start loading spinner
    const response = await NewPasswordClass.resetPassword(
      id,
      token,
      newPassword,
      confirmPassword
    ); // Call API in UserAuth/NewPassword.js

    // Check if password reset request was successful or failed
    if (response && response.status === "failed") {
      setStatus(false); // Set status to false for the error message color change to red
    } else {
      if (response) {
        setStatus(true); // Set status to true for the success message color change to green
        setTimeout(() => {
          navigate("/signin"); // Redirect to the signin page after 3 seconds
        }, 3000);
      }
    }

    // Display the message and stop the loading spinner after a delay
    setTimeout(() => {
      setLoading(false);
      setMsg(response.message);
    }, 1000);
  };

  return (
    // Main Container
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#eef3fd", height: " 100vh " }}
    >
      {/* Box */}
      <div className="col-lg-4 col-md-4 rounded bg-white shadow-md px-2 ">
        <div className="p-3 text-center">
          {/* Box Header with Logo and Heading */}
          <img src={logo} width={150} alt="Go-split-logo" />
          <h3 className="text-center">New Password</h3>

          {/* Error or Message Alert Box */}
          {msg && (
            <div
              className={status ? "alert alert-success" : "alert alert-danger"}
              role="alert"
            >
              {msg}
            </div>
          )}

          {/* Form */}
          <form className="mt-4">
            <div className="row">
              {/* Password Field with Eye Icon */}
              <div className="col-lg-12">
                <div className="form-group mb-3 position-relative">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  <span
                    className="input-group-text"
                    onClick={handleTogglePassword}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      border: "none",
                      position: "absolute",
                      right: "5px",
                      top: "10%",
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash style={{ color: "#A9A9A9" }} />
                    ) : (
                      <FaEye style={{ color: "#A9A9A9" }} />
                    )}
                  </span>
                </div>
              </div>

              {/* Confirm Password Field with Eye Icon */}
              <div className="col-lg-12">
                <div className="form-group mb-3 position-relative">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <span
                    className="input-group-text"
                    onClick={handleTogglePassword}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      border: "none",
                      position: "absolute",
                      right: "5px",
                      top: "10%",
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash style={{ color: "#A9A9A9" }} />
                    ) : (
                      <FaEye style={{ color: "#A9A9A9" }} />
                    )}
                  </span>
                </div>
              </div>

              {/* Change Password Button */}
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn w-100 btn-primary"
                  onClick={handleSubmit}
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default NewPassword;
