import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, Product, FetchProductsParams, FetchProductsByCategoryParams, FetchProductsByIdParams } from "@/app/types/types";

axios.defaults.baseURL = 'https://fakestoreapi.com/';

export const fetchCategories = createAsyncThunk<ApiResponse<string[]>>(
    "api/categories",
    async ({ operationType }: FetchProductsParams, thunkAPI: any) => {
        try {
            const response = await axios.get<string[]>(
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

export const fetchProducts = createAsyncThunk<ApiResponse<Product[]>>(
    "api/products",
    async ({ operationType }: FetchProductsParams, thunkAPI: any) => {
        try {
            const response = await axios.get<Product[]>(
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

export const fetchProductsByCategory = createAsyncThunk<ApiResponse<Product[]>>(
    "api/productsByCategory",
    async ({ category, operationType }: FetchProductsByCategoryParams, thunkAPI:any) => {
        try {
            const response = await axios.get<Product[]>(
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

export const fetchProductsById = createAsyncThunk<ApiResponse<Product>>(
    "api/productsById",
    async({ id, operationType }: FetchProductsByIdParams, thunkAPI: any) => {
        try {
            const response = await axios.get<Product>(
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