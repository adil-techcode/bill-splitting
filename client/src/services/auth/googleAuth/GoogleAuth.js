import axios from "axios";
import Cookies from "js-cookie";

class GoogleAuth {
  // Static method for handling successful Google login
  static googleSuccessLogin = async () => {
    const api = `${process.env.REACT_APP_API_URL}/auth/google/login/success`;

    try {
      // Send a GET request to the Google login success API
      const res = await axios.get(api, { withCredentials: true });

      // Store the authentication token received from the response in a cookie
      // The token will expire after 10 minutes (10 / 1440 days) and is secure with strict sameSite and path configurations
      Cookies.set("token", res.data.token, {
        expires: 10 / 1440,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      // Return the data received from the response (usually contains user information)
      return res.data;
    } catch (error) {

       // If there's an error (e.g., server error or network issue),
       if(error.code === 'ERR_NETWORK'){
        window.location.href = `${process.env.REACT_APP_URL}/service-unavailable`; // Replace with  503 URL
        return null; // Return null to prevent further actions or rendering
      }  
      // If there's an error in the request, return the error response data
      return error.response.data;
    }
  };
}

export default GoogleAuth;
