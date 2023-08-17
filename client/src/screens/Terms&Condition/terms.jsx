import React, { useState, useEffect } from "react";

function Terms() {
  useEffect(() => {
    document.title = "Terms & Condition";
  }, []);

  const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 5px;

  }

  ::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 6px; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: darkblue;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
`;



const fadingTextStyle = {
    height: "60%",
    overflow: "auto",
    width: "100%",
    WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
    color: "#6c757d",
    marginTop : "10px"
    
  };
  


  return (
    // Main Container
    <div
      className="d-flex justify-content-center align-items-center"
      style={  { backgroundColor: "#eef3fd", height: " 100vh " }}
    >



<style>{scrollbarStyles}</style>
      {/*  Login Box */}
      <div className="col-12 col-md-7 rounded bg-white shadow-md px-4" style={{ height: "80%", position: 'relative' }}>
        <h5 className="text-primary text-center my-4"> Terms and Conditions </h5>
        <span className="px-3" style={{color :"#6c757d" , fontSize:"1rem"}} > Last Updated : Aug 17, 2023 </span>
        <div style={fadingTextStyle} className="px-3">
  <p>
    Welcome to Go-Split's Bill Splitting Application! These terms and conditions outline the rules and regulations for the use of our app.
  </p>
  <p>
    By accessing and using Go-Split's Bill Splitting Application, you agree to comply with these terms and conditions. You must be at least 18 years old to use this app.
  </p>
  <p>
    Our app allows users to calculate and split bills among a group of friends. Users can enter the details of a bill, such as the total amount, items purchased, and the participating individuals.
  </p>
  <p>
    Users are solely responsible for verifying the accuracy of the bill details entered into the app.
  </p>
  <p>
    Go-Split's Bill Splitting App provides a tool to help users distribute the cost of shared expenses. While we strive for accuracy, the app's calculations are based on the input provided by users. We are not responsible for any discrepancies or errors in the calculation results.
  </p>
  <p>
    Users are responsible for maintaining the security of their accounts and any associated login credentials. Any actions performed using a user's account will be considered the user's responsibility.
  </p>
  <p>
    Users should not misuse or abuse the app for illegal or unauthorized purposes.
  </p>
  <p>
    We reserve the right to update or modify these terms and conditions at any time. Changes will be effective upon posting to the app. Please review these terms periodically.
  </p>
  <p>
    Contact us at <a href="mailto:contact@gosplitapp.com">contact@gosplitapp.com</a> for any questions or concerns regarding these terms and conditions.
  </p>
</div>

        <div className="text-center mt-3" >
        <button type="button" class="btn  px-5 mx-2 btn-outline-secondary">Decline</button>
        <button type="button" class="btn  px-5 mx-2 btn-primary">Accept</button>
        </div>
      </div>
    </div>
  );
}

export default Terms;
