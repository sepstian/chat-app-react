import { createSlice } from "@reduxjs/toolkit";

const arrayMsgSlice = createSlice({
  name: "arrayMsg",
  initialState: {
    arrayMsg: false,
  },
  reducers: { 
    update_arrayMsg: (state, action) =>{
        state.arrayMsg = action.payload;
    },
  },
});

export const { update_arrayMsg } = arrayMsgSlice.actions;
export default arrayMsgSlice.reducer;
