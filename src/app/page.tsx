'use client'

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/redux/features/categories-slice";
import { selectCategories, selectProducts } from "@/redux/selectors/selectors";
import { fetchCategories, fetchProducts, fetchProductsByCategory } from "@/redux/operations/Operations";

export default function Home() {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectCategories);
  const { products } = useSelector(selectProducts);

 useEffect(() => {
  console.log("Home component mounted");
  dispatch(fetchCategories({operationType: "fetchCategories"}));
  dispatch(fetchProducts({operationType: "fetchProducts"}));

  return () => {
    console.log("Home component unmounted");
  };
}, []);

  const handleClickForCategory = (e, category) => {
    e.preventDefault()
    dispatch(setCategory(category));
    dispatch(fetchProductsByCategory({ category, operationType: "fetchProductsByCategory" }))
  }

  const handleClickForBuy = (e, id) => {
    e.preventDefault()
    console.log(id);
  }

  return (
    <section className="flex h-screen bg-gray-100">
      <div className=" flex flex-col gap-y-20 w-1/6 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-5">Categories</h2>
        <ul className="flex flex-col justify-around gap-y-10">
          {categories &&
            categories.map((category) => (
              <li
                key={category}
                className="hover:text-gray-300 transition cursor-pointer"
              >
                <button onClick={(e) => handleClickForCategory(e, category)}>{category}</button>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-3/4 p-4 mx-auto max-w-screen-xl">
        <div>
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {products &&
              products.map(({ id, image, title, category, price }) => (
                <li key={id} className="border rounded-md overflow-hidden bg-white p-4">
                  <Link href={`/product/${id}`} className="flex flex-col h-full ">
                  <div className="relative h-40">
                    <Image width={200} height={200} src={image} alt={title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex items-end justify-between mt-5 mb-5 flex-grow">
                    <div>
                      <h3 className="text-xl font-bold mb-3">{title}</h3>
                      <button className="hover:text-blue-500 text-black rounded-md" onClick={(e) => handleClickForCategory(e, category)}>{category}</button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button className="text-blue-500" onClick={(e) => handleClickForBuy(e, id)}>Придбати</button>
                    <p className="text-gray-700"><span className="font-bold">price:</span> {price}</p>
                    </div>
                    </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
