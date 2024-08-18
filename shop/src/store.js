import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Slice/accountSlice"
import cartReducer from "./Slice/CartSlice"
const store = configureStore({
    reducer: {
        account: accountReducer,
        cart: cartReducer,
    }
})
export default store