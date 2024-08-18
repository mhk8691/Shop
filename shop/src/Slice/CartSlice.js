import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartList: [],
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cartList = [...state.cartList, action.payload]
        },
        removeItem: (state, action) => {
            state.cartList = state.cartList.filter(item => item.id !== action.payload)
        }
    }
})
export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer