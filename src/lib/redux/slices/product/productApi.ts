import { baseUrl } from "@/lib/config/apiConfig"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getSingleProductApi = createAsyncThunk(
    'getSingleProductApi',
    async (data: { _id: string | string[] }, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}/product/${data._id}`)
            return response.data;
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
export const addProductApi = createAsyncThunk(
    'addProductApi',
    async (data: {}, thunkAPI) => {
        console.log("data--------------------", data)
        try {
            const response = await axios.post(`${baseUrl}/product`, data)
            return response.data
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const editProductApi = createAsyncThunk(
    'editProductApi',
    async (data: { _id: string, description: string }, thunkAPI) => {
        try {
            const response = await axios.patch(`${baseUrl}/product/${data._id}`, data)
            return response.data
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const deleteProductApi = createAsyncThunk(
    'deleteProductApi',
    async (data: { _id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`${baseUrl}/product/${data._id}`)
            return data;
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
