// Importing the Axios library to handle HTTP requests and the 'js-cookie' library to work with browser cookies.
import axios from "axios";
import Cookies from "js-cookie";

// Defining a class called Expense to handle operations related to expenses.
class Expense {
  // Static method to create an expense.
  // It takes a 'data' object containing information about the expense to be created.
  static createExpense = async (data) => {
    // The URL of the API endpoint to create an expense.
    let api = `${process.env.REACT_APP_API_URL}/user/group/expense/create-expense`;

    try {
      // Get the user's authentication token from the browser's cookies.
      const token = Cookies.get("token");

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
      if(error.code === 'ERR_NETWORK'){
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`;// Replace with  503 URL
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

  // Static method to get an expense by its ID.
  // It takes an 'expenseId' parameter representing the ID of the expense to retrieve.
  static getExpense = async (expenseId) => {
    // The URL of the API endpoint to get an expense by its ID.
    const api = `${process.env.REACT_APP_API_URL}/user/group/expense/get-expense/${expenseId}`;
    

    try {
      // Sending a GET request to the specified API endpoint.
      const response = await axios.get(api);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
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

  // Static method to get expenses for a specific participant in a group.
  // It takes 'groupId' and 'participantId' parameters to identify the group and the participant.
  static getParticipantExpense = async (groupId, participantId) => {
    // The URL of the API endpoint to get expenses for a participant in a group.
    const api = `${process.env.REACT_APP_API_URL}/user/group/expense/get-participant-expenses/${groupId}/${participantId}`;

    try {
      // Sending a GET request to the specified API endpoint.
      const response = await axios.get(api);

      // If the request is successful, return the response data received from the server.
      return response.data;
    } catch (error) {
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
}

// Exporting the Expense class to make it accessible to other parts of the application.
export default Expense;
