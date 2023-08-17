import React, { useState, useEffect } from "react";
import logo from "../../assest/new-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleBtn from "../../components/googleBtn";
import Loader from "../../components/loader";
import RegisterUser from "../../services/auth/userAuth/RegisterUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxStore/userSlice";

function SignUp() {
  useEffect(() => {
    document.title = "Signup";
  }, []);

  // State variables to store form input values and loading status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // State variable to display error messages to the user
  const [msg, setMsg] = useState("");

  // State variable to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to toggle password visibility on eye icon click
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any of the required fields are missing
    if (!name || !email || !password || !confirmPassword) {
      setMsg("All Fields are Required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg("Invalid Email format");
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMsg(
        "Password must contain at least 8 characters, including uppercase and lowercase letters, and a number"
      );
      return;
    }

    // Check if password and confirm_password match
    if (password !== confirmPassword) {
      setMsg("Password and Confirm Password do not match");
      return;
    }

    // Form data is valid, proceed with user registration
    setMsg(""); // Reset message box
    setLoading(true); // Show loading spinner
    const response = await RegisterUser.userRegistration(
      name,
      email,
      password,
      confirmPassword
    );

    if (response && response.status === "failed") {
      // Registration failed, display error message
      setTimeout(() => {
        setLoading(false); // Hide loading spinner
        setMsg(response.message);
      }, 1000);
    } else {
      if (response) {
        // Registration success, update user state and redirect after 3 seconds
        dispatch(setUser(response.user));
        localStorage.setItem("user", JSON.stringify(response.user));
        setTimeout(() => {
          setLoading(false); // Hide loading spinner
          navigate("/user/groups"); // Redirect to user groups page
        }, 3000);
      }
    }
  };

  // Function to handle Google authentication
  const googleAuth = (event) => {
    event.preventDefault();
    // Redirect the user to the Google authentication URL
    window.open(`http://localhost:8080/auth/google`, "_self");
  };

  return (
    // Main Container
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#eef3fd", height: " 100vh " }}
    >
      {/*  Login Box */}
      <div className="col-lg-4 col-md-4 rounded bg-white shadow-md px-2 ">
        <div className="p-3 text-center">
          {/* Login Box Header  with Logo and Heading */}
          <img src={logo} width={150} alt="Go-split-logo" />
          <h3 className=" text-center">Sign-up</h3>

          {/*  Error or Message Alert Box */}
          {msg && (
            <div class="alert alert-danger" role="alert">
              {msg}
            </div>
          )}

          {/* Form */}
          <form className="mt-4">
            <div className="row">
              {/* Name Field */}
              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

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
                    required
                  />
                </div>
              </div>

              {/* Password Field with Eye Icon */}
              <div className="col-lg-12">
                <div className="form-group mb-3 position-relative">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
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

              {/* Confirm  Password Field with Eye Icon */}
              <div className="col-lg-12">
                <div className="form-group mb-3 position-relative">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    placeholder=" Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    required
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
              <div className="text-start my-2">
                <label>
                  <input
                    type="checkbox"
                    name="agree_to_terms"
                    className="mx-1"
                    required
                  />
                  I agree to the{" "}
                  <a href="/terms-and-conditions" target="_blank">
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>

              {/* Sign Up Button  */}
              <div className="col-12 text-center    ">
                <button
                  type="submit"
                  className="btn w-100 btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>

              {/*  Sign in Link  */}
              <div className="col-lg-12 text-center mt-1">
                Already have an account?
                <a href="http://localhost:3000/signin" className="px-2">
                  Sign-in
                </a>
              </div>

              {/* Google sigup button */}
              <div className="col-lg-12  text-center mt-1">
                <p>or</p>
                <span onClick={googleAuth}>
                  <GoogleBtn label={"Sign-up with Google"} />{" "}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default SignUp;
