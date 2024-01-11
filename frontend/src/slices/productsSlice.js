import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false
    },
    reducers: {
        productsRequest(state, action){
            return {
                loading: true
            }
        },
        productsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
            }
        },
        productsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        clearError(state, action) {
           return{ ...state,
            error: null
           }
        },
        newProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        newProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
                isProductCreated: false
            }
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
    }
});

const { actions, reducer } = productsSlice;

export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    clearError,
    newProductRequest, 
    newProductSuccess, 
    newProductFail,
    clearProductCreated
} = actions;

export default reducer;