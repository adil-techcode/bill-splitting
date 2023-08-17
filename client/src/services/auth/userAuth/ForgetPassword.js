import axios from "axios";

class ForgetPassword {
  static forgetPassword = async (email) => {
    const api = `${process.env.REACT_APP_API_URL}/auth/user/sendresetpasswordemail`;

    try {
      // Prepare the data to be sent in the request body
      const data = {
        email: email,
      };

      // Send a POST request to the server to send the reset password email
      const response = await axios.post(api, data);

      // Return the response data received from the server
      return response.data;
    } catch (error) {

       // If there's an error (e.g., network issue),
       if(error.code === 'ERR_NETWORK'){
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }  

      if(error.response.status === 500){
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`;// Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      } 

      // In case of an error, return the error response data received from the server
      return error.response.data;
    }
  };
}

export default ForgetPassword;
