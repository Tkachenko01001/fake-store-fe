'use client'

import { useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks";
import { fetchProductsById } from "../../../redux/operations/Operations";
import { selectProducts } from "@/redux/selectors/selectors";
import StarRating from "@/app/components/StarRating/StarRating";
import ButtonAddToCart from "@/app/components/button-add-to-cart/ButtonAddToCart";

const Product = ({ params }: { params: { id: number } }) => {
    const products = useSelector(selectProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProductsById({ id: params.id, operationType: "fetchProductsById" }))
    }, [dispatch, params.id]);

    return (
        <div className="container mx-auto my-10">
            {products.oneProduct && (
                <div className="flex max-md:justify-items-center max-md:flex-col items-center gap-5">
                    <div className="md:w-1/2">
                        <Image width={500} height={500} src={products.oneProduct.image} alt={products.oneProduct.title} className="rounded-lg object-contain" />
                    </div>
                    <div className="md:w-1/2 px-8">
                        <h2 className="text-3xl font-bold mb-4">{products.oneProduct.title}</h2>
                        <div className="flex items-center mt-4 mb-2">
                            <span className="text-gray-500 mr-2">Rating:</span>
                            <StarRating rating={products.oneProduct.rating.rate} />
                        </div>
                        <p className="text-gray-500 mb-4">Category: {products.oneProduct.category}</p>
                        <p className="text-gray-700 mb-4">{products.oneProduct.description}</p>
                        <div className="flex justify-between items-center">
                            <ButtonAddToCart item={products.oneProduct} />
                            <p className="text-blue-500 font-bold text-xl"><span className="font-bold">price:</span> {products.oneProduct.price}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;