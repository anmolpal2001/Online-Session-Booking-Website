import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    userDetails : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            // state.currentUser = action.payload.currentUser;
            state.currentUser = {...state.currentUser, ...action.payload.currentUser};
            state.isAuthenticated = true;
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
        setUserDetails: (state, action) => {
            // state.currentUser = { ...state.currentUser, ...action.payload };
            state.userDetails = action.payload.userDetails;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout,setUserDetails } = authSlice.actions;

export default authSlice.reducer;
