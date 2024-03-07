import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryApi, addCategory, editCategoryApi, deleteCategoryApi } from "./categoryApi";
import { apiCall } from '../../helpers/apiCall';
import { useToast } from "@/components/ui/use-toast";
interface Category {
    _id: string
    name: string
    category: string
}
interface CategoryState {
    category: Category[]
    isLoading: boolean
    statusCode: number
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: CategoryState = {
    isLoading: false,
    statusCode: 0,
    category: [],
    status: 'idle',
    error: null,
};


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCategoryApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = action.payload?.result
            state.statusCode = action.payload?.status
        })
        builder.addCase(fetchCategoryApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })



        //  ---------- ADD CATEGORY ----------------

        builder.addCase(addCategory.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category.push(action.payload?.result)
            state.statusCode = action.payload?.status
        })
        builder.addCase(addCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        // ---------- EDIT CATEGORY ----------------

        builder.addCase(editCategoryApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(editCategoryApi.fulfilled, (state, action) => {
            const updatedItem = action.payload?.result
            const itemId = updatedItem?._id;
            const itemIndex = state.category.findIndex(item => item._id === itemId);
            if (itemIndex !== -1) {
                state.category[itemIndex] = updatedItem
            }

            state.isLoading = false;
            state.statusCode = action.payload?.status
        })
        builder.addCase(editCategoryApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        // ---------- DELETE CATEGORY ----------------

        builder.addCase(deleteCategoryApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteCategoryApi.fulfilled, (state, action) => {
            const deletedItem = action.payload?._id
            const updatedCategory = state.category.filter(item => item._id !== deletedItem)
            state.category = updatedCategory
            state.isLoading = false;
        })
        builder.addCase(deleteCategoryApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

    }
})

export default categorySlice.reducer;