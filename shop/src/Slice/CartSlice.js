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
        },
        sumQuantity: (state, action) => {
            const item = state.cartList.find(item => item.id === action.payload)
            item.quantity += 1
            item.totalPrice = item.price * item.quantity
        },
        minusQuantity: (state, action) => {
            const item = state.cartList.find(item => item.id === action.payload)
            if (item.quantity > 1) {
                item.quantity -= 1
                item.totalPrice = item.price * item.quantity
            }
            else {
                state.cartList = state.cartList.filter(item => item.id !== action.payload)
            }
        },
        clearCart: (state) => {
            state.cartList = []
        }
    }
})
export const { addItem, removeItem, sumQuantity, minusQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer