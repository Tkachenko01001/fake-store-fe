import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductsByCategory } from "../operations/Operations";

const initialState = {
    products: [],
    isLoading: false,
    errors: null,
    operationType: null,
}

export const products = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.operationType = action.meta.arg.operationType;
                state.isLoading = true;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
                state.operationType = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<string>) => {
                state.products = action.payload.data;
                state.isLoading = false;
                state.operationType = null;
            })
            .addCase(fetchProductsByCategory.pending, (state, action) => {
                state.operationType = action.meta.arg.operationType;
                state.isLoading = true;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
                state.operationType = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<string>) => {
                state.products = action.payload.data;
                state.isLoading = false;
                state.operationType = null;
            });
    }
});

export default products.reducer;