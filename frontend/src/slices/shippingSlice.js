import { createSlice } from "@reduxjs/toolkit";



const shippingSlice = createSlice({
    name: 'shippingInfo',
    initialState: {
        loading: true,
        isAdded:false,
    },
    reducers: {
        addshippingInfoRequest(state, action) {
            return {
                ...state,
                loading: true,
                isAdded:false,
            }
        },
        addshippingInfoSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAdded:true,
                address: action.payload.data.shipping,
            }
        },
        addshippingInfoFail(state, action) {
            return {
                loading: false,
                isAdded:false,
                error: action.payload
            }
        },
        getshippingInfoRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getshippingInfoSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAdded:true,
                address: action.payload.shipping
            }
        },
        getshippingInfoFail(state, action) {
            return {
                loading: false,
                isAdded:false,
                error: action.payload
            }
        },
        editshippingInfoRequest(state, action) {
            return {
                ...state,
                loading: true,
                isAdded:false,
            }
        },
        editshippingInfoSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAdded:true,
                address: action.payload.data.shipping,
            }
        },
        editshippingInfoFail(state, action) {
            return {
                loading: false,
                isAdded:false,
                error: action.payload
            }
        },
        delshippingInfoRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        delshippingInfoSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAdded:false,
            }
        },
        delshippingInfoFail(state, action) {
            return {
                loading: false,
                isAdded:false,
                error: action.payload
            }
        },
    }
});

const { actions, reducer } = shippingSlice;

export const {
    addshippingInfoRequest,
    addshippingInfoSuccess,
    addshippingInfoFail,
    getshippingInfoRequest,
    getshippingInfoSuccess,
    getshippingInfoFail,
    editshippingInfoRequest,
    editshippingInfoSuccess,
    editshippingInfoFail,
    delshippingInfoRequest,
    delshippingInfoSuccess,
    delshippingInfoFail
} = actions;

export default reducer;