import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  url: "",
  dragable: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addAnnotaion: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setDragable: (state, action) => {
      state.dragable = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAnnotaion, setUrl, setDragable } = counterSlice.actions;
export default counterSlice.reducer;
