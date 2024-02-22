import { createSlice } from '@reduxjs/toolkit'
import { checkoutApi } from './checkoutApi'

export interface Checkout {
    _id: string
    fname: string
    lname: string
    email: string
    notes: string
    city: string
    province: string
}

const initialState = {
    isLoggedIn: false,
    values: {},
    statusCode: 0,
    checkoutCart: {},
    checkout: null as Checkout | null,
    message: null,
    isLoading: false,
    error: '',
}
const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // -----   FOR CHECKOUT -----
        builder.addCase(checkoutApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(checkoutApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.statusCode = action.payload?.status
            state.message = action.payload?.data?.message
            state.checkout = action.payload?.data
        })
        builder.addCase(checkoutApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

    }
})

export default checkoutSlice.reducer