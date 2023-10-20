import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",  // Name for this slice of the store
  initialState: {
    user: null,        // Initialize user state to null
    allUsers: [],      // Initialize allUsers state as an empty array
    notifications: [], // Initialize notifications state as an empty array
  },
  reducers: {
    SetUser(state, action) {
      state.user = action.payload; // Reducer to set the user state
    },
    SetAllUsers(state, action) {
      state.allUsers = action.payload; // Reducer to set the allUsers state
    },
    SetNotifications(state, action) {
      state.notifications = action.payload; // Reducer to set the notifications state
    }
  },
});

export const { SetUser, SetAllUsers, SetNotifications } = usersSlice.actions; // Export action creators

export default usersSlice.reducer; // Export the reducer
