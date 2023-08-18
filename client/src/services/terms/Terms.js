// Importing the Axios library to handle HTTP requests and the 'js-cookie' library to work with browser cookies.
import axios from "axios";
import Cookies from "js-cookie";

// Defining a class called GetGroups to handle operations related to fetching user groups.
class TermsServices {
  // Static method to get groups for a specific user.
  // It takes a 'userId' parameter representing the ID of the user whose groups are to be retrieved.
  static postTerms = async (content) => {
    // The URL of the API endpoint to get user groups.
    let api = `${process.env.REACT_APP_API_URL}/terms/post`;

    try {
      // Get the user's authentication token from the browser's cookies.
      const token = Cookies.get("token");

      const data = {
        content: content,
      };

      // Sending a GET request to the specified API endpoint.
      // Including the user's token in the 'authorization' header for authentication.
      const response = await axios.post(api, data);

      console.log(response);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      // If there's an error (e.g., server error or network issue),
      if (error.code === "ERR_NETWORK") {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 429) {
        console.log("i am ");
        // window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 500) {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 401) {
        // Removing the 'token' cookie
        Cookies.remove("token");
        // Removing data from local storage
        localStorage.removeItem("user");
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/unauthorized`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      // return the error response data received from the server.
      return error.response.data;
    }
  };

  static getTerms = async () => {
    // The URL of the API endpoint to get user groups.
    let api = `${process.env.REACT_APP_API_URL}/terms/get`;

    try {
      // Sending a GET request to the specified API endpoint.
      // Including the user's token in the 'authorization' header for authentication.
      const response = await axios.get(api);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      // If there's an error (e.g., server error or network issue),
      if (error.code === "ERR_NETWORK") {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 429) {
        console.log("i am ");
        // window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 500) {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 401) {
        // Removing the 'token' cookie
        Cookies.remove("token");
        // Removing data from local storage
        localStorage.removeItem("user");
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/unauthorized`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      // return the error response data received from the server.
      return error.response.data;
    }
  };


  static updateTerms = async (content,id) => {
    // The URL of the API endpoint to get user groups.
    let api = `${process.env.REACT_APP_API_URL}/terms/update/${id}`;

    try {
      // Get the user's authentication token from the browser's cookies.
      const token = Cookies.get("token");

      const data = {
        content: content,
      };

      // Sending a GET request to the specified API endpoint.
      // Including the user's token in the 'authorization' header for authentication.
      const response = await axios.put(api, data);

      console.log(response);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      // If there's an error (e.g., server error or network issue),
      if (error.code === "ERR_NETWORK") {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 429) {
        console.log("i am ");
        // window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 500) {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 401) {
        // Removing the 'token' cookie
        Cookies.remove("token");
        // Removing data from local storage
        localStorage.removeItem("user");
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/unauthorized`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      // return the error response data received from the server.
      return error.response.data;
    }
  };
}

// Exporting the GetGroups class to make it accessible to other parts of the application.
export default TermsServices;
