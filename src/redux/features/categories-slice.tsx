import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCategories } from "../operations/Operations";

interface CategoriesState {
    categories: string[];
    selectedCategory: string | null;
    operationType: string | null;
    isLoading: boolean;
    errors: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    selectedCategory: null,
    operationType: null,
    isLoading: false,
    errors: null,
};

export const categories = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategory: (state: CategoriesState, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchCategories.pending, (state: CategoriesState, action: PayloadAction<string, string, { arg: { operationType: string } }>) => {
                state.isLoading = true;
                state.operationType = action.meta.arg.operationType;
            })
            .addCase(fetchCategories.rejected, (state: CategoriesState, action:  PayloadAction<void, string, { arg: { operationType: string } }>) => {
                state.isLoading = false;
                state.errors = action.error.name;
                state.operationType = null;
                
            })
            .addCase(fetchCategories.fulfilled, (state: CategoriesState, action:  PayloadAction) => {
                state.categories = action.payload.data;
                state.isLoading = false;
                state.operationType = null;
            })
    }
});

export const { setCategory } = categories.actions;
export default categories.reducer;