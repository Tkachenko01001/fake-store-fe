import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectProducts } from "@/redux/selectors/selectors";
import ButtonAddToCart from "../button-add-to-cart/ButtonAddToCart";
import ButtonCategory from "../button-category/ButtonCategory";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/types";

const ProductsList = () => {
    const [sliceProducts, setSliceProducts] = useState<Product[]>([]);
    const { products, selectedPage } = useSelector(selectProducts);

    useEffect(() => {
        const startIndex = (selectedPage - 1) * 6;
        const endIndex = startIndex + 6;
        setSliceProducts(products.slice(startIndex, endIndex))
    }, [products, selectedPage])

    return (
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {sliceProducts &&
                sliceProducts.map(({ id, image, title, category, price, rating, description }) => (
                    <li key={id} className="border rounded-md overflow-hidden bg-white p-4">
                        <Link href={`/product/${id}`} className="flex flex-col h-full ">
                            <div className="relative h-40">
                                <Image width={200} height={200} src={image} alt={title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col justify-between mt-5 flex-grow">
                                <div>
                                    <h3 className="text-xl font-bold mb-3">{title}</h3>
                                    <ButtonCategory category={category} />
                                </div>
                                <div className="flex justify-between items-center mt-5">
                                    <ButtonAddToCart item={{ id, image, title, category, price, rating, description}} />
                                    <p className="text-gray-700"><span className="font-bold">price:</span> {price}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
        </ul>
    )
};

export default ProductsList;