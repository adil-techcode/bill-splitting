// The Googleauthredirect component handles the Google OAuth redirect flow after a successful login.
//  It displays a loading message while the user's authentication status is being checked,
// and then redirects the user to the appropriate dashboard based on their role.

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reduxStore/userSlice";
import GoogleAuth from "../services/auth/googleAuth/GoogleAuth";
import Loader from "./loader";

function Googleauthredirect() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      setStatus("Loading....");

      try {
        const response = await GoogleAuth.googleSuccessLogin();

        if (response.status === "failed") {
          setStatus("Error"); // Set status to "Error" for the message div color change to red
        } else {
          setStatus("Success"); // Set status to "Success" for the message div color change to green

          dispatch(setUser(response.user));
          localStorage.setItem("user", JSON.stringify(response.user));
          setStatus("Redirecting....");

          setTimeout(() => {
            if (response.user.role === "user") {
              navigate("/user/groups");
            } else {
              navigate("/admin");
            }
          }, 2000);
        }
      } catch (error) {
        setStatus("Error");
      }

      // Stop the loading spinner after a delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    getUser();
  }, [dispatch, navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1>{status}</h1>
      {loading && <Loader />}
    </div>
  );
}

export default Googleauthredirect;
