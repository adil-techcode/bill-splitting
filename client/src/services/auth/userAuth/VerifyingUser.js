// Importing the Axios library, which allows making HTTP requests from the frontend.
import axios from "axios";

// Defining a class called VerifyingUser.
class VerifyingUser {
  // Declaring a static method called isUser, which checks if a user with a given email exists.
  // The 'async' keyword indicates that this function contains asynchronous operations.
  // It takes an 'email' parameter, representing the user's email to be checked.
  static isUser = async (email) => {
    // The URL of the API endpoint to check if the user exists.
    let api = `${process.env.REACT_APP_API_URL}/auth/user/isuser`;

    // Creating a data object containing the 'email' to be sent in the HTTP request.
    const data = {
      email: email,
    };

    try {
      // Sending a POST request to the specified API endpoint with the 'data' object.
      const response = await axios.post(api, data);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
        // If there's an error (e.g., server error or network issue),
        if(error.code === 'ERR_NETWORK'){
          window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
          return null; // Return null to prevent further actions or rendering
        }  

        if(error.response.status === 500){
          window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`;// Replace with  503 URL
          return null; // Return null to prevent further actions or rendering
        } 

      // If there's an error (e.g., server error or network issue), return the error response data.
      return error.response.data;
    }
  };
}

// Exporting the VerifyingUser class to make it accessible to other parts of the application.
export default VerifyingUser;
