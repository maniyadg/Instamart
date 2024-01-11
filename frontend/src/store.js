import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlice";
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import shippingReducer from "./slices/shippingSlice"

const reducer = combineReducers({
    productsState: productsReducer,
    authState:authReducer,
    cartState: cartReducer,
    shippingInfoState:shippingReducer,

})


const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;