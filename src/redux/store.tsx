import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './features/categories-slice';
import productSlice from './features/product-slice';

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;