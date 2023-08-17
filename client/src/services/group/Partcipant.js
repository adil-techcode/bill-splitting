// Importing the Axios library to handle HTTP requests and the 'js-cookie' library to work with browser cookies.
import axios from "axios";

// Defining a class called Participant to handle operations related to group participants.
class Participant {
  // Static method to remove a participant from a group.
  // It takes 'participantId' and 'groupId' parameters to identify the participant and the group.
  static removeParticipant = async (participantId, groupId) => {

    console.log(participantId);
    console.log(groupId);
    
    // The URL of the API endpoint to remove a participant from the group.
    let api = `${process.env.REACT_APP_API_URL}/user/group/remove-particiapnt`;
 
    try {
      // Creating a 'data' object containing the 'groupId' and 'participantId' to be sent in the HTTP request.
      const data = {
        groupId: groupId,
        participantId: participantId,
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

  // Static method to add a participant to a group.
  // It takes 'email' and 'groupId' parameters to specify the participant's email and the group.
  static addParticipant = async (email, groupId) => {
    // The URL of the API endpoint to add a participant to the group.
    let api = `${process.env.REACT_APP_API_URL}/user/group/add-particiapnt`;

    try {
      // Creating a 'data' object containing the 'groupId' and 'email' to be sent in the HTTP request.
      const data = {
        groupId: groupId,
        email: email,
      };

      // Sending a POST request to the specified API endpoint with the 'data' object.
      const response = await axios.post(api, data);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
      // If there's an error (e.g., server error or network issue),
       // If there's an error (e.g., server error or network issue),
       if(error.code === 'ERR_NETWORK'){
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
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

// Exporting the Participant class to make it accessible to other parts of the application.
export default Participant;
