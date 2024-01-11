'use client'

import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import Search from "../search/Search";
import CategoriesList from "../categories-list/CategoriesList";
import { selectCart } from "@/redux/selectors/selectors";
import { CartItemProps } from "@/app/types/types";

const Header = () => {
    const {items} = useSelector(selectCart);
    const cartQuantity = items.reduce((total: number, item: CartItemProps) => total + item.quantity, 0);

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex items-center justify-between space-x-4 relative">
                <Link href="/" className="hover:text-gray-300">
                    fake-store
                </Link>
                <Search />
                <Link href="/cart" className="max-lg:hidden hover:text-gray-300 relative">
                    <span className="relative inline-block">
                        <FaShoppingCart className="text-2xl" />
                        {cartQuantity > 0 && (
                            <span className="flex items-center justify-center w-5 h-5 absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white p-1 rounded-full">
                                {cartQuantity}
                            </span>
                        )}
                    </span>
                </Link>
                <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                </div>
                {isMenuOpen && (
                    <div className="p-10 lg:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-white p-4 z-50" onClick={toggleMenu}>
                        <div className="flex justify-end"><svg className="h-6 w-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={toggleMenu}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg></div>
                        <h2 className="text-2xl font-bold mb-5">Categories</h2>
                        <CategoriesList />
                        <Link href="/cart" className=" mt-5 hover:text-gray-300 relative">
                            <span className="relative mt-10 inline-block">
                                <FaShoppingCart className="text-2xl" />
                                {cartQuantity > 0 && (
                                    <span className="flex items-center justify-center w-5 h-5 absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white p-1 rounded-full">
                                        {cartQuantity}
                                    </span>
                                )}
                            </span>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;