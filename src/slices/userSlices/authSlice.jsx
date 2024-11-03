import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
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
        },
        updateUserInfo(state, action) {
            if (state.userInfo) {
                const updatedUserInfo = {
                    ...state.userInfo,
                    ...(action.payload.first_name && { first_name: action.payload.first_name })
                }
                
                state.userInfo = updatedUserInfo
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))
            }
        }
    }
})

export const { getCredentials, logOut, updateUserInfo } = authSlice.actions

export default authSlice.reducer