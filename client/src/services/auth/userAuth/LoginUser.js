import axios from "axios";
import Cookies from "js-cookie";

class LoginUser {
  // Static method for user login
  static userLogin = async (email, password) => {
    const api = `${process.env.REACT_APP_API_URL}/auth/user/login`;

    try {
      // Prepare the data to be sent in the login request
      const data = {
        email: email,
        password: password,
      };

      // Send a POST request to the login API
      const response = await axios.post(api, data);

      // Store the authentication token received from the response in a cookie
      // The token will expire after 10 minutes (10 / 1440 days) and is secure with strict sameSite and path configurations
      Cookies.set("token", response.data.token, {
        expires: 10 / 1440,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      // Return the data received from the response (usually contains user information)
      return response.data;
    } catch (error) {
      
      //  // If there's an error (e.g. network issue),
      //  if(error.code === 'ERR_NETWORK'){
      //   window.location.href = `${process.env.REACT_APP_MAIN_URL}/service-unavailable`; // Replace with  503 URL
      //   return null; // Return null to prevent further actions or rendering
      // }  

      if (error.response.status === 429) {
       alert("limit xceed")// R
        return null; // Return null to prevent further actions or rendering
      }

      if(error.response.status === 500){
        window.location.href = `${process.env.REACT_APP_MAIN_URL}/internal-server-error`;// Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      } 

      // If there's an error in the login request, return the error response data
      return error.response.data;
    }
  };
}

export default LoginUser;
