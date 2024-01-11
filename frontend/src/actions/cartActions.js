import {addCartItemRequest, addCartItemSuccess,addCartItemFail,getCartItemRequest,getCartItemSuccess,getCartItemFail,delCartItemRequest,delCartItemSuccess,delCartItemFail} from '../slices/cartSlice';
import axios from 'axios'
import { host } from '../host';

export const addCartItem = (id, quantity ) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        const {data } = await axios.post(`${host}/api/create-cart/${id}` , {quantity} , config)
        dispatch(addCartItemSuccess(data))
        console.log(data)
    } catch (error) {
        dispatch(addCartItemFail(error.response))
    }
}

export const getCartItem = () => async(dispatch) => {
    try {
        dispatch(getCartItemRequest())
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        const {data } = await axios.get(`${host}/api/get-cartItem` , config)
        dispatch(getCartItemSuccess(data))
        console.log(data)

    } catch (error) {
        dispatch(getCartItemFail(error.response))
    }
}

export const delCartItem = (id) => async(dispatch) => {
    try {
        dispatch(delCartItemRequest())
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        const {data } = await axios.get(`${host}/api/cart-delProduct/${id}` , config)
        dispatch(delCartItemSuccess({data}))
    } catch (error) {
        dispatch(delCartItemFail(error.response.data.message))
    }
}