'use client'

import { useAppDispatch } from '../../hooks';
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/selectors/selectors";
import ButtonCategory from "../button-category/ButtonCategory";
import { CategorySingle } from "@/app/types/types";
import { fetchProductsByCategory } from "@/redux/operations/Operations";
import { setPage } from "@/redux/features/product-slice";
import { setCategory } from "@/redux/features/categories-slice";

const CategoriesList = () => {
    const { categories, selectedCategory } = useSelector(selectCategories);
    const dispatch = useAppDispatch();

    const handleClickForCategory = (e: React.MouseEvent<HTMLElement>, category: CategorySingle) => {
        e.preventDefault();
        if (category === selectedCategory) {
            dispatch(setCategory(''));
            return;
        }
        dispatch(setCategory(category));
        dispatch(setPage(1));
        dispatch(fetchProductsByCategory({ category, operationType: "fetchProductsByCategory" }));
    };
    
    return (
        <ul className="flex flex-col justify-around gap-y-10">
            {categories &&
                categories.map((category: CategorySingle) => (
                    <li
                        key={category}
                        className={`p-4 rounded-lg cursor-pointer 
                            ${selectedCategory === category ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300'}
                        `}
                        onClick={(e) => handleClickForCategory(e, category)}
                    >
                        <ButtonCategory category={category} />
                    </li>
                ))}
        </ul>
    )
};

export default CategoriesList;