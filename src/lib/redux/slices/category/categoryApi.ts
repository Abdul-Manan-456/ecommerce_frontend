import { baseUrl } from "@/lib/config/apiConfig"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchCategoryApi = createAsyncThunk(
    'fetchCategory',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}/category`)
            return response.data
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const addCategory = createAsyncThunk(
    'addCategory',
    async (data: { category: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/category`, data)
            return response.data
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const editCategoryApi = createAsyncThunk(
    'editCategoryApi',
    async (data: { _id: string, category: string }, thunkAPI) => {
        try {
            const response = await axios.patch(`${baseUrl}/category/${data._id}`, { category: data.category })
            return response.data
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const deleteCategoryApi = createAsyncThunk(
    'deleteCategoryApi',
    async (data: { _id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`${baseUrl}/category/${data._id}`)
            return data;
        } catch (err: any) {
            console.log("error from login api", err.message)
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
