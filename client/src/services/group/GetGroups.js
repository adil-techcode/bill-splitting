// Importing the Axios library to handle HTTP requests and the 'js-cookie' library to work with browser cookies.
import axios from "axios";
import Cookies from "js-cookie";

// Defining a class called GetGroups to handle operations related to fetching user groups.
class GetGroups {
  // Static method to get groups for a specific user.
  // It takes a 'userId' parameter representing the ID of the user whose groups are to be retrieved.
  static userGroups = async (userId) => {
    // The URL of the API endpoint to get user groups.
    let api = `${process.env.REACT_APP_API_URL}/user/group/users-group/${userId}/`;

    try {
      // Get the user's authentication token from the browser's cookies.
      const token = Cookies.get("token");

      // Sending a GET request to the specified API endpoint.
      // Including the user's token in the 'authorization' header for authentication.
      const response = await axios.get(api, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      
      console.log(error)

      // If there's an error (e.g., server error or network issue),
      // if (error.code === "ERR_NETWORK") {
      //   window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
      //   return null; // Return null to prevent further actions or rendering
      // }

      
   
      if (error.response.status === 429) {
        console.log("i am ")
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

  // Static method to get a specific group by its ID.
  // It takes a 'groupId' parameter representing the ID of the group to be retrieved.
  static getGroup = async (groupId) => {
    // The URL of the API endpoint to get a specific group by its ID.
    let api = `${process.env.REACT_APP_API_URL}/user/group/${groupId}`;

    try {
      // Sending a GET request to the specified API endpoint.
      const response = await axios.get(api);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      // If there's an error (e.g., server error or network issue),
      if (error.code === "ERR_NETWORK") {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }
      // return the error response data received from the server.
      if (error.response.status === 500) {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }
      return error.response.data;
    }
  };
}

// Exporting the GetGroups class to make it accessible to other parts of the application.
export default GetGroups;
