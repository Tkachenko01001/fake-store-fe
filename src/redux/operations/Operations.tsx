import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { createAsyncThunk, ThunkAPI  } from "@reduxjs/toolkit";
import { FetchProductsParams, FetchProductsByCategoryParams, FetchProductsByIdParams } from "@/app/types/types";

axios.defaults.baseURL = 'https://fakestoreapi.com/';


export const fetchCategories = createAsyncThunk(
    "api/categories",
    async ({ operationType }: FetchProductsParams, thunkAPI: any) => {
        try {
            const response = await axios.get(
                `products/categories`
            );
            return { data: response.data, operationType };
        } catch (e: any) {
            Report.failure(
                `error`,
                `${e.message}`,
                'Okay',
            );
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchProducts = createAsyncThunk(
    "api/products",
    async ({ operationType }: FetchProductsParams, thunkAPI: any) => {
        try {
            const response = await axios.get(
                `/products`
            );
            return { data: response.data, operationType };
        } catch (e: any) {
            Report.failure(
                `error`,
                `${e.message}`,
                'Okay',
            );
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    "api/productsByCategory",
    async ({ category, operationType }: FetchProductsByCategoryParams, thunkAPI: any) => {
        try {
            const response = await axios.get(
                `products/category/${category}`
            );
            return { data: response.data, operationType };
        } catch (e: any) {
            Report.failure(
                `error`,
                `${e.message}`,
                'Okay',
            );
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchProductsById = createAsyncThunk(
    "api/productsById",
    async({ id, operationType }: FetchProductsByIdParams, thunkAPI: any) => {
        try {
            const response = await axios.get(
                `products/${id}`
            );
            return { data: response.data, operationType };
        } catch (e: any) {
            Report.failure(
                `error`,
                `${e.message}`,
                'Okay',
            );
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);