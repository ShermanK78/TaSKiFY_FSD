import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";    // Import the usersReducer
import loadersReducer from "./loadersSlice";  // Import the loadersReducer

// Configure the Redux store
const store = configureStore({
  reducer: {
    users: usersReducer,     // Attach the usersReducer under the 'users' key in the store
    loaders: loadersReducer, // Attach the loadersReducer under the 'loaders' key in the store
  },
});

// Export the configured Redux store
export default store;
