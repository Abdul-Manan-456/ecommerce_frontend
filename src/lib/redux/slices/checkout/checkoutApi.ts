import { baseUrl } from '@/lib/config/apiConfig'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
type CheckoutCart = {
    product: any[];
    notes: string;
};
export interface Checkout {
    values: object
    checkoutCart: CheckoutCart
}

export const checkoutApi = createAsyncThunk(
    'checkout',
    async (data: Checkout, thunkAPI) => {
        const dataValues = {
            products: data.checkoutCart?.product,
            notes: data.checkoutCart?.notes,
            ...data.values

        }
        try {
            const response = await axios.post(`${baseUrl}/checkout`, dataValues)
            console.log("response", response)
            return response
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
// export const register = createAsyncThunk(
//     'register',
//     async (credentials: Checkout, thunkAPI) => {

//         try {
//             const response = await axios.post(`${baseUrl}/auth/register`, credentials)
//             console.log("response", response)
//             return response
//         } catch (err: any) {
//             console.log("error from login api", err.message)
//             return thunkAPI.rejectWithValue(err.message)
//         }
//     }
// )