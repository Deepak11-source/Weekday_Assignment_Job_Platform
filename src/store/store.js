import { configureStore } from "@reduxjs/toolkit";
import offsetReducer from "./offsetSlice";

const store = configureStore({
    reducer: {
        offset: offsetReducer,
    },
});

export default store;
