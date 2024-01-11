import { useAppDispatch } from '../../hooks';
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/selectors/selectors";
import { ButtonCategoryProps } from "@/app/types/types";
import { setPage } from "@/redux/features/product-slice";
import { setCategory } from "@/redux/features/categories-slice";
import { CategorySingle } from "@/app/types/types";
import { fetchProductsByCategory } from "@/redux/operations/Operations";

const ButtonCategory: React.FC<ButtonCategoryProps> = ({ category }) => {
  const { selectedCategory } = useSelector(selectCategories);
  const dispatch = useAppDispatch();

  const handleClickForCategory = (e: React.MouseEvent<HTMLButtonElement>, category: CategorySingle) => {
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
    <button className="hover:text-yellow-500 transition cursor-pointer" onClick={(e) => handleClickForCategory(e, category)}>
      {category}
    </button>
  );
};

export default ButtonCategory;