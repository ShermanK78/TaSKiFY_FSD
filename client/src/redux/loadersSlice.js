import { createSlice } from "@reduxjs/toolkit";

export const loadersSlice = createSlice({
  // Define the name of the slice
  name: "loaders",

  // Define the initial state of the loaders slice
  initialState: {
    loading: false,       // Initialize the loading state to false
    buttonLoading: false, // Initialize the buttonLoading state to false
  },

  // Define the reducers, which are functions that modify the state
  reducers: {
    SetLoading: (state, action) => {
      // This reducer sets the loading state to the payload value
      state.loading = action.payload;
    },
    SetButtonLoading: (state, action) => {
      // This reducer sets the buttonLoading state to the payload value
      state.buttonLoading = action.payload;
    },
  },
});

// Export the action creators, including SetLoading and SetButtonLoading
export const { SetLoading, SetButtonLoading } = loadersSlice.actions;

// Export the reducer function for this slice
export default loadersSlice.reducer;
