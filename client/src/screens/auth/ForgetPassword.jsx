import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assest/new-logo.png";

import ForgetPass from "../../services/auth/userAuth/ForgetPassword";

import Loader from "../../components/loader";

function ForgetPassword() {
  // Title
  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); // Start loading spinner
    const response = await ForgetPass.forgetPassword(email); // Call forget password API in userService class

    // Check if the password reset request was successful or failed
    if (response && response.status === "failed") {
      setStatus(false); // Set status to false for the error message color change to red
    } else {
      if (response) {
        setStatus(true); // Set status to true for the success message color change to green
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
          <h3 className="text-center">Forget Password</h3>

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
            <div className="row mt-2 ">
              {/* Email Address Field */}
              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* Forget Password Button */}
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn w-100 btn-primary"
                  onClick={handleSubmit}
                >
                  Forget Password
                </button>
              </div>

              {/* Back to Login Button */}
              <div className="col-12 text-center  mt-2  ">
                <button
                  type="submit"
                  className="btn w-100 btn-outline-primary"
                  onClick={() => navigate("/signin")}
                >
                  Back To Login
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

export default ForgetPassword;
