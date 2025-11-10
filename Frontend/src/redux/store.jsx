import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import documentReducer from "../redux/documentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        document: documentReducer,
    },
});

export default store;
