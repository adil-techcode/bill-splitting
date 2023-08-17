// Importing the Axios library to handle HTTP requests and the 'js-cookie' library to work with browser cookies.
import axios from "axios";

// Defining a class called UpdateGroup to handle operations related to updating group information.
class UpdateGroup {
  // Static method to update the name of a group.
  // It takes 'newname' and 'groupId' parameters to specify the new group name and the group to update.
  static updateGroupName = async (newname, groupId) => {
    // The URL of the API endpoint to update the name of a group.
    let api = `${process.env.REACT_APP_API_URL}/user/group/update-name`;

    try {
      // Creating a 'data' object containing the 'groupId' and 'newname' to be sent in the HTTP request.
      const data = {
        groupId: groupId,
        name: newname,
      };

      // Sending a POST request to the specified API endpoint with the 'data' object.
      const response = await axios.post(api, data);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      // If there's an error (e.g., server error or network issue),
       // If there's an error (e.g., server error or network issue),
       if(error.code === 'ERR_NETWORK'){
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`;// Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }  

      if (error.response.status === 500) {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }
      // return the error response data received from the server.
      return error.response.data;
    }
  };

  // Static method to update the status of a group.
  // It takes 'status' and 'groupId' parameters to specify the new group status and the group to update.
  static updateGroupStatus = async (status, groupId) => {
    // The URL of the API endpoint to update the status of a group.
    let api = `${process.env.REACT_APP_API_URL}/user/group/update-status`;

    try {
      // Creating a 'data' object containing the 'groupId' and 'status' to be sent in the HTTP request.
      const data = {
        groupId: groupId,
        status: status,
      };

      // Sending a POST request to the specified API endpoint with the 'data' object.
      const response = await axios.post(api, data);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
       // If there's an error (e.g., server error or network issue),
       if(error.code === 'ERR_NETWORK'){
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`;; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }  

      if (error.response.status === 500) {
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }
      // return the error response data received from the server.
      return error.response.data;
    }
  };
}

// Exporting the UpdateGroup class to make it accessible to other parts of the application.
export default UpdateGroup;
