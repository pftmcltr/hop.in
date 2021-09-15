import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },

    setDestination: (state, action) => {
      state.destination = action.payload;
    },
  },
});

// Actions
export const { setOrigin, setDestination } = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;

export const selectDestination = (state) => state.nav.destination;

export default navSlice.reducer;
