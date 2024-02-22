import { baseUrl } from '@/lib/config/apiConfig';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
interface FetchProps {
    category?: string;
}
export const fetchProducts = createAsyncThunk(
    'api/products',
    async (params?: FetchProps) => {
        try {
            // let url = 'https://fakestoreapi.com/products/'
            let url = `${baseUrl}/product`
            if (params && params.category) {
                url += `/category/${decodeURIComponent(params.category)}`
            }
            const responce = await axios.get(url)
            return responce.data?.result;
        } catch (error) {
            throw error;
        }

    }
)
interface ProductProps {
    error: null | string | undefined
    isLoading: boolean
    products: any[]
    selectedProduct: null | { title: string, price: number, id: string, description: string }
}
const initialState: ProductProps = {
    products: [],
    isLoading: false,
    error: null,
    selectedProduct: null
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        GET_PRODUCT_BY_ID: (state, action) => {
            console.log("action.payload", action.payload)
            // const productId = action.payload.id;
            // const product = state.products.find(product => product.id === productId);
            state.selectedProduct = action.payload || null;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload

        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})
export const { GET_PRODUCT_BY_ID } = productSlice.actions
export default productSlice.reducer