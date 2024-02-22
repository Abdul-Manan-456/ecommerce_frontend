
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cart/cartSlice';
import productSlice from './slices/productSlice';
import authSlice from './slices/auth/authSlice';
import checkoutSlice from './slices/checkout/checkoutSlice';


export const store = () => {
    return configureStore({
        reducer: {
            cart: cartSlice,
            products: productSlice,
            auth: authSlice,
            checkout: checkoutSlice
        }
    })
}
export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']