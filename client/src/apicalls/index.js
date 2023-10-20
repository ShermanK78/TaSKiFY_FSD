import axios from "axios";

// This function 'apiRequest' sends HTTP requests to a specified API.
export const apiRequest = async (method, url, payload) => {
  try {
    // Send an HTTP request using the axios library.
    const response = await axios({
      method,          // HTTP request method (GET, POST, PUT, DELETE, etc.)
      url,             // The URL to send the request to.
      data: payload,   // The request payload or data to be sent.
      headers: {
        // Set the request headers, including an authorization header with a token.
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // Return the response data received from the API.
    return response.data;
  } catch (error) {
    // If an error occurs during the API request, return the error object.
    return error;
  }
};
