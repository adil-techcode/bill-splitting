import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-white text-black text-center fw-bold p-2 ">
        <div className="container-fluid">
          <p>
            &copy; {new Date().getFullYear()} ShareX Goprogs. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
