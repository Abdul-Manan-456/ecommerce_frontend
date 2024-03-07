import { baseUrl } from "@/lib/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiCall = createAsyncThunk(
    'apiCall',
    async ({ endpoint, method, data }: { endpoint: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE'; data?: any }, thunkAPI) => {
        try {
            console.log("hi---------from api call")
            let response;
            if (method === 'GET') {
                console.log("api-----------call", method, data, endpoint)
                response = await axios.get(`/${baseUrl}/${endpoint}`);
            } else if (method === 'POST') {
                response = await axios.post(`/${baseUrl}/${endpoint}`, data);
            } else if (method === 'PUT') {
                response = await axios.put(`/${baseUrl}/${endpoint}`, data);
            } else if (method === 'DELETE') {
                response = await axios.delete(`/${baseUrl}/${endpoint}`);
            }
            if (!response) {
                throw new Error('Response is undefined');
            }
            console.log("response", response);
            return response.data;
        } catch (err: any) {
            // console.log("error from API", err.message);
            console.log("error from API");
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

