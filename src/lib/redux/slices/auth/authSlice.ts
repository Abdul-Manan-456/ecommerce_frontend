import { createSlice } from '@reduxjs/toolkit'
import { login, register } from './authApi'


interface User {
    _id: string
    name: string
    email: string
    password: string
    message: string
}
const initialState = {
    isLoggedIn: false,
    isAuthenticated: false,
    user: null as User | null,
    message: null,
    isLoading: false,
    error: '',
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // -----   FOR LOGIN -----
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.message = action.payload?.data?.message
            state.user = action.payload?.data
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        //  ------------ FOR REGISTER ---------
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload?.data?.message
            state.user = action.payload?.data
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
    }
})


export default authSlice.reducer