import { baseUrl } from '@/lib/config/apiConfig';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { addProductApi, deleteProductApi, editProductApi, getSingleProductApi } from './productApi';

interface Products {
    _id: string
    title: string
    image: string
    imageData: string[]
    description: string
    populatedCategory: { category: string }
    price: number
    category: string
    name: string
}
interface ProductProps {
    _id: string
    error: null | string | undefined
    isLoading: boolean
    products: Products[]
    singleProductToEdit: Products[]
    selectedProduct: null | { title: string, price: number, _id: string, description: string }
}
const initialState: ProductProps = {
    _id: '',
    products: [],
    singleProductToEdit: [],
    isLoading: false,
    error: null,
    selectedProduct: null
}
export const fetchProducts = createAsyncThunk(
    'api/products',
    async (params?: { category?: string }) => {
        try {
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


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        GET_PRODUCT_BY_ID: (state, action) => {
            state.selectedProduct = action.payload || null;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload

        })
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        //  ---------- ADD PRODUCT ----------------

        builder.addCase(addProductApi.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(addProductApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products.push(action.payload?.result)
        })
        builder.addCase(addProductApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        // ---------- EDIT CATEGORY ----------------

        builder.addCase(editProductApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(editProductApi.fulfilled, (state, action) => {
            const updatedItem = action.payload?.result
            const itemId = updatedItem?._id;
            const itemIndex = state.products.findIndex(item => item._id === itemId);
            if (itemIndex !== -1) {
                state.products[itemIndex] = updatedItem
            }

            state.isLoading = false;
        })
        builder.addCase(editProductApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        // ---------- GET Single Product ----------------

        builder.addCase(getSingleProductApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getSingleProductApi.fulfilled, (state, action) => {
            const item = action.payload?.result
            state.products.push(item)
            state.isLoading = false;
        })
        builder.addCase(getSingleProductApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        // ---------- DELETE CATEGORY ----------------

        builder.addCase(deleteProductApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteProductApi.fulfilled, (state, action) => {
            const deletedItem = action.payload?._id
            const updatedProducts = state.products.filter(item => item._id !== deletedItem)
            state.products = updatedProducts
            state.isLoading = false;
        })
        builder.addCase(deleteProductApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

    }
})
export const { GET_PRODUCT_BY_ID } = productSlice.actions
export default productSlice.reducer