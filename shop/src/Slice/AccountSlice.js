import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLogin: false,
    accessToken: null
}
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true
            state.accessToken = action.payload
        },
        logout: (state) => {
            state.isLogin = false
            state.accessToken = null
        }
    }
})
export const { login, logout } = accountSlice.actions
export default accountSlice.reducer