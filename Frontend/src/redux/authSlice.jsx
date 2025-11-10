import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
let initialUser = null;

if (token) {
    try {
        const decode = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decode.exp && decode.exp > now) {
            initialUser = decode;
        } else {
            localStorage.removeItem(token);
        }
    } catch {
        localStorage.removeItem("token");
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: token || null,
        user: initialUser,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.user = jwtDecode(action.payload);
            localStorage.setItem("token", action.payload);
        },
        logoutSuccess: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
        syncUserAcrossTab: (state) => {
            const newToken = localStorage.getItem("token");
            if (newToken) {
                state.token = newToken;
                state.user = jwtDecode(newToken);
            } else {
                state.token = null;
                state.user = null;
            }
        },
    },
});

export const { loginSuccess, logoutSuccess, syncUserAcrossTab } =
    authSlice.actions;
export default authSlice.reducer;
