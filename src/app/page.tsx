'use client'

import { useEffect } from "react";
import { useAppDispatch } from '../app/hooks';
import { fetchCategories, fetchProducts } from "@/redux/operations/Operations";
import CategoriesList from "./components/categories-list/CategoriesList";
import ProductsList from "./components/products-list/ProductsList";
import Pagination from "./components/pagination/Pagination";

export default function Home() {
  const dispatch = useAppDispatch();

 useEffect(() => {
  dispatch(fetchCategories({operationType: "fetchCategories"}));
  dispatch(fetchProducts({operationType: "fetchProducts"}));
}, [dispatch]);

  return (
    <section className="flex h-screen bg-gray-100">
      <div className=" max-lg:hidden flex flex-col gap-y-20 w-1/6 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-5">Categories</h2>
        <CategoriesList />
      </div>
      <div className="w-3/4 p-4 mx-auto max-w-screen-xl">
        <div>
          <ProductsList />
        </div>
        <Pagination />
      </div>
    </section>
  );
};
