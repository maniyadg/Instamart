import { host } from '../host';
import {
    loginFail,
    loginRequest, 
    loginSuccess,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    clearError,
    logedoutSuccess,
    logedoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
} from '../slices/authSlice';

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
        const { data }  = await axios.post(`/api/login`,{email,password} , config);

        localStorage.setItem("userInfo", JSON.stringify(data));

        dispatch(loginSuccess(data))

    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }

}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const  {data}   = await axios.post(`/api/register`,userData, config ,{withCredentials: true});


        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response))
    }

}


export const loadUser =  async (dispatch) => {

   try {
        dispatch(loadUserRequest())

        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        
        const { data }  = await axios.get(`/api/singleuser` , config);
        dispatch(loadUserSuccess(data))
        
    } catch (error) {
        dispatch(loadUserFail(error.response))
    }

 }

 export const logedout =  async (dispatch) => {

    try {
        localStorage.removeItem('userInfo')
         await axios.get(`/api/logedout`);
         dispatch(logedoutSuccess())
         
     } catch (error) {
         dispatch(logedoutFail)
     }
 
  }

  export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.put(`/api/updateUser`,userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response))
    }

}



