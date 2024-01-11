import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: true,
        isAdded:false,
    },
    reducers: {
        addCartItemRequest(state, action) {
            return {
                ...state,
                loading: true,
                isAdded:false,
            }
        },
        addCartItemSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAdded:true,
                product: action.payload.data.cart,
            }
        },
        addCartItemFail(state, action) {
            return {
                loading: false,
                isAdded:false,
                error: action.payload
            }
        },
        getCartItemRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getCartItemSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAdded:true,
                product: action.payload.cart,
            }
        },
        getCartItemFail(state, action) {
            return {
                loading: false,
                isAdded:false,
                error: action.payload
            }
        },
        delCartItemRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        delCartItemSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAdded:false,
            }
        },
        delCartItemFail(state, action) {
            return {
                loading: false,
                isAdded:false,
                error: action.payload
            }
        },
    }
});

const { actions, reducer } = cartSlice;

export const {
    addCartItemRequest,
    addCartItemSuccess,
    addCartItemFail,
    getCartItemRequest,
    getCartItemSuccess,
    getCartItemFail,
    delCartItemRequest,
    delCartItemSuccess,
    delCartItemFail
} = actions;

export default reducer;