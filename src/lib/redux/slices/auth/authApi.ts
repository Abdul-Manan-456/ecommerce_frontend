import { baseUrl } from '@/lib/config/apiConfig'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface User {
    email: string
    password: string
}

export const login = createAsyncThunk(
    'login',
    async (credentials: User, thunkAPI) => {

        try {
            const response = await axios.post(`${baseUrl}/auth/login`, credentials)
            console.log("response", response)
            return response
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
export const register = createAsyncThunk(
    'register',
    async (credentials: User, thunkAPI) => {

        try {
            const response = await axios.post(`${baseUrl}/auth/register`, credentials)
            console.log("response", response)
            return response
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)