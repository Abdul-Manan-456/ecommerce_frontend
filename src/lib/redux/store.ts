
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/client/cart/cartSlice';
import productSlice from './slices/product/productSlice';
import authSlice from './slices/auth/authSlice';
import checkoutSlice from './slices/checkout/checkoutSlice';
import categorySlice from './slices/category/categorySlice';

export const store = () => {
    return configureStore({
        reducer: {
            cart: cartSlice,
            products: productSlice,
            auth: authSlice,
            checkout: checkoutSlice,
            category: categorySlice
        }
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']