'use client'
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectProducts } from "@/redux/selectors/selectors";
import { Product } from "@/app/types/types";

const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products } = useSelector(selectProducts);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();
    setFilteredProducts(products.filter((product: Product) => product.title.toLowerCase().startsWith(searchInput)));
    if (e.target.value === '') {
      setFilteredProducts([]);
    }
  };

  return (
    <div className="relative">
      <input
        onChange={handleChangeSearch}
        type="text"
        className="border rounded-md px-3 py-2 w-full text-sm text-gray-700 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
      />
      {filteredProducts.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
          <ul className="divide-y divide-gray-200 text-sm text-gray-700">
            {filteredProducts.map((product) => (
              <li key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link href={`/product/${product.id}`}>{product.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;