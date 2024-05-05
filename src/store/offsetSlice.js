import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offset: 0,
};

const offsetSlice = createSlice({
    name: "offset",
    initialState,
    reducers: {
        incrementOffset: (state) => {
            state.offset += 1; 
        },
    },
});

export const { incrementOffset } = offsetSlice.actions;
export const selectOffset = (state) => state.offset.offset; 

export default offsetSlice.reducer;
