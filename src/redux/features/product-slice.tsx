import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductsByCategory, fetchProductsById } from "../operations/Operations";
import { Product, ProductsArray } from "@/app/types/types";

interface ProductsState {
  products: Product[];
  oneProduct: Product | null;
  selectedPage: number;
  isLoading: boolean;
  errors: string | null;
  operationType: string | null;
}

const hanlePanding = (state: ProductsState, action: PayloadAction<string, string, { arg: { operationType: string } }>) => {
    state.operationType = action.meta.arg.operationType;
    state.isLoading = true;
};

const handleRejected = (state: ProductsState, action: PayloadAction<string, string, { arg: { operationType: string } }>) => {
    state.isLoading = false;
    state.errors = action.payload;
    state.operationType = null;
};

const handleFulfilled = (state: ProductsState, action: PayloadAction<{ data: ProductsArray, operationType: string }>) => {
    state.products = action.payload.data;
    state.isLoading = false;
    state.operationType = null;
};

const initialState: ProductsState = {
  products: [],
  oneProduct: null,
  selectedPage: 1,
  isLoading: false,
  errors: null,
  operationType: null,
};

export const products = createSlice({
    name: "products",
    initialState,
    reducers: {
        setPage: (state: ProductsState, action: PayloadAction<string>) => {
            state.selectedPage = action.payload
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchProducts.pending, hanlePanding)
            .addCase(fetchProducts.rejected, (state: ProductsState, action: PayloadAction<string, string, { arg: { operationType: string } }>) => {
                state.isLoading = false;
                state.errors = action.payload;
                state.operationType = null;
            })
            .addCase(fetchProducts.fulfilled, handleFulfilled)
            .addCase(fetchProductsByCategory.pending, hanlePanding)
            .addCase(fetchProductsByCategory.rejected, handleRejected)
            .addCase(fetchProductsByCategory.fulfilled, handleFulfilled)
            .addCase(fetchProductsById.pending, hanlePanding)
            .addCase(fetchProductsById.rejected, handleRejected)
            .addCase(fetchProductsById.fulfilled, (state: ProductsState, action: PayloadAction<{ data: Product, operationType: string }>) => {
                state.oneProduct = action.payload.data;
                state.isLoading = false;
                state.operationType = null;
            });
    }
});

export const { setPage } = products.actions;

export default products.reducer;