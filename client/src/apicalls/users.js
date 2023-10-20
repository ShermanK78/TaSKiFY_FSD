const { apiRequest } = require(".");

// This function 'RegisterUser' sends a POST request to register a new user.
export const RegisterUser = async (payload) => apiRequest('post', '/api/users/register', payload);

// This function 'LoginUser' sends a POST request to log in a user.
export const LoginUser = async (payload) => apiRequest('post', '/api/users/login', payload);

// This function 'GetLoggedInUser' sends a GET request to retrieve information about the currently logged-in user.
export const GetLoggedInUser = async () => apiRequest('get', '/api/users/get-logged-in-user');
