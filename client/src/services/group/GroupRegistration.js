// Importing the Axios library to handle HTTP requests and the 'js-cookie' library to work with browser cookies.
import axios from "axios";
import Cookies from "js-cookie";

// Defining a class called GroupRegistration to handle operations related to registering a new group.
class GroupRegistration {
  // Static method to register a new group.
  // It takes several parameters representing the group details.
  // - 'name': The name of the group.
  // - 'creatorId': The ID of the user creating the group.
  // - 'createdAt': The timestamp when the group is created.
  // - 'participants': An array containing participant information for the group.
  static groupRegistration = async (
    name,
    creatorId,
    participants
  ) => {
    // The URL of the API endpoint to register a new group.
    let api = `${process.env.REACT_APP_API_URL}/user/group/registration`;

    try {
      // Get the user's authentication token from the browser's cookies.
      const token = Cookies.get("token");

      // Creating a 'data' object containing group details to be sent in the HTTP request.
      const data = {
        name: name,
        creatorId: creatorId,
        participants: participants,
      };

      // Sending a POST request to the specified API endpoint with the 'data' object.
      // Including the user's token in the 'authorization' header for authentication.
      const response = await axios.post(api, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      // If there's an error (e.g., server error or network issue),
      // If there's an error (e.g., server error or network issue),
      if (error.code === "ERR_NETWORK") {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 500) {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      if (error.response.status === 401) {
        Cookies.remove("token");
        localStorage.removeItem("user");
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/unauthorized`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }

      // return the error response data received from the server.
      return error.response.data;
    }
  };
}

// Exporting the GroupRegistration class to make it accessible to other parts of the application.
export default GroupRegistration;
