import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allDataForTable: [],
};

export const tableCrudSlice = createSlice({
  name: "tableCrud",
  initialState,
  reducers: {
    handleData: (state, action) => {
      state.allDataForTable = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleData } = tableCrudSlice.actions;
export default tableCrudSlice.reducer;
