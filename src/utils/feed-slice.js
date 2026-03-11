import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeItemFromFeed: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
    removeAllFeed: () => {
      return null;
    },
  },
});
export const { addFeed, removeItemFromFeed, removeAllFeed } = feedSlice.actions;
export default feedSlice.reducer;
