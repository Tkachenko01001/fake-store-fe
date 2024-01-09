import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "../operations/Operations";

const initialState = {
    categories: [],
    selectedCategory: null,
    operationType: null,
    isLoading: false,
    errors: null,
}

export const categories = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.isLoading = true;
                state.operationType = action.meta.arg.operationType;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.error.name;
                state.operationType = null;
                
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string>) => {
                state.categories = action.payload.data;
                state.isLoading = false;
                state.operationType = null;
            })
    }
});

export const { setCategory } = categories.actions;
export default categories.reducer;