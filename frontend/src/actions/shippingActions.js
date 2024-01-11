import { addshippingInfoFail, addshippingInfoRequest, addshippingInfoSuccess, getshippingInfoSuccess,getshippingInfoFail, getshippingInfoRequest, editshippingInfoRequest, editshippingInfoSuccess, editshippingInfoFail, delshippingInfoRequest, delshippingInfoSuccess, delshippingInfoFail } from '../slices/shippingSlice';
import axios from 'axios';
import { host } from '../host';

export const getAddress = () => async (dispatch) => {

    try {
        dispatch(getshippingInfoRequest())
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        const { data }  = await axios.get(`${host}/api/getAddress` , config);
        console.log(data)
        dispatch(getshippingInfoSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(getshippingInfoFail(error.response))
    }

}


export const createAddress = (name,country,city,address,phoneNo,postalCode) => async (dispatch) => {

    try {
        dispatch(addshippingInfoRequest())
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };

        const  {data}   = await axios.post(`${host}/api/addAddress`,
        {name,country,city,address,phoneNo,postalCode} , config);

        dispatch(addshippingInfoSuccess(data))
    } catch (error) {
        dispatch(addshippingInfoFail(error.response))
    }

}

export const editAddress = (name,country,city,address,phoneNo,postalCode,id) => async (dispatch) => {

  try {
      dispatch(editshippingInfoRequest())
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

      const  {data}   = await axios.put(`${host}/api/editAddress/${id}`,
      {name,country,city,address,phoneNo,postalCode} , config);

      dispatch(editshippingInfoSuccess(data))
  } catch (error) {
      dispatch(editshippingInfoFail(error.response))
  }

}

export const deleteAddress = (id) => async (dispatch) => {

  try {
      dispatch(delshippingInfoRequest())
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

      const  {data}   = await axios.put(`${host}/api/deleteAddress/${id}`,config);

      dispatch(delshippingInfoSuccess(data))
  } catch (error) {
      dispatch(delshippingInfoFail(error.response))
  }

}






