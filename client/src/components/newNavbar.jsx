import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import LetterAvatars from "./avator";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NewNavbar({ toggleSidebar, pageName }) {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();

  let user = null;
  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  const handleLogout = () => {
    // Removing the 'token' cookie
    Cookies.remove("token");

    // Removing data from local storage
    localStorage.removeItem("user");

    navigate("/signin");
  };

  // Function to toggle the sidebar menu
  const toggleMenu = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar   bg-white -light  mx-4 rounded py-3 px-4">
        <div className="d-flex align-items-center">
          <FaAlignLeft
            className="burger-menu-icon"
            onClick={toggleSidebar}
            style={{ fontSize: "28px", paddingRight: "10px" }}
          />
          <h2 className="fs-2 m-0">{pageName}</h2>
        </div>

        {user && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown text-black  d-flex ">
                  <LetterAvatars name={user.name} />{" "}
                  <a
                    className="nav-link dropdown-toggle second-text  text-black fw-bold d-flex"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="fw-bold text-black">{user.name}</span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Reset Password
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>{" "}
          </>
        )}
      </nav>
    </div>
  );
}

export default NewNavbar;
