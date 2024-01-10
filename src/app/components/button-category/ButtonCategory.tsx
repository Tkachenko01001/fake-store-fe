'use client'

import { useAppDispatch } from '../../hooks';
import { setCategory } from "@/redux/features/categories-slice";
import { fetchProductsByCategory } from "@/redux/operations/Operations";
import { setPage } from "@/redux/features/product-slice";
import { CategorySingle } from "@/app/types/types";
import { ButtonCategoryProps } from "@/app/types/types";

const ButtonCategory: React.FC<ButtonCategoryProps> = ({ category }) => {
  const dispatch = useAppDispatch();

  const handleClickForCategory = (e: React.MouseEvent<HTMLButtonElement>, category: CategorySingle) => {
    e.preventDefault();
    dispatch(setCategory(category));
    dispatch(setPage(1));
    dispatch(fetchProductsByCategory({ category, operationType: "fetchProductsByCategory" }));
  };

  return (
    <button className="hover:text-yellow-500 transition cursor-pointer" onClick={(e) => handleClickForCategory(e, category)}>
      {category}
    </button>
  );
};

export default ButtonCategory;