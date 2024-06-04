import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
  name: "active",
  initialState: {
    active: true,
  },
  reducers: { 
    update_active: (state, action) =>{
        state.active = action.payload;
    },
  },
});

export const { update_active } = activeSlice.actions;
export default activeSlice.reducer;
