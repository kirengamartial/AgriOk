import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))  : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getCredentials(state, action) {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logOut(state, action) {
            state.userInfo = ''
            localStorage.removeItem('userInfo')
        }
    }
})

 export const {getCredentials, logOut} = authSlice.actions

export default authSlice.reducer