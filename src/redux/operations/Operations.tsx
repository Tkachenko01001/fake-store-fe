import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://fakestoreapi.com/';

export const fetchCategories = createAsyncThunk(
    "api/categories",
    async ({ operationType }, thunkAPI) => {
        try {
            const response = await axios.get(
                `products/categories`
            );
            return { data: response.data, operationType };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchProducts = createAsyncThunk(
    "api/products",
    async ({ operationType }, thunkAPI) => {
        try {
            const response = await axios.get(
                `/products?limit=6`
            );
            return { data: response.data, operationType };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    "api/productsByCategory",
    async ({ category, operationType }, thunkAPI) => {
        try {
            const response = await axios.get(
                `products/category/${category}?limit=6`
            );
            return { data: response.data, operationType };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);