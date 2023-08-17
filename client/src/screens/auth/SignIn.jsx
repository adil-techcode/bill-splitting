import React, { useState, useEffect } from "react";
import logo from "../../assest/new-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleBtn from "../../components/googleBtn";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxStore/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import LoginUser from "../../services/auth/userAuth/LoginUser";

function SignIn() {
  // State variables to store form input values and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);

  // State variable to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility on eye icon click
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate(); // Function For Navigate Components
  const dispatch = useDispatch(); // For Update Redux State

  // Fetch stored login email and password from localStorage on component mount
  useEffect(() => {
    document.title = "Sign in";
    const loginEmail = localStorage.getItem("loginEmail");
    const loginPassword = localStorage.getItem("loginPassword");
    console.log(loginEmail);
    console.log(loginPassword);
    if (loginEmail && loginPassword) {
      setEmail(loginEmail);
      setPassword(loginPassword);
    }
  }, []);

  // Function to handle form submission for user login
  const handleSignIn = (event) => {
    event.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg("Invalid Email: Email format is Incorrect");
      return;
    }

    // Check Length of Password
    if (password.length < 8) {
      setMsg("Invalid Password: Please Enter 8 Digit Password");
      return;
    }

    // If "Remember Me" is checked, store login credentials in localStorage
    if (rememberMeChecked) {
      console.log("Remember Me is checked");
      localStorage.setItem("loginEmail", email);
      localStorage.setItem("loginPassword", password);
    }

    login(); // Call the login function to initiate API call for user login
  };

  // Function to call the login API
  const login = async () => {
    setMsg(""); // Reset Message Box
    setLoading(true); // Start the loading spinner
    const response = await LoginUser.userLogin(email, password); // Call User Login API from  Services LoginUser Class

    // Check if the login request was successful or failed
    if (response && response.status === "success") {
      dispatch(setUser(response.user)); // Update the user state with the logged-in user's information
      localStorage.setItem("user", JSON.stringify(response.user)); // Store user information in localStorage

      setTimeout(() => {
        setLoading(false); // Stop the loading spinner
        if (response.user.role === "user") {
          navigate("/user/groups"); // Redirect to the user groups page for regular users
        } else {
          navigate("/admin/dashboard"); // Redirect to the admin page for admins
        }
      }, 1000);
    } else {
      if (response) {
        // Display the error message and stop the loading spinner after a delay
        setTimeout(() => {
          setLoading(false);
          setMsg(response.message);
        }, 1000);
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
          <h3 className=" text-center"> Sign-in </h3>

          {/*  Error or Message Alert Box */}
          {msg && (
            <div class="alert alert-danger" role="alert">
              {msg}
            </div>
          )}
          {/* Form */}
          <form className="mt-4">
            <div className="row">
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
                    defaultValue={email}
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
                    defaultValue={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
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

              {/* Login  Button  */}
              <div className="col-12 text-center  d-flex justify-content-between    ">
                {/* Remember Me Checkbox */}
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    onChange={(e) => {
                      setRememberMeChecked(e.target.checked);
                    }}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                {/* Forget Password Link */}
                <div>
                  <a href="http://localhost:3000/forget-password">
                    Forget Password?
                  </a>
                </div>
              </div>

              {/* Login  Button  */}
              <div className="col-12 text-center  mt-2   ">
                <button
                  type="submit"
                  className="btn w-100 btn-primary"
                  onClick={handleSignIn}
                >
                  Sign-in
                </button>
              </div>

              {/*  Signup Link  */}
              <div className="col-lg-12 text-center mt-1">
                Create a new account?
                <a href="http://localhost:3000/Signup" className="px-2">
                  Sign-up
                </a>
              </div>

              {/* Google login button */}
              <div className="col-lg-12  text-center mt-1">
                <p>or</p>
                <span onClick={googleAuth}>
                  <GoogleBtn label={"Sign-in with Google"} />{" "}
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

export default SignIn;
