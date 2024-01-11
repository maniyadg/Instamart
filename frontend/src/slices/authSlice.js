import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false
    },
    reducers: {
        loginRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token:action.payload.token
            }
        },
        loginFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
           clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        registerRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: false,
                user: action.payload.user
            }
        },
        registerFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        loadUserRequest(state, action){
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        },
        loadUserSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state, action){
            return {
                ...state,
                loading: false,
            }
        },
        logedoutSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logedoutFail(state, action){
            return {
                ...state,
                error:  action.payload
            }
        },
        updateProfileRequest(state, action){
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action){
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearUpdateProfile(state, action){
            return {
                ...state,
                isUpdated: false
            }
        },        
    }
});

const { actions, reducer } = authSlice;

export const { 
    loginFail,
    loginRequest, 
    loginSuccess,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logedoutSuccess,
    logedoutFail,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    clearUpdateProfile,
  
 } = actions;

export default reducer;